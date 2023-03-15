const { validPortRange } = require("./numbers");
const { validIpv4Test } = require("./shortcuts");
const { paramTest, containsCheck, zoneTest } = require("./values");

/**
 * format a cidr block with 256 ips to be calculated programatticaly
 * @param {number} vpc index of vpc within architecture
 * @param {number} zone zone, can be 1, 2, or 3
 * @param {number} tier index of subnet tier
 * @param {boolean=} isEdge is edge network
 * @returns {string} network cidr
 */
function formatCidrBlock(vpc, zone, tier, isEdge) {
  paramTest(
    "formatCidrBlock",
    "vpc",
    "number",
    vpc,
    "zone",
    "number",
    zone,
    "tier",
    "number",
    tier
  );
  zoneTest(zone);
  let zoneMultiplier = isEdge ? 4 + zone : vpc * 3 + zone + "0";
  return `10.${zoneMultiplier}.${tier + 1}0.0/24`;
}

/**
 * Build a networking rule
 * @param {Object} params networking rule params
 * @param {string} params.name name of acl rule
 * @param {boolean} params.allow true to allow, false to deny
 * @param {boolean} params.inbound true for inbound, false for outbound
 * @param {string} params.source cidr block or ip
 * @param {string} params.destination cidr block or ip. if creating a security group rule, use `null`
 * @param {string=} params.ruleProtocol optional. can be `icmp`, `tcp`, or `udp`
 * @param {Object=} params.rule object describing traffic rule if using rule type
 * @param {number} params.rule.code code for icmp rules
 * @param {number} params.rule.type code for icmp rules
 * @param {number} params.rule.port_min port_min for tcp and udp rules
 * @param {number} params.rule.port_max port_max for tcp and udp rules
 * @param {number} params.rule.source_port_min source_port_min for tcp and udp rules
 * @param {number} params.rule.source_port_max source_port_max for tcp and udp rules
 * @param {boolean=} isAcl is acl rule, false if is security group
 * @returns {Object} network acl object
 */
function buildNetworkingRule(params, isAcl) {
  // new networking rule
  let newRule = {
    name: params.name,
    action: params.allow ? "allow" : "deny",
    direction: params.inbound ? "inbound" : "outbound",
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
    source: params.source,
  };
  // test valid cidr for source
  validIpv4Test("buildNetworkingRule params.source", params.source);
  // add additional values if is acl
  if (isAcl) {
    newRule.destination = params.destination;
    newRule.tcp.source_port_min = null;
    newRule.tcp.source_port_max = null;
    newRule.udp.source_port_min = null;
    newRule.udp.source_port_max = null;
    validIpv4Test("buildNetworkingRule params.destination", params.destination);
  } else {
    delete newRule.action;
  }
  // if is a protocol rule
  if (params.ruleProtocol && params.ruleProtocol !== "all") {
    // check that the type is valid
    containsCheck(
      "buildNetworkingRule expects rule type",
      ["icmp", "udp", "tcp"],
      params.ruleProtocol
    );
    if (params.ruleProtocol === "icmp") {
      ["type", "code"].forEach((field) =>
        setPort(params, newRule, field, "icmp", isAcl)
      );
    } else {
      ["port_min", "port_max"]
        .concat(isAcl ? ["source_port_min", "source_port_max"] : [])
        .forEach((field) =>
          setPort(params, newRule, field, params.ruleProtocol, isAcl)
        );
    }
  }

  // return object
  return newRule;
}

/**
 * set port on networking rule
 * @param {Object} params networking rule params
 * @param {string} params.name name of acl rule
 * @param {boolean} params.allow true to allow, false to deny
 * @param {boolean} params.inbound true for inbound, false for outbound
 * @param {string} params.source cidr block or ip
 * @param {string} params.destination cidr block or ip. if creating a security group rule, use `null`
 * @param {string=} params.ruleProtocol optional. can be `icmp`, `tcp`, or `udp`
 * @param {Object=} params.rule object describing traffic rule if using rule type
 * @param {number} params.rule.code code for icmp rules
 * @param {number} params.rule.type code for icmp rules
 * @param {number} params.rule.port_min port_min for tcp and udp rules
 * @param {number} params.rule.port_max port_max for tcp and udp rules
 * @param {number} params.rule.source_port_min source_port_min for tcp and udp rules
 * @param {number} params.rule.source_port_max source_port_max for tcp and udp rules
 * @param {object} newRule new rule object
 * @param {string} name name of the path to set
 * @param {string} protocol rule protocol
 * @param {boolean=} isAcl is acl rule, false if is security group
 * @returns {Object} network acl object
 */
function setPort(params, newRule, name, protocol, isAcl) {
  if (params.rule[name]) {
    validPortRange(name, params.rule[name]);
    newRule[protocol][name] = params.rule[name];
  } else {
    newRule[protocol][name] = null;
  }
}

module.exports = {
  formatCidrBlock,
  buildNetworkingRule,
};
