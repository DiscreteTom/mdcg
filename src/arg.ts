import { ArgumentParser } from "argparse";

const parser = new ArgumentParser({
  description: "Markdown content generator.",
});

parser.add_argument("-t", "--token", { default: "@", help: "Link name." });
parser.add_argument("input_file");
parser.add_argument("output_file", { nargs: "?" });

export let config = parser.parse_args();
