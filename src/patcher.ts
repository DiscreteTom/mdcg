import { Lexer } from "marked";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { readFileSync } from "fs";
import { config } from "./arg";
import * as jp from "jsonpath";

export function patch(content: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });
  const builder = new XMLBuilder({ processEntities: false });

  return new Lexer()
    .lex(content)
    .map((t) => {
      if (t.type != "html") return t.raw; // normal markdown, not XML tag

      const obj = [{ top: parser.parse(t.raw) }]; // wrap the XML content

      jp.query(obj, `$..*[?(@.${config.tag})]`) // find all nodes with the tag
        .map((node) => {
          let result = "";

          const elements: {
            path: string;
            from?: string;
            to?: string;
            type?: string;
            lang?: string;
          }[] =
            node[config.tag] instanceof Array
              ? node[config.tag]
              : [node[config.tag]];

          elements.map((el) => {
            const options = {
              from: 0,
              to: undefined,
              type: "code",
              lang: "",
            };

            if (!el.path) throw new Error(`Missing path.`);
            options.lang = el.lang || el.path.split(".").at(-1);
            if (typeof el.from == "string") {
              options.from = Number(el.from) - 1;
            }
            if (typeof el.to == "string") {
              options.to = Number(el.to);
            }
            if (el.type) options.type = el.type;

            const file_content = readFileSync(el.path, "utf-8")
              .split("")
              .filter((c) => c != "\r")
              .join("")
              .split("\n")
              .slice(options.from, options.to)
              .join("\n");

            if (options.type == "code") {
              result += `\n\n\`\`\`${options.lang}\n${file_content}\n\`\`\`\n\n`;
            } else {
              throw new Error(`Invalid type: ${options.type}`);
            }
          });

          delete node[config.tag];
          node["#text"] = result; // apply text content as the XML content
          return node;
        });
      const [{ top: content }] = obj; // unwrap the content
      return builder.build(content) + "\n\n"; // convert the XML object back to text
    })
    .join("");
}
