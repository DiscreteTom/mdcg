#!/usr/bin/env node

import { config } from "./arg";
import { readFileSync, writeFileSync } from "fs";

import { patch } from "./patcher";

let result = patch(readFileSync(config.input_file, "utf-8"));

if (config.output_file) {
  writeFileSync(config.output_file, result, "utf-8");
} else {
  console.log(result);
}
