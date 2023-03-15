/**
 * create a composed class name
 * @param {string} className name of classes to add
 * @param {*} props arbitrary props
 * @param {string=} props.className additional classnames
 */
function addClassName(className, props) {
  let composedClassName = className;
  if (props?.className) {
    composedClassName += " " + props.className;
    if (props.noMarginRight === true) {
      composedClassName = composedClassName.replace(/\s?marginRight\b/g, "");
    }
  }
  return composedClassName;
}

/** check if input is null or empty string
 * @param {string} input
 * @returns {boolean} true if str null or ""
 */
function checkNullorEmptyString(input) {
  if (input === null || input === "") return true;
  else return false;
}

/**
 * preprend [""] to an existing array if check is true
 * @param {*} value check value if it is null or empty string
 * @param {Array<string>} arr
 */
function prependEmptyStringWhenNull(value, arr) {
  let arrayCheck = checkNullorEmptyString(value);
  let prependArray = arrayCheck ? [""] : [];
  return prependArray.concat(arr);
}

/**
 * add margin bottom to subform chevron
 * @param {*} componentProps
 * @returns {string} additional classNames
 */
function toggleMarginBottom(hide) {
  if (hide === false) return " marginBottomSmall";
  else return "";
}

/**
 * Function that determines invalid state and invalid text for scc fields: scope_name, scope_description, and collector_description
 * @param {string} name field name
 * @param {string} value field value
 * @param {RegExp} regex regular expression to verify value
 * @returns {object} object containing invalid boolean and invalidText string
 */
function invalidRegex(name, value, regex) {
  return {
    invalid: value.match(regex) === null,
    invalidText: `Invalid ${name}. Must match regular expression: ${regex}`,
  };
}

/**
 * Function that handles cluster input change
 * @param {string} name field name
 * @param {string} value field value
 * @returns {object} updated cluster object
 */
function handleClusterInputChange(name, value, stateData) {
  const kubeTypes = { OpenShift: "openshift", "IBM Kubernetes Service": "iks" };
  let cluster = stateData;
  if (name === "kube_type") {
    cluster[name] = kubeTypes[value];
    cluster.cos_name = "";
    cluster.kube_version = ""; // reset kube version on change
  } else if (name === "workers_per_subnet") {
    cluster[name] = Number(value);
  } else if (name === "vpc_name") {
    cluster[name] = value;
    cluster.subnets = [];
  } else {
    cluster[name] = value === "null" ? null : value;
  }
  return cluster;
}

module.exports = {
  addClassName,
  toggleMarginBottom,
  prependEmptyStringWhenNull,
  checkNullorEmptyString,
  invalidRegex,
  handleClusterInputChange,
};
