const { hclEncode } = require("../lib/encode");
const { assert } = require("chai");
const overrideJson = require("./data-files/override.json");
const fs = require("fs");

describe("encode", () => {
  describe("hclEncode", () => {
    it("should take a json object with only string, bool, and number variables and convert to hcl", () => {
      let testJson = {
        string: "string",
        number: 1,
        boolean: true,
      };
      let actualData = hclEncode(testJson);
      let expectedData = `string  = "string"\nnumber  = 1\nboolean = true`;
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return the correct data"
      );
    });
    it("should take a json object with only string, bool, and number variables and convert to hcl object", () => {
      let testJson = {
        string: "string",
        number: 1,
        boolean: true,
      };
      let actualData = hclEncode(testJson, true);
      let expectedData = `{\n  string  = "string"\n  number  = 1\n  boolean = true\n}`;
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return the correct data"
      );
    });
    it("should take a json object with only string, bool, number, and array variables and convert to hcl", () => {
      let testJson = {
        string: "string",
        number: 1,
        boolean: true,
        array: [1, true, "three", 4],
      };
      let actualData = hclEncode(testJson);
      let expectedData = `string  = "string"\nnumber  = 1\nboolean = true\narray   = [1,true,"three",4]`;
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return the correct data"
      );
    });
    it("should take a json object with only string, bool, number, array, and object variables and convert to hcl", () => {
      let testJson = {
        string: "string",
        number: 1,
        object: {
          hi: "hello",
          zones: [1, 2, 3],
          is_false: true,
        },
        boolean: true,
        array: [1, true, "three", 4],
      };
      let actualData = hclEncode(testJson);
      let expectedData = `string  = "string"
number  = 1
object  = {
  hi       = "hello"
  zones    = [1,2,3]
  is_false = true
}
boolean = true
array   = [1,true,"three",4]`;
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return the correct data"
      );
    });
    it("should work with a very big nested json object", () => {
      let actualData = hclEncode(overrideJson);
      let expectedData = fs.readFileSync(
        "./unit-tests/data-files/override.tfvars",
        "utf-8"
      );
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return the correct data"
      );
    });
  });
});
