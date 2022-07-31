import { lexer } from "./lexer";
import { config } from "./arg";
import { readFileSync } from "fs";

export function patch(content: string) {
  return lexer
    .lexAll(content)
    .map((t) => {
      if (t.type !== "mdcg") return t.content;

      let s = t.content.slice(`[${config.token}](`.length); // remove prefix
      s = s
        .split("")
        .filter((c) => c != "\r")
        .join(""); // remove '\r'
      s = s.endsWith("\n") ? s.slice(0, -2) : s.slice(0, -1); // remove suffix

      let [path, query] = s.split("?", 2);
      let params = {
        from: 0,
        to: undefined,
        type: "code." + path.split(".").at(-1),
      };
      query?.split("&").forEach((p) => {
        let [key, value] = p.split("=");
        if (key == "from") params.from = Number(value) - 1;
        else if (key == "to") params.to = Number(value);
        else if (key == "type") params.type = value;
      });

      let file_content = readFileSync(path, "utf-8")
        .split("\n")
        .slice(params.from, params.to)
        .join("\n");

      if (params.type.startsWith("code")) {
        return `\`\`\`${params.type.split(".").at(1)}\n${file_content}\n\`\`\``;
      } else {
        throw new Error(`Invalid type: ${params.type}`);
      }
    })
    .join("");
}
