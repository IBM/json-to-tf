const { assert } = require("chai");
const {
  stringifyTranspose,
  matchLength,
  stringifyValue,
  longestKeyLength,
  jsonToTf,
} = require("../lib/json-to-tf");

describe("jsonToTf", () => {
  describe("stringifyTranspose", () => {
    it("should transpose list of strings with quotes", () => {
      let expectedData = {
        frog: '"frog"',
        todd: '"todd"',
        number: 4,
      };
      let actualData = stringifyTranspose({
        frog: "frog",
        todd: "todd",
        obj: {
          hi: "mom",
        },
        number: 4,
      });
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return corrext data"
      );
    });
  });
  describe("matchLength", () => {
    it("should match length", () => {
      assert.deepEqual(
        matchLength("a", 10).length,
        10,
        "it should match length"
      );
    });
  });
  describe("strigifyValue", () => {
    it("should return value when not string", () => {
      assert.deepEqual(stringifyValue(4), 4, "it should not add quotes");
    });
    it("should return value when string without carrot", () => {
      assert.deepEqual(stringifyValue("4"), "4", "it should not add quotes");
    });
    it("should return value with quotes when string has carrot", () => {
      assert.deepEqual(stringifyValue("^4"), '"4"', "it should not add quotes");
    });
  });
  describe("longestKey", () => {
    it("should return the number of the longest key with depends_on", () => {
      assert.deepEqual(
        longestKeyLength({
          test: "hi",
          depends_on: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
    it("should return the number of the longest key ignoring fields that start with _", () => {
      assert.deepEqual(
        longestKeyLength({
          test: "hi",
          tes: "hi",
          _depends_on: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
    it("should return the number of the longest subtracting one from the length of fields that begin with *", () => {
      assert.deepEqual(
        longestKeyLength({
          "*test": "hi",
          tes: "hi",
          _depends_on: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
    it("should return the number of the longest subtracting one from the length of fields that begin with -", () => {
      assert.deepEqual(
        longestKeyLength({
          "-test": "hi",
          tes: "hi",
          timeouts: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
  });
  describe("jsonToTf", () => {
    it("should return a data source", () => {
      let actualData = jsonToTf("test", "test", { name: "test" }, true);
      let expectedData = 'data "test" "test" {\n  name = test\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource", () => {
      let actualData = jsonToTf("test", "test", { name: "test" });
      let expectedData = 'resource "test" "test" {\n  name = test\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with timeouts and depends on", () => {
      let actualData = jsonToTf("test", "test", {
        name: "test",
        timeouts: { create: "1m" },
        depends_on: ["ref1"],
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  timeouts {\n    create = "1m"\n  }\n\n  depends_on = [\n    ref1\n  ]\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with multiblock", () => {
      let actualData = jsonToTf("test", "test", {
        name: "test",
        "-zone": [
          {
            name: "1",
            foo: "bar",
          },
          {
            name: "2",
            foo: "bar",
          },
        ],
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  zone {\n    name = 1\n    foo  = bar\n  }\n\n  zone {\n    name = 2\n    foo  = bar\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with multiline array", () => {
      let actualData = jsonToTf("test", "test", {
        name: "test",
        "*zone": ["zone-zone", "zone-zone-zone-zone"],
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  zone = [\n    zone-zone,\n    zone-zone-zone-zone\n  ]\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with a nest object with no assignment", () => {
      let actualData = jsonToTf("test", "test", {
        name: "test",
        _zone: {
          name: "^the-zone",
          type: "^pizza",
        },
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  zone {\n    name = "the-zone"\n    type = "pizza"\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with a nest object with an assignment", () => {
      let actualData = jsonToTf("test", "test", {
        name: "test",
        "^zone": {
          name: "^the-zone",
          type: "^pizza",
        },
      });
      let expectedData =
        'resource "test" "test" {\n  name  = test\n\n  zone = {\n    name = "the-zone"\n    type = "pizza"\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with a nest object with an assignment and a nested array", () => {
      let actualData = jsonToTf("test", "test", {
        name: "test",
        "^zone": {
          name: "^the-zone",
          type: "^pizza",
          "*toppings": ["^mushroom", "^feta"],
        },
      });
      let expectedData =
        'resource "test" "test" {\n  name  = test\n\n  zone = {\n    name     = "the-zone"\n    type     = "pizza"\n    toppings = [\n      "mushroom",\n      "feta"\n    ]\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
  });
});
