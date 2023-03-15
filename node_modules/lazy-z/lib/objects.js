const { eachKey, contains } = require("./shortcuts");
const { paramTest } = require("./values");

/**
 * check to see if all fields in an object are null
 * @param {Object} obj arbitrary object
 * @returns {boolean} true if all are null, otherwise false
 */
function allFieldsNull(obj) {
  paramTest("allFieldsNull", "obj", "object", obj);
  let allNull = true;
  eachKey(obj, (key) => {
    if (obj[key] !== null) {
      allNull = false;
    }
  });
  return allNull;
}

/**
 * get index of an array with a value
 * @param {Array<object>} arr array of objects
 * @param {string} field  key name
 * @param {string} str string value to check
 * @returns {number} index of object with value
 */

function arraySplatIndex(arr, field, str) {
  paramTest(
    "arraySplatIndex",
    "arr",
    "Array<object>",
    arr,
    "field",
    "string",
    field,
    "str",
    "string",
    str
  );
  return splat(arr, field).indexOf(str);
}

/**
 * remove an item from an array of objects by name
 * @param {Array<object>} arr array of objects
 * @param {string} field  key name
 * @param {string} str string value to check
 * @returns splice value
 */

function carve(arr, field, str) {
  paramTest(
    "carve",
    "arr",
    "Array<object>",
    arr,
    "field",
    "string",
    field,
    "str",
    "string",
    str
  );
  let index = arraySplatIndex(arr, field, str);
  if(index === -1) {
    throw new Error(`carve expected object with ${field} value ${str}. Found no matching entries.`)
  }
  return arr.splice(index, 1);
}

/**
 * check for no duplicate keys
 * @param {string} component name of the component
 * @param {Array<object>} arr array of objects
 * @param {string} field  key name
 * @param {string} str string value to check
 */
function duplicateKeyTest(component, arr, field, str) {
  paramTest(
    "duplicateKeyTest",
    "component",
    "string",
    component,
    "arr",
    "Array<object>",
    arr,
    "field",
    "string",
    field,
    "str",
    "string",
    str
  );
  if (hasDuplicateKeys(arr, field, str)) {
    throw new Error(
      `${component} expected no duplicate keys for ${field}. Duplicate value: ${str}`
    );
  }
}

/**
 * get object from array of objects
 * @param {Array<object>} arr array of objects
 * @param {string} field  key name
 * @param {string} str string value to check
 */

function getObjectFromArray(arr, field, str) {
  paramTest(
    "getObjectFromArray",
    "arr",
    "Array<object>",
    arr,
    "field",
    "string",
    field,
    "str",
    "string",
    str
  );
  return arr[arraySplatIndex(arr, field, str)];
}

/**
 * check for no duplicate keys
 * @param {Array<object>} arr array of objects
 * @param {string} field key name
 * @param {string} str string value to check
 */
function hasDuplicateKeys(arr, field, str) {
  paramTest(
    "hasDuplicateKeys",
    "arr",
    "Array<object>",
    arr,
    "field",
    "string",
    field,
    "str",
    "string",
    str
  );
  let data = splat(arr, field);
  return contains(data, str);
}

/**
 * get all values for a field in an array of objects and
 * return as array
 * @param {Array<object>} arr array of objects
 * @param {string} field  key name
 * @returns {Array} array
 */
function splat(arr, field) {
  paramTest("splat", "arr", "Array<object>", arr, "field", "string", field);
  let splatifiedArr = [];
  arr.forEach((obj) => {
    splatifiedArr.push(obj[field]);
  });
  return splatifiedArr;
}

/**
 * get all values for a field in an array of objects and return true
 * if the checkValue is found
 * @param {Array<object>} arr array of objects
 * @param {string} field  key name
 * @param {*} checkValue value to search for
 */
function splatContains(arr, field, value) {
  let data = splat(arr,field);
  return contains(data, value);
}

/**
 * return the values of an object as an array to cast to function using spread operator
 * @param {Object} obj Object
 * @returns {Array} array of values
 */
function spreadKeyValues(obj) {
  paramTest("spreadKeyValues", "obj", "object", obj);
  let values = [];
  eachKey(obj, (key) => {
    values.push(obj[key]);
  });
  return values;
}

/**
 * Set keys from one object to another in place
 * @param {Object} source source object
 * @param {Object} destination where values from the source object will be added
 */
function transpose(source, destination) {
  paramTest(
    "transpose",
    "source",
    "object",
    source,
    "destination",
    "object",
    destination
  );
  eachKey(source, (key) => {
    destination[key] = source[key];
  });
}

module.exports = {
  allFieldsNull,
  arraySplatIndex,
  carve,
  duplicateKeyTest,
  getObjectFromArray,
  hasDuplicateKeys,
  splat,
  splatContains,
  spreadKeyValues,
  transpose,
};
