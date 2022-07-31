import { Lexer } from "marked";
import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";
import { config } from "./arg";

export function patch(content: string) {
  return new Lexer()
    .lex(content)
    .map((t) => {
      if (t.type != "html") return t.raw;

      let obj = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
      }).parse(t.raw);

      if (!(config.tag in obj)) return t.raw;

      const attr = obj[config.tag];

      let options = {
        from: 0,
        to: undefined,
        type: "code",
        lang: "",
      };

      if (!attr.path) throw new Error(`Missing path.`);
      options.lang = attr.lang || attr.path.split(".").at(-1);
      if (typeof attr.from == "string") {
        options.from = Number(attr.from) - 1;
      }
      if (typeof attr.to == "string") {
        options.to = Number(attr.to);
      }
      if (attr.type) options.type = attr.type;

      const file_content = readFileSync(attr.path, "utf-8")
        .split("")
        .filter((c) => c != "\r")
        .join("")
        .split("\n")
        .slice(options.from, options.to)
        .join("\n");

      if (options.type == "code") {
        return `\`\`\`${options.lang}\n${file_content}\n\`\`\`\n\n`;
      } else {
        throw new Error(`Invalid type: ${options.type}`);
      }
    })
    .join("");
}
