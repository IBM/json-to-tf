const { assert } = require("chai");
const { splat } = require("../lib/objects");
const { revision } = require("../lib/revision");

describe("get object data from chain", () => {
  it("should get data from child", () => {
    let testData = {
      my_son: {
        his_name: "myson",
      },
    };
    let obj = new revision(testData).child("my_son").data;
    assert.deepEqual(obj, { his_name: "myson" });
  });
  it("should get data from child at array index with overriden field", () => {
    let testData = {
      sons: [
        {
          name: "myson",
          value: "yes",
        },
        {
          name: "myotherson",
          value: "also yes",
        },
      ],
    };
    let obj = new revision(testData).child("sons", "also yes", "value").data;
    assert.deepEqual(
      obj,
      { name: "myotherson", value: "also yes" },
      "it should match"
    );
  });
  describe("update", () => {
    it("should update an object in place with params", () => {
      let testData = {
        sons: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };
      new revision(testData)
        .child("sons", "myotherson")
        .update({ value: "awww yeah" });
      assert.deepEqual(
        testData.sons[1].value,
        "awww yeah",
        "it should set data in place"
      );
    });
  });
  describe("deleteArrChild", () => {
    it("should delete with params", () => {
      let testData = {
        enemies: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };

      new revision(testData)
        .child("enemies")
        .deleteArrChild("myson")
        .deleteArrChild("also yes", "value");

      assert.deepEqual(
        testData.enemies.length === 0,
        true,
        "it should set data in place"
      );
    });
  });
  describe("push", () => {
    it("should push to array with no template", () => {
      let testData = {
        sons: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };
      new revision(testData).child("sons").push({
        name: "todd",
      });
      assert.deepEqual(
        testData.sons[2],
        {
          name: "todd",
        },
        "todd should be there"
      );
    });
    it("should push to array with template", () => {
      let testData = {
        sons: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };
      const template = { _no_default: ["foo", "bar", "name", "value"] };
      new revision(testData).child("sons").push(template, {
        name: "todd",
      });
      assert.deepEqual(
        testData.sons[2],
        {
          foo: null,
          bar: null,
          name: "todd",
          value: null,
        },
        "todd should be there"
      );
    });
    it("should push to array with template with defaults", () => {
      let testData = {
        sons: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };
      const template = {
        _no_default: ["foo", "name", "value"],
        _defaults: { bar: true },
      };
      new revision(testData).child("sons").push(template, {
        name: "todd",
      });
      assert.deepEqual(
        testData.sons[2],
        {
          foo: null,
          bar: true,
          name: "todd",
          value: null,
        },
        "todd should be there"
      );
    });
  });
  describe("set", () => {
    it("should set object value with no template", () => {
      let testData = {
        sons: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };
      new revision(testData).set("todds_place", {
        name: "todd",
      });
      assert.deepEqual(
        testData.todds_place,
        {
          name: "todd",
        },
        "todd should be there"
      );
    });
    it("should set an object value with template", () => {
      let testData = {
        sons: [
          {
            name: "myson",
            value: "yes",
          },
          {
            name: "myotherson",
            value: "also yes",
          },
        ],
      };
      const template = { _no_default: ["foo", "bar", "name", "value"] };
      new revision(testData).set("todds_place", template, {
        name: "todd",
      });
      assert.deepEqual(
        testData.todds_place,
        {
          foo: null,
          bar: null,
          name: "todd",
          value: null,
        },
        "todd should be there"
      );
    });
    it("should set a field with defaults and no defaults", () => {
      let data = {};
      new revision(data).set("teleport_config", {
        _no_default: [
          "teleport_license",
          "https_cert",
          "https_key",
          "domain",
          "cos_bucket_name",
          "cos_key_name",
          "teleport_version",
          "message_of_the_day",
          "hostname",
          "app_id_key_name",
        ],
        _defaults: {
          claims_to_roles: [],
        },
      });
      assert.deepEqual(
        data.teleport_config,
        {
          teleport_license: null,
          https_cert: null,
          https_key: null,
          domain: null,
          cos_bucket_name: null,
          cos_key_name: null,
          teleport_version: null,
          message_of_the_day: null,
          hostname: null,
          app_id_key_name: null,
          claims_to_roles: [],
        },
        "it should set the value"
      );
    });
  });
  describe("then", () => {
    it("should invoke callback with data", () => {
      let testValue = false;
      new revision({ hi: "mom" }).then((data) => {
        testValue = data;
      });
      assert.deepEqual(
        testValue,
        { hi: "mom" },
        "it should invoke callack with data"
      );
    });
  });
  describe("duplicateIndexCheck", () => {
    it("should throw an error with no options", () => {
      let testData = {
        friends: [
          {
            name: "gary",
          },
        ],
      };
      let task = () => {
        new revision(testData).duplicateIndexCheck("friends", { name: "gary" });
      };
      assert.throws(
        task,
        "duplicate value for array friends at index name: gary"
      );
    });
    it("should throw an error with index and old value options", () => {
      let testData = {
        friends: [
          {
            name: "gary",
            test: "test",
          },
        ],
      };
      let task = () => {
        new revision(testData).duplicateIndexCheck(
          "friends",
          {
            name: "todd",
            test: "test",
          },
          {
            oldValue: "frog",
            index: "test",
          }
        );
      };
      assert.throws(
        task,
        "duplicate value for array friends at index test: test"
      );
    });
    it("should throw an error with only old value options", () => {
      let testData = {
        friends: [
          {
            name: "gary",
            test: "test",
          },
        ],
      };
      let task = () => {
        new revision(testData).duplicateIndexCheck(
          "friends",
          {
            name: "gary",
          },
          {
            oldValue: "frog",
          }
        );
      };
      assert.throws(
        task,
        "duplicate value for array friends at index name: gary"
      );
    });
    it("should throw no error with no options", () => {
      let testData = {
        friends: [
          {
            name: "kyle",
          },
        ],
      };
      let task = () => {
        new revision(testData).duplicateIndexCheck("friends", { name: "gary" });
      };
      assert.doesNotThrow(task, "it should not throw");
    });
  });
  describe("updateChild", () => {
    it("should update a child", () => {
      let testData = {
        friends: [{ name: "bear", test: "value" }],
      };
      new revision(testData).updateChild("friends", "bear", {
        test: "thumbsup",
      });
      assert.deepEqual(
        testData.friends[0].test,
        "thumbsup",
        "it should change the value"
      );
    });
    it("should update a child with index", () => {
      let testData = {
        friends: [{ name: "bear", test: "value" }],
      };
      new revision(testData).updateChild("friends", "value", "test", {
        test: "thumbsup",
      });
      assert.deepEqual(
        testData.friends[0].test,
        "thumbsup",
        "it should change the value"
      );
    });
  });
  describe("updateEachChild", () => {
    it("should throw an error if not array", () => {
      let testData = {
        frog: "name",
      };
      let task = () => {
        new revision(testData).updateEachChild("frog", () => {});
      };
      assert.throws(
        task,
        "revision.updateEachChild expects the child to be type Array got: string"
      );
    });
    it("should update all children", () => {
      let testData = {
        friends: [
          {
            name: "kyle",
            high_score: 12,
          },
          {
            name: "kevin",
            high_score: 100,
          },
        ],
      };
      new revision(testData).updateEachChild("friends", (friend) => {
        friend.high_score = null;
      });
      assert.deepEqual(
        splat(testData.friends, "high_score"),
        [null, null],
        "it should update children"
      );
    });
  });
  describe("updateEachNestedChild", () => {
    it("should update single nested level children", () => {
      let testData = {
        b: [
          {
            c: [
              {
                test: "true",
              },
            ],
          },
          {
            c: [
              {
                test: "true",
              },
            ],
          },
        ],
      };
      new revision(testData).updateEachNestedChild(["b", "c"], (entry) => {
        entry.test = false;
      });
      assert.deepEqual(
        testData.b[0].c[0].test,
        false,
        "it should set to false"
      );
    });
    it("should update any arbitrary number of children", () => {
      let testData = {
        a: [
          {
            b: [
              {
                c: [
                  {
                    test: "true",
                  },
                ],
              },
            ],
          },
          {
            b: [
              {
                c: [
                  {
                    test: "true",
                  },
                ],
              },
              {
                c: [
                  {
                    test: "true",
                  },
                ],
              },
            ],
          },
        ],
      };
      new revision(testData).updateEachNestedChild(["a", "b", "c"], (entry) => {
        entry.test = false;
      });
      assert.deepEqual(
        testData.a[1].b[1].c[0].test,
        false,
        "it should set to false"
      );
      assert.deepEqual(
        testData.a[0].b[0].c[0].test,
        false,
        "it should set to false"
      );
    });
  });
  describe("done", () => {
    it("should throw an error if done is not set", () => {
      let data = new revision({});
      let task = () => data.done();
      assert.throws(
        task,
        "revision expected revision.setDoneCallback to be initialized before done is called"
      );
    });
    describe("setDoneCallback", () => {
      it("should set done callback and run the done function", () => {
        let test = false;
        let callback = (data) => {
          if (data) test = true;
        };
        new revision({}).setDoneCallback(callback).done();
        assert.isTrue(test, "it should set to true");
      });
    });
  });
});
