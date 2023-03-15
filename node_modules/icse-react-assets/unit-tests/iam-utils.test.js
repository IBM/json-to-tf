const { assert } = require("chai");
const { isIpStringInvalid, isRangeInvalid } = require("../src/lib/iam-utils");

describe("iam-utils", () => {
  describe("isIpStringInvalid", () => {
    it("should return false for valid ip list", () => {
      assert.strictEqual(
        isIpStringInvalid("1.1.1.1, 2.2.2.2"),
        false,
        "it should return false"
      );
    });

    it("should return true for invalid ip list", () => {
      assert.strictEqual(
        isIpStringInvalid("1.1, 2"),
        true,
        "it should return true"
      );
    });

    it("should return false for empty ip list", () => {
      assert.strictEqual(
        isIpStringInvalid(""),
        false,
        "it should return false"
      );
    });
  });
  describe("isRangeInvalid", () => {
    it("should return false for valid range", () => {
      assert.strictEqual(
        isRangeInvalid(11, 10, 100),
        false,
        "should return false"
      );
    });
    it("should return true for invalid range", () => {
      assert.strictEqual(
        isRangeInvalid(0, 10, 100),
        true,
        "should return true"
      );
    });
    it("should be inclusive", () => {
      assert.strictEqual(
        isRangeInvalid(10, 10, 100),
        false,
        "should return false"
      );
      assert.strictEqual(
        isRangeInvalid(100, 10, 100),
        false,
        "should return false"
      );
    });
    it("should be false for empty string and null", () => {
      assert.strictEqual(
        isRangeInvalid("", 10, 100),
        false,
        "empty string should return false"
      );
      assert.strictEqual(
        isRangeInvalid(null, 10, 100),
        false,
        "null should return false"
      );
    });
  });
});
