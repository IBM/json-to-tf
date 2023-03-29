const {
  contains,
  getType,
  keys,
  isArray,
} = require("lazy-z");


/**
 * sort terraform keys
 * @param {*} data terraform data object
 * @returns {Array<string>}
 */
function sortKeys(data) {
  let keyList = keys(data);
  if (contains(keyList, "//")) {
    keyList.shift();
  }
  keyList = keyList.sort((a, b) => {
    let aIsObjOrArr = getType(data[a]) === "object" || isArray(data[a]);
    let bIsObjOrArr = getType(data[b]) === "object" || isArray(data[b]);
    if (aIsObjOrArr && bIsObjOrArr) return 0;
    if (aIsObjOrArr) return 1;
    if (bIsObjOrArr || a === "source") return -1;
    else return 0;
  });
  return keyList;
}

module.exports = {
  sortKeys,
};
