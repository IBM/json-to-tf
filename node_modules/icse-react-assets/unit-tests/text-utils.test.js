const { assert } = require("chai");
const { formatInputPlaceholder } = require("../src/lib/text-utils");

describe("text-utils", () => {
  describe("formatInputPlaceholder", () => {
    it("should return a formatted placeholder", () => {
      assert.deepEqual(
        "my-component-name-field-name",
        formatInputPlaceholder("component name", "field name"),
        "it should return true"
      );
    });
  });
});
