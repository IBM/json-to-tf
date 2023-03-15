const RegexButWithWords = require("./expressions");

// remove all whitespace
const allWhitespaceExp = new RegexButWithWords()
  .whitespace()
  .anyNumber()
  .done("g");

// remove all functions with quantifiers
const minMaxFunctionsExp = new RegexButWithWords()
  .literal(".")
  .group((exp) => {
    exp
      .literal("digit")
      .or()
      .literal("word")
      .or()
      .literal("backslash")
      .or()
      .literal("notWord")
      .or()
      .literal("notDigit")
      .or()
      .literal("any")
      .or()
      .literal("whitespace")
      .or()
      .literal("notWhitespace")
      .or()
      .literal("wordBoundary")
      .or()
      .literal("notWordBoundary")
      .or()
      .literal("tab")
      .or()
      .literal("newLine")
      .or()
      .literal("set")
      .or()
      .literal("negatedSet")
      .or()
      .literal("group");
  })
  .literal("(")
  .group((exp) => {
    exp.digit().or().digit().literal(",").digit();
  })
  .lazy()
  .literal(")")
  .done("g");

// methods with no params
const noParamFunctionsExp = new RegexButWithWords()
  .literal(".")
  .group((exp) => {
    exp
      .literal("stringBegin")
      .or()
      .literal("stringEnd")
      .or()
      .literal("oneOrMore")
      .or()
      .literal("anyNumber")
      .or()
      .literal("lazy")
      .or()
      .literal("or");
  })
  .literal("()")
  .done("g");

// literals
const literalsExp = new RegexButWithWords()
  .literal(".literal(")
  .group((exp) => {
    exp
      .group((exp) => {
        exp.literal("`").negatedSet("`").anyNumber().literal("`");
      })
      .or()
      .group((exp) => {
        exp.literal("'").negatedSet("'").anyNumber().literal("'");
      })
      .or()
      .group((exp) => {
        exp.literal('"').negatedSet('"').anyNumber().literal('"');
      })
      .group((exp) => {
        exp.literal(",").digit().or().literal(",").digit().literal(",").digit();
      })
      .lazy();
  })
  .literal(")")
  .done("g");

// done expressions
const doneExp = new RegexButWithWords()
  .literal(".done(")
  .group((exp) => {
    exp
      .group((exp) => {
        exp.literal("`").set("a-z").anyNumber().literal("`");
      })
      .or()
      .group((exp) => {
        exp.literal("'").set("a-z").anyNumber().literal("'");
      })
      .or()
      .group((exp) => {
        exp.literal('"').set("a-z").anyNumber().literal('"');
      });
  })
  .literal(")")
  .done("g");

// sets with no callbacks
const noCallbackSetsExp = new RegexButWithWords()
  .literal(".")
  .group((exp) => exp.literal("set").or().literal("negatedSet"))
  .literal("(")
  .group((exp) => {
    exp
      .group((exp) => {
        exp.literal("`").negatedSet("`").anyNumber().literal("`");
      })
      .or()
      .group((exp) => {
        exp.literal("'").negatedSet("'").anyNumber().literal("'");
      })
      .or()
      .group((exp) => {
        exp.literal('"').negatedSet('"').anyNumber().literal('"');
      });
  })
  .literal(")")
  .done("g");

// all other legal expressions
const everythingElseExp = new RegexButWithWords()
  .set("()}{")
  .or()
  .literal("exp")
  .or()
  .literal(".set")
  .or()
  .literal(".negatedSet")
  .or()
  .literal(".group")
  .or()
  .group((exp) => {
    exp.literal(".look").group((exp) => {
      exp.literal(".ahead").or(".behind");
    });
  })
  .or()
  .literal("=>")
  .or()
  .group((exp) => {
    exp.literal(",").digit();
  })
  .or()
  .literal(";")
  .done("g");

// replacement order
const expFunctions = [
  allWhitespaceExp,
  minMaxFunctionsExp,
  literalsExp,
  noParamFunctionsExp,
  doneExp,
  noCallbackSetsExp,
  everythingElseExp,
];

/**
 * check to make sure only valid operators are part of text
 * @param {string} rawText arbitrary text
 */
function sanitize(rawText) {
  let newText = String(rawText);
  expFunctions.forEach((exp) => {
    newText = newText.replace(exp, "");
  });
  return newText;
}

/**
 * test to see if arbitrary text matches empty string
 * @param {string} text
 * @returns {boolean} true if empty
 * @throws {Error} throws error if invalid
 */
function isSane(text) {
  let sanitizedText = sanitize(text);
  if (sanitizedText === "") {
    return true;
  } else {
    let badComponents = sanitizedText.replace(/^\./i, "").split(".");
    throw new Error(
      "Invalid RegexBitWithWords methods: " + JSON.stringify(badComponents)
    );
  }
}

module.exports = {
  sanitize,
  isSane,
};
