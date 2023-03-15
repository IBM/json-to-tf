const { assert } = require("chai");
const { sanitize, isSane } = require("../lib/sanitize");
describe("sanitize", () => {
  it("should sanitize text", () => {
    let testData = `exp
.stringBegin()
.group((exp) => {
  exp
    .group((exp) => {
      exp
        .group((exp) => {
          exp
            .literal('literal')
            .set("1-5")
            .digit()
        })
        .or()
        .group((exp) => {
          exp
            .literal(\`"1\`)
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
    let actualData = sanitize(testData);
    assert.deepEqual(actualData, "", "it should return empty string");
  });
  describe("isSane", () => {
    it("should return true if text can be sanitized", () => {
      let testData = `exp
        .group((exp) => {
          exp.literal("\`").set("a-z").anyNumber().literal("\`");
        })
        .or()
        .group((exp) => {
          exp.literal("'").set("a-z").anyNumber().literal("'");
        })
        .or()
        .group((exp) => {
          exp.literal('"').set("a-z").anyNumber().literal('"');
        }).done("g")`;
      assert.isTrue(isSane(testData), "it should be true");
    });
    it("should return false if text can not be sanitized", () => {
      let testData = `exp
          .group((exp) => {
            exp.literal("\`").set("a-z").anyNumber().literal("\`");
          })
          .or().frog().dog()
          .group((exp) => {
            exp.literal("'").set("a-z").anyNumber().literal("'");
          })
          .or()
          .group((exp) => {
            exp.literal('"').todd().set("a-z").anyNumber().literal('"');
          }).done("g").tonyHawk()`;
      let task = () => isSane(testData);
      assert.throws(
        task,
        'Invalid RegexBitWithWords methods: ["frog","dog","todd","tonyHawk"]'
      );
    });
  });
});
