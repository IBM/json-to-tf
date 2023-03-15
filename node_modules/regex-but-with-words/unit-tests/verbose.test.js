const { assert } = require("chai");
const { wordify, spaceItOut, toString } = require("../lib/verbose");

describe("verbose", () => {
  describe("wordify", () => {
    it("should turn a simple regular expression into a function", () => {
      let actualData = wordify(/\d/g);
      let expectedData = 'exp.digit().done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should turn a simple regular expression with {4} into a function", () => {
      let actualData = wordify(/\d{4}/g);
      let expectedData = 'exp.digit(4).done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a string literal with a range", () => {
      let actualData = wordify(/frog{4}/g);
      let expectedData = 'exp.literal("fro").literal("g", 4).done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a string literal with a minimum and max range", () => {
      let actualData = wordify(/frog{4,5}/g);
      let expectedData = 'exp.literal("fro").literal("g", 4, 5).done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a string literal with an improperly escaped character", () => {
      let actualData = wordify(/\p/g);
      let expectedData = 'exp.literal("p").done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a string literal with a lazy character", () => {
      let actualData = wordify(/\w?/g);
      let expectedData = 'exp.word().lazy().done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a word boundary", () => {
      let actualData = wordify(/\b/g);
      let expectedData = 'exp.wordBoundary().done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a negated word boundary", () => {
      let actualData = wordify(/\B/g);
      let expectedData = 'exp.notWordBoundary().done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a string literal with an asterisk", () => {
      let actualData = wordify(/\w*/g);
      let expectedData = 'exp.word().anyNumber().done("g")';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a capturing group", () => {
      let actualData = wordify(/(word)/g);
      let expectedData = `exp.group((exp) => { exp.literal("word") }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a quantified capturing group", () => {
      let actualData = wordify(/(word){3}/g);
      let expectedData = `exp.group((exp) => { exp.literal("word") }, 3).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a quantified non-capturing group", () => {
      let actualData = wordify(/(?:word){3}/g);
      let expectedData = `exp.nonCapturingGroup((exp) => { exp.literal("word") }, 3).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a quantified capturing group with max", () => {
      let actualData = wordify(/(word){3,4}/g);
      let expectedData = `exp.group((exp) => { exp.literal("word") }, 3, 4).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a quantified capturing group with max in the middle of expression", () => {
      let actualData = wordify(/(word){3,4}word/g);
      let expectedData = `exp.group((exp) => { exp.literal("word") }, 3, 4).literal("word").done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a capturing group within a capturing group", () => {
      let actualData = wordify(/(dr(i|a)nk)/g);
      let expectedData = `exp.group((exp) => { exp.literal("dr").group((exp) => { exp.literal("i").or().literal("a") }).literal("nk") }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a capturing group within a capturing group with a set", () => {
      let actualData = wordify(/(dr(i|[ua])nk)/g);
      let expectedData = `exp.group((exp) => { exp.literal("dr").group((exp) => { exp.literal("i").or().set("ua") }).literal("nk") }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a character set", () => {
      let actualData = wordify(/[word]/g);
      let expectedData = `exp.set("word").done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a negated character set", () => {
      let actualData = wordify(/[^word]/g);
      let expectedData = `exp.negatedSet("word").done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a negated character set and escape characters", () => {
      let actualData = wordify(/[^\]\?\-word]/g);
      let expectedData = `exp.negatedSet("]?-word").done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a look.ahead", () => {
      let actualData = wordify(/frog(?=mite)/g);
      let expectedData = `exp.literal("frog").look.ahead((exp) => { exp.literal("mite") }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a negative lookahead", () => {
      let actualData = wordify(/frog(?!mite)/g);
      let expectedData = `exp.literal("frog").negativeLook.ahead((exp) => { exp.literal("mite") }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should throw an error, lookbehind is no longer supported", () => {
      let task = () => wordify(/(?<=mite)frog/g);
      assert.throws(
        task,
        "To maintain browser compatability with safari and firefox negative lookbehind and lookbehind are not supported. Try using a non-capturing group (?:) instead."
      );
    });
    it("should throw an error, lookbehind is no longer supported", () => {
      let task = () => wordify(/(?<!mite)frog/g);
      assert.throws(
        task,
        "To maintain browser compatability with safari and firefox negative lookbehind and lookbehind are not supported. Try using a non-capturing group (?:) instead."
      );
    });
    it("should correctly return beginning and end of string", () => {
      let actualData = wordify(/^--?[a-z-]+\s\S+(\s--?[a-z-]+\s\S+)*$/g);
      let expectedData = `exp.stringBegin().literal("-").literal("-").lazy().set("a-z-").oneOrMore().whitespace().notWhitespace().oneOrMore().group((exp) => { exp.whitespace().literal("-").literal("-").lazy().set("a-z-").oneOrMore().whitespace().notWhitespace().oneOrMore() }).anyNumber().stringEnd().done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a literal with whitespace after", () => {
      let actualData = wordify(/="\s/g);
      let expectedData = `exp.literal("=\\"").whitespace().done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a literal containing an open parenthesis", () => {
      let actualData = wordify(/hello\(/g);
      let expectedData = `exp.literal("hello(").done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return set to have a function if it contains characters other than string", () => {
      let actualData = wordify(/hello[sh\s\w]/g);
      let expectedData = `exp.literal("hello").set((exp) => { exp.literal("sh").whitespace().word() }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return newline and tab expressions", () => {
      let actualData = wordify(/\n\t/g);
      let expectedData = `exp.newline().tab().done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a group with two escaped slash string literals", () => {
      let actualData = wordify(/(\\\\)/g);
      let expectedData = `exp.group((exp) => { exp.backslash().backslash() }).done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return backslash function with unescaped backslash literal", () => {
      let actualData = wordify(/\\/g);
      let expectedData = `exp.backslash().done("g")`;
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
  });
  describe("spaceItOut", () => {
    it("should add indentation and spaces to output", () => {
      let expectedData = `exp
  .stringBegin()
  .literal("-")
  .literal("-")
  .lazy()
  .set("a-z-")
  .oneOrMore()
  .whitespace()
  .notWhitespace()
  .oneOrMore()
  .group((exp) => {
    exp
      .whitespace()
      .literal("-")
      .literal("-")
      .lazy()
      .set("a-z-")
      .oneOrMore()
      .whitespace()
      .notWhitespace()
      .oneOrMore()
  })
  .anyNumber()
  .stringEnd()
  .done("g")`;
      let actualData = spaceItOut(
        `exp.stringBegin().literal("-").literal("-").lazy().set("a-z-").oneOrMore().whitespace().notWhitespace().oneOrMore().group((exp) => { exp.whitespace().literal("-").literal("-").lazy().set("a-z-").oneOrMore().whitespace().notWhitespace().oneOrMore() }).anyNumber().stringEnd().done("g")`
      );
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return formatted data"
      );
    });
    it("should return the cidr block regex", () => {
      let cidrRegex =
        /^(((2[1-5]\d)|(1\d\d)|\d\d|\d)\.){3}((2[1-5]\d)|(1\d\d)|\d\d|\d)((\/3[0-2])|(\/[12]\d)|\/\d|\b)$/g;
      let wordifiedCidrRegex = wordify(cidrRegex);
      let expectedData = `exp
  .stringBegin()
  .group((exp) => {
    exp
      .group((exp) => {
        exp
          .group((exp) => {
            exp
              .literal("2")
              .set("1-5")
              .digit()
          })
          .or()
          .group((exp) => {
            exp
              .literal("1")
              .digit()
              .digit()
          })
          .or()
          .digit()
          .digit()
          .or()
          .digit()
      })
      .literal(".")
  }, 3)
  .group((exp) => {
    exp
      .group((exp) => {
        exp
          .literal("2")
          .set("1-5")
          .digit()
      })
      .or()
      .group((exp) => {
        exp
          .literal("1")
          .digit()
          .digit()
      })
      .or()
      .digit()
      .digit()
      .or()
      .digit()
  })
  .group((exp) => {
    exp
      .group((exp) => {
        exp
          .literal("/3")
          .set("0-2")
      })
      .or()
      .group((exp) => {
        exp
          .literal("/")
          .set("12")
          .digit()
      })
      .or()
      .literal("/")
      .digit()
      .or()
      .wordBoundary()
  })
  .stringEnd()
  .done("g")`;
      let actualData = spaceItOut(wordifiedCidrRegex);
      assert.deepEqual(actualData, expectedData, "it should match");
    });
  });
  describe("toString", () => {
    it("should return formatted text from raw regexp", () => {
      let expectedData = `exp\n  .digit()\n  .done("g")`;
      let actualData = toString(/\d/g);
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return correct data"
      );
    });
  });
});
