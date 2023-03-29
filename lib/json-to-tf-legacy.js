const {
  snakeCase,
  eachKey,
  isString,
  contains,
} = require("lazy-z");
const { RegexButWithWords } = require("regex-but-with-words");
const lastCommaExp = new RegexButWithWords()
  .literal(",")
  .look.ahead((exp) => exp.stringEnd())
  .done("g"); // /,(?=$)/g;

/**
 * transpose an object where each string value has quotes around it
 * @param {Object} source
 * @param {boolean=} cdktfMode
 * @returns {Object}
 */
function stringifyTranspose(source) {
  let newObj = {};
  eachKey(source, (key) => {
    if (isString(source[key])) newObj[key] = `"${source[key]}"`;
    else if (typeof source[key] !== "object") newObj[key] = source[key];
  });
  return newObj;
}

/**
 * match length with spaces
 * @param {string} str
 * @param {number} length
 * @returns {string} string with additional spaces
 */
function matchLength(str, length) {
  while (str.length < length) {
    str += " ";
  }
  return str;
}

/**
 * stringify value
 * @param {*} value
 * @returns {*} value escaped by quotes if string that starts with ^
 */
function stringifyValue(value) {
  if (isString(value)) {
    if (value.indexOf("^") === 0) return `"${value.replace(/^\^/g, "")}"`;
  }
  return value;
}

/**
 * get the longest key from an object
 * @param {Object} obj
 * @returns {number} length of longest key
 */
function longestKeyLength(obj) {
  let longestKey = 0;
  eachKey(obj, (key) => {
    if (
      key.length > longestKey && // if key is longer
      key.indexOf("_") !== 0 && // is not decorated with _
      !contains(["depends_on", "timeouts"], key) // and isn't reserved
    ) {
      longestKey =
        key.indexOf("*") === 0 || key.indexOf("-") === 0
          ? key.length - 1
          : key.length;
    }
  });
  return longestKey;
}

/**
 * json to tf
 * @param {string} type resource type
 * @param {string} name resource name
 * @param {Object} values arbitrary key value pairs
 * @param {Object} config config
 * @param {boolean} useData use data
 * @returns {string} terraform formatted code
 */

function jsonToTfLegacy(type, name, values, useData) {
  let tf = `${useData ? "data" : "resource"} "${type}" "${snakeCase(name)}" {`;
  let longest = longestKeyLength(values);
  /**
   * run function for each key and
   * @param {Object} obj
   */
  function eachTfKey(obj, offset) {
    if (offset) longest = longestKeyLength(obj); // longest key, get sub object
    let nextOffset = offset || 0; // set offset
    let offsetSpace = matchLength("", nextOffset); // offset for recursion
    eachKey(obj, (key) => {
      let keyName = key.replace(/^(-|_|\*|\^)/g, ""); // replace special chatacters in key name
      let valueIsObject = // value is object
        key.indexOf("_") === 0 || key.indexOf("^") === 0 || key === "timeouts";
      let objectIndent = `\n\n  ${offsetSpace}${keyName}`; // indent for objects
      let arrClose = `\n  ${offsetSpace}]`; // close for arrays
      // keys that start with * are used for multiline arrays
      if (key.indexOf("*") === 0) {
        tf += `\n${offsetSpace.length === 0 ? "\n" : ""}  ${
          offsetSpace + keyName
        } = [`;
        obj[key].forEach((item) => {
          tf += `\n    ${offsetSpace + stringifyValue(item)},`;
        });
        tf = tf.replace(lastCommaExp, "");
        tf += arrClose;
      } else if (key.indexOf("-") === 0) {
        // keys that start with - are used to indicate multiple blocks of the same kind
        // ex. `network_interfaces` for vsi
        obj[key].forEach((item) => {
          tf += `\n\n  ${keyName} {`;
          eachTfKey(item, 2 + nextOffset);
          tf += `\n  }`;
        });
      } else if (key === "depends_on") {
        // handle depends on arg
        tf += `${objectIndent} = [`;
        obj[key].forEach((dependency) => {
          tf += `\n ${matchLength(offsetSpace, 2)} ${dependency},`;
        });
        tf = tf.replace(lastCommaExp, "");
        tf += arrClose;
      } else if (valueIsObject) {
        // for keys that aren't new create a sub block
        tf += `${objectIndent} ${
          key.indexOf("^") === 0 ? "= " : "" // keys with ^ use an = for block assignment
        }{`;
        if (key === "timeouts") {
          obj[key] = stringifyTranspose(obj[key]);
        }
        eachTfKey(obj[key], 2 + nextOffset);
        tf += `\n  ${offsetSpace}}`;
      } else {
        // all other keys formatted here
        let keyValue = obj[key];
        tf += `\n  ${
          offsetSpace + matchLength(key, longest)
        } = ${stringifyValue(keyValue)}`;
      }
    });
  }
  eachTfKey(values);
  tf += "\n}\n";
  return tf;
}

module.exports = {
  jsonToTfLegacy,
  stringifyTranspose,
  matchLength,
  stringifyValue,
  longestKeyLength,
};
