import { Lexer } from "retsac";
import { config } from "./arg";

let in_code_block = false;
let code_block_quote_length = 0;

export const lexer = new Lexer.Builder()
  .define({
    mdcg: Lexer.from_to(`[${config.token}](`, /^\)\n?/, true).reject(
      () => in_code_block
    ),
    code_block_start: Lexer.from_to("```", "\n", false)
      .reject(() => in_code_block)
      .then((content) => {
        in_code_block = true;
        for (let i = 0; i < content.length; ++i) {
          if (content[i] != "`") {
            code_block_quote_length = i;
            break;
          }
        }
      }),
    code_block_end: Lexer.from_to("```", "\n", true)
      .reject(
        (content) =>
          !(
            in_code_block &&
            content
              .split("")
              .every((c) => c == "`" || c == "\n" || c == "\r") &&
            content.split("").filter((c) => c == "`").length ==
              code_block_quote_length
          )
      )
      .then(() => {
        in_code_block = false;
      }),
    any_line: Lexer.from_to("", "\n", true),
  })
  .build();
