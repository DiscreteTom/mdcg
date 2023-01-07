# test

Run `yarn test` and check the output.

Test cases are the followings:

## Simple

The tag below should be changed to a code block.

<include path="tsconfig.json" />

## Escaped

The code lock below should not be changed.

```xml
<include path="tsconfig.json" />
```

## Nested

Nested XML tag should also be changed:

<details>
<summary>Click to Expand</summary>
<include path="tsconfig.json" />
</details>

And may include many `include` tags in one XML element:

<details>
<summary>Click to Expand</summary>
<include path="tsconfig.json" />
<include path="tsconfig.json" />
</details>

## Attributes

Attributes in XML should be kept, including boolean attributes.

<details open class="some-class">
<summary>Click to Expand</summary>
<include path="tsconfig.json" />
</details>
