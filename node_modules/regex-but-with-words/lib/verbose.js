const { containsKeys, contains, textTemplate } = require("./utils");
const functonTemplate = new textTemplate(
  `.$METHOD((exp) => { $CHAIN }$QUANTIFIER)`
);
const regexButWithWords = require("./expressions");

const verbose = function () {
  // List of direct conversions
  this.regexTokenFunctions = {
    "\\d": "digit",
    "\\D": "notDigit",
    ".": "any",
    "\\s": "whitespace",
    "\\S": "notWhitespace",
    "\\n": "newline",
    "\\t": "tab",
    "\\w": "word",
    "\\W": "notWord",
    "\\b": "wordBoundary",
    "\\B": "notWordBoundary",
    "?": "lazy",
    "*": "anyNumber",
    "|": "or",
    "+": "oneOrMore",
    $: "stringEnd",
    "^": "stringBegin",
    "\\n": "newline",
    "\\t": "tab",
    "?:" : "nonCapturingGroup"
  };

  /**
   * Get a range after a token
   * @param {Array<string>} arr Array from which to get range
   * @returns {string} Range as function parameters
   */
  this.getRange = (arr) => {
    let addRange = ""; // range to add
    if (arr[0] === "{") {
      // If the first element is a non-escaped {
      arr.shift(); // shift off
      while (arr[0] !== "}") {
        // Add characters until end token
        addRange += arr.shift();
      }
      // remove end token
      arr.shift();
    }
    // Return range split with ", "
    return addRange.split(",").join(", ");
  };

  this.getNextChar = (splitSource) => {
    let nextChar = splitSource.shift();
    if (nextChar === "\\") nextChar += splitSource.shift();
    return nextChar;
  };

  /**
   * Handles the parsing of regular expression string literals
   * @param {str} nextStr String to parse
   * @param {Array<string>} splitSource Regex source list
   * @returns {string} parsed string literall
   */
  this.handleStringLiteral = (nextStr, splitSource) => {
    let literal = `.literal("${nextStr.replace(/\\(?!(\(|\\))/g, "")}`; // Initialize function with unmatching escaped characters replaced
    let literallyFinished = false; // Is finished
    if (splitSource[0] === "{") {
      // If the literal has a range, return the range as params
      literal += '", ' + this.getRange(splitSource);
    } else {
      while (
        splitSource.length > 0 && // still tokens
        !containsKeys(this.regexTokenFunctions, splitSource[0]) && // is not a token function
        !literallyFinished // and is not finished
      ) {
        if (
          (splitSource.length > 1 && splitSource[1] === "{") || // if range is next
          contains(["[", "("], splitSource[0]) || // if set or group is next
          (splitSource[1] === "?" && splitSource[0] !== "\\") || // if next char is lazy
          containsKeys(
            // if the next two characters are a valid escape sequence
            this.regexTokenFunctions,
            splitSource[0] + splitSource[1]
          )
        ) {
          // finished is true if split source has more than one value and the first one is a range
          literallyFinished = true;
        } else {
          // Otherwise add next character and remove escaped characters that are not strings
          let nextCharacter = this.getNextChar(splitSource);
          literal += nextCharacter.replace(/\\(?!["`'])/g, "");
        }
      }
      literal += `"`; // add close quote
    }
    return literal
      .replace(/\\/g, "\\\\")
      .replace(/\("/g, "\\(%%%") // temporarily replace (" sequence
      .replace(/"(?=[^"]*\")/g, '\\"') // escape quotes followed by a quote
      .replace(/"""/g, '"\\""')
      .replace(/\\\(%%%/g, '("'); // add back in ("
  };

  /**
   * Handle the creation of groups within exp
   * @param {str} openGlyph Opening of group
   * @param {Array<string>} splitSource split regex source
   * @returns {string} Formatted group
   */
  this.handleGroup = (openGlyph, splitSource) => {
    let chainArr = [], // Array to use as chain
      unclosedSubGroups = 0, // number of unclose subgroups
      done = false, // if all groups have been found
      methodMap = {
        // Map of group method to opener
        "(": "group",
        "(?=": "look.ahead",
        "(?!": "negativeLook.ahead",
        "(?<=": "look.behind",
        "(?<!": "negativeLook.behind",
        "(?:": "nonCapturingGroup",
      };
    let openGlyphPlusEqual = () => {
      openGlyph += this.getNextChar(splitSource);
    };
    // If the next character is a lookaround sequence, add ?
    if (splitSource[0] === "?") openGlyphPlusEqual();
    // Add one character if it is a lookahead
    if (splitSource[0] === "=" || splitSource[0] === "!") {
      openGlyphPlusEqual();
    } else if (splitSource[0] === ":") {
      // Add colon character if it is lookbehind
      openGlyphPlusEqual();
    }
    // While not done with group
    do {
      let nextChar = this.getNextChar(splitSource); // get next
      // if next character is ( add one to unclosed groups
      // if next char is ) and there are unclosed groups, subtract one
      if (nextChar === "(") {
        unclosedSubGroups++;
      } else if (nextChar === ")" && unclosedSubGroups > 0) {
        unclosedSubGroups--;
      }
      // Add result to chain
      chainArr.push(nextChar);
      // if the next character is a ) and 0 unclosed groups, done
      if (splitSource[0] === ")" && unclosedSubGroups === 0) done = true;
    } while (!done);
    // Recursively run wordify on chain characters
    let chainExpression = this.wordify(new RegExp(chainArr.join("")), true);
    let quantifier = "";
    splitSource.shift(); // Remove close
    // if the rest of the string matches a quantity
    if (splitSource.join("").match(/^\{\d(,\d)?}/g)) {
      quantifier = ", "; // add space and comma
      // while there are still characters
      while (splitSource[0] !== "}") {
        // get next char
        let nextChar = this.getNextChar(splitSource);
        // if the character isn't a brace
        if (!contains(["{", "}"], nextChar)) {
          quantifier += nextChar; // add to quantifier
          // add space following comma
          if (nextChar === ",") quantifier += " ";
        }
      }
      splitSource.shift(); // remove closing quantifier
    }
    return functonTemplate
      .clone()
      .fill(methodMap[openGlyph], chainExpression, quantifier); // fill template with values
  };

  /**
   * Create a set from regular expression
   * @param {Array<string>} splitSource  splitSource Regex source list
   * @returns {string} set string
   */
  this.handleSet = (splitSource) => {
    let setList = [], // list to return
      functionNeeded = false; // Needs a function inside set
    isNegated = splitSource[0] === "^"; // if next character is carrot, negated set
    if (isNegated) {
      splitSource.shift();
    }
    setList.push(`.${isNegated ? `negatedSet` : `set`}("`);
    // While next character is not close set add next character
    while (splitSource[0] !== "]") {
      let nextChar = this.getNextChar(splitSource);
      if (splitSource[1] !== "]" && nextChar === '"') {
        setList.push("\\");
      }
      setList.push(nextChar);
    }
    // Remove closing bracket
    splitSource.shift();
    ["\\s", "\\S", "\\d", "\\D", "\\w", "\\W", "\\t", "\\n"].forEach(
      (glyph) => {
        if (contains(setList, glyph)) functionNeeded = true;
      }
    );
    if (functionNeeded) {
      // If a functions is needed, create a new function template and wordify setlist
      let listFn = functonTemplate.clone(),
        setListRegexp = new RegExp(setList.join("").replace(/\.\w+\("/g, "")); // join setlist and replace declaration at beginning
      return listFn.fill("set", this.wordify(setListRegexp, true), "");
    } else {
      return `${setList
        .join("")
        .replace(/\\(?!")/g, "") // replace escapes in front of characters that are not quotes
        .replace(/(?:[^\(])\"/g, '\\"')}")`; // replace contained quotes with escaped ones
    }
  };

  /**
   * Change regular expression into regular expression but with words
   * @param {RegExp} regexp Regular expression
   * @param {boolean=} subexp is a subexpression from a regular expression prevents returning `done()`
   * @returns {string} Stringified regexp but with words
   */
  this.wordify = (regexp, subexp) => {
    let sourceString = regexp.source, // Regex source between / and /
      nextStr, // Next string to evaluate from regex
      wordString = "exp", // return text, starts with `exp`
      expArr = []; // expression array
    if (
      sourceString.indexOf("(?<=") !== -1 ||
      sourceString.indexOf("(?<!") !== -1
    )
      throw new Error(
        "To maintain browser compatability with safari and firefox negative lookbehind and lookbehind are not supported. Try using a non-capturing group (?:) instead."
      );
    let splitSource = sourceString.split(""); // regex source split into individual characters

    // While there are still characters
    while (splitSource.length > 0) {
      nextStr = this.getNextChar(splitSource); // Get next character
      let pushStr;
      if (containsKeys(this.regexTokenFunctions, nextStr)) {
        // if is escape character return name in range
        let hasRange = this.getRange(splitSource);
        let tokenStr = `.${this.regexTokenFunctions[nextStr]}(${hasRange})`;
        pushStr = tokenStr; // Set string to push as token string
      } else if (nextStr === "(") {
        pushStr = this.handleGroup(nextStr, splitSource); // add group
      } else if (nextStr === "[") {
        pushStr = this.handleSet(splitSource); // add sets
      } else if (nextStr === "\\\\") {
        pushStr = `.backslash()`;
      } else {
        // otherwise use string literal
        pushStr = `${this.handleStringLiteral(nextStr, splitSource)})`;
      }
      expArr.push(pushStr);
    }
    // add expression arr to wordstring. if not sub expression, add done
    wordString += expArr.join("") + (subexp ? "" : `.done("${regexp.flags}")`);
    return wordString; // return string
  };

  /**
   * Space out regexButWithWords outputs
   * @param {string} str stringified function calls
   * @returns {string} spaced out string
   */
  this.spaceItOut = function (str) {
    let splitExp = new regexButWithWords()
      .literal(".")
      .look.ahead((exp) => {
        exp.word().oneOrMore().literal("("); // function declaration .
      })
      .or()
      .whitespace()
      .look.ahead((exp) => exp.literal("exp"))
      .or()
      .whitespace()
      .look.ahead((exp) => exp.literal("}"))
      .done("g");
    let splitStr = str.split(splitExp);
    let spaceCount = 2; // number of spaces to indend
    let returnString = splitStr.shift(); // shift first string exp to start return string
    /**
     * Add spaces
     * @param {number} count number of spaces
     * @returns {string} string with number of spaces added
     */
    function spacer(count) {
      let spaces = "";
      while (spaces.length < count) {
        spaces += " ";
      }
      return spaces;
    }

    // while still strings
    while (splitStr.length > 0) {
      let isExp = splitStr[0] === "exp"; // is expression if starts with `exp`
      let isClose = splitStr[0] === "})"; // is close if end of function
      let isQuantifiedGroup = splitStr[0].match(/},\s\d*,?\d*\)/);
      if (isClose || isQuantifiedGroup) spaceCount -= 4; // subtract 4 if close
      if (isExp) spaceCount += 2; // add two spaces is is expression
      returnString +=
        "\n" + // add newline to return string
        spacer(spaceCount) + // add spaces
        (isExp || isClose || isQuantifiedGroup ? "" : ".") + // if is expression or is closed, add "" otherwise add . to chain
        splitStr.shift(); // shift off last element
      if (isExp) spaceCount += 2; // add two spaces number if expression
    }
    return returnString; // return string
  };

  this.toString = (regexp) => {
    return this.spaceItOut(this.wordify(regexp));
  };
};

module.exports = new verbose();
