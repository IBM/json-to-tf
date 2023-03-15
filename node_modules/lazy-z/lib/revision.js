const { contains, containsKeys, keys } = require("./shortcuts");
const { getObjectFromArray, transpose, carve, splat } = require("./objects");
const {
  getType,
  arrTypeCheck,
  typeCheck,
  containsAny,
  paramTest,
} = require("./values");

/**
 * revise an object or array with CRUD commands
 * @param {*} arrayOrObject Array or Object
 * @param {Object} parent parent object, used for recursion
 */
function revision(arrayOrObject, parent) {
  this.data = arrayOrObject; // data store

  /**
   * build default parameters for an object using a template
   * @param {Object} template to define default keys, pass a template object
   * @param {Array<string>=} template._no_default a list of parameter names to set as null
   * @param {Object=} template._defaults an object with key value pairs of default parameters
   */
  this.buildDefaultParams = function (data, template, params) {
    template?._no_default.forEach((key) => {
      data[key] = null;
    });
    if (containsKeys(template, "_defaults")) {
      transpose(template._defaults, data);
    }
    transpose(params || {}, data);
  };

  /**
   * get a child of an object or array
   * @param {string} key index of value to return
   * @param {string=} value if searching for an array, this is the value to find. default to `name`
   * @param {string=} index if searching an array and using a field other than name as index, pass string of key as index
   * @returns {revision} revision chain object
   */
  this.child = function (key, value, index) {
    if (value) {
      // if is array
      return new revision(
        getObjectFromArray(this.data[key], index || "name", value),
        parent || this.data
      );
    } else {
      return new revision(this.data[key], parent);
    }
  };

  /**
   * delete an object from an array of objects
   * @param {string} value key to search for. by default will search for name
   * @param {string=} index if searching for a field other than name, provide here
   * @returns {revision} chain revision object
   */
  this.deleteArrChild = function (value, index) {
    carve(this.data, index || "name", value);
    return this;
  };

  /**
   * check an array of objects has a duplicate field value
   * @param {string} field key of the field to check
   * @param {object} params arbitrary params
   * @param {object} options function options
   * @param {string=} options.oldValue old value if updating object
   * @param {string=} options.index index to check if not name
   * @returns {revision} chain revision
   */
  this.duplicateIndexCheck = function (field, params, options) {
    arrTypeCheck(
      "revision.duplicateIndexCheck expects",
      "object",
      this.data[field]
    );
    // if no options, key name, if options.index index, otherwise name
    let key = !options ? "name" : options?.index ? options.index : "name";
    if (
      params[key] !== options?.oldValue && // if name is different from old value
      contains(splat(this.data[field], key), params[key]) // and it is contained in array
    ) {
      // throw new error
      throw new Error(
        `duplicate value for array ${field} at index ${key}: ${params[key]}`
      );
    } else {
      return this;
    }
  };

  /**
   * push to a child array
   * @param {Object} templateOrParams to define default keys, pass a template object
   * @param {Array<string>=} templateOrParams._no_default a list of parameter names to set as null
   * @param {Object=} templateOrParams._defaults an object with key value pairs of default parameters
   * @param {Object=} params parameters if using template
   * @returns {revision} revision chain object
   */
  this.push = function (templateOrParams, params) {
    let isTemplate = containsAny(keys(templateOrParams), [
      "_no_default",
      "_defaults",
    ]);
    let newData =
      params || (!params && isTemplate)
        ? // if only template, use empty object
          {}
        : templateOrParams;
    if (params || isTemplate) {
      this.buildDefaultParams(newData, templateOrParams, params);
    }
    this.data.push(params || isTemplate ? newData : templateOrParams);
    return this;
  };

  /**
   * set the key value of an object
   * @param {string} key key value on the object to set
   * @param {Object} templateOrParams to define default keys, pass a template object
   * @param {Array<string>=} templateOrParams._no_default a list of parameter names to set as null
   * @param {Object=} templateOrParams._defaults an object with key value pairs of default parameters
   * @param {Object=} params parameters if using template
   * @returns {revision} revision chain object
   */
  this.set = function (key, templateOrParams, params) {
    let isTemplate = containsAny(Object.keys(templateOrParams), [
      "_no_default",
      "_defaults",
    ]);
    let newData = params || isTemplate ? {} : templateOrParams;
    if (params || isTemplate) {
      this.buildDefaultParams(newData, templateOrParams, params);
    }
    this.data[key] = params || isTemplate ? newData : templateOrParams;
    return this;
  };

  /**
   * Perform arbitrary code in the chain using the current data without exiting.
   * @param {thenCallback} callback callback
   */
  this.then = function (callback) {
    typeCheck("revision.then", "Function", callback);
    callback(this.data);
    return this;
  };

  /**
   * @callback thenCallback callback for revision.then function
   * @param {*} data data held by revision store
   */

  /**
   * update object in data store
   * @param {Object} params arbitrary params. data object will have keys in params set to the value passed
   * @returns {Object} parent object
   */
  this.update = function (params) {
    transpose(params, this.data);
    return this;
  };

  /**
   * update a child element from an array without needing to navigate to child
   * @param {string} key index of value to return
   * @param {string} value if searching for an array, this is the value to find. default to `name`
   * @param {Object=|string=} indexOrParams if searching an array and using a field other than name as index, pass string of key as index. to set params without index, pass params
   * @param {Object=} params parameters. use only if index is `name`
   * @returns {revision} revision chain object
   */
  this.updateChild = function (key, value, indexOrParams, params) {
    if (params) {
      new revision(this.data).child(key, value, indexOrParams).update(params);
    } else {
      new revision(this.data).child(key, value).update(indexOrParams);
    }
    return this;
  };

  /**
   * update each child of an array
   * @param {string} childFieldName name of the field to update
   * @param {updateEachChildCallback} callback function to update each child from a field
   */
  this.updateEachChild = function (childFieldName, callback) {
    if (getType(this.data[childFieldName]) !== "Array") {
      throw new Error(
        `revision.updateEachChild expects the child to be type Array got: ` +
          getType(this.data[childFieldName])
      );
    }
    this.data[childFieldName].forEach(callback);
    return this;
  };

  /**
   * update each nested child in any depth of arrays
   * @param {Array<string>} fieldsArr list of keys to check ex
   * @param {updateEachChildCallback} callback callback update
   * @returns {revision} revision chain object
   */
  this.updateEachNestedChild = function (fieldsArr, callback) {
    this.data[fieldsArr[0]].forEach((entry) => {
      if (fieldsArr.length === 2) {
        // if exactly 2, update each child
        new revision(entry).updateEachChild(fieldsArr[1], callback);
      } else {
        // otherwise create copy of array with all but first entry and recursively callback
        let fieldArrCopy = fieldsArr.slice(1, fieldsArr.length);
        new revision(entry).updateEachNestedChild(fieldArrCopy, callback);
      }
    });
    return this;
  };

  /**
   * @callback updateEachChildCallback
   * @param data data from each entry
   */

  /**
   * set done callback
   * @param {thenCallback} callback function to run when done
   * @returns {revision} revision object chain
   */
  this.setDoneCallback = (callback) => {
    paramTest("revision.setDoneCallback", "callback", "Function", callback);
    this.done = function () {
      callback(this.data);
    };
    return this;
  };

  /**
   * function to call when done
   */
  this.done = function () {
    throw new Error(
      `revision expected revision.setDoneCallback to be initialized before done is called`
    );
  };
}

module.exports = {
  revision,
};
