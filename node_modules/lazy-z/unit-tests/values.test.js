const { assert } = require("chai");
const values = require("../lib/values");
describe("values", () => {
  describe("getType", () => {
    let getType = values.getType;
    it("should return array if is array", () => {
      assert.deepEqual(getType([]), "Array", "should return correct value");
    });
    it("should return Function if is Function", () => {
      assert.deepEqual(
        getType(getType),
        "Function",
        "should return correct value"
      );
    });
    it("should return typeof if is not function or Array", () => {
      assert.deepEqual(getType({}), "object", "should return correct value");
    });
  });
  describe("typeCheck", () => {
    it("should throw a error for an invalid type", () => {
      assert.throws(() => {
        values.typeCheck("uh oh", "frog", "string");
      }, `typeCheck expected one of the following types: ["string", "number", "object", "boolean", "Array", "Function"] got: frog`);
    });
    it("should throw a error with the correct message if value is wrong type", () => {
      assert.throws(() => {
        values.typeCheck("uh oh", "number", "string");
      }, "uh oh number got string");
    });
  });
  describe("arrTypeCheck", () => {
    it("should throw an error if array types do not match", () => {
      assert.throws(() => {
        values.arrTypeCheck("should", "string", [1, 2, 3, 4]);
      }, `should type string got ["number","number","number","number"]`);
    });
    it("should throw an error if only some array types do not match", () => {
      assert.throws(() => {
        values.arrTypeCheck("should", "string", [1, "ding", 3, 4]);
      }, `should type string got ["number","string","number","number"]`);
    });
    it("should not throw if all values match", () => {
      assert.doesNotThrow(() => {
        values.arrTypeCheck("should", "string", ["yes"]);
      }, "should be all good");
    });
  });
  describe("paramTest", () => {
    it("should throw the correct error when too few arguments are passed", () => {
      let task = () => {
        values.paramTest("todd");
      };
      assert.throws(
        task,
        "paramTest expected 3 arguments for each variable to be passed as params, got 0"
      );
    });
    it("should throw the correct error when expecting an array of the same type", () => {
      let todd = function (arr) {
        values.paramTest("todd", "arr", "Array<string>", arr);
      };
      assert.throws(() => {
        todd([1, 2, 3]);
      }, `todd expects all entries in arr to be type string got ["number","number","number"]`);
    });
  });
  describe("keyTest", () => {
    let keyTest = values.keyTest;
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
  describe("keyCheck", () => {
    let keyCheck = values.keyCheck;
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
    it("should throw an error if everything is ok", () => {
      assert.doesNotThrow(() => {
        keyCheck("uh oh", { foo: "baz" }, ["foo"]);
      }, 'uh oh ["frog"] got ["foo"]');
    });
  });
  describe("containsCheck", () => {
    it("should throw error if not in array", () => {
      assert.throws(() => {
        values.containsCheck("should", ["frog", "string", "egg"], "4");
      }, 'should got "4"');
    });
    it("should not throw error if is in array", () => {
      assert.doesNotThrow(() => {
        values.containsCheck("should", ["frog", "string", "egg"], "egg");
      }, "should got 4");
    });
  });
  describe("containsAny", () => {
    it("should return false if no overlapping entries", () => {
      let actualData = values.containsAny(["a"], ["b"]);
      assert.isFalse(actualData, "should be false");
    });
    it("should return true if overlapping keys", () => {
      let actualData = values.containsAny(["b"], ["b"]);
      assert.isTrue(actualData, "should be true");
    });
  });
  describe("emptyCheck", () => {
    it("should throw an error if an array is empty", () => {
      let task = () => {
        values.emptyCheck("why", []);
      };
      assert.throws(task, "why");
    });
    it("should not throw if the array has an entry", () => {
      let task = () => {
        values.emptyCheck("why", ["why"]);
      };
      assert.doesNotThrow(task, "should not throw");
    });
  });
});
