const { assert } = require("chai");
const {
  toggleMarginBottom,
  addClassName,
  checkNullorEmptyString,
  prependEmptyStringWhenNull,
  invalidRegex,
  handleClusterInputChange,
} = require("../src/lib/form-utils");

describe("form-utils", () => {
  describe("addClassName", () => {
    it("should add classname if found", () => {
      assert.deepEqual(
        addClassName("hi", { className: "mom" }),
        "hi mom",
        "it should return class"
      );
    });
    it("should return classname if not found", () => {
      assert.deepEqual(addClassName("hi"), "hi", "it should return class");
    });
    it("should remove marginRight and not marginRightSmall if noMarginRight is passed as a param", () => {
      assert.deepEqual(
        addClassName("hi", {
          className: "mom marginRight marginRightSmall frog",
          noMarginRight: true,
        }),
        "hi mom marginRightSmall frog",
        "it should return class"
      );
    });
  });
  describe("toggleMarginBottom", () => {
    it("should return margin bottom small when adding margin bottom", () => {
      assert.deepEqual(
        toggleMarginBottom(true),
        "",
        "it should return className"
      );
    });
    it("should return empty string when not shown or toggle form", () => {
      assert.deepEqual(
        toggleMarginBottom(false),
        " marginBottomSmall",
        "it should return className"
      );
    });
  });
  describe("checkNullorEmptyString", () => {
    it("should return true if string input is empty", () => {
      assert.isTrue(checkNullorEmptyString(""), "it should be true");
    });
    it("should return true if input is null", () => {
      assert.isTrue(checkNullorEmptyString(null), "it should be true");
    });
    it("should return false otherwise", () => {
      assert.isFalse(checkNullorEmptyString("test"), "it should be false");
    });
  });
  describe("prependEmptyStringWhenNull", () => {
    it("should return array with empty string prepended if value is null", () => {
      assert.deepEqual(
        prependEmptyStringWhenNull(null, ["hi"]),
        ["", "hi"],
        "it should prepend empty string"
      );
    });
    it("should return array if value is not null", () => {
      assert.deepEqual(
        prependEmptyStringWhenNull("hm", ["hi"]),
        ["hi"],
        "it should not prepend empty string"
      );
    });
  });
  describe("invalidRegex", () => {
    it("should return false and with correct error text", () => {
      assert.deepEqual(
        invalidRegex(
          "scope_name",
          "test-name",
          /^[A-z]([a-z0-9-]*[a-z0-9])?$/i
        ),
        {
          invalid: false,
          invalidText: `Invalid scope_name. Must match regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`,
        }
      );
    });
    it("should return true and with correct error text", () => {
      assert.deepEqual(
        invalidRegex(
          "scope_name",
          "test name wrong",
          /^[A-z]([a-z0-9-]*[a-z0-9])?$/i
        ),
        {
          invalid: true,
          invalidText: `Invalid scope_name. Must match regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`,
        }
      );
    });
  });
  describe("handleClusterInputChange", () => {
    let testCluster = {
      name: "",
      resource_group: "",
      kube_type: "openshift",
      entitlement: "null",
      kms_config: { crk_name: "" },
      cos_name: "",
      vpc: "",
      subnets: [],
      workers_per_subnet: 2,
      machine_type: "",
      kube_version: "4.10.52_openshift (Default)",
      update_all_workers: false,
      worker_pools: [],
    };
    it("should return testCluster with new name: `foo`", () => {
      handleClusterInputChange("name", "foo", testCluster);
      assert.deepEqual(testCluster.name, "foo", "it should return true");
    });
    it("should return testCluster with new kube type: `IBM Kubernetes Service` (should reset cos_name and kube version)", () => {
      handleClusterInputChange(
        "kube_type",
        "IBM Kubernetes Service",
        testCluster
      );
      assert.deepEqual(testCluster.kube_type, "iks", "it should return true");
      assert.deepEqual(testCluster.cos_name, "", "it should return true");
      assert.deepEqual(testCluster.kube_version, "", "it should return true");
    });
    it("should return testCluster with new workers per subnet: `4`", () => {
      handleClusterInputChange("workers_per_subnet", "4", testCluster);
      assert.deepEqual(
        testCluster.workers_per_subnet,
        4,
        "it should return true"
      );
    });
    it("should return testCluster with new vpc name: `management` (should reset subnets)", () => {
      handleClusterInputChange("vpc", "management", testCluster);
      assert.deepEqual(
        testCluster.vpc,
        "management",
        "it should return true"
      );
      assert.deepEqual(testCluster.subnets, [], "it should return true");
    });
    it("should return testCluster with entitlement: `null`", () => {
      handleClusterInputChange("entitlement", "null", testCluster);
      assert.deepEqual(testCluster.entitlement, null, "it should return true");
    });
  });
});
