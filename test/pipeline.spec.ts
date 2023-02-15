import { expect, assert } from "chai";
import { main } from "../pipeline";

describe("Test output", () => {
  const inputData = [
    {
      name: "T-Shirt",
      tags: ["red", "large"],
      code: "A21313",
    },
    {
      name: "T-Shirt",
      tags: ["green", "medium"],
      code: "A21312",
    },
    {
      name: "Pants",
      tags: ["green", "medium"],
      code: "A21455",
    },
  ];

  it("should return result array with type ProductResult", () => {
    const result = main(inputData, ["red", "medium"], []);

    expect(result).to.eql([
      { productName: "T-Shirt", productCodes: ["A21313", "A21312"] },
      { productName: "Pants", productCodes: ["A21455"] },
    ]);
  });

  it("Should not contain item with tag large", () => {
    const result = main(inputData, ["red", "medium"], ["large"]);

    expect(result).to.eql([
      { productName: "T-Shirt", productCodes: ["A21312"] },
      { productName: "Pants", productCodes: ["A21455"] },
    ]);
  });

  it("Should return empty result", () => {
    const result = main(inputData, ["red", "medium"], ["large", "medium"]);

    expect(result).to.eql([]);
  });
});
