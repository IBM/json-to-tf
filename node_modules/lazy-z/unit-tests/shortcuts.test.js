const { assert } = require("chai");
const shortcuts = require("../lib/shortcuts");

describe("shortcuts", () => {
  describe("keys", () => {
    it("should return correct keys", () => {
      let keys = shortcuts.keys;
      assert.deepEqual(
        keys({ test: true }),
        ["test"],
        "should return correct keys"
      );
    });
  });
  describe("containsKeys", () => {
    let containsKeys = shortcuts.containsKeys;
    it("should return true if key exists in object", () => {
      assert.isTrue(containsKeys({ test: true }, "test"));
    });
    it("should return false if key does not exist in object", () => {
      assert.isTrue(containsKeys({ test: true }, "test"));
    });
    it("should return false if the get type is not an object and is lazy", () => {
      assert.isFalse(containsKeys("frog", "no", true), "it should be false");
    });
  });
  describe("contains", () => {
    let contains = shortcuts.contains;
    it("should return true if string in string", () => {
      assert.isTrue(contains("test", "es"), "should be true");
    });
    it("should return false if string not in string", () => {
      assert.isFalse(contains("test", "frog"), "should be false");
    });
    it("should return true if item in array", () => {
      assert.isTrue(contains(["test"], "test"), "should be true");
    });
    it("should return false if item not in array", () => {
      assert.isFalse(contains(["test"], "frog"), "should be true");
    });
  });
  describe("eachKey", () => {
    let eachKey = shortcuts.eachKey;
    it("should correctly run eachKey", () => {
      let testData = [];
      eachKey({ test: "test" }, (key) => testData.push(key));
      assert.deepEqual(testData, ["test"], "it should return correct data");
    });
  });
  describe("azsort", () => {
    it("should return -1 if string a is less than string b", () => {
      let actualData = shortcuts.azsort("a", "b");
      assert.deepEqual(actualData, -1, "it should return -1");
    });
    it("should return 1 if string a is greater than string b", () => {
      let actualData = shortcuts.azsort(3, 2);
      assert.deepEqual(actualData, 1, "it should return 11");
    });
    it("should return 0 if string a is equal to string b", () => {
      let actualData = shortcuts.azsort(2, 2);
      assert.deepEqual(actualData, 0, "it should return 11");
    });
  });
  describe("distinct", () => {
    it("should remove duplicate string entries from an array of strings", () => {
      let expectedData = ["hi"];
      let actualData = shortcuts.distinct(["hi", "hi"]);
      assert.deepEqual(actualData, expectedData, "it should return array");
    });
  });
  describe("isEmpty", () => {
    let isEmpty = shortcuts.isEmpty;
    it("should return false if not empty", () => {
      assert.deepEqual(isEmpty(["test"]), false, "should return correct keys");
    });
  });
  describe("objectAtFirstKey", () => {
    it("should return the object", () => {
      let actualData = shortcuts.objectAtFirstKey({
        sub_obj: {
          one: "one",
        },
      });
      assert.deepEqual(actualData, { one: "one" }, "it should return object");
    });
  });
  describe("keyValueType", () => {
    it("should return the object key type", () => {
      let actualData = shortcuts.keyValueType(
        {
          sub_obj: {
            one: "one",
          },
        },
        "sub_obj"
      );
      assert.deepEqual(actualData, "object", "it should return object");
    });
  });
  describe("isString", () => {
    let isString = shortcuts.isString;
    it("should return true if string", () => {
      assert.isTrue(isString("string"));
    });
    it("should return false if not string", () => {
      assert.isFalse(isString());
    });
  });
  describe("isBoolean", () => {
    let isBoolean = shortcuts.isBoolean;
    it("should return true if boolean", () => {
      assert.isTrue(isBoolean(true));
    });
    it("should return false if not string", () => {
      assert.isFalse(isBoolean());
    });
  });
  describe("isIpv4CidrOrAddress", () => {
    let isIpv4CidrOrAddress = shortcuts.isIpv4CidrOrAddress;
    it("should return true if ipv4 cidr block", () => {
      let actualData = isIpv4CidrOrAddress("10.0.0.0/8");
      assert.isTrue(actualData, "it should be true");
    });
    it("should return true if ipv4 cidr block", () => {
      let actualData = isIpv4CidrOrAddress("256.0.0.0/8");
      assert.isTrue(actualData, "it should be true");
    });
    it("should return false if invalid ipv4 cidr block", () => {
      let actualData = isIpv4CidrOrAddress("310.0.0.0/8");
      assert.isFalse(actualData, "it should be false");
    });
    it("should return false if invalid ipv4 cidr block", () => {
      let actualData = isIpv4CidrOrAddress("258.0.0.0/8");
      assert.isFalse(actualData, "it should be false");
    });
    it("should return true if ipv4 address", () => {
      let actualData = isIpv4CidrOrAddress("1.2.3.4");
      assert.isTrue(actualData, "it should be true");
    });
  });
  describe("isNullOrEmptyString", () => {
    it("should return true if null", () => {
      assert.isTrue(
        shortcuts.isNullOrEmptyString(null),
        "it should return true"
      );
    });
    it("should return true if empty string", () => {
      assert.isTrue(shortcuts.isNullOrEmptyString(""), "it should return true");
    });
  });
  describe("validIpv4Test", () => {
    let validIpv4Test = shortcuts.validIpv4Test;
    it("should throw an error if address is invalid", () => {
      let task = () => {
        validIpv4Test("test", "honk");
      };
      assert.throws(
        task,
        "test expected valid ipv4 address or CIDR block, got honk"
      );
    });
    it("should not throw an error if address is vaid", () => {
      let task = () => {
        validIpv4Test("test", "1.2.3.4/5");
      };
      assert.doesNotThrow(task, "no throw");
    });
  });
  describe("isFunction", () => {
    it("should return true if a function", () => {
      assert.isTrue(
        shortcuts.isFunction(() => {}),
        "it should be"
      );
    });
  });
  describe("isArray", () => {
    it("should return true if array", () => {
      assert.isTrue(shortcuts.isArray([]), "it should be");
    });
  });
  describe("deepEqual", () => {
    let deepEqual = shortcuts.deepEqual;
    it("should return false if two data types passed in do not match", () => {
      assert.isFalse(deepEqual(2, "hi"), "it should be false");
    });
    it("should return false if a string value does not match", () => {
      assert.isFalse(deepEqual("frog", "todd"), "it should be false");
    });
    it("should return false if a boolean value does not match", () => {
      assert.isFalse(deepEqual(true, false), "it should be false");
    });
    it("should return false if a number value does not match", () => {
      assert.isFalse(deepEqual(1, 2), "it should be false");
    });
    it("should return false if two arrays have different lengths", () => {
      assert.isFalse(deepEqual([], [""]), "it should be false");
    });
    it("should return false if the values of two arrays with only strings, numbers, and booleans are not equal", () => {
      assert.isFalse(
        deepEqual(["g", 1, false, "d"], ["g", 2, false, "d"]),
        "it should return false"
      );
    });
    it("should return true if the values of two arrays with only strings, numbers, and booleans are equal", () => {
      assert.isTrue(
        deepEqual(["g", 1, false, "d"], ["g", 1, false, "d"]),
        "it should return false"
      );
    });
    it("should return false if two objects have keys that are different lengths", () => {
      assert.isFalse(deepEqual({ foo: "bar" }, {}), "it should be false");
    });
    it("should throw an error if actual data is a function", () => {
      let task = () => deepEqual(() => {}, "frog");
      assert.throws(task, `deepEqual does not accept Function as a type.`);
    });
    it("should throw an error if expected data is a function", () => {
      let task = () => deepEqual(true, () => {});
      assert.throws(task, `deepEqual does not accept Function as a type.`);
    });
    it("should return false if two objects have unmatched key values", () => {
      assert.isFalse(
        deepEqual({ foo: "bar" }, { foo: "baz" }),
        "it should be false"
      );
    });
    it("should return false if a big nested object does not equal", () => {
      let actualData = [
        {
          cos_name: "atracker-cos",
          entitlement: "cloud_pak",
          kube_type: "openshift",
          kube_version: "default",
          machine_type: "bx2.16x64",
          name: "workload-cluster",
          resource_group: "slz-workload-rg",
          kms_config: {
            crk_name: "slz-roks-key",
            private_endpoint: true,
          },
          subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
          update_all_workers: false,
          vpc_name: "workload",
          worker_pools: [
            {
              entitlement: "cloud_pak",
              flavor: "bx2.16x64",
              name: "logging-worker-pool",
              subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
              vpc_name: "workload",
              workers_per_subnet: 2,
            },
          ],
          workers_per_subnet: 2,
        },
      ];
      let expectedData = [
        {
          cos_name: "atracker-cos",
          entitlement: "cloud_pak",
          kube_type: "openshift",
          kube_version: "default",
          machine_type: "bx2.16x64",
          name: "workload-cluster",
          resource_group: "slz-workload-rg",
          kms_config: {
            crk_name: "slz-roks-key",
            private_endpoint: true,
          },
          subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
          update_all_workers: false,
          vpc_name: "workload",
          worker_pools: [
            {
              entitlement: "cloud_pak",
              flavor: "bx2.16x64",
              name: "logging-worker-pool",
              subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
              vpc_name: "honk",
              workers_per_subnet: 2,
            },
          ],
          workers_per_subnet: 2,
        },
      ];
      assert.isFalse(deepEqual(actualData, expectedData), "it should be false");
    });
    it("should return true if a big nested object does equal", () => {
      let actualData = [
        {
          cos_name: "atracker-cos",
          entitlement: "cloud_pak",
          kube_type: "openshift",
          kube_version: "default",
          machine_type: "bx2.16x64",
          name: "workload-cluster",
          resource_group: "slz-workload-rg",
          kms_config: {
            crk_name: "slz-roks-key",
            private_endpoint: true,
          },
          subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
          update_all_workers: false,
          vpc_name: "workload",
          worker_pools: [
            {
              entitlement: "cloud_pak",
              flavor: "bx2.16x64",
              name: "logging-worker-pool",
              subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
              vpc_name: "workload",
              workers_per_subnet: 2,
            },
          ],
          workers_per_subnet: 2,
        },
      ];
      let expectedData = [
        {
          cos_name: "atracker-cos",
          entitlement: "cloud_pak",
          kube_type: "openshift",
          kube_version: "default",
          machine_type: "bx2.16x64",
          name: "workload-cluster",
          resource_group: "slz-workload-rg",
          kms_config: {
            crk_name: "slz-roks-key",
            private_endpoint: true,
          },
          subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
          update_all_workers: false,
          vpc_name: "workload",
          worker_pools: [
            {
              entitlement: "cloud_pak",
              flavor: "bx2.16x64",
              name: "logging-worker-pool",
              subnet_names: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
              vpc_name: "workload",
              workers_per_subnet: 2,
            },
          ],
          workers_per_subnet: 2,
        },
      ];
      assert.isTrue(deepEqual(actualData, expectedData), "it should be false");
    });
    it("should return true if both values are null", () => {
      assert.isTrue(deepEqual(null, null), "it should be true");
    });
  });
  describe("isWholeNumber", () => {
    it("should return true for whole number", () => {
      assert.isTrue(shortcuts.isWholeNumber(1), "it should be true");
    });
    it("should return false for not whole number", () => {
      assert.isFalse(shortcuts.isWholeNumber(1.2), "it should be false");
    });
  });
  describe("numberToZoneList", () => {
    it("should return correct zones", () => {
      let expectedData = ["zone-1", "zone-2", "zone-3"];
      let actualData = shortcuts.numberToZoneList(3);
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return correct zones"
      );
    });
  });
  describe("eachZone", () => {
    it("should run the callback for each zone", () => {
      let expectedData = ["zone-1", "zone-2", "zone-3"];
      let actualData = [];
      shortcuts.eachZone(3, (zone) => actualData.push(zone));
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return correct zones"
      );
    });
    it("should run the callback for each zone", () => {
      let actualData = [];
      shortcuts.eachZone(0, (zone) => actualData.push(zone));
      assert.deepEqual(
        actualData,
        [],
        "it should return correct zones"
      );
    });
  });
  describe("parseIntFromZone", () => {
    it("should parse int from zone", () => {
      let expectedData = 3;
      let actualData = shortcuts.parseIntFromZone("test-zone-3");
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return correct zone number"
      );
    });
  });
  describe("buildNumberDropdownList", () => {
    it("should return list with no add", () => {
      assert.deepEqual(
        shortcuts.buildNumberDropdownList(2),
        ["0", "1"],
        "it should return list"
      );
    });
    it("should return list with add", () => {
      assert.deepEqual(
        shortcuts.buildNumberDropdownList(2, 1),
        ["1", "2"],
        "it should return list"
      );
    });
  });
});
