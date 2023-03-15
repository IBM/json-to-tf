/**
 * Utilities for CLI tools
 */

const { paramTest } = require("./values");
const { contains, containsKeys, eachKey, keys } = require("./shortcuts");

/**
 * Test for invalid or duplicate required flags
 * @param {string} command name of the command
 * @param {Object} aliases key map of key with allowed synonyms
 * @param  {...any} commandArgs List of arguments
 */
function flagTest(command, aliases, ...commandArgs) {
  paramTest(
    "flagTest",
    "command",
    "string",
    command,
    "aliases",
    "object",
    aliases
  );
  let flagMap = {};
  // Check for invalid and duplicate flags
  commandArgs.forEach((flag) => {
    // if flag starts with -
    if (flag.indexOf("-") === 0) {
      if (!containsKeys(aliases, flag)) {
        // throw if invalid flag
        throw `\nInvalid flag ${flag} for command ${command}.`;
      } else {
        if (!containsKeys(flagMap, flag)) {
          // otherwise add flag and alias to map
          flagMap[flag] = flag;
          flagMap[aliases[flag]] = flag;
        } else {
          // throw if duplicate flag
          throw `\nInvalid duplicate flag ${flag}.\n`;
        }
      }
    }
  });
  // create list of required keys
  let requiredKeys = [];
  eachKey(aliases, (key) => {
    // a key is required if the alias does not begin with ?
    if (key.indexOf("?") !== 0) requiredKeys.push(key);
  });
  if (requiredKeys.length !== keys(flagMap).length) {
    // If the number of keys does not match the length of needed flags
    // create an error string
    let errString = `\nMissing flags from command '${command}':`;
    eachKey(aliases, (alias) => {
      if (alias.indexOf("--") !== -1) {
        errString += ` ${alias}`;
      }
    });
    throw `${errString}`;
  }
}

/**
 * Create key value pairs from list of command arguments
 * @param {string} command name of command
 * @param {Object} action action
 * @param {Array} action.requiredFlags Flags required by the action
 * @param {?Array} action.optionalFlags Optional flags
 * @param {Object} tags key value pair of tags
 * @param  {...any} commandArgs command line arguments
 * @returns {Object} object containing key value pairs of params from tags
 */
function flagValues(command, action, tags, ...commandArgs) {
  paramTest(
    "flagValues",
    "command",
    "string",
    command,
    "action",
    "object",
    action,
    "tags",
    "object",
    tags
  );
  // Get aliases
  let aliases = getVerbActions(action, tags);
  // Get list of flags
  let flagList = replaceOptionalFlags(action, tags, ...commandArgs);
  // Test for incorrect data
  flagTest(command, aliases, ...flagList);
  // Object to return
  let flagData = {};
  // create an object where each tag is converted to tag name for data
  let tagToName = {};
  eachKey(tags, (key) => {
    tags[key].forEach((alias) => (tagToName[alias] = key));
  });
  //create an array to check if flag names do match if they have no matching value
  let noMatchingValueFlagNames = [];
  action.optionalFlags.forEach((flag) => {
    if (flag?.noMatchingValue) {
      noMatchingValueFlagNames.push(tags[flag.name].join("|"));
    }
  });
  //create a regular expression for the no matching flag names
  let noMatchingValueRegex = new RegExp(
    `\\?(${noMatchingValueFlagNames.join("|")})`
  );

  // While flags still exist in list
  while (flagList.length > 0) {
    let flag = flagList.shift(); // Flag
    let flagName =
      tagToName[
        flag.replace(
          /(\?|\*)/g, // the regex-to-words do not work
          ""
        )
      ];
    //if not a * and does not require a matching value we set flagData at the flagName to true
    if (
      flag.indexOf("*") === -1 &&
      flag.match(noMatchingValueRegex) &&
      noMatchingValueFlagNames.length > 0
    ) {
      flagData[flagName] = true;
    } else {
      let flagValue = flagList.shift(); // Flag Value
      // Replace ? and * for optional flags
      if (flag.indexOf("*") === -1) {
        // if not multiple, set to flag value
        flagData[flagName] = flagValue.replace(/\"/g, "");
      } else {
        if (containsKeys(flagData, flagName)) {
          // Add to existing array
          flagData[flagName].push(flagValue);
        } else {
          // Create new array
          flagData[flagName] = [flagValue];
        }
      }
    }
  }
  return flagData;
}

/**
 * Get actions from a verb object
 * @param {Object} action action
 * @param {Array} action.requiredFlags Flags required by the action
 * @param {Array} action.optionalFlags Optional flags
 * @param {Object} tags tags object
 * @returns {Object} Aliases for the verb
 */
function getVerbActions(action, tags) {
  let flags = action.requiredFlags;
  let requiredFlags = {};
  eachKey(tags, (tag) => {
    if (contains(flags, tag)) {
      requiredFlags[tags[tag][0]] = tags[tag][1];
      requiredFlags[tags[tag][1]] = tags[tag][0];
    }
  });
  if (containsKeys(action, "optionalFlags")) {
    action.optionalFlags.forEach((optionalFlag) => {
      let firstTagValue = `?${optionalFlag?.allowMultiple ? "*" : ""}${
        tags[optionalFlag.name][0]
      }`;
      let secondTagValue = `?${optionalFlag?.allowMultiple ? "*" : ""}${
        tags[optionalFlag.name][1]
      }`;
      requiredFlags[firstTagValue] = secondTagValue;
      requiredFlags[secondTagValue] = firstTagValue;
    });
  }
  return requiredFlags;
}

/**
 * Replace optional flags from command args to denote multiple and optional flags
 * @param {Object} action action
 * @param {Array} action.requiredFlags Flags required by the action
 * @param {?Array} action.optionalFlags Optional flags
 * @param {Object} tags tags object
 * @param  {...any} commandArgs List of arguments
 * @returns {Array<string} Modified list of commang args
 */
function replaceOptionalFlags(action, tags, ...commandArgs) {
  let flagList = commandArgs; // Command args as array
  let optionalArguments = []; // Optional args
  let multiArguments = []; // Multiple arguments
  let replacedFlags = []; // list of flags to return replaced
  // If contains optional flags
  if (containsKeys(action, "optionalFlags")) {
    // For each optional flag
    action.optionalFlags.forEach((flag) => {
      // Add to optional list
      optionalArguments = optionalArguments.concat(tags[flag.name]);
      if (flag?.allowMultiple) {
        // If multiple arguments, add to multi
        multiArguments = multiArguments.concat(tags[flag.name]);
      }
    });
    // For each argument
    flagList.forEach((flag) => {
      // if it is optional
      const firstSlashRegExp = /-/i;
      if (contains(optionalArguments, flag)) {
        // Replace first - with ?*- if multiple and ?- if not
        replacedFlags.push(
          flag.replace(
            firstSlashRegExp,
            `?${contains(multiArguments, flag) ? "*" : ""}-`
          )
        );
      } else {
        replacedFlags.push(flag);
      }
    });
    return replacedFlags;
  } else {
    return commandArgs;
  }
}

module.exports = {
  flagTest,
  flagValues,
  getVerbActions,
  replaceOptionalFlags,
};
