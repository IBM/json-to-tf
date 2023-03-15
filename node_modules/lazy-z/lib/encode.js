const { getLongestKey, matchLength } = require("./strings");
const { paramTest, getType } = require("./values");
const { eachKey } = require("./shortcuts");

/**
 * Create HCL from JSON data
 * @param {Object} jsonObject object data to transpose
 * @param {boolean} objectMode Return formatted as a single hcl object
 * @param {number} spaceCount number of spaces to prepend to each line, passed during recursion
 * @returns {string} HCL encoded data
 */
function hclEncode(jsonObject, objectMode, spaceCount) {
  paramTest("hclEncode", "jsonObject", "object", jsonObject);
  let returnLines = [], // lines to return
    spaces = objectMode ? 2 : spaceCount || 0,
    spaceString = "", // list of spaces
    longestKey = getLongestKey(jsonObject);

  if (objectMode && spaces == 2) {
    returnLines.push("{");
  }
  // For each space in count add space to string
  for (let i = 0; i < spaces; i++) {
    spaceString += " ";
  }

  // For each key in the object
  eachKey(jsonObject, (key) => {
    let value = jsonObject[key]; // Key value
    let valueType = getType(value); // Type of value
    let printKey = spaceString + matchLength(key, longestKey); // Value to print as key for value
    if (valueType === "Array") {
      // Add key to return text
      returnLines.push(`${printKey} = `);
      if (value.length === 0) {
        // Add empty array if empty
        returnLines[returnLines.length - 1] += "[]";
      } else if (getType(value[0]) === "object") {
        // if type object add opening brace
        returnLines[returnLines.length - 1] += "[";
        // Then for each value
        value.forEach((item) => {
          // Add spaced out hcl encoded object
          returnLines.push(
            `${spaceString}  {\n${hclEncode(
              item,
              false,
              spaces + 4
            )}\n${spaceString}  }`
          );
        });
        // add closing brace with spaces
        returnLines.push(`${spaceString}]`);
      } else {
        // otherwise add stringified json to array
        returnLines[returnLines.length - 1] += JSON.stringify(value);
      }
    } else if (valueType === "object") {
      // if type is object add hcl encoded fields
      returnLines.push(
        `${printKey} = {\n${hclEncode(
          value,
          false,
          spaces + 2
        )}\n${spaceString}}`
      );
    } else if (valueType === "string") {
      // force quotes for string type
      returnLines.push(`${printKey} = \"${value}\"`);
    } else {
      // fallback for number and boolean
      returnLines.push(`${printKey} = ${value}`);
    }
  });
  if (objectMode && spaces == 2) {
    returnLines.push("}");
  }
  // return joined string
  return returnLines.join("\n");
}

module.exports = {
  hclEncode: hclEncode,
};
