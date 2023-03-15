const { assert } = require("chai");
const {
  keyCheck,
  emptyCheck,
  arrTypeCheck,
  containsCheck,
  containsAny,
  flagTest,
  prettyJSON,
  getVerbActions,
  tostring,
  centerString,
  capitalize,
  splitAndRejoin,
  distinct,
  replaceOptionalFlags,
  flagValues,
  allDistinct,
} = require("../lib/utils");
const utils = require("../lib/utils");

describe("utils", () => {
  describe("eachKey", () => {
    let eachKey = utils.eachKey;
    it("should correctly run eachKey", () => {
      let testData = [];
      eachKey({ test: "test" }, (key) => testData.push(key));
      assert.deepEqual(testData, ["test"], "it should return correct data");
    });
  });
  describe("containsKeys", () => {
    let containsKeys = utils.containsKeys;
    it("should return true if key exists in object", () => {
      assert.isTrue(containsKeys({ test: true }, "test"));
    });
    it("should return false if key does not exist in object", () => {
      assert.isTrue(containsKeys({ test: true }, "test"));
    });
  });
  describe("getType", () => {
    let getType = utils.getType;
    it("should return array if is array", () => {
      assert.deepEqual(getType([]), "Array", "should retun corrct value");
    });
    it("should return Function if is Function", () => {
      assert.deepEqual(
        getType(getType),
        "Function",
        "should retun corrct value"
      );
    });
    it("should return typeof if is not function or Array", () => {
      assert.deepEqual(getType({}), "object", "should retun corrct value");
    });
  });
  describe("keys", () => {
    it("should return correct keys", () => {
      let keys = utils.keys;
      assert.deepEqual(
        keys({ test: true }),
        ["test"],
        "should return correct keys"
      );
    });
  });
  describe("keyTest", () => {
    let keyTest = utils.keyTest;
    it("should return false if strict and number of keys don't match", () => {
      assert.isFalse(
        keyTest(
          {
            test: true,
            bad: "frog",
          },
          ["test"],
          true
        ),
        "should be false"
      );
    });
    it("should return false if strict and missing key", () => {
      assert.isFalse(
        keyTest(
          {
            test: true,
            bad: "frog",
          },
          ["test", "test-2"]
        ),
        "should be false"
      );
    });
    it("should return true if all match", () => {
      assert.isTrue(
        keyTest(
          {
            test: true,
          },
          ["test"]
        ),
        "should be true"
      );
    });
  });
  describe("contains", () => {
    let contains = utils.contains;
    it("should return true if item in array", () => {
      assert.isTrue(contains(["test"], "test"), "should be true");
    });
    it("should return false if item not in array", () => {
      assert.isFalse(contains(["test"], "frog"), "should be true");
    });
  });
  describe("typeCheck", () => {
    it("should throw a error with the correct message if value is wrong type", () => {
      assert.throws(() => {
        utils.typeCheck("uh oh", "number", "string");
      }, "uh oh number got string");
    });
  });
  describe("keyCheck", () => {
    it("should throw an error if strict check fails", () => {
      assert.throws(() => {
        keyCheck("uh oh", { frog: true, foo: "baz" }, ["frog"], true);
      }, 'uh oh 1 keys ["frog"] got ["frog","foo"]');
    });
    it("should throw an error if non strict check fails", () => {
      assert.throws(() => {
        keyCheck("uh oh", { foo: "baz" }, ["frog"]);
      }, 'uh oh ["frog"] got ["foo"]');
    });
    it("should not throw if everything is fine", () => {
      assert.doesNotThrow(() => {
        keyCheck("uh oh", { foo: "baz" }, ["foo"]);
      }, 'uh oh ["frog"] got ["foo"]');
    });
  });
  describe("textTemplate", () => {
    let textTemplate = utils.textTemplate;
    const resourceTemplate = `tfx.resource(\n  "$RESOURCE_NAME",\n  "$RESOURCE_ADDRESS",\n$VALUES\n),`;
    it("should get all the args from a string teplate and set as templateArgs", () => {
      let expectedData = ["$RESOURCE_NAME", "$RESOURCE_ADDRESS", "$VALUES"];
      let actualData = new textTemplate(resourceTemplate).templateArgs;
      assert.deepEqual(actualData, expectedData, "should have correct array");
    });
    describe("fill", () => {
      it("should fill the template variable values", () => {
        let expectedData = `tfx.resource(\n  "yes",\n  "hi",\nhello\n),`;
        let actualData = new textTemplate(resourceTemplate).fill(
          "yes",
          "hi",
          "hello"
        );
        assert.deepEqual(
          actualData,
          expectedData,
          "It should return filled in template"
        );
      });
    });
    describe("set", () => {
      it("should replace a value and return the object", () => {
        let expectedData = `tfx.resource(\n  "$RESOURCE_NAME",\n  "$RESOURCE_ADDRESS",\nhi\n),`;
        let actualData = new textTemplate(resourceTemplate).set(
          "$VALUES",
          "hi"
        );
        assert.deepEqual(
          actualData,
          expectedData,
          "should return string template"
        );
      });
    });
    describe("setx", () => {
      it("should run set and return this to chain", () => {
        let expectedData = `tfx.resource(\n  "$RESOURCE_NAME",\n  "$RESOURCE_ADDRESS",\nhi\n),`;
        let actualData = new textTemplate(resourceTemplate).setx(
          "$VALUES",
          "hi"
        ).str;
        assert.deepEqual(
          actualData,
          expectedData,
          "should return string template"
        );
      });
    });
    describe("clone", () => {
      it("should create a new instance of the textTemplate instance", () => {
        let original = new textTemplate(resourceTemplate);
        let cloneTemplate = original.clone();
        assert.deepEqual(original.str, cloneTemplate.str, "it should copy");
      });
      it("should not change the original when the clone is changed", () => {
        let original = new textTemplate(resourceTemplate);
        let cloneTemplate = original.clone();
        cloneTemplate.set("$VALUES", "frog");
        assert.notDeepEqual(original.str, cloneTemplate.str, "it should copy");
      });
    });
  });
});
