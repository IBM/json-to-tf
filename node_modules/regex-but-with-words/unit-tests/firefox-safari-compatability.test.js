const { assert } = require("chai");
const RegexButWithWords = require("../lib/expressions.js");
const { wordify } = require("../lib/verbose");
const MethodObject = new RegexButWithWords();

describe("firefox and safari compatability testing", () => {
  describe("escapeLiterals", () => {
    let escapeLiterals = MethodObject.escapeLiterals;
    it("should replace a pipe character not following an escape sequence", () => {
      let stringLiteral = "frog|mite";
      let expectedData = "frog\\|mite";
      assert.deepEqual(
        escapeLiterals(stringLiteral),
        expectedData,
        "it should replace the sequence"
      );
    });
  });
  describe("expressions", () => {
    it("should create ^[a-zA-Z0-9-.,_s]*$ using rbbw", () => {
      let expectedExpression = /^[a-zA-Z0-9-.,_\s]*$/g;
      let actualExpression = new RegexButWithWords()
        .stringBegin()
        .set("a-zA-Z0-9-.,_\\s")
        .anyNumber()
        .stringEnd()
        .done("g");
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
    });
    it("should create expression for maskFields with rbbw", () => {
      let expectedExpression =
        /(?:(public_key|tmos_admin_password)\"\s?:\s?\")[^"]+(?=\")/g;
      let actualExpression = new RegexButWithWords().look
        .behind((exp) =>
          exp
            .group((exp) =>
              exp.literal("public_key").or().literal("tmos_admin_password")
            )
            .literal('"')
            .whitespace()
            .lazy()
            .literal(":")
            .whitespace()
            .lazy()
            .literal('"')
        )
        .negatedSet('"')
        .oneOrMore()
        .look.ahead('"')
        .done("g");
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
    });
    it("should create the name validation expression for slz", () => {
      let expectedExpression = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
      let actualExpression = new RegexButWithWords()
        .stringBegin()
        .set("A-z")
        .group((exp) => {
          exp.set("a-z0-9-").anyNumber().set("a-z0-9");
        })
        .lazy()
        .stringEnd()
        .done("i");
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
    });
    it("should create rbbw for quotes around string snad escaped slashes", () => {
      let actualExpression = new RegexButWithWords().look
        .behind((exp) => {
          exp.whitespace();
        })
        .literal('"')
        .look.ahead((exp) => {
          exp.word();
        })
        .or()
        .look.behind((exp) => {
          exp.word().or().digit().or().literal("]");
        })
        .literal('"')
        .look.ahead((exp) => {
          exp.newline();
        })
        .or()
        .group((exp) => {
          exp.literal("\\", 4);
        })
        .or()
        .look.behind((exp) => exp.literal("-").whitespace())
        .literal('"')
        .done("g");
      let expectedExpression =
        /(?:\s)\"(?=\w)|(?:\w|\d|\])\"(?=\n)|(\\{4})|(?:-\s)\"/g;
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
    });
    it("should create rbbw for quantified negated set with * as max", () => {
      let actualExpression = new RegexButWithWords()
        .group((exp) => {
          exp.literal("ftp").or().literal("http").literal("s").lazy();
        })
        .literal("://")
        .group("www.")
        .lazy()
        .group(
          (exp) => {
            exp.negatedSet('"\\/').oneOrMore().literal(".");
          },
          2,
          "*"
        )
        .negatedSet('"\\/.')
        .oneOrMore()
        .literal("/")
        .negatedSet(' "')
        .anyNumber()
        .stringEnd()
        .done("g");
      let expectedExpression =
        /(ftp|https?):\/\/(www\.)?([^"\/]+\.){2,}[^"\/.]+\/[^ "]*$/g;
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should return expected expression"
      );
    });
  });
  describe("verbose", () => {
    function doubleCheckExpression(actualExpression) {
      return eval(`let exp = new RegexButWithWords();\n` + actualExpression);
    }
    it("should create match paragraph expression with wordify", () => {
      let expectedExpression = wordify(/^[a-zA-Z0-9-\.,_\s]*$/g);
      let actualExpression = `exp.stringBegin().set((exp) => { exp.literal("a-zA-Z0-9-.,_").whitespace() }).anyNumber().stringEnd().done("g")`;
      let runRbbwExp = doubleCheckExpression(actualExpression);
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
      assert.deepEqual(
        runRbbwExp,
        /^[a-zA-Z0-9-\.,_\s]*$/g,
        "it should create correct expression"
      );
    });
    it("should create expression for maskFields with wordify", () => {
      let actualExpression = wordify(
        /(?:(public_key|tmos_admin_password)\"\s?:\s?\")[^"]+(?=\")/g
      );
      let expectedExpression = `exp.nonCapturingGroup((exp) => { exp.group((exp) => { exp.literal("public_key").or().literal("tmos_admin_password") }).literal("\\"").whitespace().lazy().literal(":").whitespace().lazy().literal("\\"") }).negatedSet("\\"").oneOrMore().look.ahead((exp) => { exp.literal("\\"") }).done("g")`;
      let runRbbwExp = doubleCheckExpression(actualExpression);
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
      assert.deepEqual(
        runRbbwExp,
        /(?:(public_key|tmos_admin_password)\"\s?:\s?\")[^"]+(?=\")/g,
        "it should create correct expression"
      );
    });
    it("should create the correct expression for slz urlValidationExp", () => {
      let actualExpression = wordify(
        /(ftp|http|https):\/\/(www\.)?([^"/-]\.){2,4}\/[^ "]$/g
      );
      let runRbbwExp = doubleCheckExpression(actualExpression);
      let expectedExpression = `exp.group((exp) => { exp.literal("ftp").or().literal("http").or().literal("https") }).literal("://").group((exp) => { exp.literal("www.") }).lazy().group((exp) => { exp.negatedSet("\\"/-").literal(".") }, 2, 4).literal("/").negatedSet(" \\"").stringEnd().done("g")`;
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
      assert.deepEqual(
        runRbbwExp,
        /(ftp|http|https):\/\/(www\.)?([^"/\-]\.){2,4}\/[^ "]$/g,
        "it should create correct expression"
      );
    });
    it("should create the name validation expression for slz with wordify", () => {
      let expectedExpression = wordify(/^[A-z]([a-z0-9-]*[a-z0-9])?$/i);
      let actualExpression =
        'exp.stringBegin().set("A-z").group((exp) => { exp.set("a-z0-9-").anyNumber().set("a-z0-9") }).lazy().stringEnd().done("i")';
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
    });
    it("should create rbbw for quotes around strings and escaped slashes with wordify", () => {
      let actualExpression = new RegexButWithWords().look
        .behind((exp) => {
          exp.whitespace();
        })
        .literal('"')
        .look.ahead((exp) => {
          exp.word();
        })
        .or()
        .look.behind((exp) => {
          exp.word().or().digit().or().literal("]");
        })
        .literal('"')
        .look.ahead((exp) => {
          exp.newline();
        })
        .or()
        .group((exp) => {
          exp.literal("\\", 4);
        })
        .or()
        .look.behind((exp) => exp.literal("-").whitespace())
        .literal('"')
        .done("g");
      let expectedExpression =
        /(?:\s)\"(?=\w)|(?:\w|\d|\])\"(?=\n)|(\\{4})|(?:-\s)\"/g;
      assert.deepEqual(
        actualExpression,
        expectedExpression,
        "it should create correct expression"
      );
    });
  });
});
