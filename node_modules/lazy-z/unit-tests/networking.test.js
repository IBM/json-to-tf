const { assert } = require("chai");
const { formatCidrBlock, buildNetworkingRule } = require("../lib/networking");

describe("networking", () => {
  describe("formatCidrBlock", () => {
    it("should throw an error if an incorrect zone is passed", () => {
      let task = () => formatCidrBlock(0, 4, 0);
      assert.throws(task, "Zone must be 1, 2, or 3.");
    });
    it("should format the CIDR block for edge vpc", () => {
      let actualData = formatCidrBlock(0, 1, 0, true);
      let expectedData = "10.5.10.0/24";
      assert.deepEqual(
        actualData,
        expectedData,
        "it should create correct cidr block"
      );
    });
    it("should format the CIDR block for vpc", () => {
      let actualData = formatCidrBlock(0, 1, 0);
      let expectedData = "10.10.10.0/24";
      assert.deepEqual(
        actualData,
        expectedData,
        "it should create correct cidr block"
      );
    });
  });
  describe("buildNetworkingRule", () => {
    it("should build the correct rule with no protocol for acl", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule(
        {
          name: "allow-ibm-inbound",
          allow: true,
          inbound: true,
          source: "161.26.0.0/16",
          destination: "10.0.0.0/8",
        },
        true
      );
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with no protocol for acl outbound/deny", () => {
      let expectedData = {
        action: "deny",
        destination: "10.0.0.0/8",
        direction: "outbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule(
        {
          name: "allow-ibm-inbound",
          allow: false,
          inbound: false,
          source: "161.26.0.0/16",
          destination: "10.0.0.0/8",
        },
        true
      );
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with icmp protocol for acl", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: 1,
          code: 2,
        },
        tcp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule(
        {
          name: "allow-ibm-inbound",
          allow: true,
          inbound: true,
          source: "161.26.0.0/16",
          destination: "10.0.0.0/8",
          ruleProtocol: "icmp",
          rule: {
            code: 2,
            type: 1,
          },
        },
        true
      );
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with icmp protocol for acl with only code", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: 2,
        },
        tcp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule(
        {
          name: "allow-ibm-inbound",
          allow: true,
          inbound: true,
          source: "161.26.0.0/16",
          destination: "10.0.0.0/8",
          ruleProtocol: "icmp",
          rule: {
            code: 2,
          },
        },
        true
      );
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with icmp protocol for acl with only type", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: 2,
          code: null,
        },
        tcp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule({
        name: "allow-ibm-inbound",
        allow: true,
        inbound: true,
        source: "161.26.0.0/16",
        destination: "10.0.0.0/8",
        ruleProtocol: "icmp",
        rule: {
          type: 2,
        },
      }, true);
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with tcp protocol for acl", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: 8080,
          port_max: 8080,
          source_port_min: 443,
          source_port_max: 443,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule({
        name: "allow-ibm-inbound",
        allow: true,
        inbound: true,
        source: "161.26.0.0/16",
        destination: "10.0.0.0/8",
        ruleProtocol: "tcp",
        rule: {
          port_min: 8080,
          port_max: 8080,
          source_port_min: 443,
          source_port_max: 443,
        },
      }, true);
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with tcp protocol for acl with only port min", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: 8080,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule({
        name: "allow-ibm-inbound",
        allow: true,
        inbound: true,
        source: "161.26.0.0/16",
        destination: "10.0.0.0/8",
        ruleProtocol: "tcp",
        rule: {
          port_min: 8080,
        },
      }, true);
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with tcp protocol for acl with only port max", () => {
      let expectedData = {
        action: "allow",
        destination: "10.0.0.0/8",
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: null,
          port_max: 8080,
          source_port_min: null,
          source_port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
          source_port_min: null,
          source_port_max: null,
        },
      };
      let actualData = buildNetworkingRule({
        name: "allow-ibm-inbound",
        allow: true,
        inbound: true,
        source: "161.26.0.0/16",
        destination: "10.0.0.0/8",
        ruleProtocol: "tcp",
        rule: {
          port_max: 8080,
        },
      }, true);
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with no protocol for security group", () => {
      let expectedData = {
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: null,
          port_max: null,
        },
        udp: {
          port_min: null,
          port_max: null,
        },
      };
      let actualData = buildNetworkingRule({
        name: "allow-ibm-inbound",
        allow: true,
        inbound: true,
        source: "161.26.0.0/16",
        destination: "10.0.0.0/8",
      });
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
    it("should build the correct rule with tcp protocol for security group", () => {
      let expectedData = {
        direction: "inbound",
        name: "allow-ibm-inbound",
        source: "161.26.0.0/16",
        icmp: {
          type: null,
          code: null,
        },
        tcp: {
          port_min: 443,
          port_max: 443,
        },
        udp: {
          port_min: null,
          port_max: null,
        },
      };
      let actualData = buildNetworkingRule({
        name: "allow-ibm-inbound",
        allow: true,
        inbound: true,
        source: "161.26.0.0/16",
        destination: "10.0.0.0/8",
        ruleProtocol: "tcp",
        rule: {
          port_max: 443,
          port_min: 443,
        },
      });
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return networking rule"
      );
    });
  });
});
