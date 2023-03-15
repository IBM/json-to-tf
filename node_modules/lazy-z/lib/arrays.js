/**
 * functions for arrays
 */

const { paramTest, getType } = require("./values");

/**
 * Create a single tiered array from multi tiered array. Acts like HCL flatten()
 * @param {Array} arr array
 * @returns {Array} flattened array
 */
function flatten(arr) {
  paramTest("flatten", "arr", "Array", arr);
  let flatEntries = []; // returned items
  // for each item in the array
  arr.forEach((item) => {
    if (getType(item) === "Array") {
      // if the type is array, call flatten and add to flat entries
      flatEntries = flatEntries.concat(flatten(item));
    } else {
      // otherwise just add
      flatEntries.push(item);
    }
  });
  // return
  return flatEntries;
}

/**
 * readable build number dropdown count
 * @param {number} count number
 * @param {number=} add optionally add to starting value
 * @returns {Array<string>} list of numbers for dropdown
 */
function numberStringList(count, add) {
  paramTest("numberStringList", "count", "number", count);
  if (add) {
    paramTest("numberStringList", "add", "number", add);
  }
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(`${add ? i + add : i}`);
  }
  return list;
}

module.exports = {
  flatten,
  numberStringList,
};
