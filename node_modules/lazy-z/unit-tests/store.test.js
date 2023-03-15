const { assert } = require("chai");
const sinon = require("sinon");
const { isFunction } = require("../lib/shortcuts");
const { createStore, lazyZstate, storeTemplate } = require("../lib/store");

describe("store", () => {
  describe("createStore", () => {
    it("should throw an error if defaults contains a key other than _defaults and _no_default", () => {
      let task = () => createStore({ frog: true });
      assert.throws(
        task,
        `createStore expects defaults to only have keys _defaults and _no_default, got ["frog"]`
      );
    });
    it("if no store is passed, it should create a store with only default values", () => {
      let actualData = createStore({
        _defaults: {
          frog: true,
          numbers: [1, 2, 3, 4],
          data: {
            foo: "baz",
          },
        },
        _no_default: ["todd"],
      });
      let expectedData = {
        frog: true,
        numbers: [1, 2, 3, 4],
        data: {
          foo: "baz",
        },
        todd: null,
      };
      assert.deepEqual(actualData, expectedData, "it should set defaults");
    });
    it("if store is passed, it should transpose store values to object on return", () => {
      let actualData = createStore(
        {
          _defaults: {
            frog: true,
            numbers: [1, 2, 3, 4],
            data: {
              foo: "baz",
            },
          },
          _no_default: ["todd"],
        },
        {
          frog: "yes",
          hi: "mom",
        }
      );
      let expectedData = {
        frog: "yes",
        numbers: [1, 2, 3, 4],
        data: {
          foo: "baz",
        },
        todd: null,
        hi: "mom",
      };
      assert.deepEqual(actualData, expectedData, "it should set defaults");
    });
  });
  describe("storeTemplate", () => {
    it("should throw an error if top level component and no initialization", () => {
      let task = () => storeTemplate({}, "hi", {});
      assert.throws(
        task,
        "lazyZstate store template expects top level components to have init function, got undefined."
      );
    });
    it("should initialize an empty object when init is passed and object not found in store", () => {
      let expectedData = {
        frog: {},
      };
      let actualData = {};
      let initSpy = new sinon.spy();
      storeTemplate(actualData, "frog", {
        init: initSpy,
      });
      assert.deepEqual(actualData, expectedData, "it should set after init");
      assert.isTrue(initSpy.calledOnce, "it should be called");
    });
    it("should not initialize an empty object when init is passed and object is found in store", () => {
      let expectedData = {
        frog: { foo: "baz" },
      };
      let actualData = {
        frog: {
          foo: "baz",
        },
      };
      storeTemplate(actualData, "frog", { init: function (state) {} });
      assert.deepEqual(actualData, expectedData, "it should set after init");
    });
    it("should initialize onStoreUpdate when passed", () => {
      let actualData = {
        updateFunctions: [],
        tryCatch: function (callback) {
          callback();
        },
      };
      let test = false;
      storeTemplate(actualData, "frog", {
        init: function (state) {},
        onStoreUpdate: function () {
          test = true;
        },
      });
      actualData.updateFunctions[0]();
      assert.deepEqual(
        actualData.updateFunctions.length,
        1,
        "it should set after init"
      );
      assert.isTrue(test, "it should be true after update");
    });
    it("should initialize create when passed", () => {
      let actualData = {
        updateFunctions: [],
        tryCatch: function (callback) {
          callback();
        },
      };
      let test = false;
      storeTemplate(actualData, "frog", {
        init: function (state) {},
        onStoreUpdate: function () {},
        create: function () {
          test = true;
        },
      });
      actualData.frog.create();
      assert.isTrue(
        isFunction(actualData.frog.create) && test,
        "it should be a function and should update test"
      );
    });
    it("should initialize create when passed as a subComponent function", () => {
      let actualData = {
        updateFunctions: [],
        tryCatch: function (callback) {
          callback();
        },
      };
      let test = false;
      storeTemplate(actualData, "frog", {
        init: function (state) {},
        onStoreUpdate: function () {},
        subComponents: {
          egg: {
            create: function () {
              test = true;
            },
          },
        },
      });
      actualData.frog.egg.create();
      assert.isTrue(
        isFunction(actualData.frog.egg.create) && test,
        "it should be a function and should update test"
      );
    });
  });
  describe("state", () => {
    describe("initStore", () => {
      it("should initialize store data with no defaults and no store", () => {
        let actualData = new lazyZstate().store;
        let expectedData = {};
        assert.deepEqual(actualData, expectedData, "it should be empty object");
      });
    });
    describe("setUpdateCallback", () => {
      it("should set the update callback", () => {
        let slz = new lazyZstate();
        let callback = () => {
          console.log("hi");
        };
        slz.setUpdateCallback(callback);
        assert.deepEqual(
          slz.updateCallback.toString(),
          callback.toString(),
          "it should be same function"
        );
      });
    });
    describe("updateCallback", () => {
      it("should throw an error if unset", () => {
        let task = () => new lazyZstate().updateCallback();
        assert.throws(
          task,
          `state.updateCallback expects a callback to be set using state.setUpdateCallback. No callback has been added.`
        );
      });
    });
    describe("update", () => {
      it("should run each function in update functions", () => {
        let slz = new lazyZstate();
        let updateSpy = new sinon.spy();
        let updateFnSpy = new sinon.spy();
        slz.updateFunctions.push(updateFnSpy);
        slz.setUpdateCallback(updateSpy);
        slz.update();
        assert.isTrue(updateSpy.calledOnce, "it should call");
        assert.isTrue(updateFnSpy.calledOnce, "it should call");
      });
    });
    describe("sendError", () => {
      it("should throw an error message by default", () => {
        let task = () => new lazyZstate().sendError("hi");
        assert.throws(task, "hi");
      });
    });
    describe("setErrorCallback", () => {
      it("should call error callback if one is set", () => {
        let spy = sinon.spy();
        let store = new lazyZstate();
        store.setErrorCallback(spy);
        store.sendError("hi");
        assert.isTrue(spy.calledOnce, "it should be called");
      });
    });
    describe("tryCatch", () => {
      it("should call send error when an error is thrown", () => {
        let slz = new lazyZstate();
        let value;
        slz.setErrorCallback((err) => {
          value = err.message;
        });
        slz.tryCatch(() => {
          throw new Error("frog");
        });
        assert.deepEqual(value, "frog", "it should be frog");
      });
      it("should not throw if function runs successfully", () => {
        let slz = new lazyZstate();
        let task = () =>
          slz.tryCatch(() => {
            return "hi";
          });
        assert.doesNotThrow(task, "it should not throw");
      });
      it("should not throw if function runs successfully and onstore update", () => {
        let slz = new lazyZstate();
        let task = () =>
          slz.tryCatch(() => {
            return "hi";
          }, true);
        assert.doesNotThrow(task, "it should not throw");
      });
    });
    describe("newField", () => {
      it("should initialize a new field when run", () => {
        let slz = new lazyZstate();
        let initSpy = new sinon.spy();
        slz.newField("frog", { init: initSpy });
        assert.isTrue(initSpy.calledOnce, "it should be called");
        assert.isTrue(slz.frog !== null, "it should not be null");
      });
    });
  });
});
