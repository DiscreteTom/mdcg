# MDCG

Markdown Content Generator.

Useful when you want to reference other file contents in your markdown content.

## Usage

Link your file, and name the link as a special token. The default token is `@`.

```md
[@](./package.json)
```

You can use query string to pass parameters:

- `from`: from which line, can be negative, default: `1`, means the first line.
- `to`: to which line, can be negative, default: `undefined`, means eof.
- `type`: the content type, default: `code.<file-ext>`.
  - `=code`: content will be wrapped with double ` ``` `.
  - `=code.xxx`: content will be wrapped with ` ```xxx ` and ` ``` `.

E.g. with parameters:

```md
[@](./package.json?from=5&to=-3&type=code.json)
```

[@](./package.json)
