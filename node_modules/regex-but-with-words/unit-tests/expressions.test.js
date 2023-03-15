const { assert } = require("chai");
const regexButWithWords = require("../lib/expressions.js");

let exp;

describe("regexButWithWords", () => {
  describe("Basic String Functions", () => {
    describe("quantifiedString", () => {
      beforeEach(() => {
        exp = new regexButWithWords();
      });
      it("should add string to expression with only string params", () => {
        let actualData = exp.quantifiedString("\\s").exp;
        let expectedData = "\\s";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
      it("should add string to expression with quanitifier", () => {
        let actualData = exp.quantifiedString("\\s", 3).exp;
        let expectedData = "\\s{3}";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
      it("should add string to expression with range", () => {
        let actualData = exp.quantifiedString("\\s", 3, 4).exp;
        let expectedData = "\\s{3,4}";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
      it("should add string to expression with range using *", () => {
        let actualData = exp.quantifiedString("\\s", 3, "*").exp;
        let expectedData = "\\s{3,}";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });
    beforeEach(() => {
      exp = new regexButWithWords();
    });

    describe("word", () => {
      it("should add word to expression", () => {
        let actualData = exp.word().exp;
        let expectedData = "\\w";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("backslash", () => {
      it("should add word to expression", () => {
        let actualData = exp.backslash().exp;
        let expectedData = "\\\\";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("notWord", () => {
      it("should add notWord to expression", () => {
        let actualData = exp.notWord().exp;
        let expectedData = "\\W";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });
    describe("digit", () => {
      it("should add digit to expression", () => {
        let actualData = exp.digit().exp;
        let expectedData = "\\d";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("notDigit", () => {
      it("should add notDigit to expression", () => {
        let actualData = exp.notDigit().exp;
        let expectedData = "\\D";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("any", () => {
      it("should add any to expression", () => {
        let actualData = exp.any().exp;
        let expectedData = ".";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("whitespace", () => {
      it("should add whitespace to expression", () => {
        let actualData = exp.whitespace().exp;
        let expectedData = "\\s";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("notWhitespace", () => {
      it("should add notWhitespace to expression", () => {
        let actualData = exp.notWhitespace().exp;
        let expectedData = "\\S";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });
    describe("notWordBoundary", () => {
      it("should add notWordBoundary to expression", () => {
        let actualData = exp.notWordBoundary().exp;
        let expectedData = "\\B";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("wordBoundary", () => {
      it("should add wordBoundary to expression", () => {
        let actualData = exp.wordBoundary().exp;
        let expectedData = "\\b";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("tab", () => {
      it("should add tab to expression", () => {
        let actualData = exp.tab().exp;
        let expectedData = "\\t";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("newline", () => {
      it("should add newline to expression", () => {
        let actualData = exp.newline().exp;
        let expectedData = "\\n";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("literal", () => {
      it("should add literal to expression", () => {
        let actualData = exp.literal("m", 1).exp;
        let expectedData = "m{1}";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
      it("throw if a literal with more than one character is quantified", () => {
        let task = () => exp.literal("no", 1);
        assert.throws(
          task,
          "String literals with a quantifier can only be added with a single character. To add more than one character, use a capturing group or set instead."
        );
      });
    });

    describe("done", () => {
      it("should return regex with flags", () => {
        let actualData = exp.digit().done("g");
        let expectedData = /\d/g;
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct expression"
        );
      });
    });
    describe("stringBegin", () => {
      it("should add tab to expression", () => {
        let actualData = exp.stringBegin().exp;
        let expectedData = "^";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("stringEnd", () => {
      it("should add tab to expression", () => {
        let actualData = exp.stringEnd().exp;
        let expectedData = "$";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("oneOrMore", () => {
      it("should add tab to expression", () => {
        let actualData = exp.oneOrMore().exp;
        let expectedData = "+";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("anyNumber", () => {
      it("should add tab to expression", () => {
        let actualData = exp.anyNumber().exp;
        let expectedData = "*";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("lazy", () => {
      it("should add tab to expression", () => {
        let actualData = exp.lazy().exp;
        let expectedData = "?";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });

    describe("or", () => {
      it("should add tab to expression", () => {
        let actualData = exp.or().exp;
        let expectedData = "|";
        assert.deepEqual(
          actualData,
          expectedData,
          "it should return correct data and chain"
        );
      });
    });
  });
  describe("Group Functions", () => {
    beforeEach(() => {
      exp = new regexButWithWords();
    });
    describe("group", () => {
      it("should return a group", () => {
        let actualData = exp
          .group((exp) => {
            exp.literal("word");
          })
          .done("g");
        let expectedData = /(word)/g;
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified group", () => {
        let actualData = exp
          .group((exp) => {
            exp.literal("word");
          }, 3)
          .done("g");
        let expectedData = /(word){3}/g;
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified group with min and max", () => {
        let actualData = exp
          .group(
            (exp) => {
              exp.literal("word");
            },
            3,
            4
          )
          .done("g");
        let expectedData = /(word){3,4}/g;
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a capturing group within a capturing group", () => {
        let expectedData = /(dr(i|a)nk)/g;
        let actualData = exp
          .group((exp) => {
            exp
              .literal("dr")
              .group((exp) => {
                exp.literal("i").or().literal("a");
              })
              .literal("nk");
          })
          .done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a capturing group within a capturing group with a set", () => {
        let expectedData = /(dr(i|[ua])nk)/g;
        let actualData = exp
          .group((exp) => {
            exp
              .literal("dr")
              .group((exp) => {
                exp.literal("i").or().set("ua");
              })
              .literal("nk");
          })
          .done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
    });
    describe("nonCapturingGroup", () => {
      it("should return a nonCapturingGroup", () => {
        let actualData = exp
          .nonCapturingGroup((exp) => {
            exp.literal("word");
          })
          .done("g");
        let expectedData = /(?:word)/g;
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
    });
    describe("set", () => {
      it("should return a set with callback", () => {
        let expectedData = /[\s\n]/g;
        let actualData = exp
          .set((exp) => {
            exp.whitespace().newline();
          })
          .done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a correct range", () => {
        let expectedData = /[1-5]/g;
        let actualData = exp.set("1-5").done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified set", () => {
        let expectedData = /[1-5]{1,5}/g;
        let actualData = exp.set("1-5", 1, 5).done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified set with no max", () => {
        let expectedData = /[1-5]{1}/g;
        let actualData = exp.set("1-5", 1).done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
    });
    describe("negatedSet", () => {
      beforeEach(() => {
        exp = new regexButWithWords();
      });
      it("should return a set with callback", () => {
        let expectedData = /[^\s\n]/g;
        let actualData = exp
          .negatedSet((exp) => {
            exp.whitespace().newline();
          })
          .done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a set without callback", () => {
        let expectedData = /[^mp]/g;
        let actualData = exp.negatedSet("mp").done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a negated character set and escape characters", () => {
        let expectedData = /[^\]\?\-word]/g;
        let actualData = exp.negatedSet("]?-word").done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a negated character set with only a single escaped character", () => {
        let expectedData = /[^\]]/g;
        let actualData = exp.negatedSet("]").done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a negated character set and escape characters", () => {
        let expectedData = /[^A-z-]/g;
        let actualData = exp.negatedSet("A-z-").done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified negated set", () => {
        let expectedData = /[^1-5]{1,5}/g;
        let actualData = exp.negatedSet("1-5", 1, 5).done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified negated set with no max", () => {
        let expectedData = /[^1-5]{1}/g;
        let actualData = exp.negatedSet("1-5", 1).done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
      it("should return a quantified negated set with callback", () => {
        let expectedData = /[^1-5]{1,5}/g;
        let actualData = exp
          .negatedSet(
            (exp) => {
              exp.literal("1-5");
            },
            1,
            5
          )
          .done("g");
        assert.deepEqual(actualData, expectedData, "it should return data");
      });
    });
    describe("Look Ahead / Behind", () => {
      describe("look", () => {
        beforeEach(() => (exp = new regexButWithWords()));
        describe("ahead", () => {
          it("should return a look.ahead", () => {
            let expectedData = /frog(?=mite)/g;
            let actualData = exp
              .literal("frog")
              .look.ahead((exp) => {
                exp.literal("mite");
              })
              .done("g");
            assert.deepEqual(actualData, expectedData, "it should return data");
          });
        });
        describe("behind", () => {
          it("should return a look.behind", () => {
            let expectedData = /(?:mite)frog/g;
            let actualData = exp.look
              .behind((exp) => {
                exp.literal("mite");
              })
              .literal("frog")
              .done("g");
            assert.deepEqual(actualData, expectedData, "it should return data");
          });
        });
      });
      describe("negativeLook", () => {
        beforeEach(() => (exp = new regexButWithWords()));
        describe("ahead", () => {
          it("should return a negative lookahead", () => {
            let expectedData = /frog(?!mite)/g;
            let actualData = exp
              .literal("frog")
              .negativeLook.ahead((exp) => {
                exp.literal("mite");
              })
              .done("g");
            assert.deepEqual(actualData, expectedData, "it should return data");
          });
        });
      });
    });
  });
  describe("Assorted Test Cases", () => {
    beforeEach(() => (exp = new regexButWithWords()));
    it("should match character before dollar sign", () => {
      let expectedData = /.*(?=\$)/g;
      let actualData = exp
        .any()
        .anyNumber()
        .look.ahead((exp) => exp.literal("$"))
        .done("g");
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
  });
});
