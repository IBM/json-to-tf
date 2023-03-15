/**
 * Functions for testing and checking values
 */

/**
 * Check all items in an array for a specific type
 * @param {string} message Display message
 * @param {string} type type to check
 * @param {*} arr Array to check
 * @throws if types of each item in the array do not match
 */
function arrTypeCheck(message, type, arr) {
  paramTest(
    "arrTypeCheck",
    "message",
    "string",
    message,
    "type",
    "string",
    type,
    "arr",
    "Array",
    arr
  );
  let types = [], // list of types
    allMatch = true; // all match
  arr.forEach((entry) => {
    let entryType = getType(entry); // Get type
    types.push(entryType); // add to list
    if (entryType !== type) allMatch = false; // if doesn't match, all match becomes false
  });
  if (!allMatch) {
    throw new Error(`${message} type ${type} got ${JSON.stringify(types)}`);
  }
}

/**
 * Checks to see if any instances of string from one array are found in another
 * @param {Array} sourceArr Array to compare against
 * @param {Array} arr Array to search for
 * @returns {boolean} If any instance is found
 */
function containsAny(sourceArr, arr) {
  paramTest(
    "containsAny",
    "sourceArr",
    "Array<string>",
    sourceArr,
    "arr",
    "Array<string>",
    arr
  );
  let found = false;
  arr.forEach((entry) => {
    if (sourceArr.indexOf(entry) !== -1) {
      found = true;
    }
  });
  return found;
}

/**
 * Test to see if an array of strings contains a value
 * @param {string} message Display Message
 * @param {Array} arr array
 * @param {string} value Value to check
 * @throws If array oes not contain value
 */
function containsCheck(message, arr, value) {
  paramTest(
    "containsCheck",
    "message",
    "string",
    message,
    "arr",
    "Array",
    arr,
    "value",
    "string",
    value
  );
  if (arr.indexOf(value) === -1) {
    throw new Error(`${message} got ${JSON.stringify(value)}`);
  }
}

/**
 * Check if an array is empty
 * @param {string} message message to display
 * @param {Array} arr array to check
 * @throws if the array contains no entries
 */
function emptyCheck(message, arr) {
  paramTest("emptyCheck", "message", "string", message, "arr", "Array", arr);
  if (arr.length === 0) {
    throw message;
  }
}

/**
 * Lazy get
 * @param {*} value Value
 * @returns {string} Array for array, Function for function, `typeof` for other types
 */
function getType(value) {
  if (typeof value === "object" && Array.isArray(value)) {
    return "Array";
  }
  if (value instanceof Function) {
    return "Function";
  }
  return typeof value;
}

/**
 * Check an object for correct keys
 * @param {string} message Display message
 * @param {Object} value Value to check
 * @param {Array<string>} keys Keys to check for
 * @param {boolean?} strict Check to ensure only keys are present, otherwise non-present keys are ok
 * @throws if keys do not match
 */
function keyCheck(message, value, checkKeys, strict) {
  paramTest(
    "keyCheck",
    "message",
    "string",
    message,
    "value",
    "object",
    value,
    "checkKeys",
    "Array<string>",
    checkKeys
  );
  if (!keyTest(value, checkKeys, strict))
    throw new Error(
      `${message}${strict ? ` ${checkKeys.length} keys` : ""} ${JSON.stringify(
        checkKeys
      )} got ${JSON.stringify(Object.keys(value))}`
    );
}

/**
 * Test to see if an object has needed keys
 * @param {Object} value Value to check
 * @param {Array<string>} keys Keys to check for
 * @param {boolean?} strict Check to ensure only keys are present, otherwise non-present keys are ok
 * @returns {boolean} True if all params match
 */
function keyTest(value, checkKeys, strict) {
  paramTest(
    "keyTest",
    "value",
    "object",
    value,
    "checkKeys",
    "Array<string>",
    checkKeys
  );
  if (strict && Object.keys(value).length !== checkKeys.length) return false;
  let allKeysFound = true;
  checkKeys.forEach((key) => {
    if (Object.keys(value).indexOf(key) === -1) allKeysFound = false;
  });
  return allKeysFound;
}

/**
 * Checks a value type
 * @param {string} message Display message
 * @param {string} type Expected type
 * @param {*} value value to test
 * @throws When type is not found
 */
function typeCheck(message, type, value) {
  if (
    ["string", "number", "object", "boolean", "Array", "Function"].indexOf(
      type
    ) === -1
  ) {
    throw new Error(
      `typeCheck expected one of the following types: ["string", "number", "object", "boolean", "Array", "Function"] got: ${type}`
    );
  }
  if (getType(value) !== type) {
    throw new Error(`${message} ${type} got ${getType(value)}`);
  }
}

/**
 * test parameters now
 * @param {string} functionName name of the function to be tested
 * @param  {...any} params name, expected type, actual value
 */
function paramTest(functionName, ...params) {
  if (params.length % 3 !== 0 || params.length === 0) {
    throw new Error(
      "paramTest expected 3 arguments for each variable to be passed as params, got " +
        params.length
    );
  }
  let paramValues = [];
  while (params.length > 0) {
    let name = params.shift();
    let expected = params.shift();
    let actual = params.shift();
    paramValues.push({
      actual: actual,
      name: name,
      expected: expected,
    });
  }
  paramValues.forEach((value) => {
    if (value.expected.match(/^Array<\w+>$/)) {
      arrTypeCheck(
        `${functionName} expects all entries in ${value.name} to be`,
        value.expected.replace(/^Array<|\>$/g, ""),
        value.actual
      );
    } else {
      typeCheck(
        `${functionName} expects ${value.name} to be type`,
        value.expected,
        value.actual
      );
    }
  });
}

/**
 * test for a valid zone
 * @param {number} zone zone number
 * @throws if zone is not 1, 2, or 3
 */
function zoneTest(zone) {
  paramTest("zoneText", "zone", "number", zone);
  if ([1, 2, 3].indexOf(zone) === -1) {
    throw new Error("Zone must be 1, 2, or 3.");
  }
}

const values = {
  arrTypeCheck,
  containsAny,
  containsCheck,
  emptyCheck,
  getType,
  paramTest,
  keyCheck,
  keyTest,
  typeCheck,
  zoneTest
};

module.exports = values;
