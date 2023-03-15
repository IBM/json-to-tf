const { assert } = require("chai");
const {
  getValidAdminPassword,
  isValidUrl,
  isValidTmosAdminPassword,
} = require("../src/lib/f5-utils");
const { initMockWindow } = require("./mocks/window.mock");
const { RegexButWithWords } = require("regex-but-with-words");

const tmosAdminPasswordValidationExp = new RegexButWithWords()
  .stringBegin()
  .look.ahead((exp) => {
    exp.any().anyNumber().set("a-z");
  })
  .look.ahead((exp) => {
    exp.any().anyNumber().set("A-Z");
  })
  .look.ahead((exp) => {
    exp.any().anyNumber().set("0-9");
  })
  .any(15, "*")
  .stringEnd()
  .done("");

describe("f5-utils", () => {
  describe("getValidAdminPassword", () => {
    beforeEach(() => {
      initMockWindow();
    });
    it("should return a string that fits the requirements of the validation expression", () => {
      const password = getValidAdminPassword(15);
      assert(tmosAdminPasswordValidationExp.test(password));
    });
    it("should return empty string if invalid password generated 5 times", () => {
      const password = getValidAdminPassword(10); // not long enough
      assert.strictEqual(password, "");
    });
  });
  describe("isValidUrl", () => {
    it("should be false for empty or null string", () => {
      assert.isFalse(isValidUrl("") && isValidUrl(null));
    });
    it("should be false for invalid url", () => {
      assert.isFalse(isValidUrl("invalid.url"));
    });
    it("should be true for valid url", () => {
      assert.isTrue(
        isValidUrl(
          "https://declarations.s3.us-east.cloud-object-storage.appdomain.cloud/do_declaration.json"
        )
      );
    });
  });

  describe("isValidTmosAdminPassword", () => {
    it("should return true if empty or null", () => {
      assert.isTrue(
        isValidTmosAdminPassword("") && isValidTmosAdminPassword(null)
      );
    });
    it("should return true if valid password", () => {
      assert.isTrue(isValidTmosAdminPassword("abcdefabcdefABC1"));
    });
  });
});
