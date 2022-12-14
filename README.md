# MDCG

[![npm](https://img.shields.io/npm/v/mdcg?color=green&style=flat-square)](https://www.npmjs.com/package/mdcg)

Markdown Content Generator.

Useful when you want to reference other file contents in your markdown content.

## Installation

```
yarn add mdcg
```

## Usage

Use a special tag to specify the content. The default tag is `include`.

```xml
<include path="./package.json" from="5" to="-1" type="code" lang="json" />
```

Then run `mdcg input.md output.md`.

Available attributes:

- `from`: from which line, can be negative, default: `1`, means the first line.
- `to`: to which line, can be negative, default: `undefined`, means eof.
- `type`: the content type, default: `code`.
- `lang`: when type is `code`, `lang` means the language of the code block, default: the file's extension.
