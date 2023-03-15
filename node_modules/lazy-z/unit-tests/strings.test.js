const { assert } = require("chai");
const utils = require("../lib/strings");
const { prettyJSON } = require("../lib/shortcuts");

describe("string functions", () => {
  describe("remove trailing spaces", () => {
    it("should remove spaces from the end of a string", () => {
      let expectedData = "test";
      let actualData = utils.removeTrailingSpaces("test        ");
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return the correct string"
      );
    });
  });
  describe("stringify", () => {
    it("should return string if function", () => {
      let expectedData = (() => {}).toString();
      let actualData = utils.stringify(() => {});
      assert.deepEqual(
        actualData,
        expectedData,
        "should return correct string"
      );
    });
    it("should return string if object", () => {
      let expectedData = prettyJSON({ key: "value" });
      let actualData = utils.stringify({ key: "value" });
      assert.deepEqual(
        actualData,
        expectedData,
        "should return correct string"
      );
    });
    it("should return string if array", () => {
      let expectedData = prettyJSON(["foo"]);
      let actualData = utils.stringify(["foo"]);
      assert.deepEqual(
        actualData,
        expectedData,
        "should return correct string"
      );
    });
    it("should return string if bool or number", () => {
      let expectedData = "2";
      let actualData = utils.stringify(2);
      assert.deepEqual(
        actualData,
        expectedData,
        "should return correct string"
      );
    });
  });
  describe("capitalize", () => {
    it("should return a string with the first letter uppercase", () => {
      let expectedData = "Hello";
      let actualData = utils.capitalize("hello");
      assert.deepEqual(
        actualData,
        expectedData,
        "it should capitalize the word"
      );
    });
  });
  describe("kebabCase", () => {
    it("should return a string with all the spaces and underscores replaced with - if a string is provided", () => {
      let expectedData = `all-caps-with-spaces`;
      assert.deepEqual(
        utils.kebabCase(`All Caps With Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.kebabCase(`All_Caps with-Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.kebabCase(`all_caps_with_spaces`),
        expectedData,
        "it should return data in correct case"
      );
    });
    it("should return an empty string if not found", () => {
      assert.deepEqual(
        utils.kebabCase(false),
        "",
        "it should return empty string"
      );
    });
  });
  describe("snakeCase", () => {
    it("should return a string with all the spaces and underscores replaced with _ if a string is provided", () => {
      let expectedData = `all_caps_with_spaces`;
      assert.deepEqual(
        utils.snakeCase(`All Caps With Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.snakeCase(`All_Caps with-Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.snakeCase(`all-caps-with-spaces`),
        expectedData,
        "it should return data in correct case"
      );
    });
    it("should return an empty string if not found", () => {
      assert.deepEqual(
        utils.snakeCase(false),
        "",
        "it should return empty string"
      );
    });
  });
  describe("camelCase", () => {
    it("should return a string with all the spaces and underscores replaced with _ if a string is provided", () => {
      let expectedData = `allCapsWithSpaces`;
      assert.deepEqual(
        utils.camelCase(`All Caps With Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.camelCase(`All_Caps with-Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.camelCase(`all-caps-with-spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.camelCase(`caps`),
        "caps",
        "it should return data in correct case"
      );
    });
    it("should return an empty string if not found", () => {
      assert.deepEqual(
        utils.camelCase(false),
        "",
        "it should return empty string"
      );
    });
  });
  describe("titleCase", () => {
    it("should return a string with all the spaces and underscores replaced with _ if a string is provided", () => {
      let expectedData = `All Caps With Spaces`;
      assert.deepEqual(
        utils.titleCase(`allCapsWithSpaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.titleCase(`All_Caps with-Spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.titleCase(`all-caps-with-spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.titleCase(`all_caps_with_spaces`),
        expectedData,
        "it should return data in correct case"
      );
      assert.deepEqual(
        utils.titleCase(`caps`),
        "Caps",
        "it should return data in correct case"
      );
    });
    it("should return string with number", () => {
      assert.deepEqual(
        utils.titleCase(`string-value-1`),
        "String Value 1",
        "it should return correct case"
      )
    })
    it("should return an empty string if not found", () => {
      assert.deepEqual(
        utils.titleCase(false),
        "",
        "it should return empty string"
      );
    });
  });
});
