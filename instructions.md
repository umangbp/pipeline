# SignIQ code test - "pipeline"

## Task Description

The task is to implement the rest of the `main` function, the `main` function accepts the following arguments:

- Product data matching the ProductSchema (see pipeline.ts)
- Two lists of strings:
- "Include" tags
- "Exclude" tags

The function should return a list of "ProductResult", each containing:

- A product name
- A list of matching product codes that share that product name

The products that should be included in the list are those that:

- Have at least one of the "include" tags
- Do not have any of the "exclude" tags

The "ProductResult" has the following attributes:

- "productName"
- "productCodes"

## Input Data

The input data is a JSON file containing product information for an online clothing store that only carries one style of each item in a range of colors and sizes, and each product is uniquely identified by an item code.

## Additional Information

- The "plumbing" of the pipeline.ts file, including input, output, and argument parsing, has already been written.
- We use [zod](https://github.com/colinhacks/zod) for schema validation as well as type enforcement, if you have any issues with this library, feel free to reach out.
- You are welcome to npm install any library that will help you complete this task ie (lodash, mocha, etc)

## Getting Started
You must have [node>14](https://nodejs.org/en/download/), install any dependencies using `npm install`.
An example script is provided to run the program - you can invoke it with `npm run go`.

## Example

Given the following arguments;

`ts-node ./pipeline.ts product_data.json --include red,green --exclude large`

Your output should match the following;

```
T-Shirt:
A21312

Pants:
A21455
```
