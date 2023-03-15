const { assert } = require("chai");
const { isInRange, validPortRange } = require("../lib/numbers");

describe("number methods", () => {
  describe("isInRange", () => {
    it("should return true if a number is in a range", () => {
      assert.isTrue(isInRange(1.5, 1, 2), "it should be in the range");
    });
    it("should return false if a number is not in a range", () => {
      assert.isTrue(isInRange(1.5, 0, 1), "it should be in the range");
    });
    it("should throw an error if min is greater than max", () => {
      let task = () => isInRange(1, 5, 1);
      assert.throws(
        task,
        "isInRange expects min(5) to be less than or equal to max(1)."
      );
    });
  });
  describe("validPortRange", () => {
    it("should throw an error when an invalid name is passed", () => {
      let task = () => validPortRange("frog");
      assert.throws(
        task,
        `Name must be one of the following: ["type","code","port_min","port_max","source_port_min","source_port_max"] got frog`
      );
    });
    it("should throw an error when value is not an integer", () => {
      let task = () => validPortRange("type", "string");
      assert.throws(
        task,
        "validPortRange expects an integer to be parsed from value. Got type of string for value string."
      );
    });
    it("should return true if the port range is not icmp and is valid", () => {
      assert.isTrue(validPortRange("source_port_min", 2), "it should be true");
    });
    it("should return true if type range is valid", () => {
      assert.isTrue(validPortRange("type", 254), "it should be true");
    });
    it("should return false if type range is not valid", () => {
      assert.isFalse(validPortRange("type", 255), "it should be true");
    });
    it("should return false if code range is not valid", () => {
      assert.isFalse(validPortRange("code", 256), "it should be true");
    });
    it("should return false if the port range is not icmp and is not valid", () => {
      assert.isFalse(
        validPortRange("source_port_min", 0),
        "it should be false"
      );
    });
  });
});
