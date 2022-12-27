import { ArgumentParser } from "argparse";

const parser = new ArgumentParser({
  description: "Markdown content generator.",
});

parser.add_argument("-t", "--tag", { default: "include", help: "Tag name." });
parser.add_argument("input_file");
parser.add_argument("output_file", { nargs: "?" });

export const config = parser.parse_args();
