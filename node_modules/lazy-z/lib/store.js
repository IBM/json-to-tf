const { revision } = require("./revision");
const { eachKey, contains, keys, containsKeys } = require("./shortcuts");
const { paramTest } = require("./values");

/**
 * create an initial store
 * @param {object=} defaults defaults for store data
 * @param {object=} defaults._defaults key value pairs of default values for store
 * @param {Array<string>} defaults._no_default list of values in store to set to `null`
 * @param {object=} store arbitrary key value pairs to add to store object. values are added after defaults
 * @param {string=} parent override function name
 * @returns {object} key value pairs for store data
 */
function createStore(defaults, store, parent) {
  let functionName = parent || "createStore";
  paramTest(functionName, "defaults", "object", defaults);
  // check for store is object if
  if (store) {
    paramTest(functionName, "store", "object", store);
  }
  // throw if defaults contains keys other than _default or _no_default
  eachKey(defaults, (key) => {
    if (!contains(["_defaults", "_no_default"], key)) {
      throw new Error(
        `${functionName} expects defaults to only have keys _defaults and _no_default, got ${JSON.stringify(
          keys(defaults)
        )}`
      );
    }
  });
  let data = {
    store: {},
  };
  // set defaults on store and return data
  new revision(data).set("store", defaults, store);
  return data.store;
}

/**
 * create store function
 * @param {object} state
 * @param {string} field field to initialize
 * @param {params} params
 * @param {stateInitCallback} params.init function to run on initialization
 * @param {onStoreUpdateCallback} params.onStoreUpdate on store update function
 * @param {onCreate} params.create create function
 * @param {onSave} params.save save function
 * @param {onDelete} params.delete delete function
 * @param {Object=} params.subComponents object of nested sub components
 * @param {Object=} parentStore parent function store where functions will be stored when creating sub components
 */
function storeTemplate(state, field, params, parentStore) {
  paramTest(
    "lazyZState.storeTemplate",
    "state",
    "object",
    state,
    "field",
    "string",
    field,
    "params",
    "object",
    params
  );
  // if function is not recurring
  if (!parentStore) {
    // throw an error if no initialization
    if (!params.init)
      throw new Error(
        `lazyZstate store template expects top level components to have init function, got ${params.init}.`
      );
    // if not found, initialize
    if (!state[field]) params.init(state);
    // set object if type is not object or null (null is type object)
    if (typeof state[field] !== "object" && state[field] !== null)
      state[field] = {};
    // if an onstoreupdate function is passed
    if (params.onStoreUpdate) {
      // add function nested in trycatch to state update functions
      state.updateFunctions.push(() => {
        state.tryCatch(() => {
          params.onStoreUpdate(state);
        }, true);
      });
    }
  }

  // initialize the store field and add create save and update functions
  let componentStore = parentStore ? parentStore[field] : state[field];
  ["create", "save", "delete"].forEach((storeFunction) => {
    if (params[storeFunction]) {
      componentStore[storeFunction] = function (stateData, componentProps) {
        state.tryCatch(() => {
          params[storeFunction](state, stateData, componentProps);
        });
      };
    }
  });

  // component has sub components
  if (containsKeys(params, "subComponents")) {
    // for each sub component
    eachKey(params.subComponents, (subComponent) => {
      // set subcomponent store
      componentStore[subComponent] = {};
      // build a new sub component
      storeTemplate(
        state,
        subComponent,
        params.subComponents[subComponent],
        componentStore
      );
    });
  }
}

/**
 * state constructor object
 * @param {object=} defaults defaults for store data
 * @param {object=} defaults._defaults key value pairs of default values for store
 * @param {Array<string>=} defaults._no_default list of values in store to set to `null`
 * @param {object=} store arbitrary key value pairs to add to store object. values are added after defaults
 * @param {object=} options object of options to turn on, key is option, value is value
 */
function lazyZstate(defaults, store) {
  this.store = {}; // store data
  this.updateFunctions = []; // update functions
  /**
   * initialize state store
   * @param {object=} storeDefaults
   * @param {object=} defaults._defaults key value pairs of default values for store
   * @param {Array<string>=} defaults._no_default list of values in store to set to `null`
   * @param {object=} storeData arbitrary key value pairs to add to store object. values are added after defaults
   */
  this.initStore = function (storeDefaults, storeData) {
    this.store = createStore(storeDefaults || {}, storeData, "state.initStore");
  };

  /**
   * Set update callback. This function will be run when components update
   * @param {Function} callback callback function
   */
  this.setUpdateCallback = function (callback) {
    paramTest(`state.setUpdateCallback`, "callback", "Function", callback);
    this.updateCallback = callback;
  };

  /**
   * function to run after update
   * @throws error if unset
   */
  this.updateCallback = () => {
    throw new Error(
      `state.updateCallback expects a callback to be set using state.setUpdateCallback. No callback has been added.`
    );
  };

  /**
   * update all components
   */
  this.update = function () {
    this.updateFunctions.forEach((fn) => {
      fn();
    });
    this.updateCallback();
  };

  /**
   * send an error
   * @param {Error} err error
   * @throws when message provided
   */
  this.sendError = function (err) {
    console.error(err);
    if (this.sendErrorCallback) this.sendErrorCallback(err);
    else throw new Error(err);
  };

  /**
   * set callback for error handling
   * @param {setErrorCallback} callback callback function
   */
  this.setErrorCallback = function (callback) {
    paramTest(`lazyZstate.setErrorCallback`, "callback", "Function", callback);
    this.sendErrorCallback = callback;
  };

  /**
   * try catch wrapper for state functions
   * @param {Function} tryFunction function to try
   * @param {boolean=} onStoreUpdate is an onstoreupdate function, do not call `this.update` after run
   */
  this.tryCatch = function (tryFunction, onStoreUpdate) {
    try {
      tryFunction();
      if (!onStoreUpdate) this.update();
    } catch (err) {
      this.sendError(err);
    }
  };

  /**
   * create a new state store field
   * @param {string} field fieldName
   * @param {object} params
   * @param {stateInitCallback} params.init function to run on initialization
   * @param {onStoreUpdateCallback} params.onStoreUpdate on store update function
   * @param {onCreate} params.create create function
   * @param {onSave} params.save save function
   * @param {onDelete} params.delete delete function
   * @param {object} params.subComponents object of sub components to be added
   */
  this.newField = function (field, params) {
    storeTemplate(this, field, params);
  };

  // run init store on creation
  this.initStore(defaults, store);
}

module.exports = {
  createStore,
  storeTemplate,
  lazyZstate,
};
