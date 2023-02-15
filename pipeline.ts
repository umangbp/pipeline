import argparse from "argparse";
import { readFileSync } from "fs";
import z from "zod";
import * as _ from "lodash";

const ProductSchema = z.object({
  name: z.string(),
  code: z.string(),
  tags: z.string().array(),
});

const ProductResultSchema = z.object({
  productName: z.string(),
  productCodes: z.string().array(),
});

type ProductData = z.infer<typeof ProductSchema>;
type ProductResult = z.infer<typeof ProductResultSchema>;

function main(
  productData: ProductData[],
  includeTags: string[],
  excludeTags: string[]
): ProductResult[] {
  const result = productData.filter((item: ProductData) => {
    if (item.tags.every((code) => !includeTags.includes(code))) {
      return false;
    }

    if (item.tags.some((code) => excludeTags.includes(code))) {
      return false;
    }

    return true;
  });

  const finalResult = _.chain(result)
    .groupBy("name")
    .map((value, key) => ({
      productName: key,
      productCodes: _.map(value, "code"),
    }))
    .value();

  return finalResult;
}

function parseTags(tags: string): string[] {
  return tags.split(",").filter((tag) => tag);
}

if (require.main === module) {
  const parser = new argparse.ArgumentParser({
    description: "Extracts unique product names matching given tags.",
  });
  parser.add_argument("product_data", {
    help: "a JSON file containing tagged product data",
  });
  parser.add_argument("--include", {
    type: parseTags,
    help: "a comma-separated list of tags whose products should be included",
    default: [],
  });
  parser.add_argument("--exclude", {
    type: parseTags,
    help: "a comma-separated list of tags whose matching products should be excluded",
    default: [],
  });

  const args = parser.parse_args();
  const FileSchema = z.preprocess(
    (v) => JSON.parse(String(v)),
    ProductSchema.array()
  );

  const productData = FileSchema.parse(readFileSync(args.product_data, "utf8"));

  const orderItems = main(productData, args.include, args.exclude);

  for (const item of orderItems) {
    console.log(`${item.productName}:\n${item.productCodes.join("\n")}\n`);
  }
}
