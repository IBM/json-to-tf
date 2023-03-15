/**
 * default handle event change function
 * @param {event} event
 * @param {Object} event.target
 * @param {string} event.target.name name to set
 * @param {*} event.target.value value to set
 * @returns {Object} object with key of name set to value
 */
function eventTargetToNameAndValue(event) {
  let { name, value } = event.target;
  return setNameToValue(name, value);
}

/**
 * default handle toggle function
 * @param {string} fieldName name to set
 * @param {Object} stateData component state data
 * @returns {Object} object with key of field name set to boolean opposite in state
 */
function toggleStateBoolean(fieldName, stateData) {
  return { [fieldName]: !stateData[fieldName] };
}

function setNameToValue(name, value) {
  return { [name]: value };
}

module.exports = {
  eventTargetToNameAndValue,
  toggleStateBoolean,
  setNameToValue,
};
