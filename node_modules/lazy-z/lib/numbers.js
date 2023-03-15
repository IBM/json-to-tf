const { contains } = require("./shortcuts");
const { stringify } = require("./strings");
const { paramTest, getType } = require("./values");

function isInRange(value, min, max) {
  paramTest(
    "isInRange",
    "value",
    "number",
    value,
    "min",
    "number",
    min,
    "max",
    "number",
    max
  );
  if (min > max) {
    throw new Error(
      `isInRange expects min(${min}) to be less than or equal to max(${max}).`
    );
  }
  return parseInt(value) >= min && parseInt(value) <= max;
}

/**
 * check for valid port range
 * @param {string} name name of the field
 * @param {*} value
 * @returns {boolean} true if valid, false if not
 */

function validPortRange(name, value) {
  paramTest("validPortRange", "name", "string", name);
  if (
    !contains(
      [
        "type",
        "code",
        "port_min",
        "port_max",
        "source_port_min",
        "source_port_max",
      ],
      name
    )
  ) {
    throw new Error(
      `Name must be one of the following: ["type","code","port_min","port_max","source_port_min","source_port_max"] got ${name}`
    );
  }
  let numberValue = parseInt(value);
  if (stringify(numberValue) === "NaN")
    throw new Error(
      `validPortRange expects an integer to be parsed from value. Got type of ${getType(
        value
      )} for value ${value}.`
    );
  let isIcmp = contains(["type", "code"], name);
  if (isIcmp) {
    let icmpMax = name === "type" ? 254 : 255;
    return isInRange(numberValue, 0, icmpMax);
  } else {
    return isInRange(numberValue, 1, 65535);
  }
}

module.exports = {
  isInRange,
  validPortRange,
};
