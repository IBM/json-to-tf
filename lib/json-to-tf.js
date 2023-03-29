const {
  eachKey,
  isString,
  contains,
  getType,
  isArrayOfObjects,
  hclEncode,
  keys,
  isArray,
} = require("lazy-z");
const flute = require("little-flute");
const { matchLength } = require("./json-to-tf-legacy");
const { sortKeys } = require("./utils");
const lastCommaExp = /,(?=$)/g;

/**
 * get longest key of a function with a value that is string, bool, number, or null
 * @param {*} obj object
 * @returns {number} length of longest key
 */
function getLongestInlineKey(obj) {
  let longest = 0;
  eachKey(obj, (key) => {
    if (
      !isArray(obj[key]) &&
      (getType(obj[key]) !== "object" || obj[key] === null) &&
      key.length > longest
    ) {
      longest = key.length;
    }
  });
  return longest;
}

/**
 * format a value that is not an object or array. will format strings to match
 * terraform interpolation syntax
 * @param {*} value
 * @returns {*} formatted value
 */
function formatDirectValue(value) {
  if (isString(value)) {
    if (value.match(/^\$\{[^}]+\}$/g) === null) {
      return `"${value}"`;
    } else {
      return value.replace(/(\$|\{|})/g, "");
    }
  } else return value;
}

/**
 * create terraform data for inside terraform block based on object
 * @param {*} data terraform values object
 * @param {number} offset number of spaces to indent on recursion
 * @param {boolean} isModule run special case if module
 * @returns {string} stringified terraform data
 */
function tfData(data, offset, isModule) {
  let str = ""; // return string
  let frontSpace = "\n" + matchLength("", (offset || 0) + 2); // leading space for each line
  let nextOffset = frontSpace.length - 1; // next offset for recursion
  let longestInlineKey = getLongestInlineKey(data); // match length target
  let sortedKeys = sortKeys(data); // get sorted keys

  /**
   * format blocks with name (provisioner, backend)
   * @param {string} kind name of block
   * @param {*} data data object
   */
  function blockWithName(kind, data) {
    let indexKey = keys(data)[0];
    str += `${frontSpace}${kind} "${indexKey}" {`;
    str += tfData(data[indexKey], nextOffset);
    str += frontSpace + "}";
  }

  // for each sorted key
  sortedKeys.forEach((key) => {
    let dataType = getType(data[key]);
    if (key === "provisioner") {
      // handle provisoner block
      data[key].forEach((provisioner) => {
        blockWithName("provisioner", provisioner);
      });
    } else if (key === "backend" && !isString(data[key])) {
      // handle backend block within terraform object
      blockWithName("backend", data[key]);
    } else if (
      contains(["string", "number", "boolean"], dataType) ||
      data[key] === null
    ) {
      // handle directly tranlated values
      str += `${frontSpace}${matchLength(
        key,
        longestInlineKey
      )} = ${formatDirectValue(data[key])}`;
    } else if (dataType === "object") {
      str += `${frontSpace}${key}${key === "required_providers" ? "" : " ="} {`;
      str += tfData(data[key], nextOffset) + frontSpace + "}"; // remove newline from length
    } else if (isArrayOfObjects(data[key]) && isModule) {
      // for module, encode arrays of objects using hcl
      let arrHcl = hclEncode({ [key]: data[key] }, false, nextOffset).split(
        "\n"
      );
      let formatedArrHcl = "\n";
      arrHcl.forEach((line) => {
        formatedArrHcl += line + "\n";
      });
      str += formatedArrHcl.replace(/\n$/, "");
    } else if (isArrayOfObjects(data[key])) {
      // handle touples
      data[key].forEach((item) => {
        str += frontSpace + key + " {";
        str += tfData(item, offset + 2);
        str += frontSpace + "}";
      });
    } else {
      // handle arrays
      str += `${frontSpace}${key} = [`;
      data[key].forEach((item) => {
        str +=
          frontSpace +
          matchLength("", offset === 0 ? 2 : offset) +
          formatDirectValue(item) +
          ",";
      });
      str = str.replace(lastCommaExp, "");
      str += `${frontSpace}]`;
    }
  });
  return str;
}


/**
 * format a terraform block
 * @param {string} style name of block (terraform, resource)
 * @param {string} name name of the resource
 * @param {*} data 
 * @returns 
 */
function formatTfBlock(style, name, data) {
  let tf = "";
  if (contains(["terraform", "provider", "module"], style)) {
    tf += `${style}${style === "terraform" ? "" : ` "${name}"`} {`;
    tf += tfData(data, 0, true);
    tf += `\n}`;
  } else {
    tf += `${style} ${name} {`;
    tf += tfData(data, 0);
    tf += `\n}`;
  }
  return tf;
}

/**
 * convert json to tf
 * @param {string} jsonStr  string
 * @returns {string} terraform string
 */
function jsonToTf(jsonStr) {
  let data = new flute(jsonStr).parse();
  let tf = "";
  function getResourceTf(resources, isData) {
    eachKey(resources, (instance) => {
      let type = instance;
      let data = resources[instance];
      eachKey(data, (name) => {
        let values = data[name];
        tf +=
          formatTfBlock(
            isData ? "data" : "resource",
            `"${type}" "${name}"`,
            values
          ) + "\n\n";
      });
    });
  }
  ["resource", "data"].forEach((key) => {
    if (data[key]) getResourceTf(data[key], key === "data");
  });

  if (data.module) {
    eachKey(data.module, (tfModule) => {
      tf += formatTfBlock(
        "module",
        data.module[tfModule]["//"].metadata.uniqueId,
        data.module[tfModule]
      );
    });
  }

  if (data.provider) {
    eachKey(data.provider, (provider) => {
      data.provider[provider].forEach((instance) => {
        tf += formatTfBlock("provider", provider, instance);
      });
    });
  }

  if (data.terraform) {
    tf += formatTfBlock("terraform", false, data.terraform);
  }

  return tf.replace(/\n\n*$/g, "");
}

module.exports = { jsonToTf };
