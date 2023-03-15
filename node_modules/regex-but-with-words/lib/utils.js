/**
 * General utilities
 * - Function shortcuts
 */

const utils = function () {
  /**
   * helper function to see if an object containsKeys a key
   * @param {Object} object Any object
   * @param {string} str Name of the key to find
   * @returns {boolean} true if containsKeys, false if does not or is not an object
   */
  this.containsKeys = (object, str) => {
    return !(Object.keys(object).indexOf(str) === -1);
  };

  /**
   * Lazy get type
   * @param {*} value Value
   * @returns {string} Array for array, Function for function, `typeof` for other types
   */
  this.getType = function (value) {
    if (typeof value === "object" && Array.isArray(value)) {
      return "Array";
    }
    if (value instanceof Function) {
      return "Function";
    }
    return typeof value;
  };

  /**
   * Shortcut for Object.keys`
   * @param {object} obj Object
   * @returns {Array<string>} list of keys
   */
  this.keys = (obj) => {
    return Object.keys(obj);
  };

  /**
   * Shortcut to check if array of strings contains a value
   * @param {Array} arr array
   * @param {*} value Value to check
   * @returns {boolean} true if array contains value
   */
  this.contains = (arr, value) => {
    return arr.indexOf(value) !== -1;
  };

  /**
   * Test to see if an object has needed keys
   * @param {Object} value Value to check
   * @param {Array<string>} keys Keys to check for
   * @param {boolean?} strict Check to ensure only keys are present, otherwise non-present keys are ok
   * @returns {boolean} True if all params match
   */
  this.keyTest = (value, keys, strict) => {
    if (strict && Object.keys(value).length !== keys.length) return false;
    let allKeysFound = true;
    keys.forEach((key) => {
      if (!this.containsKeys(value, key)) allKeysFound = false;
    });
    return allKeysFound;
  };

  /**
   * Checks a value type
   * @param {string} message Display message
   * @param {string} type Expected type
   * @param {*} value value to test
   * @throws When type is not found
   */
  this.typeCheck = (message, type, value) => {
    if (this.getType(value) !== type) {
      throw new Error(`${message} ${type} got ${this.getType(value)}`);
    }
  };

  /**
   * Check an objet for correct keys
   * @param {string} message Display message
   * @param {Object} value Value to check
   * @param {Array<string>} keys Keys to check for
   * @param {boolean?} strict Check to ensure only keys are present, otherwise non-present keys are ok
   * @throws if keys do not match
   */
  this.keyCheck = (message, value, keys, strict) => {
    if (!this.keyTest(value, keys, strict))
      throw new Error(
        `${message}${strict ? ` ${keys.length} keys` : ""} ${JSON.stringify(
          keys
        )} got ${JSON.stringify(this.keys(value))}`
      );
  };

  /**
   * Shortcut for Object.keys(object).forEach(i=>{})
   * @param {Object} obj Object to call
   * @param {eachKeyCallback} callback Callback function to run
   */
  this.eachKey = (obj, callback) => {
    this.typeCheck(
      `eachKey expects the the first argument to be type`,
      "object",
      obj
    );
    this.typeCheck(`eachKey expects callback to be type`, "Function", callback);
    Object.keys(obj).forEach((i) => callback(i));
  };

  /**
   * Eachkey Callback
   * @callback eachKeyCallback
   * @param {string} key Key to check values against
   */

  /**
   * Constructor to allow for easier and more readable text templates
   * @param {string} str template string
   */
  this.textTemplate = function (str) {
    this.template = str;
    this.str = str;
    this.templateArgs = [];
    // Split at chatacter before dollar sign
    str.split(/[^\$A-Z_]/g).forEach((substr) => {
      // remove trailing characters
      let capsOnly = substr.replace(/(?:\$[A-Z_]+)[^A-Z_]+/g, "");
      // Push if matches valid template value
      if (capsOnly.match(/\$[A-Z_]/g)) this.templateArgs.push(capsOnly);
    });

    /**
     * Fill all values in order
     * @param  {...string} values List of string values
     */
    this.fill = function (...values) {
      for (let i = 0; i < values.length; i++) {
        this.str = this.str.replace(this.templateArgs[i], values[i]);
      }
      return this.str;
    };

    /**
     * Set a value and return the text
     * @param {string} key Template key
     * @param {string} value String value to set
     * @returns {string}
     */
    this.set = function (key, value) {
      this.str = this.str.replace(key, value);
      return this.str;
    };

    /**
     * Set a value and return the text template
     * @param {string} key Template key
     * @param {string} value String value to set
     * @returns {textTemplate}
     */
    this.setx = function (key, value) {
      this.set(key, value);
      return this;
    };

    /**
     * Create a clone of the text template
     * @returns {textTemplate} Text teplate object
     */
    this.clone = function () {
      let newUtils = new utils();
      return new newUtils.textTemplate(this.template);
    };
  };
};

module.exports = new utils();
