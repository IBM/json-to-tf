const { assert } = require("chai");
const { flatten, numberStringList } = require("../lib/arrays");

describe("arrays", () => {
  describe("flatten", () => {
    it("should return a flattened list of arrays", () => {
      let testData = [
        "one",
        ["two"],
        [["three", "four"]],
        [[["five", "six", [["seven"]]]]],
      ];
      let expectedData = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
      ];
      let actualData = flatten(testData);
      assert.deepEqual(actualData, expectedData, "it should flatten the array");
    });
  });
  describe("numberStringList", () => {
    it("should return array when no add", () => {
      assert.deepEqual(
        numberStringList(3),
        ["0", "1", "2"],
        "it should return a list"
      );
    });
    it("should return array when add", () => {
      assert.deepEqual(
        numberStringList(3, 1),
        ["1", "2", "3"],
        "it should return a list"
      );
    });
  });
});
