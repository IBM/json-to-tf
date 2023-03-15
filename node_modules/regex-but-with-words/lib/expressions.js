const { typeCheck, getType } = require("./utils");

/**
 * regex but with words constructor
 * @param {boolean} safariCompatibleMode replace lookbehind with non-capturing group
 */
const regexButWithWords = function (safariCompatibleMode) {
  this.exp = "";

  /**
   * Add a string with an optional range
   * @param {string} str String
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} Word constructor for chaining
   */
  this.quantifiedString = (str, min, max) => {
    if (max !== "*") {
      typeCheck(
        "regexButWithWords token operations expect quantity|min to be",
        "number",
        min || 0
      );
      typeCheck(
        "regexButWithWords token operations expect max to be",
        "number",
        max || 0
      );
    }
    if (max) {
      this.exp += `${str}{${min},${max === "*" ? "" : max}}`; // if max <token> {min, max}
    } else if (min) {
      this.exp += `${str}{${min}}`; // if only min <token>{number}
    } else {
      this.exp += `${str}`; // otherwise only string
    }
    return this;
  };
  /**
   * Chain function for word ( regexp \\w )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.word = (min, max) => {
    return this.quantifiedString("\\w", min, max);
  };

  /**
   * Chain function for literal backslash( regexp \\ )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.backslash = (min, max) => {
    return this.quantifiedString("\\\\", min, max);
  };

  /**
   * Chain function for notWord ( regexp \\W )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.notWord = (min, max) => {
    return this.quantifiedString("\\W", min, max);
  };

  /**
   * Chain function for digit ( regexp \\d )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.digit = (min, max) => {
    return this.quantifiedString("\\d", min, max);
  };

  /**
   * Chain function for notDigit ( regexp \\D )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.notDigit = (min, max) => {
    return this.quantifiedString("\\D", min, max);
  };

  /**
   * Chain function for any ( regexp . )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.any = (min, max) => {
    return this.quantifiedString(".", min, max);
  };

  /**
   * Chain function for whitespace ( regexp \\s )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.whitespace = (min, max) => {
    return this.quantifiedString("\\s", min, max);
  };

  /**
   * Chain function for notWhitespace ( regexp \\S )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.notWhitespace = (min, max) => {
    return this.quantifiedString("\\S", min, max);
  };

  /**
   * Chain function for wordBoundary ( regexp \\b )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.wordBoundary = (min, max) => {
    return this.quantifiedString("\\b", min, max);
  };

  /**
   * Chain function for notWordBoundary ( regexp \\B )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.notWordBoundary = (min, max) => {
    return this.quantifiedString("\\B", min, max);
  };

  /**
   * Chain function for tab ( regexp \\t )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.tab = (min, max) => {
    return this.quantifiedString("\\t", min, max);
  };

  /**
   * Chain function for newline ( regexp \\n )
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.newline = (min, max) => {
    return this.quantifiedString("\\n", min, max);
  };

  /**
   * Chain function for string literal
   * @param {string} str string literal to add
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.literal = (str, min, max) => {
    if (str.length > 1 && min) {
      throw "String literals with a quantifier can only be added with a single character. To add more than one character, use a capturing group or set instead.";
    }
    return this.quantifiedString(this.escapeLiterals(str), min, max);
  };

  /**
   * Chain function for stringBegin ( regexp ^ )
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.stringBegin = () => {
    return this.quantifiedString("^");
  };

  /**
   * Chain function for stringEnd ( regexp $ )
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.stringEnd = () => {
    return this.quantifiedString("$");
  };

  /**
   * Chain function for oneOrMore ( regexp + )
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.oneOrMore = () => {
    return this.quantifiedString("+");
  };

  /**
   * Chain function for anyNumber ( regexp * )
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.anyNumber = () => {
    return this.quantifiedString("*");
  };

  /**
   * Chain function for lazy ( regexp ? )
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.lazy = () => {
    return this.quantifiedString("?");
  };

  /**
   * Chain function for or ( regexp | )
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.or = () => {
    return this.quantifiedString("|");
  };

  /**
   * Escape literal characters
   * @param {string} str String to escape
   * @returns {string} escaped string
   */
  this.escapeLiterals = (str) => {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/\|/g, "\\|") // lookahead and replace tokens not after an escape sequence
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(/\"/g, '\\"')
      .replace(/\$/g, "\\$")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/\./g, "\\.");
  };

  /**
   * Return the regular expression with optional flads
   * @param {string} flags List of flags to add to end of regular expression
   * @returns {RegExp} Regex created with words
   */
  this.done = (flags) => {
    return new RegExp(this.exp, flags);
  };

  /**
   * Create sub expression in a callback function
   * @param {string} open Opening character
   * @param {string} close Closing character
   * @param {subExpressionCallback} callback function
   * @param {Function} checkSubExpression modify subexpression with function
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.subExpression = (
    open,
    close,
    callback,
    checkSubExpression,
    min,
    max
  ) => {
    let quantified =
      min && max
        ? `{${min},${max === "*" ? "" : max}}`
        : min && !max
        ? `{${min}}`
        : "";
    if (getType(callback) === "Function") {
      // if callback is type function
      let subExp = new regexButWithWords(); // create new regex for sub expression
      subExp.exp += open; // Add opening
      callback(subExp); // run callback to get sub expression
      subExp.exp += close; // add closing character
      if (checkSubExpression) {
        // if function is passed
        this.exp += checkSubExpression(subExp.exp); // add result of function to expression
      } else {
        this.exp += subExp.exp; // otherwise add sub expression
      }
      this.exp += quantified;
      return this; // return for callback chain
    } else {
      typeCheck(
        // Check for type string and send back if not
        "subExpression function expect callback to be either type of string or function got",
        "string",
        callback
      );

      // if type is string, add open and close with literals escaped
      this.exp += `${open}${this.escapeLiterals(
        callback
      )}${close}${quantified}`;
      return this;
    }
  };
  /**
   * @callback subExpressionCallback Callback for subexpression
   * @returns {regexButWithWords} regex object
   */

  /**
   * Group together characters for capturing group
   * @param {string} regexGroup String to add inside group
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.group = (regexGroup, min, max) => {
    return this.subExpression("(", ")", regexGroup, false, min, max);
  };

  /**
   * Group together characters for non-capturing group
   * @param {string} regexGroup String to add inside group
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.nonCapturingGroup = (regexGroup, min, max) => {
    return this.subExpression("(?:", ")", regexGroup, false, min, max);
  };

  /**
   * Throw an error if each set is not unique and escape characters that require escaping
   * @param {string} exp string to check
   */
  this.setEscape = (exp) => {
    return exp
      .replace(/\?/g, "\\?") // Escape question marks
      .replace(/](?!$)/g, "\\]") // escape end brackets
      .replace(/^]$/g, "\\]") // replace lonely escape bracket
      .replace(/(?:\b(\^||\\))\[/g, "\\[") // escape open brackets
      .replace(/\B\-/g, "\\-"); // escape hyphens not explicitly in character range
  };

  /**
   * Escape characters in a group
   * @param {string} exp Expression string
   * @returns {string} string with ? immediately following a capture group escaped
   */
  this.escapeGroup = (exp) => {
    return exp.replace(/(?:\(?(=|<=|!|<!))\?/g, "\\?"); // replace ? immediately following a capture group with escaped ?
  };

  /**
   * Match any character from a set
   * @param {string|subExpressionCallback} regexGroup if this group includes whiteSpace, notWhiteSpace, digit, notDigit, word, notWord, tab, or newline characters, use callback. Otherwise provide string
   * @param {boolean=} isNegatedOrMin Is negated set or minimum value if quantified
   * @param {number=} minOrMax min if negated, max if not
   * @param {number=} negatedSetMax max for negated sets
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.set = (regexGroup, isNegatedOrMin, minOrMax, negatedSetMax) => {
    let isNegated = // allow for number to be passed
      typeof isNegatedOrMin === "boolean" ? isNegatedOrMin : false;

    let hasRange = // has passed a quantifier
      typeof isNegatedOrMin === "number" ||
      (isNegatedOrMin === true && typeof minOrMax === "number");
    let quantifierArguments = []; // pass quantified arguments to next component
    let openingGlyph = `[${isNegated ? "^" : ""}`; // [^ if negated [ if not

    // if has range and is negated
    if (hasRange && isNegated) {
      // add min
      quantifierArguments.push(minOrMax);
      // add max if passed
      if (negatedSetMax) {
        quantifierArguments.push(negatedSetMax);
      }
    } else if (hasRange) {
      // add min
      quantifierArguments.push(isNegatedOrMin);
      // add max if passed
      if (minOrMax) {
        quantifierArguments.push(minOrMax);
      }
    }

    if (getType(regexGroup) === "Function") {
      let subExpressionArguments = [
        openingGlyph,
        "]",
        regexGroup,
        this.setEscape,
      ];

      return this.subExpression(
        ...subExpressionArguments.concat(quantifierArguments)
      );
    } else {
      typeCheck(
        // Check for type string and send back if not
        "set and negatedSet function expect callback to be either type of string or function got",
        "string",
        regexGroup
      );
      let quantifiedStringArguments = [
        `${openingGlyph}${this.setEscape(regexGroup)}]`,
      ];

      return this.quantifiedString(
        ...quantifiedStringArguments.concat(quantifierArguments)
      );
    }
  };

  /**
   * Match any character not in the set
   * @param {string|subExpressionCallback} regexGroup if this group includes whiteSpace, notWhiteSpace, digit, notDigit, word, notWord, tab, or newline characters, use callback. Otherwise provide string
   * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
   * @param {number=} max maximum number of tokens to match
   * @returns {regexButWithWords} verbose regex object chain
   */
  this.negatedSet = (regexGroup, min, max) => {
    return this.set(regexGroup, true, min, max);
  };

  this.look = {
    /**
     * Lookahead for characters in group
     * @param {string|subExpressionCallback} regexGroup if this group includes whiteSpace, notWhiteSpace, digit, notDigit, word, notWord, tab, or newline characters, use callback. Otherwise provide string
     * @returns {regexButWithWords} verbose regex object chain
     */
    ahead: (regexGroup, min, max) => {
      return this.subExpression(
        "(?=",
        ")",
        regexGroup,
        this.escapeGroup,
        min,
        max
      );
    },

    /**
     * Lookbehind for characters in group
     * @param {string|subExpressionCallback} regexGroup if this group includes whiteSpace, notWhiteSpace, digit, notDigit, word, notWord, tab, or newline characters, use callback. Otherwise provide string
     * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
     * @param {number=} max maximum number of tokens to match
     * @returns {regexButWithWords} verbose regex object chain
     */
    behind: (regexGroup, min, max) => {
      return this.subExpression(
        "(?:",
        ")",
        regexGroup,
        this.escapeGroup,
        min,
        max
      );
    },
  };

  this.negativeLook = {
    /**
     * lookahead for not characters in group
     * @param {string|subExpressionCallback} regexGroup if this group includes whiteSpace, notWhiteSpace, digit, notDigit, word, notWord, tab, or newline characters, use callback. Otherwise provide string
     * @param {number=} min | quanitity - Number of preceding character to match or minimum number with max
     * @param {number=} max maximum number of tokens to match
     * @returns {regexButWithWords} verbose regex object chain
     */
    ahead: (regexGroup, min, max) => {
      return this.subExpression(
        "(?!",
        ")",
        regexGroup,
        this.escapeGroup,
        min,
        max
      );
    },
    /**
     * Lookbehind for not characters in group commented out as a fix
     * for web use with safari and firefox. Most lookbehind operations
     * should be able to use non-capturing group, now stored at look.behind
     * @param {string|subExpressionCallback} regexGroup if this group includes whiteSpace, notWhiteSpace, digit, notDigit, word, notWord, tab, or newline characters, use callback. Otherwise provide string
     * @returns {regexButWithWords} verbose regex object chain
     */
    // behind: (regexGroup) => {
    //   return this.subExpression("(?<!", ")", regexGroup, this.escapeGroup);
    // },
  };
};

module.exports = regexButWithWords;
