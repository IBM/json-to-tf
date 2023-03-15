const { RegexButWithWords } = require("regex-but-with-words");
const {
  typeCheck,
  paramTest,
  getType,
  zoneTest,
  containsCheck,
} = require("./values");

/**
 * Callback function for sort
 * @param {string} a string a
 * @param {string} b string b
 * @returns {number} 1, 0, -1
 */
function azsort(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else return 0;
}

/**
 * Shortcut to check if string or array contains a value
 * @param {String|Array} stringOrArray string or array
 * @param {*} value Value to check
 * @returns {boolean} true if array contains value
 */
function contains(stringOrArray, value) {
  if (getType(stringOrArray) !== "string") {
    paramTest("contains", "stringOrArray", "Array", stringOrArray);
  } else {
    paramTest("contains", "stringOrArray", "string", stringOrArray);
  }
  return stringOrArray.indexOf(value) !== -1;
}

/**
 * helper function to see if an object contains a key
 * @param {Object} object Any object
 * @param {string} str Name of the key to find
 * @param {boolean=} lazy don't throw an error if the object type is not object
 * @returns {boolean} true if containsKeys, false if does not or is not an object
 */
function containsKeys(object, str, lazy) {
  if (getType(object) !== "object" && lazy) return false;
  return !(Object.keys(object).indexOf(str) === -1);
}

/**
 * return all distinct entries in an array
 * @param {Array<string>} arr array
 * @returns {Array<string>} array with only distinct elements
 */
function distinct(arr) {
  paramTest("distinct", "arr", "Array", arr);
  let distinctArr = [];
  arr.forEach((item) => {
    if (!contains(distinctArr, item)) {
      distinctArr.push(item);
    }
  });
  return distinctArr;
}

/**
 * Shortcut for Object.keys(object).forEach(i=>{})
 * @param {Object} obj Object to call
 * @param {eachKeyCallback} callback Callback function to run
 */
function eachKey(obj, callback) {
  paramTest("eachKey", "obj", "object", obj, "callback", "Function", callback);
  Object.keys(obj).forEach((i, index) => callback(i, index));
}

/**
 * Eachkey Callback
 * @callback eachKeyCallback
 * @param {string} key Key to check values against
 * @param {number} index Index of item in array
 */

/**
 * Test if a value is boolean
 * @param {*} value value
 * @returns {boolean} true if boolean
 */
function isBoolean(value) {
  return getType(value) === "boolean";
}

/**
 * Check if array is empty
 * @param {Array} arr Array
 * @returns {boolean} true if length == 0
 */
function isEmpty(arr) {
  typeCheck(`isEmpty expects type of`, "Array", arr);
  return arr.length === 0;
}

/**
 * Shortcut for getType(value) === "Function"
 * @param {*} value Any value
 * @returns {boolean} true if function
 */
function isFunction(value) {
  return getType(value) === "Function";
}

/**
 * test if a value is a valid ipv4 cidr block or ipv4 ip address
 * @param {string} str string
 * @returns {boolean} true if is cidr block
 */
function isIpv4CidrOrAddress(str) {
  paramTest("isIpv4CidrOrAddress", "str", "string", str);
  let ipv4CidrRegex = new RegexButWithWords()
    .stringBegin()
    .group((exp) => {
      exp
        .group((exp) => {
          exp
            .group((exp) => {
              exp.literal("2").set("1-5").set("0-6");
            })
            .or()
            .group((exp) => {
              exp.literal("1").digit(2);
            })
            .or()
            .group((exp) => {
              exp.digit(1, 2);
            });
        })
        .literal(".");
    }, 3)
    .group((exp) => {
      exp
        .group((exp) => {
          exp.literal("2").set("1-5").set("0-6");
        })
        .or()
        .group((exp) => {
          exp.literal("1").digit(2);
        })
        .or()
        .group((exp) => {
          exp.digit(1, 2);
        });
    })
    .group((exp) => {
      exp
        .group((exp) => {
          exp.literal("/3").set("0-2");
        })
        .or()
        .group((exp) => {
          exp.literal("/").set("1-2").digit();
        })
        .or()
        .group((exp) => {
          exp.literal("/").digit();
        })
        .wordBoundary();
    })
    .lazy()
    .stringEnd()
    .done("g");
  let match = str.match(ipv4CidrRegex);
  if (match?.length === 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * Test if a value is string
 * @param {*} value value
 * @returns {boolean} true if string
 */
function isString(value) {
  return getType(value) === "string";
}

/**
 * Test if a value is array
 * @param {*} value value
 * @returns {boolean} true if string
 */
function isArray(value) {
  return getType(value) === "Array";
}

/**
 * Shortcut for Object.keys`
 * @param {object} object Object
 * @returns {Array<string>} list of keys
 */
function keys(object) {
  typeCheck("keys expects type", "object", object);
  return Object.keys(object);
}

/**
 * get the type of a key value
 * @param {Object} obj object value
 * @param {string} key key in object
 * @returns {string} type of object key value
 */
function keyValueType(obj, key) {
  paramTest("keyValueType", "obj", "object", obj, "key", "string", key);
  return getType(obj[key]);
}

/**
 * Get the object at a first key in an object
 * @param {object} obj Object
 * @returns {object} object at first key value
 */
function objectAtFirstKey(obj) {
  typeCheck(`objectAtFirstKey expects type of`, "object", obj);
  return obj[keys(obj)[0]];
}

/**
 * Shortcut for JSON.stringify(obj, null, 2)
 * @param {Object} obj Object to return
 * @returns {string} prettified json string
 */
function prettyJSON(value) {
  return JSON.stringify(value, null, 2);
}

/**
 * Test for valid ipv4 cidr or address
 * @param {string} component component name
 * @param {*} value value
 * @throws if cidr block invalid
 */
function validIpv4Test(component, value) {
  paramTest("isIpv4CidrOrAddress", "component", "string", component);
  if (!isIpv4CidrOrAddress(value)) {
    throw `${component} expected valid ipv4 address or CIDR block, got ${value}`;
  }
}

/**
 * test if a value is null or empty string
 * @param {*} value
 * @returns {boolean} true if null or empty string
 */
function isNullOrEmptyString(value) {
  return value === null || value === "";
}

/**
 * test if two values are deeply equal
 * @param {*} actualData
 * @param {*} expectedData
 * @returns {boolean} ture if
 */
function deepEqual(actualData, expectedData) {
  if (actualData === null && expectedData === null) return true;
  // Functions not allowed
  if (
    getType(actualData) === "Function" ||
    getType(expectedData) === "Function"
  ) {
    throw new Error(`deepEqual does not accept Function as a type.`);
  }

  let allEntriesEqual = true; // all entries are equal
  if (getType(actualData) !== getType(expectedData)) {
    // return false if unmatching types
    return false;
  } else if (getType(actualData) === "Array") {
    if (actualData.length !== expectedData.length) {
      // return false if arrays different lengths
      return false;
    } else {
      // for each array item
      for (let i = 0; i < actualData.length; i++) {
        if (allEntriesEqual) {
          // if not already false
          // set all entries equal to deepEqual of values
          allEntriesEqual = deepEqual(actualData[i], expectedData[i]);
        }
      }
      return allEntriesEqual;
    }
  } else if (getType(actualData) === "object") {
    if (keys(actualData).length !== keys(expectedData).length) {
      return false;
    } else {
      // for each key
      eachKey(actualData, (key) => {
        // if all entries is not false
        if (allEntriesEqual) {
          //
          allEntriesEqual = deepEqual(actualData[key], expectedData[key]);
        }
      });
      return allEntriesEqual;
    }
  } else {
    return actualData === expectedData;
  }
}

/**
 * check if whole number
 * @param {number} num
 * @returns {boolean} true if whole
 */
function isWholeNumber(num) {
  paramTest("isWholeNumber", "num", "number", num);
  return num % 1 === 0;
}

/**
 * convert a number to a zone list
 * @param {number} zones
 * @returns {Array<string>} list of zones
 */
function numberToZoneList(zones) {
  zoneTest(zones);
  let zoneList = [];
  while (zoneList.length < zones && zoneList.length <= 3) {
    zoneList.push(`zone-${zoneList.length + 1}`);
  }
  return zoneList;
}

/**
 * shortcut for ["zone-1", "zone-2", "zone-3"].forEach(...)
 * @param {number} zones number of zones, can be 1, 2, or 3.
 * @param {eachZoneCallback} callback function to run for each zone
 */
function eachZone(zones, callback) {
  let zoneList = zones === 0 ? [] : numberToZoneList(zones);
  zoneList.forEach(callback);
}
/**
 * @callback eachZoneCallback callback to run for the zone name
 * @param {string} zone name of zone
 */

/**
 * parse int from zone or subnet name
 * @param {string} zone zone
 * @returns {number} number of zone
 */
function parseIntFromZone(zone) {
  return parseInt(zone.replace(/\D/g, ""));
}

/**
 * readable build number dropdown count
 * @param {number} count number
 * @param {number=} add optionally add to starting value
 * @returns {Array<string>} list of numbers for dropdown
 */
function buildNumberDropdownList(count, add) {
  paramTest("buildNumberDropdownList", "count", "number", count);
  if (add) {
    paramTest("buildNumberDropdownList", "add", "number", add);
  }
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(`${add ? i + add : i}`);
  }
  return list;
}

module.exports = {
  azsort,
  contains,
  containsKeys,
  distinct,
  eachKey,
  isArray,
  isBoolean,
  isEmpty,
  isFunction,
  isIpv4CidrOrAddress,
  isString,
  isWholeNumber,
  keys,
  keyValueType,
  objectAtFirstKey,
  prettyJSON,
  validIpv4Test,
  isNullOrEmptyString,
  deepEqual,
  numberToZoneList,
  eachZone,
  parseIntFromZone,
  buildNumberDropdownList,
};
