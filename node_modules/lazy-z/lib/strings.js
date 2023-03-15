const { paramTest, getType, containsAny } = require("./values");
const { eachKey, prettyJSON } = require("./shortcuts");

/**
 * Capitalize the first letter of a string
 * @param {string} str String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
  paramTest("capitalize", "str", "string", str);
  let splitStr = str.split("");
  splitStr[0] = splitStr[0].toUpperCase();
  return splitStr.join("");
}

/**
 * Get the length of the longest key from an object
 * @param {Object} obj arbitrary object
 * @returns {number} integer length of the longest key in the object
 */
function getLongestKey(obj) {
  paramTest("getLongestKey", "obj", "object", obj);
  let longest = 0;
  eachKey(obj, (key) => {
    if (key.length > longest) longest = key.length;
  });
  return longest;
}

/**
 * Match the length of a string to a number by appending spaces
 * @param {string} str string
 * @param {number} count number to match
 * @returns {string} string with added spaces
 */
function matchLength(str, count) {
  paramTest("matchLength", "str", "string", str, "count", "number", count);
  while (str.length < count) {
    str = str + " ";
  }
  return str;
}

/**
 * Remove trailing spaces from the end of a string
 * @param {string} str The string to have spaces removed from
 * @returns {string} The string with no trailing spaces
 */
function removeTrailingSpaces(str) {
  paramTest("removeTrailingSpaces", "str", "string", str);
  let splitStr = str.split("");
  while (splitStr[splitStr.length - 1] === " ") {
    splitStr.pop();
  }
  return splitStr.join("");
}

/**
 * Create a string from any data type
 * @param {*} data data
 * @returns {string} data coverted to string
 */
function stringify(data) {
  let dataType = getType(data);
  if (dataType === "Function") return data.toString();
  if (dataType === "Array" || dataType === "object") return prettyJSON(data);
  else return `${data}`;
}

/**
 * change name from All Caps With Spaces to all-caps-with-spaces
 * @param {string} str name
 * @returns {string} empty string if not found, composed string otherwise
 */
function kebabCase(str) {
  if (str) {
    paramTest("kebabCase", "str", "string", str);
    return str.toLowerCase().replace(/\s|_/g, "-");
  } else {
    return "";
  }
}

/**
 * change name from All Caps With Spaces to `all_caps_with_spaces`
 * @param {string} str name
 * @return {string} empty string if not found, composed string otherwise
 */
function snakeCase(str) {
  if (str) {
    paramTest("snakeCase", "str", "string", str);
    return str.toLowerCase().replace(/\s|-/g, "_");
  } else {
    return "";
  }
}

/**
 * change name from All Caps With Spaces to `allCapsWithSpaces`
 * @param {string} str name
 * @return {string} empty string if not found, composed string otherwise
 */
function camelCase(str) {
  if (str) {
    paramTest("camelCase", "str", "string", str);
    // split at space hyphen underscore or boundary between lower case and capital letter
    let splitString = str.split(/[\s-_]|(?=[A-Z])/g);
    splitString[0] = splitString[0].toLowerCase();
    if (splitString.length > 1) {
      for (let i = 1; i < splitString.length; i++) {
        splitString[i] = capitalize(splitString[i]);
      }
    }
    return splitString.join("");
  } else {
    return "";
  }
}

/**
 * change name from allCapsWithSpaces to All Caps With Spaces
 * @param {string} str name
 * @return {string} empty string if not found, composed string otherwise
 */
function titleCase(str) {
  if (str) {
    let splitStr = camelCase(str).split(/(?=[A-Z0-9])/g);
    splitStr[0] = capitalize(splitStr[0]);
    return splitStr.join(" ");
  } else return "";
}

module.exports = {
  capitalize,
  getLongestKey,
  matchLength,
  removeTrailingSpaces,
  stringify,
  kebabCase,
  snakeCase,
  camelCase,
  titleCase,
};
