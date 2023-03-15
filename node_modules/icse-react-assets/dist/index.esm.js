import '@carbon/styles/css/styles.css';
import { Popover, PopoverContent, Button, StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody, Toggletip, ToggletipButton, ToggletipContent, Link, Select, SelectItem, Tile, Modal, Toggle, TextInput, Form, FilterableMultiSelect, PasswordInput, NumberInput, TextArea, Tabs, TabList, Tab, TabPanels, TabPanel, Dropdown } from '@carbon/react';
import lazyZ, { isNullOrEmptyString as isNullOrEmptyString$3, kebabCase as kebabCase$2, isEmpty, buildNumberDropdownList, titleCase as titleCase$1, snakeCase, isBoolean, prettyJSON, isFunction as isFunction$1, contains as contains$1, transpose as transpose$1, allFieldsNull, containsKeys, capitalize as capitalize$1, deepEqual, parseIntFromZone } from 'lazy-z';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Save, Add, CloseFilled, Edit, TrashCan, ArrowUp, ArrowDown, Information, CloudAlerting, Password, WarningAlt } from '@carbon/icons-react';
import regexButWithWords from 'regex-but-with-words';

/**
 * create a composed class name
 * @param {string} className name of classes to add
 * @param {*} props arbitrary props
 * @param {string=} props.className additional classnames
 */
function addClassName$1(className, props) {
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
function checkNullorEmptyString$1(input) {
  if (input === null || input === "") return true;else return false;
}

/**
 * preprend [""] to an existing array if check is true
 * @param {*} value check value if it is null or empty string
 * @param {Array<string>} arr
 */
function prependEmptyStringWhenNull$1(value, arr) {
  let arrayCheck = checkNullorEmptyString$1(value);
  let prependArray = arrayCheck ? [""] : [];
  return prependArray.concat(arr);
}

/**
 * add margin bottom to subform chevron
 * @param {*} componentProps
 * @returns {string} additional classNames
 */
function toggleMarginBottom$1(hide) {
  if (hide === false) return " marginBottomSmall";else return "";
}

/**
 * Function that determines invalid state and invalid text for scc fields: scope_name, scope_description, and collector_description
 * @param {string} name field name
 * @param {string} value field value
 * @param {RegExp} regex regular expression to verify value
 * @returns {object} object containing invalid boolean and invalidText string
 */
function invalidRegex$1(name, value, regex) {
  return {
    invalid: value.match(regex) === null,
    invalidText: `Invalid ${name}. Must match regular expression: ${regex}`
  };
}

/**
 * Function that handles cluster input change
 * @param {string} name field name
 * @param {string} value field value
 * @returns {object} updated cluster object
 */
function handleClusterInputChange$1(name, value, stateData) {
  const kubeTypes = {
    OpenShift: "openshift",
    "IBM Kubernetes Service": "iks"
  };
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
var formUtils = {
  addClassName: addClassName$1,
  toggleMarginBottom: toggleMarginBottom$1,
  prependEmptyStringWhenNull: prependEmptyStringWhenNull$1,
  checkNullorEmptyString: checkNullorEmptyString$1,
  invalidRegex: invalidRegex$1,
  handleClusterInputChange: handleClusterInputChange$1
};

const {
  kebabCase: kebabCase$1
} = lazyZ;

/**
 * format input placeholder
 * @param {string} componentName
 * @param {string} fieldName
 * @returns {string} placeholder name
 */
function formatInputPlaceholder$1(componentName, fieldName) {
  return `my-${kebabCase$1(componentName)}-${kebabCase$1(fieldName)}`;
}
var textUtils = {
  formatInputPlaceholder: formatInputPlaceholder$1
};

/**
 * create classname for sub form chevron save button
 * @param {*} componentProps
 * @returns {string} classNames for button
 */
function saveChangeButtonClass$1(componentProps) {
  let className = "forceTertiaryButtonStyles";
  if (componentProps.noDeleteButton !== true) className += " marginRightSmall";
  if (componentProps.disabled !== true) className += " tertiaryButtonColors";
  return className;
}
var buttonUtils = {
  saveChangeButtonClass: saveChangeButtonClass$1
};

/**
 * default handle event change function
 * @param {event} event
 * @param {Object} event.target
 * @param {string} event.target.name name to set
 * @param {*} event.target.value value to set
 * @returns {Object} object with key of name set to value
 */
function eventTargetToNameAndValue$2(event) {
  let {
    name,
    value
  } = event.target;
  return setNameToValue$2(name, value);
}

/**
 * default handle toggle function
 * @param {string} fieldName name to set
 * @param {Object} stateData component state data
 * @returns {Object} object with key of field name set to boolean opposite in state
 */
function toggleStateBoolean$2(fieldName, stateData) {
  return {
    [fieldName]: !stateData[fieldName]
  };
}
function setNameToValue$2(name, value) {
  return {
    [name]: value
  };
}
var methodFunctions = {
  eventTargetToNameAndValue: eventTargetToNameAndValue$2,
  toggleStateBoolean: toggleStateBoolean$2,
  setNameToValue: setNameToValue$2
};

const {
  toggleMarginBottom,
  addClassName,
  prependEmptyStringWhenNull,
  checkNullorEmptyString,
  invalidRegex,
  handleClusterInputChange
} = formUtils;
const {
  formatInputPlaceholder
} = textUtils;
const {
  saveChangeButtonClass
} = buttonUtils;
const {
  eventTargetToNameAndValue: eventTargetToNameAndValue$1,
  toggleStateBoolean: toggleStateBoolean$1,
  setNameToValue: setNameToValue$1
} = methodFunctions;
var lib = {
  toggleMarginBottom,
  addClassName,
  prependEmptyStringWhenNull,
  checkNullorEmptyString,
  formatInputPlaceholder,
  saveChangeButtonClass,
  eventTargetToNameAndValue: eventTargetToNameAndValue$1,
  toggleStateBoolean: toggleStateBoolean$1,
  setNameToValue: setNameToValue$1,
  invalidRegex,
  handleClusterInputChange
};
var lib_1 = lib.toggleMarginBottom;
var lib_2 = lib.addClassName;
var lib_3 = lib.prependEmptyStringWhenNull;
var lib_4 = lib.checkNullorEmptyString;
var lib_5 = lib.formatInputPlaceholder;
var lib_6 = lib.saveChangeButtonClass;
var lib_10 = lib.invalidRegex;
var lib_11 = lib.handleClusterInputChange;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$g = ".popover-box {\n  padding: 5px;\n  position: relative;\n  font-size: 80%;\n  top: 20px;\n}\n\n.cds--popover--open .cds--popover-content {\n  position: relative;\n  z-index: 9001;\n}";
styleInject(css_248z$g);

/**
 * Wrapper for carbon popover component to handle individual component mouseover
 */
var PopoverWrapper = /*#__PURE__*/function (_React$Component) {
  _inherits(PopoverWrapper, _React$Component);
  var _super = _createSuper(PopoverWrapper);
  function PopoverWrapper(props) {
    var _this;
    _classCallCheck(this, PopoverWrapper);
    _this = _super.call(this, props);
    _this.state = {
      isHovering: false
    };
    _this.handleMouseOver = _this.handleMouseOver.bind(_assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle mouse over
   */
  _createClass(PopoverWrapper, [{
    key: "handleMouseOver",
    value: function handleMouseOver() {
      this.setState({
        isHovering: true
      });
    }

    /**
     * handle mouse out
     */
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut() {
      this.setState({
        isHovering: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.noPopover === true || this.props.hoverText === "" ? this.props.children : /*#__PURE__*/React.createElement("div", {
        className: lib_2("popover-obj", this.props),
        onMouseEnter: this.handleMouseOver,
        onMouseLeave: this.handleMouseOut
      }, /*#__PURE__*/React.createElement(Popover, {
        open: this.state.isHovering,
        autoAlign: this.props.align ? false : true,
        dropShadow: false,
        highContrast: true,
        caret: false,
        align: this.props.align
      }, this.props.children, /*#__PURE__*/React.createElement(PopoverContent, {
        className: "popover-box" + (this.props.contentClassName ? " ".concat(this.props.contentClassName) : "")
      }, this.props.hoverText)));
    }
  }]);
  return PopoverWrapper;
}(React.Component);
PopoverWrapper.defaultProps = {
  noPopover: false
};
PopoverWrapper.propTypes = {
  noPopover: PropTypes.bool,
  hoverText: PropTypes.string.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.node.isRequired
};

var css_248z$f = ".chevron {\n  margin-right: 1rem;\n  margin-top: 0.25rem;\n  cursor: pointer;\n}\n\n.tertiaryButtonColors {\n  color: #0f62fe !important;\n  fill: white !important;\n  border-color: #0f62fe !important;\n}\n\n.pointerEventsNone {\n  pointer-events: none;\n}\n\n.cursorNotAllowed {\n  cursor: not-allowed;\n}\n\n.forceTertiaryButtonStyles {\n  padding-right: 0.4375rem !important;\n  padding-left: 0.4375rem !important;\n}\n.inlineBlock {\n  display: inline-block;\n}\n\n.redFill {\n  fill: #da1e28 !important;\n}\n\n/* CSS for overriding default component styles */\n.cds--btn--ghost:focus {\n  outline: none;\n  border: none;\n  box-shadow: none;\n}\n\n.marginRightSmall {\n  margin-right: 0.5rem !important; \n}\n";
styleInject(css_248z$f);

/**
 * generate save icon
 * @param {object} props
 * @param {boolean} props.saveIsDisabled true if disabled
 * @returns Save Icon
 */
var SaveIcon = function SaveIcon(props) {
  return /*#__PURE__*/React.createElement(Save, {
    className: props.disabled ? "" : "tertiaryButtonColors"
  });
};

/**
 * save add button
 * @param {*} props
 * @returns Save add button
 */
var SaveAddButton = function SaveAddButton(props) {
  return /*#__PURE__*/React.createElement(PopoverWrapper, {
    hoverText: props.type === "add" && props.hoverText === "Save Changes" ? "Add Resource" : props.hoverText,
    className: (props.disabled ? "inlineBlock cursorNotAllowed" : "") + (props.inline ? " alignItemsCenter marginTopLarge inLineFormButton" : ""),
    align: props.hoverTextAlign
  }, /*#__PURE__*/React.createElement(Button, {
    kind: props.type === "add" ? "tertiary" : "primary",
    onClick: props.onClick,
    className: lib_6(props) + (props.disabled === true ? " pointerEventsNone " : " " + props.className),
    disabled: props.disabled || false,
    size: "sm"
  }, props.type === "add" ? /*#__PURE__*/React.createElement(Add, null) : /*#__PURE__*/React.createElement(SaveIcon, {
    saveIsDisabled: props.disabled
  })));
};
SaveAddButton.defaultProps = {
  type: "save",
  hoverText: "Save Changes",
  inline: false,
  disabled: false,
  hoverTextAlign: "bottom"
};
SaveAddButton.propTypes = {
  hoverText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  hoverTextAlign: PropTypes.string.isRequired
};

/**
 * Edit close icon with popover
 * @param {*} props
 * @returns edit close icon
 */
var EditCloseIcon = function EditCloseIcon(props) {
  var hoverText = props.hoverText ? props.hoverText : props.open ? "Close" : props.type === "add" ? "Configure Resource" : "Edit Resource";
  var icon = props.open ? /*#__PURE__*/React.createElement(CloseFilled, null) : props.type === "add" ? /*#__PURE__*/React.createElement(Add, null) : /*#__PURE__*/React.createElement(Edit, null);
  return /*#__PURE__*/React.createElement(PopoverWrapper, {
    hoverText: hoverText
  }, /*#__PURE__*/React.createElement("i", {
    onClick: props.onClick,
    className: "chevron"
  }, icon));
};
EditCloseIcon.propTypes = {
  hoverText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};
EditCloseIcon.defaultProps = {
  type: "edit",
  open: false,
  disabled: false
};

/**
 * Delete button
 * @param {*} props
 */
var DeleteButton = function DeleteButton(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "delete-area"
  }, /*#__PURE__*/React.createElement(PopoverWrapper, {
    hoverText: props.disabled && props.disableDeleteMessage ? props.disableDeleteMessage : "Delete Resource",
    align: props.hoverTextAlign,
    className: props.disabled ? "inlineBlock cursorNotAllowed" : ""
  }, /*#__PURE__*/React.createElement(Button, {
    className: "cds--btn--danger--tertiary forceTertiaryButtonStyles" + (props.disabled ? " pointerEventsNone" : ""),
    kind: "ghost",
    size: "sm",
    onClick: props.onClick,
    disabled: props.disabled === true
  }, /*#__PURE__*/React.createElement(TrashCan, {
    className: props.disabled ? "" : "redFill"
  }))));
};
DeleteButton.defaultProps = {
  disabled: false,
  hoverTextAlign: "bottom"
};
DeleteButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  hoverTextAlign: PropTypes.string.isRequired,
  disableDeleteMessage: PropTypes.string
};

/**
 * Up/Down button
 * @param {*} props
 */
var UpDownButtons = function UpDownButtons(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    key: "rule-up-" + props.name,
    disabled: props.disableUp,
    kind: "ghost",
    size: "sm",
    id: props.name + "-up",
    onClick: props.handleUp,
    className: "focus forceTertiaryButtonStyles marginRightSmall"
  }, /*#__PURE__*/React.createElement(ArrowUp, {
    key: "up-" + props.name
  })), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    disabled: props.disableDown,
    key: "rule-down-" + props.name,
    size: "sm",
    id: props.name + "-down",
    onClick: props.handleDown,
    className: "focus forceTertiaryButtonStyles"
  }, /*#__PURE__*/React.createElement(ArrowDown, {
    key: "down-" + props.name
  })));
};
UpDownButtons.defaultProps = {
  disableUp: false,
  disableDown: false
};
UpDownButtons.propTypes = {
  disableUp: PropTypes.bool.isRequired,
  disableDown: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleUp: PropTypes.func.isRequired,
  handleDown: PropTypes.func.isRequired
};

var _require$1 = require("lazy-z"),
  isFunction = _require$1.isFunction;
var _require2 = require("../src/lib/method-functions"),
  eventTargetToNameAndValue = _require2.eventTargetToNameAndValue,
  toggleStateBoolean = _require2.toggleStateBoolean,
  setNameToValue = _require2.setNameToValue;

/**
 * build functions for modal forms
 * @param {React.Element} component stateful component
 */
function buildFormFunctions(component) {
  var disableSubmit = isFunction(component.props.shouldDisableSubmit);
  var disableSave = isFunction(component.props.shouldDisableSave);
  if (component.props.shouldDisableSave) component.shouldDisableSave = component.props.shouldDisableSave.bind(component);
  if (disableSubmit) component.shouldDisableSubmit = component.props.shouldDisableSubmit.bind(component);

  // set update
  component.componentDidMount = function () {
    if (disableSubmit) component.shouldDisableSubmit();
    if (disableSave) component.shouldDisableSave(this.state, this.props);
  }.bind(component);
  component.componentDidUpdate = function () {
    if (disableSubmit) component.shouldDisableSubmit();
    if (disableSave) component.shouldDisableSave(this.state, this.props);
  }.bind(component);

  // set on save function
  component.onSave = function () {
    component.props.onSave(this.state, this.props);
  }.bind(component);
  // save on delete
  component.onDelete = function () {
    component.props.onDelete(this.state, this.props);
  }.bind(component);
}

/**
 * add default methods to component
 * @param {*} component React Component
 */
function buildFormDefaultInputMethods(component) {
  component.eventTargetToNameAndValue = eventTargetToNameAndValue.bind(component);
  component.toggleStateBoolean = toggleStateBoolean.bind(component);
  component.setNameToValue = setNameToValue.bind(component);
}

var css_248z$e = ".displayFlex {\n  display: flex;\n}\n\n.fitContent {\n  width: fit-content;\n}\n\n.alignItemsCenter {\n  align-items: center;\n}\n\n.widthOneHundredPercent {\n  width: 100%;\n}\n\n.marginBottom {\n  margin-bottom: 2rem;\n}\n\n.marginBottomSmall {\n  margin-bottom: 1rem;\n}\n\n.evenSpacing {\n  gap: 3vw;\n}\n\n.positionRelative {\n  position: relative;\n}\n\n.formInSubForm {\n  margin-top: 0rem;\n  background: #fffdfd;\n  padding: 1rem;\n}\n\n.subForm {\n  background: #f4f4f4;\n  padding: 1rem;\n  margin-top: 1rem;\n  margin-bottom: 2rem;\n}\n\n.icseFormTitleMinHeight {\n  min-height: 32px;\n}\n\n.spaceBetween {\n  justify-content: space-between;\n}\n";
styleInject(css_248z$e);

var css_248z$d = ".about {\n  padding: 2rem 1rem;\n  line-height: 1.5;\n}\n\n.smallerText {\n  font-size: 0.9rem;\n  font-weight: 400;\n}\n";
styleInject(css_248z$d);

var DocTextField = function DocTextField(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: props.text === "_default_includes" ? "marginBottomSmall" : props.className
  }, props.text === "_default_includes" ? "The default configuration includes:" : props.text);
};
DocTextField.defaultProps = {
  className: "marginBottom"
};
DocTextField.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
var StructuredList = function StructuredList(props) {
  return /*#__PURE__*/React.createElement(StructuredListWrapper, {
    className: "marginBottom"
  }, props.headers && /*#__PURE__*/React.createElement(StructuredListHead, null, /*#__PURE__*/React.createElement(StructuredListRow, null, props.headers.map(function (cell, index) {
    return /*#__PURE__*/React.createElement(StructuredListCell, {
      head: true,
      key: index
    }, cell);
  }))), /*#__PURE__*/React.createElement(StructuredListBody, null, props.list.map(function (row, rowIndex) {
    return /*#__PURE__*/React.createElement(StructuredListRow, {
      key: rowIndex
    }, row.map(function (cell, colIndex) {
      return /*#__PURE__*/React.createElement(StructuredListCell, {
        key: colIndex
      }, cell);
    }));
  })));
};
StructuredList.propTypes = {
  headers: PropTypes.array,
  list: PropTypes.array.isRequired
};
var DocTable = function DocTable(props) {
  var headers = [];
  var list = _toConsumableArray(props.list); // copy list, required due to reference errors

  if (props.list[0][0] === "_headers") {
    headers = _toConsumableArray(props.list[0]); // copy header row
    headers.shift(); // remove _header

    list.shift(); // remove heaer row from list
  }

  return /*#__PURE__*/React.createElement(StructuredList, {
    list: list,
    headers: headers
  });
};
DocTable.propTypes = {
  list: PropTypes.array.isRequired
};
var RelatedLinks = function RelatedLinks(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "smallerText"
  }, "Related Links"), props.links.map(function (link, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: "related-link-" + index
    }, /*#__PURE__*/React.createElement("a", {
      href: link[0],
      target: "_blank",
      rel: "noreferrer",
      className: "smallerText"
    }, link.length === 1 ? "Docs" : link[1]));
  }));
};
RelatedLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired
};
var Docs = function Docs(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "subForm leftTextAlign about"
  }, props.content.map(function (field, index) {
    return field.text ?
    /*#__PURE__*/
    // text field
    React.createElement(DocTextField, _extends({
      key: index
    }, field)) : field.subHeading ?
    /*#__PURE__*/
    // subheading
    React.createElement("h6", {
      className: "marginBottomSmall",
      key: index
    }, field.subHeading) :
    /*#__PURE__*/
    // table
    React.createElement(DocTable, {
      key: index,
      list: _toConsumableArray(field.table)
    });
  }), props.relatedLinks && /*#__PURE__*/React.createElement(RelatedLinks, {
    links: props.relatedLinks
  }));
};
Docs.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    className: PropTypes.string,
    table: PropTypes.array,
    subHeading: PropTypes.string
  })).isRequired,
  relatedLinks: PropTypes.array
};

var css_248z$c = ".labelRow {\n  display: inline-flex !important;\n  align-items: center;\n}\n\n.tooltip > div div.cds--password-input-wrapper {\n  margin-top: -8px;\n}\n\n.tooltip.cds--toggle {\n  margin-top: -8px;\n}\n\n.tooltip.cds--text-input-wrapper {\n  margin-top: -8px;\n}\n\n.tooltip.popover-obj {\n  margin-top: -8px;\n}\n\n.subHeadingTooltip {\n  margin: 0.2rem 0 0 0.2rem;\n}\n\n.tooltipMarginLeft {\n  margin-left: 3px;\n}\n";
styleInject(css_248z$c);

/**
 * Render a form (duplicate from utils to prevent circular dependencies)
 * @param {*} form form element
 * @param {*} formProps props
 * @returns Form element
 */
function RenderForm$1(form, formProps) {
  return /*#__PURE__*/React.createElement(form, _objectSpread2({}, formProps));
}

/**
 * render a tooltip around an input field
 * @returns slz tooltip component
 */
var IcseToolTip = function IcseToolTip(props) {
  var link = /*#__PURE__*/React.createElement(Link, {
    onClick: function onClick() {
      return window.open(props.link, "_blank");
    }
  }, "this link");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Toggletip, {
    align: props.align
  }, /*#__PURE__*/React.createElement(ToggletipButton, null, /*#__PURE__*/React.createElement(Information, {
    className: "tooltipMarginLeft"
  })), /*#__PURE__*/React.createElement(ToggletipContent, null, /*#__PURE__*/React.createElement("p", null, props.content, props.link && /*#__PURE__*/React.createElement(React.Fragment, null, " Visit ", link, " for more information. ")))));
};
IcseToolTip.defaultProps = {
  content: "",
  align: "top"
};
IcseToolTip.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
  align: PropTypes.string.isRequired
};
var BuildToolTip = function BuildToolTip(props) {
  var _props$tooltip;
  return /*#__PURE__*/React.createElement(IcseToolTip, {
    content: props.tooltip.content,
    link: (_props$tooltip = props.tooltip) === null || _props$tooltip === void 0 ? void 0 : _props$tooltip.link,
    align: props.isModal ? props.tooltip.alignModal : props.tooltip.align
  });
};
BuildToolTip.defaultProps = {
  tooltip: {
    content: ""
  },
  isModal: false,
  align: "top",
  alignModal: "bottom"
};
BuildToolTip.propTypes = {
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  align: PropTypes.string.isRequired,
  alignModal: PropTypes.string.isRequired
};
var ToolTipWrapper = function ToolTipWrapper(props) {
  var allProps = _objectSpread2({}, props);
  var tooltip = BuildToolTip(props);
  delete allProps.innerForm;
  delete allProps.tooltip;
  delete allProps.noLabelText;
  //check for labelText prop for components where it is a valid param
  if (!props.noLabelText && props.labelText === undefined) {
    throw new Error("ToolTipWrapper expects `props.labelText` when rendering labelText to be provided, got neither. To not render label text, use the `noLabelText` prop.");
  }
  // remove label text from components where it is not valid param
  if (props.noLabelText) delete allProps.labelText;else allProps.labelText = " ";
  allProps.className = lib_2("tooltip", _objectSpread2({}, props));
  return /*#__PURE__*/React.createElement("div", {
    className: "cds--form-item"
  }, props.noLabelText ?
  /*#__PURE__*/
  // No label- this is usually a title
  React.createElement("div", {
    className: "labelRow"
  }, RenderForm$1(props.innerForm, allProps), tooltip) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cds--label labelRow"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.id
  }, props.labelText), tooltip), props.children ? /*#__PURE__*/React.cloneElement(props.children, {
    // adjust props
    labelText: " ",
    // set labelText to empty
    className: props.children.props.className + " tooltip" // add tooltip class back
  }) : RenderForm$1(props.innerForm, allProps)));
};
ToolTipWrapper.defaultProps = {
  tooltip: {
    content: ""
  },
  noLabelText: false
};
ToolTipWrapper.propTypes = {
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string
  }).isRequired,
  isModal: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  noLabelText: PropTypes.bool.isRequired,
  children: PropTypes.node,
  innerForm: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
var DynamicToolTipWrapper = function DynamicToolTipWrapper(props) {
  //make sure that either children or innerForm are passed as a prop
  if (props.children === undefined && props.innerForm === undefined) {
    throw new Error("DynamicToolTipWrapper expects either `props.children` or `props.innerForm` when rendering ToolTipWrapper, got neither.");
  }
  return props.tooltip ? /*#__PURE__*/React.createElement(ToolTipWrapper, props) : props.children ? props.children : RenderForm$1(props.innerForm, {});
};
DynamicToolTipWrapper.propTypes = {
  tooltip: PropTypes.shape({
    content: PropTypes.string,
    link: PropTypes.string
  }),
  isModal: PropTypes.bool,
  children: PropTypes.node,
  innerForm: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

var css_248z$b = ".textInputMedium {\n  width: 20rem;\n}";
styleInject(css_248z$b);

var IcseSelect = function IcseSelect(props) {
  var invalid =
  // automatically set to invalid is is null or empty string and invalid not disabled
  props.disableInvalid !== true && isNullOrEmptyString$3(props.value) ? true : props.invalid;
  var groups = props.groups.length === 0 ? [] // if no groups, empty array
  : lib_3(
  // otherwise try and prepend empty string if null
  props.value, props.groups);
  // please leave debug here //
  if (props.debug) {
    console.log("PROPS: ", props);
    console.log("GROUPS: ", groups);
  }
  return /*#__PURE__*/React.createElement(DynamicToolTipWrapper, _extends({
    id: kebabCase$2(props.name) + "-dropdown-tooltip",
    innerForm: function innerForm() {
      return /*#__PURE__*/React.createElement(PopoverWrapper, {
        hoverText: props.value || ""
        // inherit classnames from tooltip
        ,
        className: props.tooltip ? "cds--form-item tooltip" : "cds--form-item"
      }, /*#__PURE__*/React.createElement(Select, {
        id: kebabCase$2(props.formName + " " + props.name),
        name: props.name,
        labelText: props.tooltip ? null : props.labelText,
        value: props.value || undefined,
        className: lib_2("leftTextAlign", props),
        disabled: props.disabled,
        invalid: invalid,
        invalidText: props.invalidText,
        readOnly: props.readOnly,
        onChange: props.handleInputChange
      }, groups.map(function (value) {
        return /*#__PURE__*/React.createElement(SelectItem, {
          key: "".concat(props.id, "-").concat(value),
          text: value,
          value: value
        });
      })));
    }
  }, props));
};
IcseSelect.defaultProps = {
  value: "",
  disabled: false,
  disableInvalid: false,
  invalid: false,
  invalidText: "Invalid Selection",
  readOnly: false,
  groups: [],
  debug: false,
  className: "fieldWidth"
};
IcseSelect.propTypes = {
  value: PropTypes.any,
  // must accept null
  formName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  disableInvalid: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  invalidText: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  debug: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    alignModal: PropTypes.string,
    align: PropTypes.string
  })
};
var FetchSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(FetchSelect, _React$Component);
  var _super = _createSuper(FetchSelect);
  function FetchSelect(props) {
    var _this;
    _classCallCheck(this, FetchSelect);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);
    _this.state = {
      data: []
    };
    _this.dataToGroups = _this.dataToGroups.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(FetchSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this._isMounted = true;
      if (isEmpty(this.state.data)) fetch(this.props.apiEndpoint).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (_this2.props.onReturnFunction) {
          _this2.props.onReturnFunction(data);
        }
        if (_this2._isMounted) _this2.setState({
          data: data
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "dataToGroups",
    value: function dataToGroups() {
      if (this.props.filter) {
        return this.state.data.filter(this.props.filter);
      } else {
        return this.state.data;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(IcseSelect, {
        labelText: this.props.labelText,
        handleInputChange: this.props.handleInputChange,
        name: this.props.name,
        className: this.props.className,
        formName: this.props.formName,
        groups: this.dataToGroups(),
        value: this.props.value || "null"
      });
    }
  }]);
  return FetchSelect;
}(React.Component);
FetchSelect.propTypes = {
  labelText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  filterArr: PropTypes.array,
  className: PropTypes.string,
  // can be null or undefined
  value: PropTypes.string,
  // can be null or undefined
  groups: PropTypes.array,
  apiEndpoint: PropTypes.string.isRequired,
  onReturnFunction: PropTypes.func,
  filter: PropTypes.func,
  name: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired
};
var IcseNumberSelect = function IcseNumberSelect(props) {
  return /*#__PURE__*/React.createElement(IcseSelect, {
    formName: props.formName,
    groups: buildNumberDropdownList(props.max, props.min),
    value: props.value.toString(),
    name: props.name || "Icse Number Select",
    className: props.className,
    handleInputChange: function handleInputChange(event) {
      // set name target value and parse int
      var sendEvent = {
        target: {
          name: event.target.name,
          value: parseInt(event.target.value)
        }
      };
      props.handleInputChange(sendEvent);
    },
    invalid: props.invalid,
    invalidText: props.invalidText,
    tooltip: props.tooltip,
    labelText: props.labelText,
    isModal: props.isModal
  });
};
IcseNumberSelect.defaultProps = {
  min: 1,
  max: 10,
  invalid: false,
  isModal: false
};
IcseNumberSelect.propTypes = {
  formName: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number,
  // can be null
  name: PropTypes.string,
  className: PropTypes.string,
  invalidText: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    alignModal: PropTypes.string,
    align: PropTypes.string
  }),
  labelText: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired
};
var EntitlementSelect = function EntitlementSelect(props) {
  return /*#__PURE__*/React.createElement(IcseSelect, {
    name: props.name,
    labelText: "Entitlement",
    groups: ["null", "cloud_pak"],
    value: props.value || "null",
    handleInputChange: props.handleInputChange,
    className: props.className,
    formName: props.formName
  });
};
EntitlementSelect.propTypes = {
  value: PropTypes.string,
  // can be null
  handleInputChange: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};
EntitlementSelect.defaultProps = {
  className: "fieldWidthSmaller"
};
var EndpointSelect = function EndpointSelect(props) {
  var titleCaseGroups = [];
  props.groups.forEach(function (group) {
    titleCaseGroups.push(titleCase$1(group).replace(/And/g, "and"));
  });
  return /*#__PURE__*/React.createElement(IcseSelect, {
    name: "endpoint",
    labelText: "Endpoint Type",
    groups: titleCaseGroups,
    value: titleCase$1(props.value).replace(/And/g, "and"),
    handleInputChange: function handleInputChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      props.handleInputChange({
        target: {
          name: name,
          value: kebabCase$2(value)
        }
      });
    },
    className: props.className,
    formName: props.formName
  });
};
EndpointSelect.propTypes = {
  value: PropTypes.string,
  // can be null
  handleInputChange: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  className: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired
};
EndpointSelect.defaultProps = {
  groups: ["private", "public", "public-and-private"]
};

var css_248z$a = ".iconMargin {\n  margin: 0 0.5rem -0.4rem 0;\n}\n\n.inlineIconMargin {\n  margin: -0.4rem 0.05rem;\n}\n\n.marginBottomXs {\n  margin-bottom: 0.5rem;\n}\n\n.tileBackground {\n  background-color: #f4f4f4;\n}";
styleInject(css_248z$a);

/**
 * Empty Resource Tile
 * @param {*} props
 * @param {string} props.name resource name
 * @param {(boolean|*[])} props.showIfEmpty if array is empty or boolean is false, show the empty resource tile
 * @returns tile if shown, empty string otherwise
 */

var EmptyResourceTile = function EmptyResourceTile(props) {
  return !props.showIfEmpty || props.showIfEmpty.length === 0 ? /*#__PURE__*/React.createElement(Tile, {
    className: "marginBottomXs tileBackground"
  }, /*#__PURE__*/React.createElement(CloudAlerting, {
    size: "24",
    className: "iconMargin"
  }), "No ", props.name, ".", " ", props.instructions || /*#__PURE__*/React.createElement(React.Fragment, null, "Click", /*#__PURE__*/React.createElement(Add, {
    size: "24",
    className: "inlineIconMargin"
  }), "button to add one.")) : "";
};
EmptyResourceTile.defaultProps = {
  name: "items in this list",
  showIfEmpty: false
};
EmptyResourceTile.propTypes = {
  name: PropTypes.string.isRequired,
  showIfEmpty: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  instructions: PropTypes.string
};

var _StatelessToggleForm$;

/**
 * Render a form
 * @param {*} form form element
 * @param {*} formProps props
 * @returns Form element
 */
function RenderForm(form, formProps) {
  return /*#__PURE__*/React.createElement(form, _objectSpread2({}, formProps));
}

/**
 * Dynamically render inner contents
 * @param {*} props
 * @param {boolean=} props.hide hide element
 * @param {boolean=} props.show component to show when hide is false
 * @returns empty string when hidden, component when visible
 */
function DynamicRender(props) {
  return props.hide === true ? "" : props.show;
}

/**
 * wrapper for title groups
 */
var TitleGroup = function TitleGroup(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: lib_2("displayFlex alignItemsCenter widthOneHundredPercent ".concat(lib_1(props.hide)), props)
  }, props.children);
};
TitleGroup.defaultProps = {
  hide: true
};
TitleGroup.propTypes = {
  children: PropTypes.node.isRequired
};
var IcseFormGroup = function IcseFormGroup(props) {
  var formGroupClassName = "displayFlex marginBottom fitContent evenSpacing";
  // remove margin bottom from formGroup for VPC
  if (props.noMarginBottom) {
    formGroupClassName = formGroupClassName.replace(/\smarginBottom/g, "");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: lib_2(formGroupClassName, props)
  }, props.children);
};
IcseFormGroup.defaultProps = {
  noMarginBottom: false
};
IcseFormGroup.propTypes = {
  noMarginBottom: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
var IcseSubForm = function IcseSubForm(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: lib_2(props.formInSubForm ? "formInSubForm positionRelative" : "subForm marginBottomSmall", props),
    id: props.id
  }, props.children);
};
IcseSubForm.defaultProps = {
  formInSubForm: false
};
IcseSubForm.propTypes = {
  id: PropTypes.string.isRequired,
  formInSubForm: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
var IcseHeading = function IcseHeading(props) {
  var titleFormDivClass = props.toggleFormTitle ? "" : props.name === "" ? "" : " icseFormTitleMinHeight";
  return /*#__PURE__*/React.createElement("div", {
    className: lib_2("displayFlex spaceBetween widthOneHundredPercent alignItemsCenter", props) + titleFormDivClass
  }, /*#__PURE__*/React.createElement(DynamicToolTipWrapper, {
    tooltip: props.tooltip,
    noLabelText: true,
    id: props.name,
    innerForm: function innerForm() {
      return props.type === "subHeading" ? /*#__PURE__*/React.createElement("h5", null, props.name) : props.type === "p" ? /*#__PURE__*/React.createElement("p", null, props.name) : /*#__PURE__*/React.createElement("h4", null, props.name);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "displayFlex"
  }, props.buttons));
};
IcseHeading.defaultProps = {
  type: "heading"
};
IcseHeading.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    align: PropTypes.string,
    alignModal: PropTypes.string
  }),
  buttons: PropTypes.node,
  className: PropTypes.string,
  toggleFormTitle: PropTypes.bool
};

/**
 * All of the toggle form functionality without injecting anything on render
 */
var StatelessToggleForm = function StatelessToggleForm(props) {
  return props.hideTitle ? props.children : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TitleGroup, {
    hide: props.hide,
    props: props,
    className: props.className
  }, props.hideIcon !== true && /*#__PURE__*/React.createElement(EditCloseIcon, {
    onClick: props.onIconClick,
    type: props.iconType,
    open: props.hide === false
  }), /*#__PURE__*/React.createElement(IcseHeading, {
    type: props.toggleFormTitle ? "p" : props.subHeading ? "subHeading" : "heading",
    name: props.name,
    buttons: /*#__PURE__*/React.createElement(DynamicRender, {
      hide: props.hide === true && props.alwaysShowButtons !== true,
      show: props.buttons || ""
    })
  })), /*#__PURE__*/React.createElement(DynamicRender, {
    hide: props.hide,
    show: props.children
  }));
};
StatelessToggleForm.defaultProps = (_StatelessToggleForm$ = {
  hide: true,
  iconType: "edit",
  name: "Stateless Toggle Form",
  hideTitle: false,
  alwaysShowButtons: false
}, _defineProperty(_StatelessToggleForm$, "hideTitle", false), _defineProperty(_StatelessToggleForm$, "toggleFormTitle", false), _StatelessToggleForm$);
StatelessToggleForm.propTypes = {
  children: PropTypes.node.isRequired,
  hide: PropTypes.bool.isRequired,
  iconType: PropTypes.string.isRequired,
  onIconClick: PropTypes.func,
  subHeading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  buttons: PropTypes.node,
  toggleFormTitle: PropTypes.bool.isRequired,
  alwaysShowButtons: PropTypes.bool.isRequired,
  hideTitle: PropTypes.bool.isRequired
};

/**
 * Form Modal
 * @param {Object} props
 * @param {string} props.name the name of the modal
 * @param {Function} props.onRequestClose close modal function
 * @param {Function} props.onRequestSubmit submit function
 * @param {boolean} props.show show modal if true
 */
var FormModal = /*#__PURE__*/function (_Component) {
  _inherits(FormModal, _Component);
  var _super = _createSuper(FormModal);
  function FormModal(props) {
    var _this;
    _classCallCheck(this, FormModal);
    _this = _super.call(this, props);
    _this.state = {
      isDisabled: false
    };
    _this.modalForm = /*#__PURE__*/React.createRef();
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.disableModal = _this.disableModal.bind(_assertThisInitialized(_this));
    _this.enableModal = _this.enableModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * submit child data
   */
  _createClass(FormModal, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var childData = this.modalForm.current.state;
      this.props.onRequestSubmit(childData);
    }

    /**
     * disable modal
     */
  }, {
    key: "disableModal",
    value: function disableModal() {
      if (!this.state.isDisabled) this.setState({
        isDisabled: true
      });
    }

    /**
     * enable modal
     */
  }, {
    key: "enableModal",
    value: function enableModal() {
      if (this.state.isDisabled) this.setState({
        isDisabled: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(DynamicRender, {
        hide: this.props.show === false,
        show: /*#__PURE__*/React.createElement(Modal, {
          modalHeading: this.props.name,
          open: this.props.show,
          onRequestSubmit: this.handleSubmit,
          onRequestClose: this.props.onRequestClose,
          primaryButtonText: "Submit",
          secondaryButtonText: "Cancel",
          primaryButtonDisabled: this.state.isDisabled
        }, this.props.show && React.Children.map(this.props.children, function (child) {
          return (
            /*#__PURE__*/
            // clone react child
            React.cloneElement(child, {
              // add modal specific methods
              disableModal: _this2.disableModal,
              enableModal: _this2.enableModal,
              isModal: true,
              ref: _this2.modalForm
            })
          );
        }))
      });
    }
  }]);
  return FormModal;
}(Component);
FormModal.defaultProps = {
  show: false
};
FormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onRequestSubmit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  name: PropTypes.string,
  // undefined for loaded modal not rendered
  children: PropTypes.node.isRequired
};

var css_248z$9 = ".fieldWidth {\n  width: 14rem;\n}\n\n.leftTextAlign {\n  text-align: left;\n}\n\n.textInputWide {\n  width: 30rem;\n}";
styleInject(css_248z$9);

var IcseToggle = function IcseToggle(props) {
  var toggleName = props.toggleFieldName || snakeCase(props.labelText);
  return /*#__PURE__*/React.createElement(DynamicToolTipWrapper, props, /*#__PURE__*/React.createElement(Toggle, {
    labelA: props.useOnOff ? "Off" : "False",
    labelB: props.useOnOff ? "On" : "True",
    labelText: props.tooltip ? " " : props.labelText,
    id: kebabCase$2(toggleName) + "-icse-toggle-" + props.id,
    className: lib_2("leftTextAlign", props) + (props.tooltip ? " cds--form-item tooltip" : " cds--form-item") // inherit tooltip spacing
    ,

    onToggle: function onToggle(event) {
      props.onToggle(toggleName, event);
    },
    defaultToggled: props.defaultToggled,
    disabled: props.disabled
  }));
};
IcseToggle.defaultProps = {
  useOnOff: false,
  defaultToggled: false,
  isModal: false,
  disabled: false,
  className: "fieldWidth"
};
IcseToggle.propTypes = {
  useOnOff: PropTypes.bool.isRequired,
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggleFieldName: PropTypes.string,
  // if field is name other than label text snake case
  defaultToggled: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    alignModal: PropTypes.string
  }),
  onToggle: PropTypes.func.isRequired,
  isModal: PropTypes.bool.isRequired
};

/**
 * Icse Text Input
 * @param {*} props props
 * @param {string} props.componentName name of the component being edited
 * @param {string} props.placeholder placeholder text for field
 * @param {string} props.field field (ex. name)
 * @param {string=} props.value actual value
 * @param {Function} props.onChange onchange function
 * @param {string} props.helperText helper text
 * @param {string} props.className classnames to add
 * @param {boolean=} props.readOnly read only
 * @param {string=} props.labelText override label text
 * @returns <IcseTextInput/> component
 */
var IcseTextInput = function IcseTextInput(props) {
  var fieldName = titleCase$1(props.field);
  return /*#__PURE__*/React.createElement(DynamicToolTipWrapper, props, /*#__PURE__*/React.createElement(TextInput, {
    id: props.id,
    className: lib_2("leftTextAlign", props),
    labelText: props.labelText ? props.labelText : titleCase$1(props.field),
    placeholder: props.placeholder || lib_5(props.componentName, fieldName),
    name: props.field,
    value: props.value || "",
    invalid: isBoolean(props.invalid) ? props.invalid : props.invalidCallback(),
    onChange: props.onChange,
    helperText: props.helperText,
    invalidText: props.invalidText ? props.invalidText : "Invalid ".concat(props.field, " value."),
    maxLength: props.maxLength,
    disabled: props.disabled,
    readOnly: props.readOnly
  }));
};
IcseTextInput.defaultProps = {
  maxLength: null,
  disabled: false,
  readOnly: false,
  hideHelperText: false,
  className: "fieldWidth"
};
IcseTextInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  componentName: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    alignModal: PropTypes.string
  }),
  className: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  labelText: PropTypes.string,
  maxLength: PropTypes.number,
  invalidCallback: PropTypes.func,
  id: PropTypes.string.isRequired,
  invalidText: PropTypes.string
};

/**
 * Icse Name Field
 * @param {*} props
 * @param {string} props.id
 * @param {string=} props.className
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {string} props.component
 * @param {boolean=} props.hideHelperText
 * @param {func} props.helperTextCallback
 * @param {string} props.invalidText
 * @param {func} props.invalidCallback
 * @returns <IcseNameInput />
 */
var IcseNameInput = function IcseNameInput(props) {
  var helperText = "";
  // if helper text is not hidden
  if (!props.hideHelperText && !props.useData) {
    if (!props.helperTextCallback) {
      throw new Error("IcseNameInput expects either a function `helperTextCallback` that returns a string or `hideHelperText` as a prop, got neither.");
    }
    helperText = props.helperTextCallback();
  }
  return /*#__PURE__*/React.createElement(IcseTextInput, _extends({}, props, {
    className: lib_2("leftTextAlign", props),
    field: "name",
    labelText: "Name",
    helperText: helperText
  }));
};
IcseNameInput.defaultProps = {
  useData: false,
  hideHelperText: false,
  invalidText: "",
  className: "fieldWidth"
};
IcseNameInput.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  componentName: PropTypes.string.isRequired,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    alignModal: PropTypes.string
  }),
  hideHelperText: PropTypes.bool.isRequired,
  useData: PropTypes.bool.isRequired,
  helperTextCallback: PropTypes.func,
  invalidText: PropTypes.string.isRequired,
  invalidCallback: PropTypes.func
};

var css_248z$8 = ".fieldWidthSmaller {\n  width: 11rem;\n}";
styleInject(css_248z$8);

var AppIdKeyForm = /*#__PURE__*/function (_React$Component) {
  _inherits(AppIdKeyForm, _React$Component);
  var _super = _createSuper(AppIdKeyForm);
  function AppIdKeyForm(props) {
    var _this;
    _classCallCheck(this, AppIdKeyForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {string} name key to change in state
   * @param {*} value value to update
   */
  _createClass(AppIdKeyForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState({
        key_name: event.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        id: "app-id-key-name",
        value: this.state.key_name,
        onChange: this.handleInputChange,
        field: "key_name",
        labelText: "App ID Key",
        componentName: "appid",
        className: "fieldWidthSmaller",
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }));
    }
  }]);
  return AppIdKeyForm;
}(React.Component);
AppIdKeyForm.defaultProps = {
  data: {
    key_name: ""
  }
};
AppIdKeyForm.propTypes = {
  data: PropTypes.shape({
    key_name: PropTypes.string.isRequired
  }),
  shouldDisableSubmit: PropTypes.func
};

var css_248z$7 = ".leftTextAlign {\n  text-align: left;\n}\n";
styleInject(css_248z$7);

/**
 * Icse Modal Wrapper
 * @param {*} props
 * @param {string} props.name resource name
 * @param {string} props.heading modal heading
 * @param {boolean} props.open show modal
 * @param {boolean=} props.danger danger, defaults to true
 * @param {boolean=} props.alert alert, defaults to true
 * @param {string=} props.primaryButtonText defaults to `Dismiss Changes`
 * @param {string=} props.secondaryButtonText defaults to `Cancel`
 * @param {Function} props.onRequestSubmit
 * @param {Function} props.onRequestClose
 * @param {boolean=} props.useAddButton use + button instead of edit
 */
var IcseModal = function IcseModal(props) {
  /*#__PURE__*/React.createElement("strong", null, props.name);
  return /*#__PURE__*/React.createElement(Modal, {
    id: props.id,
    className: "leftTextAlign",
    modalHeading: props.heading,
    open: props.open,
    alert: props.alert,
    danger: props.danger,
    shouldSubmitOnEnter: true,
    primaryButtonDisabled: props.primaryButtonDisabled,
    primaryButtonText: props.primaryButtonText,
    secondaryButtonText: props.secondaryButtonText,
    onRequestSubmit: props.onRequestSubmit,
    onRequestClose: props.onRequestClose
  }, props.children);
};
IcseModal.defaultProps = {
  primaryButtonText: "Primary Button",
  secondaryButtonText: "Cancel",
  primaryButtonDisabled: false,
  danger: false,
  alert: true,
  open: false,
  heading: "Default Heading",
  id: "default-icse-modal"
};
IcseModal.propTypes = {
  primaryButtonText: PropTypes.string.isRequired,
  secondaryButtonText: PropTypes.string.isRequired,
  primaryButtonDisabled: PropTypes.bool,
  danger: PropTypes.bool,
  alert: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  onRequestSubmit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

/**
 * Delete modal
 * @param {*} props
 * @param {string} props.name name of modal
 * @param {boolean} props.modalOpen true if open
 * @param {Function} props.onModalClose function for on close
 * @param {Function} props.onModalSubmit function for on submit
 */
var DeleteModal = function DeleteModal(props) {
  var name = /*#__PURE__*/React.createElement("strong", null, props.name);
  return /*#__PURE__*/React.createElement(IcseModal, {
    id: props.name + "-delete",
    name: props.name,
    heading: props.name,
    open: props.modalOpen,
    onRequestClose: props.onModalClose,
    onRequestSubmit: props.onModalSubmit,
    primaryButtonText: "Delete Resource",
    danger: true
  }, /*#__PURE__*/React.createElement("span", null, "You are about to delete ", name, ". This cannot be undone."));
};
DeleteModal.defaultProps = {
  modalOpen: false
};
DeleteModal.propTypes = {
  name: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalSubmit: PropTypes.func.isRequired
};

/**
 * unsaved changes modal modal
 * @param {*} props
 * @param {string} props.name name of modal
 * @param {boolean} props.modalOpen true if open
 * @param {Function} props.onModalClose function for on close
 * @param {Function} props.onModalSubmit function for on submit
 */

var UnsavedChangesModal = function UnsavedChangesModal(props) {
  var name = props.name;
  return /*#__PURE__*/React.createElement("div", {
    className: "unsaved-changes-modal-area"
  }, /*#__PURE__*/React.createElement(IcseModal, {
    id: props.name + "-unsaved-changes",
    open: props.modalOpen,
    name: props.name,
    onRequestClose: props.onModalClose,
    onRequestSubmit: props.onModalSubmit,
    heading: props.useDefaultUnsavedMessage ? "Missing Required Values" : "Unsaved Changes",
    danger: true,
    primaryButtonText: "Dismiss Changes"
  }, props.useDefaultUnsavedMessage ? /*#__PURE__*/React.createElement("span", null, "Resource ", name, " is missing required values.", " ", /*#__PURE__*/React.createElement("strong", null, "Without these values, your configuration is invalid."), " ", "Are you sure you want to dismiss these changes?") : /*#__PURE__*/React.createElement("span", null, "Resource ", name, " has unsaved changes. Are you sure you want to dismiss these changes?")));
};
UnsavedChangesModal.defaultProps = {
  modalOpen: false,
  useDefaultUnsavedMessage: true
};
UnsavedChangesModal.propTypes = {
  name: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalSubmit: PropTypes.func.isRequired,
  useDefaultUnsavedMessage: PropTypes.bool
};

var css_248z$6 = ".fieldWidth {\n  width: 14rem;\n}\n\n.fieldWidthSmallest {\n  width: 8rem;\n}\n\n.marginBottomSmall {\n  margin-bottom: 1rem;\n}\n\n.forceTertiaryButtonStyles {\n  padding-right: 0.4375rem !important;\n  padding-left: 0.4375rem !important;\n}\n\n.positionRelative {\n  position: relative;\n}\n\n.displayFlex {\n  display: flex;\n}\n\n.formInSubForm {\n  margin-top: 0rem;\n  background: #f4f4f4;\n  padding: 1rem;\n}\n\n.marginBottomSmall {\n  margin-bottom: 1rem;\n}\n\n.alignButtons {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.alignItemsCenter {\n  align-items: center;\n}\n\n.spaceBetween {\n  justify-content: space-between;\n}\n";
styleInject(css_248z$6);

/**
 * AppIdForm
 * @param {Object} props
 * @param {configDotJson} props.configDotJson config dot json
 * @param {slz} props.slz slz state store
 */
var AppIdForm = /*#__PURE__*/function (_Component) {
  _inherits(AppIdForm, _Component);
  var _super = _createSuper(AppIdForm);
  function AppIdForm(props) {
    var _this;
    _classCallCheck(this, AppIdForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2({}, _this.props.data);
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.toggleModal = _this.toggleModal.bind(_assertThisInitialized(_this));
    _this.toggleDeleteModal = _this.toggleDeleteModal.bind(_assertThisInitialized(_this));
    _this.handleKeyAdd = _this.handleKeyAdd.bind(_assertThisInitialized(_this));
    _this.handleKeyDelete = _this.handleKeyDelete.bind(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * If the appid form has been updated, must update state accordingly
   * @param {Object} prevProps
   * */
  _createClass(AppIdForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.props.componentDidUpdateCallback(this.state, this.props);
    }

    /**
     * toggleModal modal for creating or editing AppId Key
     * * @param name name of key to edit
     */
  }, {
    key: "toggleModal",
    value: function toggleModal(name) {
      var tempValueState;
      _typeof(name) !== "object" ? tempValueState = {
        open: !this.state.open,
        editKey: true,
        keyNameToEdit: name
      } : tempValueState = {
        open: !this.state.open,
        editKey: false
      };
      this.setState(tempValueState);
    }

    /**
     * toggle delete appid key modal on and off
     * @param name name of key to delete
     */
  }, {
    key: "toggleDeleteModal",
    value: function toggleDeleteModal(name) {
      var tempValueState = {
        showDeleteModal: !this.state.showDeleteModal,
        keyNameToDelete: name
      };
      this.setState(tempValueState);
    }

    /**
     * handle input change
     * @param {event} event event
     */
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var newAppIdState = _objectSpread2({}, this.state);
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      if (name === "name") {
        newAppIdState.name = value;
      } else newAppIdState.resource_group = value;
      this.setState(newAppIdState);
    }

    /**
     * Toggle on and off use_data param in state
     */
  }, {
    key: "handleToggle",
    value: function handleToggle() {
      var newAppIdState = _objectSpread2({}, this.state);
      newAppIdState.use_data = !newAppIdState.use_data;
      this.setState(newAppIdState);
    }

    /**
     * adds key to the appid keys list and closes the modal
     * @param {object} data
     * @param {object} data.key_name
     */
  }, {
    key: "handleKeyAdd",
    value: function handleKeyAdd(data) {
      var _this2 = this;
      var saveType = "";
      var newAppIdState = _objectSpread2({}, this.state);
      if (this.state.editKey === true) {
        saveType = "edit";
        newAppIdState.keys[newAppIdState.keys.indexOf(newAppIdState.keyNameToEdit)] = data.key_name;
      } else {
        saveType = "add";
        newAppIdState.keys.push(data.key_name);
      }
      newAppIdState.open = false;
      return new Promise(function (resolve, reject) {
        _this2.props.saveCallback(saveType);
        resolve();
      }).then(function () {
        //set state after save is run using promise
        _this2.setState(newAppIdState);
      });
    }

    /**
     * removes key from the appid keys list and closes the modal
     * @param name key which needs to be deleted
     */
  }, {
    key: "handleKeyDelete",
    value: function handleKeyDelete(name) {
      var _this3 = this;
      var newKeys = this.state.keys.filter(function (item) {
        return item !== name;
      });
      var newAppIdState = _objectSpread2({}, this.state);
      newAppIdState.keys = newKeys;
      newAppIdState.showDeleteModal = false;
      return new Promise(function (resolve, reject) {
        _this3.props.saveCallback("delete");
        resolve();
      }).then(function () {
        //set state after save is run using promise
        _this3.setState(newAppIdState);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/React.createElement(Form, {
        id: "appid-form"
      }, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        labelText: "Use Existing Instance",
        key: this.state.use_data,
        defaultToggled: this.state.use_data,
        toggleFieldName: "use_data",
        onToggle: this.handleToggle,
        className: "fieldWidthSmallest",
        id: "app-id-existing-instance"
      }), /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        componentName: this.state.name,
        placeholder: "my-appid-name",
        value: this.state.name,
        onChange: this.handleInputChange,
        hideHelperText: true,
        invalid: this.props.invalidCallback("name", this.state, this.props),
        invalidText: this.props.invalidTextCallback("name", this.state, this.props),
        className: "fieldWidth"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        labelText: "Resource Group",
        name: "resource_group",
        formName: "resource_group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        invalidText: "Select a Resource Group.",
        className: "fieldWidth"
      })), /*#__PURE__*/React.createElement(IcseHeading, {
        name: "App ID Keys",
        type: "subHeading",
        className: "marginBottomSmall",
        noLabelText: true,
        tooltip: {
          content: "Keys can be added to connect an application to an IBM Cloud service."
        },
        buttons: /*#__PURE__*/React.createElement(SaveAddButton, {
          id: "appid-key-create",
          type: "add",
          onClick: this.toggleModal,
          className: "forceTertiaryButtonStyles",
          disabled: this.props.invalidCallback("name", this.state, this.props) || lib_4(this.state.resource_group),
          noDeleteButton: true
        })
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormModal, {
        name: (this.state.editKey ? "Edit" : "Add") + " an App ID Key",
        show: this.state.open,
        onRequestSubmit: this.handleKeyAdd,
        onRequestClose: this.toggleModal,
        size: "sm"
      }, /*#__PURE__*/React.createElement(AppIdKeyForm, {
        shouldDisableSubmit: this.props.shouldDisableSubmitCallback(this.state, this.props),
        keys: this.state.keys,
        invalidCallback: this.props.invalidCallback,
        invalidTextCallback: this.props.invalidTextCallback
      }))), /*#__PURE__*/React.createElement("div", null, this.state.keys.map(function (data, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "positionRelative displayFlex formInSubForm marginBottomSmall alignItemsCenter spaceBetween",
          key: "".concat(data, "-").concat(_this4.state.keys[index])
        }, data, /*#__PURE__*/React.createElement("div", {
          className: "alignButtons"
        }, /*#__PURE__*/React.createElement(EditCloseIcon, {
          hoverText: "Edit AppID Key",
          type: "edit",
          disabled: false,
          onClick: function onClick() {
            return _this4.toggleModal(data);
          }
        }), /*#__PURE__*/React.createElement(DeleteButton, {
          name: data,
          onClick: function onClick() {
            return _this4.toggleDeleteModal(data);
          }
        })));
      }), /*#__PURE__*/React.createElement(DeleteModal, {
        name: this.state.keyNameToDelete || "",
        modalOpen: this.state.showDeleteModal
        //need to call toggleDeleteModal with "" name argument or else canceling deletion passes in the entire event to the name argument and causes the page to error
        ,
        onModalClose: function onModalClose() {
          return _this4.toggleDeleteModal("");
        },
        onModalSubmit: function onModalSubmit() {
          return _this4.handleKeyDelete(_this4.state.keyNameToDelete);
        }
      })));
    }
  }]);
  return AppIdForm;
}(Component);
AppIdForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    use_data: false,
    keys: []
  },
  key_name: "",
  open: false,
  editKey: false,
  showDeleteModal: false,
  keyNameToEdit: "",
  keyNameToDelete: ""
};
AppIdForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    resource_group: PropTypes.string,
    use_data: PropTypes.bool,
    keys: PropTypes.array.isRequired
  }).isRequired,
  key_name: PropTypes.string.isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalidCallback: PropTypes.func,
  invalidTextCallback: PropTypes.func
};

/**
 * Atracker
 * @param {Object} props
 * @param {Object} props.data
 * @param {string} props.data.resource_group
 * @param {string} props.data.cos_bucket
 * @param {string} props.data.cos_key
 * @param {boolean} props.data.add_route
 * @param {Array} props.resourceGroups list of resource groups
 * @param {Array} props.cosBuckets list of cos buckets
 * @param {Array} props.cosKeys list of cos Keys
 * @param {string} props.prefix
 */
var AtrackerForm = /*#__PURE__*/function (_Component) {
  _inherits(AtrackerForm, _Component);
  var _super = _createSuper(AtrackerForm);
  function AtrackerForm(props) {
    var _this;
    _classCallCheck(this, AtrackerForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleMultiSelect = _this.handleMultiSelect.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {event} event event
   */
  _createClass(AtrackerForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "handleMultiSelect",
    value: function handleMultiSelect(event) {
      this.setState({
        locations: event
      });
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(this.toggleStateBoolean(name, this.state));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "atracker-form"
      }, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        componentName: "Activity Tracker",
        field: "Name",
        labelText: "Name",
        className: "fieldWidth",
        value: this.props.prefix + "-atracker",
        onChange: function onChange() {
          /** does not change **/
        },
        readOnly: true,
        id: "atracker-name",
        invalid: false
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: this.props.data.name + "-activity-tracker-rg",
        value: this.state.resource_group,
        groups: this.props.resourceGroups,
        handleInputChange: this.handleInputChange,
        className: "fieldWidth",
        name: "resource_group",
        labelText: "Resource Group"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        tooltip: {
          content: "The bucket name under the Cloud Object Storage instance where Activity Tracker logs will be stored"
        },
        groups: this.props.cosBuckets,
        formName: this.props.data.name + "-activity-tracker-bucket",
        field: "bucket",
        name: "bucket",
        value: this.state.bucket,
        handleInputChange: this.handleInputChange,
        className: "fieldWidth",
        labelText: "Object Storage Log Bucket",
        invalidText: "Select an Object Storage bucket."
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Must be enabled in order to forward all logs to the Cloud Object Storage bucket"
        },
        labelText: "Create Activity Tracker Route",
        defaultToggled: this.state.add_route,
        toggleFieldName: "add_route",
        onToggle: this.handleToggle,
        id: "app-id-add-route"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, /*#__PURE__*/React.createElement(IcseSelect, {
        tooltip: {
          content: "The IAM API key that has writer access to the Cloud Object Storage instance"
        },
        formName: this.props.data.name + "-activity-tracker-cos-key",
        name: "cos_key",
        groups: this.props.cosKeys,
        value: this.state.cos_key,
        labelText: "Privileged IAM Object Storage Key",
        handleInputChange: this.handleInputChange,
        className: "fieldWidth",
        invalidText: "Select an Object Storage key."
      }), /*#__PURE__*/React.createElement(LocationsMultiSelect, {
        id: this.props.data.name + "-activity-tracker-location",
        region: this.props.region,
        onChange: this.handleMultiSelect,
        invalid: this.state.locations.length === 0,
        invalidText: "Select at least one location."
      })));
    }
  }]);
  return AtrackerForm;
}(Component);
AtrackerForm.defaultProps = {
  isModal: false,
  data: {
    bucket: "",
    cos_key: "",
    resource_group: "",
    add_route: false,
    locations: []
  }
};
AtrackerForm.propTypes = {
  data: PropTypes.shape({
    bucket: PropTypes.string.isRequired,
    cos_key: PropTypes.string.isRequired,
    resource_group: PropTypes.string.isRequired,
    add_route: PropTypes.bool.isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  region: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  cosKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  cosBuckets: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired
};

/**
 * kms keys
 */
var EncryptionKeyForm = /*#__PURE__*/function (_Component) {
  _inherits(EncryptionKeyForm, _Component);
  var _super = _createSuper(EncryptionKeyForm);
  function EncryptionKeyForm(props) {
    var _this;
    _classCallCheck(this, EncryptionKeyForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleTextInput = _this.handleTextInput.bind(_assertThisInitialized(_this));
    _this.toggleShow = _this.toggleShow.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {string} name key to change in state
   * @param {*} value value to update
   */
  _createClass(EncryptionKeyForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(_defineProperty({}, name, !this.state[name]));
    }

    /**
     * Handle input change for a text field
     * @param {event} event
     */
  }, {
    key: "handleTextInput",
    value: function handleTextInput(event) {
      this.setState(_defineProperty({}, event.target.name, event.target.value));
    }

    // Handle toggle for showing/hiding details of keys
  }, {
    key: "toggleShow",
    value: function toggleShow() {
      this.setState({
        show: !this.state.show
      });
    }
  }, {
    key: "render",
    value: function render() {
      var composedId = "encryption-key-".concat(this.props.data.name, "-");
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        component: "kms_key",
        componentName: this.props.data.name,
        value: this.state.name,
        onChange: this.handleTextInput,
        componentProps: this.props,
        placeholder: "my-encryption-key-name",
        hideHelperText: true,
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseTextInput, {
        componentName: this.props.data.name,
        field: "key_ring",
        labelText: "Key Ring Name",
        value: this.state.key_ring || "",
        onChange: this.handleTextInput // nothing
        ,
        id: this.props.data.name + "-key-ring",
        invalid: this.props.invalidRingCallback(this.state, this.props),
        invalidText: this.props.invalidRingText
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNumberSelect, {
        tooltip: {
          content: "Setting a rotation policy shortens the lifetime of the key at regular intervals. When it's time to rotate the key based on the rotation interval that you specify, the root key will be automatically replaced with new key material.",
          align: "bottom-left"
        },
        component: this.props.data.name,
        max: 12,
        value: this.state.rotation,
        formName: "rotation",
        name: "rotation",
        labelText: "Rotation Interval (Months)",
        handleInputChange: this.handleInputChange,
        isModal: this.props.isModal
      }), /*#__PURE__*/React.createElement(EndpointSelect, {
        formName: this.props.data.name,
        handleInputChange: this.handleInputChange,
        value: this.state.endpoint
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Force deletion of a key refers to the deletion of any key that's actively protecting any registered cloud resources. KMS keys can be force-deleted by managers of the instance. However, the force-delete won't succeed if the key's associated resource is non-erasable due to a retention policy.",
          align: "bottom-left"
        },
        id: composedId + "kms-key-force-delete",
        labelText: "Force Deletion of KMS Key",
        toggleFieldName: "force_delete",
        defaultToggled: this.state.force_delete,
        onToggle: this.handleToggle,
        isModal: this.props.isModal
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Allow key to be deleted only by two users. One user can schedule the key for deletion, a second user must confirm it before the key will be destroyed.",
          align: "bottom-left"
        },
        id: composedId + "kms-key-dual-auth-delete",
        labelText: "Dual Authorization Deletion Policy",
        toggleFieldName: "dual_auth_delete",
        defaultToggled: this.state.dual_auth_delete,
        onToggle: this.handleToggle,
        isModal: this.props.isModal
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Root keys are symmetric key-wrapping keys used as roots of trust for encrypting/decrypting other keys. Can be either imported or generated by IBM Key Protect.",
          link: "https://cloud.ibm.com/docs/key-protect?topic=key-protect-envelope-encryption",
          align: "bottom-left"
        },
        id: composedId + "kms-key-root",
        labelText: "Set as a Root Key",
        toggleFieldName: "root_key",
        onToggle: this.handleToggle,
        defaultToggled: this.state.root_key,
        isModal: this.props.isModal
      })));
    }
  }]);
  return EncryptionKeyForm;
}(Component);
EncryptionKeyForm.defaultProps = {
  data: {
    name: "",
    rotation: 12,
    root_key: false,
    force_delete: false,
    dual_auth_delete: false,
    key_ring: "",
    endpoint: "private"
  },
  isModal: false
};
EncryptionKeyForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rotation: PropTypes.number.isRequired,
    root_key: PropTypes.bool.isRequired,
    dual_auth_delete: PropTypes.bool.isRequired,
    force_delete: PropTypes.bool,
    key_ring: PropTypes.string
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  invalidRingCallback: PropTypes.func.isRequired
};

var css_248z$5 = ".fieldWidth {\n  width: 14rem;\n}\n\n.fieldWidthSmaller {\n  width: 11rem;\n}\n";
styleInject(css_248z$5);

/**
 * Icse multiselect template
 */
var IcseMultiSelect = function IcseMultiSelect(props) {
  return /*#__PURE__*/React.createElement(FilterableMultiSelect, {
    id: props.id,
    className: lib_2("leftTextAlign", props),
    titleText: props.titleText,
    itemToString: function itemToString(item) {
      return item ? item : "";
    },
    invalid: props.invalid,
    invalidText: props.invalidText,
    initialSelectedItems: props.initialSelectedItems,
    onChange: props.onChange,
    items: props.items,
    useTitleInItem: props.useTitleInItem,
    label: props.label,
    disabled: props.disabled
  });
};
IcseMultiSelect.defaultProps = {
  disabled: false,
  useTitleInItem: false,
  invalid: false,
  invalidText: "Invalid value",
  className: "fieldWidth"
};
IcseMultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  titleText: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  invalidText: PropTypes.string.isRequired,
  initialSelectedItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  useTitleInItem: PropTypes.bool.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool.isRequired
};

/**
 * ssh key multiselect
 */
var SshKeyMultiSelect = function SshKeyMultiSelect(props) {
  return /*#__PURE__*/React.createElement(IcseMultiSelect, {
    id: props.id + "-ssh-key-multiselect",
    useTitleInItem: true,
    label: "SSH Keys",
    titleText: "SSH Keys",
    invalidText: "At least one SSH Key is required",
    invalid: props.initialSelectedItems.length === 0,
    items: props.sshKeys,
    initialSelectedItems: props.initialSelectedItems || [],
    onChange: function onChange(event) {
      props.onChange(event.selectedItems);
    },
    className: props.className
  });
};
SshKeyMultiSelect.defaultProps = {
  initialSelectedItems: []
};
SshKeyMultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  sshKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedItems: PropTypes.arrayOf(PropTypes.string).isRequired
};

/**
 * sg multiselect
 */
var SecurityGroupMultiSelect = function SecurityGroupMultiSelect(props) {
  if (props.vpc_name && !props.securityGroups) {
    // checking props.securityGroups[props.vpc_name] will result in an
    // undefined error that happens as part of MultiSelect
    throw new Error("SecurityGroupMultiselect requires a securityGroups object. Got " + prettyJSON(props.securityGroups));
  }
  return /*#__PURE__*/React.createElement(IcseMultiSelect, {
    id: props.id + "-security-group-multiselect",
    label: props.label,
    titleText: "Security Groups",
    className: props.className,
    initialSelectedItems: props.initialSelectedItems,
    vpc_name: props.vpc_name,
    invalid: props.invalid,
    invalidText: props.invalidText,
    onChange: function onChange(event) {
      props.onChange(event.selectedItems);
    },
    disabled: props.disabled,
    items: props.vpc_name === "" ? [] : props.securityGroups,
    itemToString: function itemToString(item) {
      return item ? item : "";
    }
  });
};
SecurityGroupMultiSelect.defaultProps = {
  disabled: false,
  label: "Select Security Groups",
  invalid: false,
  className: "fieldWidthSmaller",
  invalidText: "Select at least one security group."
};
SecurityGroupMultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  initialSelectedItems: PropTypes.array.isRequired,
  vpc_name: PropTypes.string,
  // not required, null value should be valid
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  securityGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool.isRequired,
  invalidText: PropTypes.string.isRequired
};

/**
 * vpc subnet multiselect
 */
var SubnetMultiSelect = function SubnetMultiSelect(props) {
  return /*#__PURE__*/React.createElement(IcseMultiSelect, {
    id: props.id + "-subnet-multiselect",
    className: props.className,
    titleText: "Subnets",
    name: props.name,
    label: props.label,
    items: isNullOrEmptyString$3(props.vpc_name) ? [] : props.subnets,
    initialSelectedItems: props.initialSelectedItems,
    invalidText: isNullOrEmptyString$3(props.vpc_name) ? "Select a VPC." : "Select at least one subnet.",
    invalid: props.initialSelectedItems.length === 0,
    disabled: props.disabled,
    onChange: function onChange(event) {
      return props.onChange(event.selectedItems);
    }
  });
};
SubnetMultiSelect.defaultProps = {
  name: "subnet_names",
  label: "Subnets",
  disabled: false,
  vpc_name: "",
  initialSelectedItems: []
};
SubnetMultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  vpc_name: PropTypes.string,
  // not required, `null` needs to be passed here
  subnets: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  initialSelectedItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * VPC List MultiSelect
 */
var VpcListMultiSelect = function VpcListMultiSelect(props) {
  // throw error here so that passing no vpc list prop will error here
  // instead of being passed to `FilterableMultiselect`
  if (!props.vpcList) {
    throw new Error("VpcListMultiSelect requires a list of VPCs using the prop `vpcList`. Got " + prettyJSON(props.vpcList));
  }
  return /*#__PURE__*/React.createElement(IcseMultiSelect, {
    invalidText: "At least one VPC must be selected.",
    invalid: props.invalid,
    id: props.id + "-vpc-select",
    titleText: props.titleText,
    onChange: function onChange(event) {
      return props.onChange(event.selectedItems);
    },
    initialSelectedItems: props.initialSelectedItems,
    className: props.className,
    items: props.vpcList
  });
};
VpcListMultiSelect.defaultProps = {
  invalid: false,
  titleText: "VPCs",
  initialSelectedItems: []
};
VpcListMultiSelect.propTypes = {
  invalid: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  initialSelectedItems: PropTypes.array.isRequired,
  vpcList: PropTypes.arrayOf(PropTypes.string).isRequired
};
var LocationsMultiSelect = function LocationsMultiSelect(props) {
  // throw error here so that passing no vpc list prop will error here
  // instead of being passed to `FilterableMultiselect`
  if (!props.region) {
    throw new Error("LocationsMultiSelect requires a region using the prop `region`. Got " + props.region);
  }
  return /*#__PURE__*/React.createElement(IcseMultiSelect, {
    id: props.id + "-locations-multiselect",
    label: props.label,
    titleText: "Locations",
    className: props.className,
    initialSelectedItems: props.initialSelectedItems,
    invalid: props.invalid,
    invalidText: props.invalidText,
    onChange: function onChange(event) {
      props.onChange(event.selectedItems);
    },
    disabled: props.disabled,
    items: ["global"].concat(props.region),
    itemToString: function itemToString(item) {
      return item ? item : "";
    }
  });
};
LocationsMultiSelect.defaultProps = {
  invalid: false,
  initialSelectedItems: [],
  invalidText: "Select at least one location."
};
LocationsMultiSelect.propTypes = {
  invalid: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  initialSelectedItems: PropTypes.array.isRequired,
  region: PropTypes.string.isRequired
};

var F5VsiForm = /*#__PURE__*/function (_Component) {
  _inherits(F5VsiForm, _Component);
  var _super = _createSuper(F5VsiForm);
  function F5VsiForm(props) {
    var _this;
    _classCallCheck(this, F5VsiForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleMultiSelectChange = _this.handleMultiSelectChange.bind(_assertThisInitialized(_this));
    _this.handleVsiSave = _this.handleVsiSave.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(F5VsiForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "handleMultiSelectChange",
    value: function handleMultiSelectChange(name, value) {
      this.setState(this.setNameToValue(name, value));
    }
  }, {
    key: "handleVsiSave",
    value: function handleVsiSave(stateData) {
      this.props.saveVsiCallback(stateData);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var vsis = _toConsumableArray(this.props.vsis);
      while (vsis.length < this.state.zones) {
        // add a new vsi to display
        vsis.push(this.props.initVsiCallback(this.props.edge_pattern, "zone-".concat(vsis.length + 1), this.props.f5_on_management, {
          f5_image_name: this.state.f5_image_name,
          resource_group: this.state.resource_group,
          ssh_keys: this.state.ssh_keys,
          machine_type: this.state.machine_type
        }));
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "f5_vsi_form",
        name: "zones",
        labelText: "F5 Instance Zones",
        groups: buildNumberDropdownList(4) // 0-3 Zones
        ,
        value: this.state.zones.toString(),
        handleInputChange: this.handleInputChange
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "f5_vsi_form",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroupList,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange
      }), /*#__PURE__*/React.createElement(SshKeyMultiSelect, {
        id: "sshkey",
        sshKeys: this.props.sshKeyList,
        initialSelectedItems: this.state.ssh_keys,
        onChange: function onChange(value) {
          return _this2.handleMultiSelectChange("ssh_keys", value);
        }
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "f5_vsi_form",
        name: "f5_image_name",
        labelText: "F5 Image",
        groups: ["f5-bigip-15-1-5-1-0-0-14-all-1slot", "f5-bigip-15-1-5-1-0-0-14-ltm-1slot", "f5-bigip-16-1-2-2-0-0-28-ltm-1slot", "f5-bigip-16-1-2-2-0-0-28-all-1slot", "f5-bigip-16-1-3-2-0-0-4-ltm-1slot", "f5-bigip-16-1-3-2-0-0-4-all-1slot", "f5-bigip-17-0-0-1-0-0-4-ltm-1slot", "f5-bigip-17-0-0-1-0-0-4-all-1slot"],
        value: this.state.f5_image_name,
        handleInputChange: this.handleInputChange
      }), /*#__PURE__*/React.createElement(FetchSelect, {
        formName: "f5_vsi_form",
        labelText: "Flavor",
        name: "machine_type",
        apiEndpoint: this.props.apiEndpointFlavors,
        handleInputChange: this.handleInputChange,
        value: this.state.machine_type
      })), vsis.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IcseHeading, {
        name: "F5 Big IP Virtual Servers",
        type: "subHeading",
        className: "marginBottomSmall"
      }), /*#__PURE__*/React.createElement("div", {
        className: "displayFlex evenSpacing"
      }, vsis.map(function (instance, index) {
        if (index < _this2.state.zones) return /*#__PURE__*/React.createElement(F5VsiTile, {
          key: "f5-vsi-tile" + JSON.stringify(instance) + index,
          data: instance,
          hide: false,
          onSave: _this2.handleVsiSave,
          totalZones: _this2.state.zones,
          index: index,
          resourceGroupList: _this2.props.resourceGroupList,
          encryptionKeyList: _this2.props.encryptionKeyList,
          hideSaveCallback: _this2.props.hideSaveCallback,
          disableSaveCallback: _this2.props.disableSaveCallback
        });
      }))));
    }
  }]);
  return F5VsiForm;
}(Component);
var F5VsiTile = /*#__PURE__*/function (_React$Component) {
  _inherits(F5VsiTile, _React$Component);
  var _super2 = _createSuper(F5VsiTile);
  function F5VsiTile(props) {
    var _this3;
    _classCallCheck(this, F5VsiTile);
    _this3 = _super2.call(this, props);
    _this3.state = _this3.props.data;
    _this3.handleInputChange = _this3.handleInputChange.bind(_assertThisInitialized(_this3));
    _this3.shouldHideSave = _this3.shouldHideSave.bind(_assertThisInitialized(_this3));
    _this3.shouldDisableSave = _this3.shouldDisableSave.bind(_assertThisInitialized(_this3));
    return _this3;
  }
  _createClass(F5VsiTile, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "shouldHideSave",
    value: function shouldHideSave() {
      return this.props.hideSaveCallback(this.state, this.props);
    }
  }, {
    key: "shouldDisableSave",
    value: function shouldDisableSave() {
      return this.props.disableSaveCallback(this.state, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/React.createElement(Tile, {
        className: "fieldWidth"
      }, /*#__PURE__*/React.createElement(IcseHeading, {
        name: this.state.name,
        type: "subHeading",
        className: "marginBottomSmall",
        buttons: /*#__PURE__*/React.createElement(DynamicRender, {
          hide: this.shouldHideSave(this.state, this.props),
          show: /*#__PURE__*/React.createElement(SaveAddButton, {
            onClick: function onClick() {
              return _this4.props.onSave(_this4.state);
            },
            noDeleteButton: true,
            disabled: this.shouldDisableSave()
          })
        })
      }), /*#__PURE__*/React.createElement(IcseFormGroup, {
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name,
        componentName: "f5_vsi_form",
        value: this.state.name,
        onChange: this.handleInputChange,
        useData: true,
        readOnly: true,
        invalidCallback: function invalidCallback() {},
        invalidText: "",
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "f5_vsi_form",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroupList,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "f5_vsi_form",
        name: "boot_volume_encryption_key_name",
        labelText: "Encryption Key",
        groups: this.props.encryptionKeyList,
        value: this.state.boot_volume_encryption_key_name,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      })));
    }
  }]);
  return F5VsiTile;
}(React.Component);
F5VsiForm.defaultProps = {
  data: {
    zones: 0,
    resource_group: "",
    ssh_keys: [],
    f5_image_name: "",
    machine_type: ""
  },
  vsis: [],
  edge_pattern: "vpn-and-waf",
  f5_on_management: true
};
F5VsiForm.propTypes = {
  data: PropTypes.shape({
    zones: PropTypes.number.isRequired,
    resource_group: PropTypes.string.isRequired,
    ssh_keys: PropTypes.array,
    f5_image_name: PropTypes.string.isRequired,
    machine_type: PropTypes.string.isRequired
  }).isRequired,
  vsis: PropTypes.array.isRequired,
  edge_pattern: PropTypes.string.isRequired,
  f5_on_management: PropTypes.bool.isRequired,
  // use management
  /* api endpoints */
  apiEndpointFlavors: PropTypes.string.isRequired,
  /* lists */
  resourceGroupList: PropTypes.array.isRequired,
  sshKeyList: PropTypes.array.isRequired,
  encryptionKeyList: PropTypes.array.isRequired,
  /* callbacks */
  initVsiCallback: PropTypes.func.isRequired,
  saveVsiCallback: PropTypes.func.isRequired,
  hideSaveCallback: PropTypes.func.isRequired,
  disableSaveCallback: PropTypes.func.isRequired
};

const {
  RegexButWithWords: RegexButWithWords$1
} = regexButWithWords;
const {
  isNullOrEmptyString: isNullOrEmptyString$2
} = lazyZ;
const urlValidationExp = new RegexButWithWords$1().group(exp => {
  exp.literal("ftp").or().literal("http").literal("s").lazy();
}).literal("://").group("www.").lazy().group(exp => {
  exp.negatedSet('"\\/').oneOrMore().literal(".");
}).group(exp => {
  exp.negatedSet('"\\/').oneOrMore().literal(".");
}).oneOrMore().negatedSet('"\\/.').oneOrMore().literal("/").negatedSet(' "').anyNumber().stringEnd().done("g");
const tmosAdminPasswordValidationExp = new RegexButWithWords$1().stringBegin().look.ahead(exp => {
  exp.any().anyNumber().set("a-z");
}).look.ahead(exp => {
  exp.any().anyNumber().set("A-Z");
}).look.ahead(exp => {
  exp.any().anyNumber().set("0-9");
}).any(15, "*").stringEnd().done("");

/**
 * url value is valid and not empty
 * @param {str} url
 * @returns {boolean} true when url is valid and not empty, false when invalid
 */
function isValidUrl(url) {
  if (isNullOrEmptyString$2(url)) return false;
  return url.match(urlValidationExp) !== null;
}

/**
 * verifies tmos admin password
 * @param {str} password
 * @returns {boolean} true when password is valid
 */
function isValidTmosAdminPassword(password) {
  if (isNullOrEmptyString$2(password)) return true;else return password.match(tmosAdminPasswordValidationExp) !== null;
}

/**
 * securely generates a random byte to be transformed into a character
 * @returns {byte} random byte
 */
function getRandomByte() {
  var result = new Uint8Array(1);
  result = window.crypto.getRandomValues(result); // cryptographically secure random number generation
  return result[0];
}

/**
 * Checks if the random byte character generated is a valid character in the charset
 * if it is, return the char, add it to the password String
 * @param {int} length
 * @returns {char} a valid char to go into the password
 */
function generatePassword(length) {
  const charset = /[a-zA-Z0-9_\-+!$%^&*#]/; // valid chars for the password string
  return Array.apply(null, {
    length: length
  }) // create an array of null of length specified
  .map(function () {
    // on each element
    var result;
    while (true) {
      result = String.fromCharCode(getRandomByte()); // generate a char until it is a valid char in the charset
      if (charset.test(result)) {
        return result; // char is in the charset
      }
    }
  }, this).join(""); // join all array elements into a single string
}

/**
 * generates the password until it fits the validation expression
 * @param {int} length
 * @returns {string} password that fits the requirements of the validation expression
 */
function getValidAdminPassword(length) {
  let invalid = true;
  let count = 0;
  let result;
  do {
    result = generatePassword(length); // generate a password until it is valid
    if (tmosAdminPasswordValidationExp.test(result)) {
      // we are valid if this test passes
      invalid = false;
    } else {
      result = ""; // reset result
      count++;
    }
  } while (invalid && count <= 5); // only be more than 5 times if you specified an invalid length. dummy counter for unit
  return result;
}
var f5Utils = {
  getValidAdminPassword,
  isNullOrEmptyString: isNullOrEmptyString$2,
  isValidTmosAdminPassword,
  isValidUrl
};
var f5Utils_1 = f5Utils.getValidAdminPassword;
var f5Utils_2 = f5Utils.isNullOrEmptyString;
var f5Utils_3 = f5Utils.isValidTmosAdminPassword;
var f5Utils_4 = f5Utils.isValidUrl;

var css_248z$4 = ".wide {\n  width: 20rem !important;\n}\n\n.tight {\n  width: min-content; /* force invalid text to split line */\n}\n\n.forceTertiaryButtonStyles {\n  padding-right: 0.4375rem !important;\n  padding-left: 0.4375rem !important;\n}\n\n.passwordGenerateButton {\n  margin-top: 1.25rem;\n  margin-left: calc(-4rem - 3vw);\n}\n\n.passwordGenerateButton svg {\n  fill: var(--cds-icon-secondary, #525252) !important;\n}\n\n.passwordGenerateButton.invalid {\n  margin-left: calc(-5.75rem - 3vw);\n}\n";
styleInject(css_248z$4);

/**
 * F5VsiTemplateForm
 */
var F5VsiTemplateForm = /*#__PURE__*/function (_Component) {
  _inherits(F5VsiTemplateForm, _Component);
  var _super = _createSuper(F5VsiTemplateForm);
  function F5VsiTemplateForm(props) {
    var _this;
    _classCallCheck(this, F5VsiTemplateForm);
    _this = _super.call(this, props);
    _this.state = props.data;
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    _this.handleTextInput = _this.handleTextInput.bind(_assertThisInitialized(_this));
    _this.handleLicenseChange = _this.handleLicenseChange.bind(_assertThisInitialized(_this));
    _this.generateAdminPassword = _this.generateAdminPassword.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * set state to event value
   * @param {event} event
   */
  _createClass(F5VsiTemplateForm, [{
    key: "handleTextInput",
    value: function handleTextInput(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * set conditional fields to null on license type change
     * @param {event} event
     */
  }, {
    key: "handleLicenseChange",
    value: function handleLicenseChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      var reset = {};
      var pool = ["license_username", "license_password", "license_host", "license_pool"];
      var conditionalFields = {
        none: [],
        byol: ["byol_license_basekey"],
        regkeypool: pool,
        utilitypool: ["license_unit_of_measure", "license_sku_keyword_1", "license_sku_keyword_2"].concat(pool)
      };
      this.setState(function (prevState) {
        conditionalFields[prevState.license_type].forEach(function (field) {
          if (!conditionalFields[value].includes(field)) {
            reset[field] = "";
          }
        });
        return _objectSpread2(_defineProperty({}, name, value), reset);
      });
    }

    /**
     * get a valid admin password between 15-20 characters
     */
  }, {
    key: "generateAdminPassword",
    value: function generateAdminPassword() {
      var length = Math.floor(Math.random() * 6 + 15); // between 15-20 chars, inclusive (20 - 15 + 1)
      var password = f5Utils_1(length); // get a valid password
      this.setState({
        tmos_admin_password: password
      }); // set password
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "F5 VSI Template",
        tooltip: {
          content: "The type of license.",
          align: "right"
        },
        labelText: "License Type",
        component: "f5-license-type",
        name: "license_type",
        groups: ["none", "byol", "regkeypool", "utilitypool"],
        value: this.state.license_type,
        className: "fieldWidth",
        handleInputChange: this.handleLicenseChange
      }), /*#__PURE__*/React.createElement("div", {
        className: "tooltip tight"
      }, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The admin account password for the F5 BIG-IP instance.",
          align: "right"
        },
        innerForm: PasswordInput,
        className: "wide",
        id: "tmos_admin_password",
        labelText: "TMOS Admin Password",
        name: "tmos_admin_password",
        value: this.state.tmos_admin_password || "",
        invalid: this.props.invalidCallback("tmos_admin_password", this.state, this.props) || !f5Utils_3(this.state.tmos_admin_password),
        invalidText: "Password must be at least 15 characters, contain one numeric, one uppercase, and one lowercase character.",
        onChange: this.handleTextInput
      })), /*#__PURE__*/React.createElement(PopoverWrapper, {
        hoverText: "Generate Password",
        className: "passwordGenerateButton" + (f5Utils_3(this.state.tmos_admin_password) ? "" : " invalid")
      }, /*#__PURE__*/React.createElement(Button, {
        kind: "ghost",
        onClick: this.generateAdminPassword,
        className: "forceTertiaryButtonStyles"
      }, /*#__PURE__*/React.createElement(Password, null)))), this.state.license_type != "none" && /*#__PURE__*/React.createElement(React.Fragment, null, this.state.license_type != "regkeypool" && this.state.license_type == "byol" && /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "Bring your own license registration key for the F5 BIG-IP instance.",
          align: "top-right"
        },
        id: "byol_license_basekey",
        field: "byol_license_basekey",
        className: "textInputWide",
        labelText: "BYOL License Basekey",
        innerForm: IcseTextInput,
        value: this.state.byol_license_basekey || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("byol_license_basekey", this.state, this.props) || f5Utils_2(this.state.byol_license_basekey),
        invalidText: this.props.invalidTextCallback("byol_license_basekey", this.state, this.props)
      })), this.state.license_type != "byol" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ username to use for the pool based licensing of the F5 BIG-IP instance.",
          align: "top-left"
        },
        id: "license_username",
        field: "license_username",
        className: "fieldWidth",
        labelText: "License Username",
        innerForm: IcseTextInput,
        value: this.state.license_username || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_username", this.state, this.props) || f5Utils_2(this.state.license_username),
        invalidText: this.props.invalidTextCallback("license_username", this.state, this.props)
      }), /*#__PURE__*/React.createElement("div", {
        className: "leftTextAlign tooltip"
      }, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ password to use for the pool based licensing of the F5 BIG-IP instance."
        },
        id: "license_password",
        className: "wide",
        labelText: "License Password",
        innerForm: PasswordInput,
        name: "license_password",
        value: this.state.license_password || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_password", this.state, this.props),
        invalidText: this.props.invalidTextCallback("license_password", this.state, this.props)
      }))), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ IP or hostname to use for pool based licensing of the F5 BIG-IP instance.",
          align: "top-left"
        },
        id: "license_host",
        field: "license_host",
        className: "fieldWidth",
        labelText: "License Host",
        innerForm: IcseTextInput,
        value: this.state.license_host || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_host", this.state, this.props) || f5Utils_2(this.state.license_host),
        invalidText: this.props.invalidTextCallback("license_host", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ license pool name for the licensing of the F5 BIG-IP instance."
        },
        id: "license_pool",
        field: "license_pool",
        className: "wide",
        labelText: "License Pool",
        innerForm: IcseTextInput,
        value: this.state.license_pool || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_pool", this.state, this.props) || f5Utils_2(this.state.license_pool),
        invalidText: this.props.invalidTextCallback("license_pool", this.state, this.props)
      })), this.state.license_type == "utilitypool" && /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ utility pool unit of measurement.",
          align: "top-right"
        },
        id: "license_unit_of_measure",
        field: "license_unit_of_measure",
        className: "fieldWidthSmaller",
        labelText: "License Unit of Measure",
        innerForm: IcseTextInput,
        value: this.state.license_unit_of_measure || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_unit_of_measure", this.state, this.props) || f5Utils_2(this.state.license_unit_of_measure),
        invalidText: this.props.invalidTextCallback("license_unit_of_measure", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ primary SKU for ELA utility licensing of the F5 BIG-IP instance."
        },
        id: "license_sku_keyword_1",
        field: "license_sku_keyword_1",
        className: "fieldWidthSmaller",
        labelText: "License SKU Keyword 1",
        innerForm: IcseTextInput,
        value: this.state.license_sku_keyword_1 || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_sku_keyword_1", this.state, this.props) || f5Utils_2(this.state.license_sku_keyword_1),
        invalidText: this.props.invalidTextCallback("license_sku_keyword_1", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "BIGIQ secondary SKU for ELA utility licensing of the F5 BIG-IP instance"
        },
        id: "license_sku_keyword_2",
        field: "license_sku_keyword_2",
        className: "fieldWidthSmaller",
        labelText: "License SKU Keyword 2",
        innerForm: IcseTextInput,
        value: this.state.license_sku_keyword_2 || "",
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("license_sku_keyword_2", this.state, this.props) || f5Utils_2(this.state.license_sku_keyword_2),
        invalidText: this.props.invalidTextCallback("license_sku_keyword_2", this.state, this.props)
      })))), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The terraform template version for phone_home_url_metadata.",
          align: "top-left"
        },
        id: "template_version",
        field: "template_version",
        className: "fieldWidth",
        labelText: "Template Version",
        innerForm: IcseTextInput,
        value: this.state.template_version,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("template_version", this.state, this.props) || f5Utils_2(this.state.template_version),
        invalidText: this.props.invalidTextCallback("template_version", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The terraform template source for phone_home_url_metadata."
        },
        id: "template_source",
        field: "template_source",
        className: "wide",
        labelText: "Template Source",
        innerForm: IcseTextInput,
        value: this.state.template_source,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("template_source", this.state, this.props) || f5Utils_2(this.state.template_source),
        invalidText: this.props.invalidTextCallback("template_source", this.state, this.props)
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The terraform application id for phone_home_url_metadata.",
          align: "top-right"
        },
        id: "app_id",
        field: "app_id",
        className: "fieldWidth",
        labelText: "App ID",
        innerForm: IcseTextInput,
        value: this.state.app_id,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("app_id", this.state, this.props),
        invalidText: this.props.invalidTextCallback("app_id", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to POST status when BIG-IP is finished onboarding."
        },
        id: "phone_home_url",
        field: "phone_home_url",
        className: "fieldWidth",
        labelText: "Phone Home URL",
        innerForm: IcseTextInput,
        value: this.state.phone_home_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("phone_home_url", this.state, this.props) || !f5Utils_4(this.state.phone_home_url),
        invalidText: this.props.invalidTextCallback("phone_home_url", this.state, this.props)
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to retrieve the f5-declarative-onboarding JSON declaration.",
          align: "top-left"
        },
        id: "do_declaration_url",
        field: "do_declaration_url",
        className: "fieldWidth",
        labelText: "DO Declaration URL",
        innerForm: IcseTextInput,
        value: this.state.do_declaration_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("do_declaration_url", this.state, this.props) || !f5Utils_4(this.state.do_declaration_url),
        invalidText: this.props.invalidTextCallback("do_declaration_url", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to retrieve the f5-appsvcs-extension JSON declaration."
        },
        id: "as3_declaration_url",
        field: "as3_declaration_url",
        className: "fieldWidth",
        labelText: "AS3 Declaration URL",
        innerForm: IcseTextInput,
        value: this.state.as3_declaration_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("as3_declaration_url", this.state, this.props) || !f5Utils_4(this.state.as3_declaration_url),
        invalidText: this.props.invalidTextCallback("as3_declaration_url", this.state, this.props)
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to retrieve the f5-telemetry-streaming JSON declaration.",
          align: "top-left"
        },
        id: "ts_declaration_url",
        field: "ts_declaration_url",
        className: "fieldWidth",
        labelText: "TS Declaration URL",
        innerForm: IcseTextInput,
        value: this.state.ts_declaration_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("ts_declaration_url", this.state, this.props) || !f5Utils_4(this.state.ts_declaration_url),
        invalidText: this.props.invalidTextCallback("ts_declaration_url", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to POST L3 addresses when tgstandby is triggered."
        },
        id: "tgstandby_url",
        field: "tgstandby_url",
        className: "fieldWidth",
        labelText: "TGStandby URL",
        innerForm: IcseTextInput,
        value: this.state.tgstandby_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("tgstandby_url", this.state, this.props) || !f5Utils_4(this.state.tgstandby_url),
        invalidText: this.props.invalidTextCallback("tgstandby_url", this.state, this.props)
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to POST L3 addresses when tgrefresh is triggered.",
          align: "top-left"
        },
        id: "tgrefresh_url",
        field: "tgrefresh_url",
        className: "fieldWidth",
        labelText: "TGRefresh URL",
        innerForm: IcseTextInput,
        value: this.state.tgrefresh_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("tgrefresh_url", this.state, this.props) || !f5Utils_4(this.state.tgrefresh_url),
        invalidText: this.props.invalidTextCallback("tgrefresh_url", this.state, this.props)
      }), /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "The URL to POST L3 addresses when tgactive is triggered."
        },
        id: "tgactive_url",
        field: "tgactive_url",
        className: "fieldWidth",
        labelText: "TGActive URL",
        innerForm: IcseTextInput,
        value: this.state.tgactive_url,
        onChange: this.handleTextInput,
        invalid: this.props.invalidCallback("tgactive_url", this.state, this.props) || !f5Utils_4(this.state.tgactive_url),
        invalidText: this.props.invalidTextCallback("tgactive_url", this.state, this.props)
      })));
    }
  }]);
  return F5VsiTemplateForm;
}(Component);
F5VsiTemplateForm.defaultProps = {
  data: {
    license_type: "none",
    tmos_admin_password: "",
    byol_license_basekey: "",
    license_username: "",
    license_password: "",
    license_host: "",
    license_pool: "",
    license_unit_of_measure: "",
    license_sku_keyword_1: "",
    license_sku_keyword_2: "",
    template_version: "",
    template_source: "",
    app_id: "",
    phone_home_url: "",
    do_declaration_url: "",
    as3_declaration_url: "",
    ts_declaration_url: "",
    tgstandby_url: "",
    tgrefresh_url: "",
    tgactive_url: ""
  }
};
F5VsiTemplateForm.propTypes = {
  data: PropTypes.shape({
    license_type: PropTypes.string.isRequired,
    tmos_admin_password: PropTypes.string.isRequired,
    byol_license_basekey: PropTypes.string.isRequired,
    license_username: PropTypes.string.isRequired,
    license_password: PropTypes.string.isRequired,
    license_host: PropTypes.string.isRequired,
    license_pool: PropTypes.string.isRequired,
    license_unit_of_measure: PropTypes.string.isRequired,
    license_sku_keyword_1: PropTypes.string.isRequired,
    license_sku_keyword_2: PropTypes.string.isRequired,
    template_version: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    template_source: PropTypes.string.isRequired,
    app_id: PropTypes.string.isRequired,
    phone_home_url: PropTypes.string.isRequired,
    do_declaration_url: PropTypes.string.isRequired,
    as3_declaration_url: PropTypes.string.isRequired,
    ts_declaration_url: PropTypes.string.isRequired,
    tgstandby_url: PropTypes.string.isRequired,
    tgrefresh_url: PropTypes.string.isRequired,
    tgactive_url: PropTypes.string.isRequired
  }),
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired
};

const {
  isWholeNumber,
  isInRange
} = lazyZ;
const {
  RegexButWithWords
} = regexButWithWords;
const commaSeparatedIpListExp = new RegexButWithWords().stringBegin().group(exp => {
  exp.group(exp => {
    exp.wordBoundary().group(exp => {
      exp.group(exp => {
        exp.literal("25").set("0-5").or().literal("2").set("0-4").digit().or().set("01").lazy().digit(1, 2);
      }).literal(".");
    }, 3).group(exp => {
      exp.literal("25").set("0-5").or().literal("2").set("0-4").digit().or().set("01").lazy().digit(1, 2);
    }).wordBoundary().group(exp => {
      exp.group(exp => {
        exp.literal("/").group(exp => {
          exp.literal("3").set("0-2").or().set("012").lazy().digit();
        });
      });
    }).lazy();
  });
}).anyNumber().group(exp => {
  exp.literal(",").whitespace().anyNumber().wordBoundary().group(exp => {
    exp.group(exp => {
      exp.literal("25").set("0-5").or().literal("2").set("0-4").digit().or().set("01").lazy().digit(1, 2);
    }).literal(".");
  }, 3).group(exp => {
    exp.literal("25").set("0-5").or().literal("2").set("0-4").digit().or().set("01").lazy().digit(1, 2);
  }).wordBoundary().group(exp => {
    exp.group(exp => {
      exp.literal("/").group(exp => {
        exp.literal("3").set("0-2").or().set("012").lazy().digit();
      });
    });
  }).lazy();
}).anyNumber().stringEnd().done("gm");

/**
 * return true if value is null or empty string
 * @param {*} value
 * @returns {boolean} true if null or empty string
 */
function isNullOrEmptyString$1(value) {
  return value === null || value === "";
}

/**
 * test for invalid range
 * @param {*} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean} true if invalid
 */
function isRangeInvalid(value, min, max) {
  if (isNullOrEmptyString$1(value)) return false;
  value = parseFloat(value);
  if (!isWholeNumber(value) || !isInRange(value, min, max)) {
    return true;
  }
  return false;
}

/**
 * test for invalid IP string
 * @param {string} value
 * @returns {boolean} true if invalid
 */
function isIpStringInvalid(value) {
  if (!isNullOrEmptyString$1(value) && value.match(commaSeparatedIpListExp) === null) {
    return true;
  }
  return false;
}
var iamUtils = {
  isIpStringInvalid,
  isRangeInvalid
};
var iamUtils_1 = iamUtils.isIpStringInvalid;
var iamUtils_2 = iamUtils.isRangeInvalid;

var restrictMenuItems = ["Unset", "Yes", "No"];
var mfaMenuItems = ["NONE", "TOTP", "TOTP4ALL", "Email-Based MFA", "TOTP MFA", "U2F MFA"];
var iamItems = {
  null: {
    display: null,
    value: null
  },
  NONE: {
    display: "NONE",
    value: "NONE"
  },
  TOTP: {
    display: "TOTP",
    value: "TOTP"
  },
  TOTP4ALL: {
    display: "TOTP4ALL",
    value: "TOTP4ALL"
  },
  LEVEL1: {
    display: "Email-Based MFA",
    value: "LEVEL1"
  },
  LEVEL2: {
    display: "TOTP MFA",
    value: "LEVEL2"
  },
  LEVEL3: {
    display: "U2F MFA",
    value: "LEVEL3"
  },
  NOT_SET: {
    display: "Unset",
    value: "NOT_SET"
  },
  RESTRICTED: {
    display: "Yes",
    value: "RESTRICTED"
  },
  NOT_RESTRICTED: {
    display: "No",
    value: "NOT_RESTRICTED"
  },
  "Email-Based MFA": {
    display: "Email-Based MFA",
    value: "LEVEL1"
  },
  "TOTP MFA": {
    display: "TOTP MFA",
    value: "LEVEL2"
  },
  "U2F MFA": {
    display: "U2F MFA",
    value: "LEVEL3"
  },
  Unset: {
    display: "Unset",
    value: "NOT_SET"
  },
  Yes: {
    display: "Yes",
    value: "RESTRICTED"
  },
  No: {
    display: "No",
    value: "NOT_RESTRICTED"
  }
};

/**
 * IAM Account Settings form
 */
var IamAccountSettingsForm = /*#__PURE__*/function (_Component) {
  _inherits(IamAccountSettingsForm, _Component);
  var _super = _createSuper(IamAccountSettingsForm);
  function IamAccountSettingsForm(props) {
    var _this;
    _classCallCheck(this, IamAccountSettingsForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.state.enable = true;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleNumberInputChange = _this.handleNumberInputChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleAllowedIps = _this.handleAllowedIps.bind(_assertThisInitialized(_this));
    _this.handleSelectChange = _this.handleSelectChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {event} event event
   */
  _createClass(IamAccountSettingsForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * handle input change of number-only fields
     * @param {event} event
     */
  }, {
    key: "handleNumberInputChange",
    value: function handleNumberInputChange(event) {
      var value = parseInt(event.target.value) || null;
      if (value || event.target.value === "") {
        this.setState(_defineProperty({}, event.target.name, value));
      }
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     * @param {bool} setDefaults set default values, default is false
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(_defineProperty({}, name, !this.state[name]));
    }

    /**
     * Handle input change for allowed ips text field
     * @param {event} event
     */
  }, {
    key: "handleAllowedIps",
    value: function handleAllowedIps(event) {
      // removing white space and checking for empty value
      var value = event.target.value.replace(/\s*/g, "");
      if (value === "") value = null;
      this.setState({
        allowed_ip_addresses: value
      });
    }

    /**
     * Handle input change for a select
     * @param {event} event
     */
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(event) {
      var name = event.target.name;
      var item = event.target.value;
      this.setState(_defineProperty({}, name, iamItems[item].value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        componentName: "IAM Account Settings",
        className: "fieldWidthSmaller",
        tooltip: {
          content: 'Version of the account settings to update, if no value is supplied then the default value "*" is used to indicate to update any version available. This might result in stale updates.',
          align: "top-left"
        },
        id: "iam-if-match",
        placeholder: "1",
        labelText: "Version",
        value: this.state.if_match,
        onChange: this.handleNumberInputChange,
        field: "if_match",
        invalid: this.props.invalidCallback("if_match", this.state, this.props),
        invalidText: this.props.invalidTextCallback("if_match", this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        value: iamItems[this.state.mfa].display,
        formName: "IAM Account Settings",
        className: "textInputMedium",
        groups: mfaMenuItems,
        handleInputChange: this.handleSelectChange,
        labelText: "Multi-Factor Authentication",
        name: "mfa"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Defines if the entity history is included in the response.",
          align: "top-left"
        },
        labelText: "Include History",
        defaultToggled: this.state.include_history,
        onToggle: function onToggle() {
          return _this2.handleToggle("include_history");
        },
        className: "fieldWidthSmaller",
        id: "iam-include-history"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "IAM Account Settings",
        name: "restrict_create_service_id",
        groups: restrictMenuItems,
        value: iamItems[this.state.restrict_create_service_id].display,
        labelText: "Restrict Creation of Service IDs",
        handleInputChange: this.handleSelectChange
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "IAM Account Settings",
        name: "restrict_create_platform_apikey",
        groups: restrictMenuItems,
        value: iamItems[this.state.restrict_create_platform_apikey].display,
        labelText: "Restrict Creation of API Keys",
        handleInputChange: this.handleSelectChange
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        componentName: "IAM Account Settings",
        placeholder: "1",
        field: "max_sessions_per_identity",
        value: this.state.max_sessions_per_identity || "",
        className: "fieldWidthSmaller",
        onChange: this.handleNumberInputChange,
        labelText: "Max Sessions Per Identity",
        invalid: this.props.invalidCallback("max_sessions_per_identity", this.state, this.props),
        invalidText: this.props.invalidTextCallback("max_sessions_per_identity", this.state, this.props),
        id: "iam-max-sessions-per-id"
      }), /*#__PURE__*/React.createElement(NumberInput, {
        placeholder: "900",
        label: "Session Expiration (sec)",
        id: "iam-session-expiration-seconds",
        allowEmpty: true,
        value: this.state.session_expiration_in_seconds || "",
        step: 1,
        onChange: this.handleInputChange,
        name: "session_expiration_in_seconds",
        hideSteppers: true,
        min: 900,
        max: 86400,
        invalid: iamUtils_2(this.state.session_expiration_in_seconds, 900, 86400),
        invalidText: "Must be a whole number between 900 and 86400",
        className: "fieldWidth leftTextAlign"
      }), /*#__PURE__*/React.createElement(NumberInput, {
        placeholder: "900",
        label: "Session Invalidation (sec)",
        id: "iam-session-invalidation-seconds",
        allowEmpty: true,
        value: this.state.session_invalidation_in_seconds || "",
        step: 1,
        onChange: this.handleInputChange,
        name: "session_invalidation_in_seconds",
        hideSteppers: true,
        invalid: iamUtils_2(this.state.session_invalidation_in_seconds, 900, 7200),
        invalidText: "Must be a whole number between 900 and 7200",
        className: "fieldWidth leftTextAlign",
        min: 900,
        max: 7200
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(ToolTipWrapper, {
        tooltip: {
          content: "IP addresses and subnets from which IAM tokens can be created for the account",
          align: "top-left"
        },
        className: "textInputMedium",
        innerForm: TextArea,
        id: "iam-allowed-ip",
        labelText: "Allowed IPs",
        onChange: this.handleAllowedIps,
        placeholder: this.state.allowed_ip_addresses || "X.X.X.X, X.X.X.X/X, ...",
        invalid: iamUtils_1(this.state.allowed_ip_addresses),
        invalidText: "Please enter a comma separated list of IP addresses or CIDR blocks"
      })));
    }
  }]);
  return IamAccountSettingsForm;
}(Component);
IamAccountSettingsForm.defaultProps = {
  data: {
    if_match: "",
    mfa: mfaMenuItems[0],
    include_history: false,
    restrict_create_service_id: restrictMenuItems[0],
    restrict_create_platform_apikey: restrictMenuItems[0],
    max_sessions_per_identity: "",
    session_expiration_in_seconds: "",
    session_invalidation_in_seconds: "",
    allowed_ip_addresses: ""
  },
  invalidCallback: function invalidCallback() {
    return false;
  },
  invalidTextCallback: function invalidTextCallback() {
    return "Invalid";
  },
  isModal: false
};
IamAccountSettingsForm.propTypes = {
  data: PropTypes.shape({
    if_match: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    mfa: PropTypes.string.isRequired,
    include_history: PropTypes.bool.isRequired,
    restrict_create_service_id: PropTypes.oneOf(restrictMenuItems).isRequired,
    restrict_create_platform_apikey: PropTypes.oneOf(restrictMenuItems).isRequired,
    max_sessions_per_identity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    session_expiration_in_seconds: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    session_invalidation_in_seconds: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    allowed_ip_addresses: PropTypes.string.isRequired
  }),
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  isModal: PropTypes.bool.isRequired
};

/**
 * Under Construction Page
 */
var UnderConstruction = function UnderConstruction() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WarningAlt, {
    size: "128"
  }), /*#__PURE__*/React.createElement("h4", null, "Page Under Construction"));
};

var css_248z$3 = ".cds--tab-content.doc {\n    padding: 0.5rem 0;\n  }\n\n.cds--tab-content:focus {\n  outline: none !important;\n  border: none !important;\n}";
styleInject(css_248z$3);

/**
 * StatefulTabPanel wrapper for non array forms
 * @param {*} props props
 * @param {*} props.form form to put in the create tab
 * @param {*} props.about docs to put in the about tab
 */
var StatefulTabPanel = /*#__PURE__*/function (_React$Component) {
  _inherits(StatefulTabPanel, _React$Component);
  var _super = _createSuper(StatefulTabPanel);
  function StatefulTabPanel(props) {
    var _this;
    _classCallCheck(this, StatefulTabPanel);
    _this = _super.call(this, props);
    _this.state = {
      tabIndex: 0
    };
    _this.setSelectedIndex = _this.setSelectedIndex.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(StatefulTabPanel, [{
    key: "setSelectedIndex",
    value: function setSelectedIndex(event) {
      // if the index is being set to a new tab
      if (this.props.toggleShowChildren && event.selectedIndex !== this.state.tabIndex) this.props.toggleShowChildren();
      this.setState({
        tabIndex: event.selectedIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.props.name && !this.props.hasBuiltInHeading && /*#__PURE__*/React.createElement(IcseHeading, {
        name: this.props.name,
        type: this.props.subHeading ? "subHeading" : "heading",
        className: this.props.className,
        tooltip: this.props.tooltip,
        buttons: /*#__PURE__*/React.createElement(DynamicRender, {
          hide: this.props.hideFormTitleButton || this.state.tabIndex !== 0 || !isFunction$1(this.props.onClick) || this.props.hasBuiltInHeading,
          show: /*#__PURE__*/React.createElement(SaveAddButton, {
            type: "add",
            noDeleteButton: true,
            onClick: this.props.onClick,
            disabled: this.props.shouldDisableSave ? this.props.shouldDisableSave() : false
          })
        })
      }), this.props.hideAbout ? this.props.form : /*#__PURE__*/React.createElement(Tabs, {
        onChange: this.setSelectedIndex
      }, /*#__PURE__*/React.createElement(TabList, {
        "aria-label": "formTabs"
      }, /*#__PURE__*/React.createElement(Tab, null, "Create"), /*#__PURE__*/React.createElement(Tab, null, "About")), /*#__PURE__*/React.createElement(TabPanels, null, /*#__PURE__*/React.createElement(TabPanel, {
        className: "doc"
      }, this.props.form), /*#__PURE__*/React.createElement(TabPanel, {
        className: "doc"
      }, this.props.about ? this.props.about : /*#__PURE__*/React.createElement(UnderConstruction, null)))));
    }
  }]);
  return StatefulTabPanel;
}(React.Component);
StatefulTabPanel.defaultProps = {
  subHeading: false,
  hideFormTitleButton: false,
  hideAbout: false,
  hasBuiltInHeading: false
};
StatefulTabPanel.propTypes = {
  name: PropTypes.string,
  // can be null
  subHeading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  // can be null
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    align: PropTypes.string,
    alignModal: PropTypes.string
  }),
  hideFormTitleButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  // can be null
  shouldDisableSave: PropTypes.func,
  // can be null
  about: PropTypes.node,
  // can be null
  form: PropTypes.node.isRequired,
  hideAbout: PropTypes.bool.isRequired,
  hasBuiltInHeading: PropTypes.bool.isRequired
};

var ToggleForm = /*#__PURE__*/function (_React$Component) {
  _inherits(ToggleForm, _React$Component);
  var _super = _createSuper(ToggleForm);
  function ToggleForm(props) {
    var _this;
    _classCallCheck(this, ToggleForm);
    _this = _super.call(this, props);
    _this.state = {
      hide: _this.props.hide,
      showDeleteModal: false,
      showUnsavedChangeModal: false,
      disableSave: true,
      disableDelete: false,
      showChildren: true,
      showSubModal: false,
      propsMatchState: true,
      useDefaultUnsavedMessage: true,
      ruleOrderChange: false
    };
    _this.toggleChildren = _this.toggleChildren.bind(_assertThisInitialized(_this));
    _this.toggleDeleteModal = _this.toggleDeleteModal.bind(_assertThisInitialized(_this));
    _this.toggleUnsavedChangeModal = _this.toggleUnsavedChangeModal.bind(_assertThisInitialized(_this));
    _this.dismissChangesAndClose = _this.dismissChangesAndClose.bind(_assertThisInitialized(_this));
    _this.onSave = _this.onSave.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    _this.shouldDisableSave = _this.shouldDisableSave.bind(_assertThisInitialized(_this));
    _this.shouldShow = _this.shouldShow.bind(_assertThisInitialized(_this));
    _this.networkRuleOrderDidChange = _this.networkRuleOrderDidChange.bind(_assertThisInitialized(_this));
    _this.toggleShowChildren = _this.toggleShowChildren.bind(_assertThisInitialized(_this));
    _this.onToggleSubModal = _this.onToggleSubModal.bind(_assertThisInitialized(_this));
    _this.childRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  /**
   * toggle sub modal
   */
  _createClass(ToggleForm, [{
    key: "onToggleSubModal",
    value: function onToggleSubModal() {
      this.setState({
        showSubModal: !this.state.showSubModal
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.devMode) {
        console.log(this.props);
      }
      if (this.state.hide === true && this.shouldShow() === true) {
        this.setState({
          hide: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.hide !== this.state.hide && this.props.onShowToggle) {
        this.props.onShowToggle(this.props.index);
      }
    }

    /**
     * toggle children rendered by form
     */
  }, {
    key: "toggleChildren",
    value: function toggleChildren() {
      var _this$childRef$curren;
      if ((_this$childRef$curren = this.childRef.current) !== null && _this$childRef$curren !== void 0 && _this$childRef$curren.state) {
        var stateData = this.childRef.current.state;
        var componentProps = this.childRef.current.props;
        var propsDoNotMatch = this.props.propsMatchState(this.props.submissionFieldName, stateData, componentProps) === false;
        if (propsDoNotMatch || this.state.useDefaultUnsavedMessage === false) {
          this.toggleUnsavedChangeModal();
        } else {
          this.setState({
            hide: !this.state.hide
          });
        }
      } else {
        this.setState({
          hide: !this.state.hide
        });
      }
    }

    /**
     * toggle delete modal
     */
  }, {
    key: "toggleDeleteModal",
    value: function toggleDeleteModal() {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal
      });
    }

    /**
     * toggle unsaved changes modal
     */
  }, {
    key: "toggleUnsavedChangeModal",
    value: function toggleUnsavedChangeModal() {
      this.setState({
        showUnsavedChangeModal: !this.state.showUnsavedChangeModal
      });
    }

    /**
     * Dismiss changes and close
     */
  }, {
    key: "dismissChangesAndClose",
    value: function dismissChangesAndClose() {
      this.setState({
        showUnsavedChangeModal: false,
        hide: true
      });
    }

    /**
     * on save
     */
  }, {
    key: "onSave",
    value: function onSave() {
      this.props.onSave(this.childRef.current.state, this.childRef.current.props);
      this.setState({
        useDefaultUnsavedMessage: true
      });
    }

    /**
     * on delete
     */
  }, {
    key: "onDelete",
    value: function onDelete() {
      var _this$childRef$curren2, _this$childRef$curren3;
      this.props.onShowToggle(this.props.index);
      this.props.onDelete((_this$childRef$curren2 = this.childRef.current) === null || _this$childRef$curren2 === void 0 ? void 0 : _this$childRef$curren2.state, (_this$childRef$curren3 = this.childRef.current) === null || _this$childRef$curren3 === void 0 ? void 0 : _this$childRef$curren3.props);
      this.setState({
        hide: true,
        showDeleteModal: false
      });
    }

    /**
     * should disable save
     * @param {*} stateData state data
     * @param {*} componentProps component props
     */
  }, {
    key: "shouldDisableSave",
    value: function shouldDisableSave(stateData, componentProps) {
      var enableSave = this.props.disableSave(this.props.submissionFieldName, stateData, componentProps) === false;
      var propsDoNotMatch = this.props.propsMatchState(this.props.submissionFieldName, stateData, componentProps) === false;
      if (enableSave === false && this.state.useDefaultUnsavedMessage && propsDoNotMatch === false) {
        this.setState({
          useDefaultUnsavedMessage: false
        });
      } else if (enableSave && propsDoNotMatch && this.state.disableSave) {
        this.setState({
          disableSave: false,
          propsMatchState: false
        });
      } else if (!this.state.disableSave && (!enableSave || !propsDoNotMatch)) {
        this.setState({
          disableSave: true,
          propsMatchState: !propsDoNotMatch
        });
      }
    }
  }, {
    key: "shouldShow",
    value: function shouldShow() {
      return this.props.forceOpen(this.state, this.props);
    }
  }, {
    key: "networkRuleOrderDidChange",
    value: function networkRuleOrderDidChange(didNotChange) {
      var didChange = !didNotChange;
      if (this.state.ruleOrderChange !== didChange) {
        this.setState({
          ruleOrderChange: didChange
        });
      }
    }
  }, {
    key: "toggleShowChildren",
    value: function toggleShowChildren() {
      this.setState({
        showChildren: !this.state.showChildren
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _objectSpread2$1;
      if (this.props.noDeleteButton !== true && !this.props.onDelete) {
        throw new Error("ToggleForm expects onDelete Function to be passed when a delete button is rendered");
      }
      if (this.props.noSaveButton !== true && !this.props.onSave) {
        throw new Error("ToggleForm expects onSave Function to be passed when a save button is rendered");
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatefulTabPanel, _extends({}, this.props.tabPanel ? this.props.tabPanel : {}, {
        toggleShowChildren: this.toggleShowChildren,
        form: /*#__PURE__*/React.createElement(React.Fragment, null, this.props.name && !this.props.hideName && /*#__PURE__*/React.createElement(IcseHeading, {
          name: this.props.name,
          hideButton: true
        }), /*#__PURE__*/React.createElement("div", {
          className: lib_2(this.props.type === "formInSubForm" ? "formInSubForm positionRelative marginBottomSmall" : "subForm marginBottomSmall")
        }, /*#__PURE__*/React.createElement(StatelessToggleForm, {
          hide: this.state.hide,
          iconType: this.props.useAddButton ? "add" : "edit",
          onIconClick: this.toggleChildren,
          toggleFormTitle: true,
          name: this.props.name,
          buttons: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DynamicRender, {
            hide: this.props.addButtonAtFormTitle !== true,
            show: /*#__PURE__*/React.createElement(SaveAddButton, {
              type: "add",
              onClick: this.onToggleSubModal,
              noDeleteButton: true
            })
          }), /*#__PURE__*/React.createElement(DynamicRender, {
            hide: this.props.noSaveButton || this.props.addButtonAtFormTitle,
            show: /*#__PURE__*/React.createElement(SaveAddButton, {
              onClick: this.onSave,
              disabled: this.state.disableSave,
              noDeleteButton: this.props.noDeleteButton
            })
          }), /*#__PURE__*/React.createElement(DynamicRender, {
            hide: this.props.noDeleteButton,
            show: /*#__PURE__*/React.createElement(DeleteButton, {
              onClick: this.toggleDeleteModal,
              name: this.props.name,
              disabled: this.props.deleteDisabled(this.props),
              disableDeleteMessage: this.props.deleteDisabledMessage
            })
          }))
        }, /*#__PURE__*/React.createElement(UnsavedChangesModal, {
          name:
          // use tab panel name if passed
          this.props.name,
          modalOpen: this.state.showUnsavedChangeModal,
          onModalClose: this.toggleUnsavedChangeModal,
          onModalSubmit: this.dismissChangesAndClose,
          useDefaultUnsavedMessage: this.state.useDefaultUnsavedMessage
        }), /*#__PURE__*/React.createElement(DeleteModal, {
          name: this.props.name,
          modalOpen: this.state.showDeleteModal,
          onModalClose: this.toggleDeleteModal,
          onModalSubmit: this.onDelete
        }), RenderForm(this.props.innerForm, _objectSpread2(_objectSpread2({}, this.props.innerFormProps), {}, (_objectSpread2$1 = {
          ref: this.props.nullRef ? null : this.childRef,
          shouldDisableSave: this.shouldDisableSave,
          showSubModal: this.state.showSubModal,
          networkRuleOrderDidChange: this.networkRuleOrderDidChange,
          onChildShowToggle: this.props.onChildShowToggle,
          shownChildren: this.props.shownChildren,
          handleModalToggle: this.onToggleSubModal
        }, _defineProperty(_objectSpread2$1, "showSubModal", this.state.showSubModal), _defineProperty(_objectSpread2$1, "saveFromChildForm", {
          onSave: this.onSave,
          disableSave: this.state.disableSave
        }), _objectSpread2$1)))))),
        about: this.props.about || false
      })), this.state.showChildren && this.props.children ? this.props.children : "");
    }
  }]);
  return ToggleForm;
}(React.Component);
ToggleForm.defaultProps = {
  hide: true,
  unsavedChanges: false,
  index: 0,
  type: "subForm",
  nullRef: false,
  noDeleteButton: false,
  noSaveButton: false,
  useAddButton: false,
  hideName: false,
  // functions that return booleans must have a default
  deleteDisabled: function deleteDisabled() {
    return false;
  },
  forceOpen: function forceOpen() {
    return false;
  }
};
ToggleForm.propTypes = {
  name: PropTypes.string,
  hideName: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onShowToggle: PropTypes.func,
  index: PropTypes.number.isRequired,
  hide: PropTypes.bool.isRequired,
  submissionFieldName: PropTypes.string.isRequired,
  propsMatchState: PropTypes.func.isRequired,
  disableSave: PropTypes.func.isRequired,
  forceOpen: PropTypes.func,
  // can be null
  deleteDisabled: PropTypes.func,
  // can be null
  disableDeleteMessage: PropTypes.func,
  // can be null
  type: PropTypes.string.isRequired,
  nullRef: PropTypes.bool.isRequired,
  innerFormProps: PropTypes.object,
  // can be null
  noDeleteButton: PropTypes.bool.isRequired,
  noSaveButton: PropTypes.bool.isRequired,
  useAddButton: PropTypes.bool.isRequired,
  tabPanel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hideFormTitleButton: PropTypes.bool // can be null
  }).isRequired
};

var IcseFormTemplate = /*#__PURE__*/function (_React$Component) {
  _inherits(IcseFormTemplate, _React$Component);
  var _super = _createSuper(IcseFormTemplate);
  function IcseFormTemplate(props) {
    var _this;
    _classCallCheck(this, IcseFormTemplate);
    _this = _super.call(this, props);
    _this.state = {
      showModal: false,
      shownArrayForms: [],
      // list of array forms to keep open on save
      shownChildForms: [] // list of child forms to keep open on save
    };

    _this.onChildToggle = _this.onChildToggle.bind(_assertThisInitialized(_this));
    _this.toggleModal = _this.toggleModal.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.shouldShow = _this.shouldShow.bind(_assertThisInitialized(_this));
    // add an array to track middle forms
    if (_this.props.isMiddleForm) {
      _this.props.arrayData.forEach(function () {
        return _this.state.shownChildForms.push([]);
      });
    }
    return _this;
  }

  /**
   * keep update forms open
   * @param {number} index index to keep open
   * @param {number=} childIndex optional child index
   */
  _createClass(IcseFormTemplate, [{
    key: "onChildToggle",
    value: function onChildToggle(index, childIndex) {
      if (this.props.parentToggle) {
        // if the parent toggle is passed, run the callback (this function on parent form)
        // with parent index and current index
        this.props.parentToggle.callback(this.props.parentToggle.index, index);
      } else if (arguments.length !== 1) {
        // if a second param is passed
        var shownChildForms = _toConsumableArray(this.state.shownChildForms); // all forms
        // if contains index
        if (contains$1(this.state.shownChildForms[index], childIndex)) {
          // remove index from list
          shownChildForms[index].splice(index, 1);
        } else {
          // otherwise add
          shownChildForms[index].push(childIndex);
        }
        this.setState({
          shownChildForms: shownChildForms
        });
      } else {
        // if only parent index
        var shownForms = _toConsumableArray(this.state.shownArrayForms); // all forms
        if (contains$1(this.state.shownArrayForms, index)) {
          // remove if contains
          shownForms.splice(index, 1);
        } else shownForms.push(index);
        this.setState({
          shownArrayForms: shownForms
        });
      }
    }

    /**
     * on modal submit
     * @param {*} data arbitrary data
     */
  }, {
    key: "onSubmit",
    value: function onSubmit(data) {
      this.props.onSubmit(data, this.props);
      this.toggleModal();
    }

    /**
     * toggle modal on and off
     */
  }, {
    key: "toggleModal",
    value: function toggleModal() {
      this.setState({
        showModal: !this.state.showModal
      });
    }

    /**
     * check if form should show
     * @returns {bool} if the child forms should show
     */
  }, {
    key: "shouldShow",
    value: function shouldShow(index) {
      return this.props.parentToggle ? contains$1(this.props.parentToggle.shownChildren[this.props.parentToggle.index], index) // show children
      : contains$1(this.state.shownArrayForms, index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var formattedName = kebabCase$2(this.props.name); // formatted component name
      // enable submit field here is set to variable value to allow for passing to
      // child array components without needing to reference `this` directly
      return /*#__PURE__*/React.createElement("div", {
        id: formattedName
      }, /*#__PURE__*/React.createElement(StatefulTabPanel, {
        name: this.props.name,
        onClick: this.toggleModal,
        addText: this.props.addText,
        hideButton: this.props.hideFormTitleButton,
        subHeading: this.props.subHeading,
        className: this.props.subHeading ? "subHeading marginBottomSmall" : "",
        tooltip: this.props.tooltip,
        about: this.props.docs ? this.props.docs() : false,
        hideAbout: this.props.hideAbout,
        form: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EmptyResourceTile, {
          name: this.props.name,
          showIfEmpty: this.props.arrayData
        }), this.props.arrayData.map(function (data, index) {
          var _this2$props, _this2$props2, _this2$props3, _this2$props4;
          // return a form with the index and props
          return /*#__PURE__*/React.createElement(ToggleForm, _extends({}, _this2.props.toggleFormProps, {
            propsMatchState: _this2.props.propsMatchState,
            disableSave: _this2.props.disableSave,
            name: data[_this2.props.toggleFormFieldName],
            tabPanel: {
              name: _this2.props.name,
              hideAbout: true,
              // passed to ignore second tab panel
              hasBuiltInHeading: true // passed to ignore second tabPanel
            },

            key: _this2.props.name + "-" + index,
            innerForm: _this2.props.innerForm,
            innerFormProps: _objectSpread2(_objectSpread2({}, _this2.props.innerFormProps), {}, {
              data: _objectSpread2({}, data)
            }) // merge data into innerForm props
            ,
            arrayParentName: _this2.props.arrayParentName,
            onShowToggle: _this2.onChildToggle,
            onChildShowToggle: _this2.props.isMiddleForm ? _this2.onChildToggle // pass through to child component if middle form
            : false,
            index: index,
            show: _this2.shouldShow(index),
            shownChildren: _this2.state.shownChildForms,
            onSave: (_this2$props = _this2.props) === null || _this2$props === void 0 ? void 0 : _this2$props.onSave,
            onDelete: (_this2$props2 = _this2.props) === null || _this2$props2 === void 0 ? void 0 : _this2$props2.onDelete,
            deleteDisabled: (_this2$props3 = _this2.props) === null || _this2$props3 === void 0 ? void 0 : _this2$props3.deleteDisabled,
            deleteDisabledMessage: (_this2$props4 = _this2.props) === null || _this2$props4 === void 0 ? void 0 : _this2$props4.deleteDisabledMessage
          }));
        }), /*#__PURE__*/React.createElement(FormModal, {
          name: this.props.addText,
          show: this.state.showModal,
          onRequestSubmit: this.onSubmit,
          onRequestClose: this.toggleModal,
          arrayParentName: this.props.arrayParentName
        },
        // render the form inside the modal
        RenderForm(this.props.innerForm, _objectSpread2(_objectSpread2({}, this.props.innerFormProps), {}, {
          disableSave: this.props.disableSave,
          arrayParentName: this.props.arrayParentName,
          isModal: true,
          submissionFieldName: this.props.toggleFormProps.submissionFieldName,
          shouldDisableSubmit: function shouldDisableSubmit() {
            // references to `this` in function are intentionally vague
            // in order to pass the correct functions and field values to the
            // child modal component
            // by passing `this` in a function that it scoped to the component
            // we allow the function to be successfully bound to the modal form
            // while still referencing the local value `enableSubmitField`
            // to use it's own values for state and props including enableModal
            // and disableModal, which are dynamically added to the component
            // at time of render
            if (this.props.disableSave(this.props.submissionFieldName, this.state, this.props) === false) {
              this.props.enableModal();
            } else {
              this.props.disableModal();
            }
          }
        })))),
        hideFormTitleButton: this.props.hideFormTitleButton
      }));
    }
  }]);
  return IcseFormTemplate;
}(React.Component);
IcseFormTemplate.defaultProps = {
  hideFormTitleButton: false,
  subHeading: false,
  arrayParentName: null,
  isMiddleForm: false,
  hideAbout: false,
  toggleFormFieldName: "name"
};
IcseFormTemplate.propTypes = {
  name: PropTypes.string,
  // can be null
  arrayData: PropTypes.array.isRequired,
  parentToggle: PropTypes.shape({
    // used to track open and closed middle forms
    callback: PropTypes.func.isRequired,
    shownChildren: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }),
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  addText: PropTypes.string,
  hideFormTitleButton: PropTypes.bool.isRequired,
  subHeading: PropTypes.bool.isRequired,
  docs: PropTypes.func,
  // only used on top level components
  tooltip: PropTypes.object,
  // used only for cos keys
  arrayParentName: PropTypes.string,
  isMiddleForm: PropTypes.bool.isRequired,
  innerFormProps: PropTypes.object.isRequired,
  toggleFormProps: PropTypes.object.isRequired,
  toggleFormFieldName: PropTypes.string.isRequired,
  hideAbout: PropTypes.bool,
  deleteDisabled: PropTypes.func,
  deleteDisabledMessage: PropTypes.string
};

/**
 * Key Management
 */
var KeyManagementForm = /*#__PURE__*/function (_Component) {
  _inherits(KeyManagementForm, _Component);
  var _super = _createSuper(KeyManagementForm);
  function KeyManagementForm(props) {
    var _this;
    _classCallCheck(this, KeyManagementForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleSystemDropdown = _this.handleSystemDropdown.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {event} event event
   */
  _createClass(KeyManagementForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * handle dropdown for key management system
     * @param {event} event event
     */
  }, {
    key: "handleSystemDropdown",
    value: function handleSystemDropdown(event) {
      var selection = event.target.value; // selected value in dropdown
      selection === "HPCS" ? this.setState({
        use_hs_crypto: true,
        use_data: true
      }) : this.setState({
        use_hs_crypto: false,
        use_data: false
      });
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(_defineProperty({}, name, !this.state[name]));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var innerFormProps = {
        invalidCallback: this.props.invalidKeyCallback,
        invalidTextCallback: this.props.invalidKeyTextCallback,
        invalidRingCallback: this.props.invalidRingCallback,
        invalidRingText: this.props.invalidRingText,
        arrayParentName: this.props.data.name
      };
      transpose$1(_objectSpread2({}, this.props.encryptionKeyProps), innerFormProps);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        component: "km-system-dropdown",
        name: "system",
        formName: "system",
        groups: ["Key Protect", "HPCS"],
        value: this.state.use_hs_crypto ? "HPCS" : "Key Protect",
        labelText: "Key Management System",
        handleInputChange: this.handleSystemDropdown,
        className: "fieldWidth"
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Get Key Management from Data Source",
          align: "bottom-left"
        },
        labelText: "Use Existing Instance",
        key: this.state.use_data,
        defaultToggled: this.state.use_data,
        onToggle: this.handleToggle,
        disabled: this.state.use_hs_crypto === true,
        className: "fieldWidth",
        toggleFieldName: "use_data",
        id: this.props.data.name + "-use-existing"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        value: this.state.name,
        componentProps: this.props,
        component: "key_management",
        componentName: this.props.data.name,
        onChange: this.handleInputChange,
        className: "fieldWidth",
        hideHelperText: true,
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "resource_group",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        className: "fieldWidth"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: this.props.isModal
      }, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Allow for IAM Authorization policies to be created to allow this Key Management service to encrypt VPC block storage volumes. This should be false only if these policies already exist within your account.",
          align: "bottom-left"
        },
        labelText: "Authorize VPC Reader Role",
        key: this.state.authorize_vpc_reader_role,
        defaultToggled: this.state.authorize_vpc_reader_role,
        onToggle: function onToggle() {
          return _this2.handleToggle("authorize_vpc_reader_role");
        },
        className: "fieldWidth",
        id: this.props.data.name + "-kms-vpc-reader-role"
      })), this.props.isModal === false && /*#__PURE__*/React.createElement(IcseFormTemplate, {
        name: "Encryption Keys",
        subHeading: true,
        addText: "Create an Encryption Key",
        arrayData: this.props.data.keys,
        innerForm: EncryptionKeyForm,
        disableSave: this.props.encryptionKeyProps.disableSave,
        onDelete: this.props.encryptionKeyProps.onDelete,
        onSave: this.props.encryptionKeyProps.onSave,
        onSubmit: this.props.encryptionKeyProps.onSubmit,
        propsMatchState: this.props.propsMatchState,
        innerFormProps: _objectSpread2({}, innerFormProps),
        hideAbout: true,
        toggleFormProps: {
          hideName: true,
          submissionFieldName: "encryption_keys",
          disableSave: this.props.encryptionKeyProps.disableSave,
          type: "formInSubForm"
        }
      }));
    }
  }]);
  return KeyManagementForm;
}(Component);
KeyManagementForm.defaultProps = {
  data: {
    use_hs_crypto: false,
    use_data: false,
    name: "",
    resource_group: "",
    authorize_vpc_reader_role: false,
    keys: []
  },
  isModal: false
};
KeyManagementForm.propTypes = {
  data: PropTypes.shape({
    use_hs_crypto: PropTypes.bool.isRequired,
    use_data: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string.isRequired,
    authorize_vpc_reader_role: PropTypes.bool.isRequired,
    keys: PropTypes.array.isRequired
  }).isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired,
  invalidKeyCallback: PropTypes.func.isRequired,
  invalidKeyTextCallback: PropTypes.func.isRequired,
  invalidRingCallback: PropTypes.func.isRequired,
  invalidRingText: PropTypes.string.isRequired,
  propsMatchState: PropTypes.func.isRequired,
  encryptionKeyProps: PropTypes.shape({
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disableSave: PropTypes.func.isRequired
  }).isRequired
};

var css_248z$2 = ".marginBottomSmall {\n  margin-bottom: 1rem;\n}\n\n.formInSubForm {\n  margin-top: 0rem;\n  background: #fffdfd;\n  padding: 1rem;\n}\n\n.positionRelative {\n  position: relative;\n}\n";
styleInject(css_248z$2);

var _require = require("lazy-z"),
  capitalize = _require.capitalize,
  titleCase = _require.titleCase,
  kebabCase = _require.kebabCase,
  isIpv4CidrOrAddress = _require.isIpv4CidrOrAddress,
  validPortRange = _require.validPortRange,
  isNullOrEmptyString = _require.isNullOrEmptyString,
  contains = _require.contains;

/** NetworkingRuleForm
 * @param {Object} props
 * @param {configDotJson} props.configDotJson config dot json
 * @param {slz} props.slz slz state store
 */
var NetworkingRuleForm = /*#__PURE__*/function (_Component) {
  _inherits(NetworkingRuleForm, _Component);
  var _super = _createSuper(NetworkingRuleForm);
  function NetworkingRuleForm(props) {
    var _this;
    _classCallCheck(this, NetworkingRuleForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2({}, _this.props.data);
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_this));
    _this.handleRuleUpdate = _this.handleRuleUpdate.bind(_assertThisInitialized(_this));
    _this.handleRuleDelete = _this.handleRuleDelete.bind(_assertThisInitialized(_this));
    _this.handleRuleDataUpdate = _this.handleRuleDataUpdate.bind(_assertThisInitialized(_this));
    _this.toggleDeleteModal = _this.toggleDeleteModal.bind(_assertThisInitialized(_this));
    _this.shouldDisableSave = _this.shouldDisableSave.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Handle input change for a text field
   * @param {String} inputName name of the field to set state
   * @param {event} event
   * @param {boolean=} lowercase set value to lowercase
   */
  _createClass(NetworkingRuleForm, [{
    key: "handleInput",
    value: function handleInput(inputName, event, lowercase) {
      var newValue = lowercase ? event.target.value.toLowerCase() : event.target.value;
      this.setState(_defineProperty({}, inputName, newValue));
    }

    /**
     * Handler function for the rule updates
     * @param {String} inputName name of the field to set state in Rule
     * @param event event
     */
  }, {
    key: "handleRuleDataUpdate",
    value: function handleRuleDataUpdate(inputName, event) {
      var value = parseInt(event.target.value) || null;
      this.setState(function (prevState) {
        return {
          rule: _objectSpread2(_objectSpread2({}, prevState.rule), {}, _defineProperty({}, inputName, value))
        };
      });
    }

    /**
     * update a network rule
     */
  }, {
    key: "handleRuleUpdate",
    value: function handleRuleUpdate() {
      this.props.onSave(this.state, this.props);
    }

    /**
     * delete a network rule
     */
  }, {
    key: "handleRuleDelete",
    value: function handleRuleDelete() {
      this.props.onDelete(this.state, this.props);
    }

    /**
     * toggle delete modal
     */
  }, {
    key: "toggleDeleteModal",
    value: function toggleDeleteModal() {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal
      });
    }

    /**
     * Returns true if save should be disabled or if props match state (save disabled)
     * @returns {boolean} if save is disabled
     */
  }, {
    key: "shouldDisableSave",
    value: function shouldDisableSave() {
      return this.props.disableSaveCallback(this.state, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var ruleName = this.props.isModal ? "new-rule" : this.props.data.name;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        key: "rule-div-" + ruleName,
        className: this.props.hide ? "" : "marginBottomSmall" // add margin bottom small if shown
      }, this.props.isModal !== true && /*#__PURE__*/React.createElement(DeleteModal, {
        name: ruleName,
        modalOpen: this.state.showDeleteModal,
        onModalClose: this.toggleDeleteModal,
        onModalSubmit: this.handleRuleDelete
      }), /*#__PURE__*/React.createElement(DynamicRender, {
        hide: this.props.hide && this.props.isModal === true,
        show: /*#__PURE__*/React.createElement(StatelessToggleForm, {
          key: "rule-name-" + ruleName,
          name: this.props.isModal ? "" : ruleName // do not show name when modal
          ,
          onIconClick: this.props.onToggle,
          toggleFormTitle: true,
          hide: this.props.hide && this.props.isModal !== true,
          hideIcon: this.props.isModal,
          alwaysShowButtons: true,
          buttons: this.props.isModal ? "" : this.props.hide === false ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SaveAddButton, {
            onClick: this.handleRuleUpdate,
            disabled: this.shouldDisableSave()
          }), /*#__PURE__*/React.createElement(DeleteButton, {
            onClick: this.toggleDeleteModal,
            name: ruleName
          })) : /*#__PURE__*/React.createElement(UpDownButtons, {
            name: ruleName,
            handleUp: this.props.handleUp,
            handleDown: this.props.handleDown,
            disableUp: this.props.disableUp,
            disableDown: this.props.disableDown
          })
        }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
          id: this.state.name + "-name",
          componentName: this.props.data.name + "-rule",
          value: this.state.name,
          onChange: function onChange(event) {
            return _this2.handleInput("name", event);
          },
          invalidCallback: function invalidCallback() {
            return _this2.props.invalidCallback(_this2.state, _this2.props);
          },
          invalidTextCallback: function invalidTextCallback() {
            return _this2.props.invalidCallback(_this2.state, _this2.props);
          },
          hideHelperText: true,
          className: "fieldWidthSmaller"
        }), !this.props.isSecurityGroup && /*#__PURE__*/React.createElement(NetworkingRuleSelect, {
          state: this.state,
          name: "action",
          onChange: this.handleInput,
          groups: ["Allow", "Deny"],
          props: this.props
        }), /*#__PURE__*/React.createElement(NetworkingRuleSelect, {
          name: "direction",
          state: this.state,
          onChange: this.handleInput,
          groups: ["Inbound", "Outbound"],
          props: this.props
        }), this.props.isSecurityGroup && /*#__PURE__*/React.createElement(NetworkingRuleTextField, {
          name: "source",
          state: this.state,
          onChange: this.handleInput
        })), /*#__PURE__*/React.createElement(IcseFormGroup, null, !this.props.isSecurityGroup && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NetworkingRuleTextField, {
          name: "source",
          state: this.state,
          onChange: this.handleInput
        }), /*#__PURE__*/React.createElement(NetworkingRuleTextField, {
          name: "destination",
          state: this.state,
          onChange: this.handleInput
        })), /*#__PURE__*/React.createElement(IcseSelect, {
          formName: ruleName + "-protocol",
          groups: ["ALL", "TCP", "UDP", "ICMP"],
          value: this.state.ruleProtocol.toUpperCase(),
          labelText: "Protocol",
          name: "ruleProtocol",
          handleInputChange: function handleInputChange(event) {
            return _this2.handleInput("ruleProtocol", event, true);
          },
          className: "fieldWidthSmaller"
        })), (this.state.ruleProtocol === "tcp" || this.state.ruleProtocol === "udp") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(NetworkingRuleProtocolTextField, {
          name: "port_min",
          state: this.state,
          onChange: this.handleRuleDataUpdate
        }), /*#__PURE__*/React.createElement(NetworkingRuleProtocolTextField, {
          name: "port_max",
          state: this.state,
          onChange: this.handleRuleDataUpdate
        })), !this.props.isSecurityGroup && /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(NetworkingRuleProtocolTextField, {
          name: "source_port_min",
          state: this.state,
          onChange: this.handleRuleDataUpdate
        }), /*#__PURE__*/React.createElement(NetworkingRuleProtocolTextField, {
          name: "source_port_max",
          state: this.state,
          onChange: this.handleRuleDataUpdate
        }))), this.state.ruleProtocol === "icmp" && /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(NetworkingRuleProtocolTextField, {
          name: "type",
          state: this.state,
          onChange: this.handleRuleDataUpdate
        }), /*#__PURE__*/React.createElement(NetworkingRuleProtocolTextField, {
          name: "code",
          state: this.state,
          onChange: this.handleRuleDataUpdate
        }))))
      })));
    }
  }]);
  return NetworkingRuleForm;
}(Component);
NetworkingRuleForm.defaultProps = {
  isSecurityGroup: false,
  isModal: false,
  disableUp: false,
  disableDown: false,
  data: {
    name: "",
    action: "allow",
    direction: "inbound",
    source: "",
    destination: "",
    ruleProtocol: "all",
    rule: {
      port_max: null,
      port_min: null,
      source_port_max: null,
      source_port_min: null,
      type: null,
      code: null
    }
  },
  hide: false
};
NetworkingRuleForm.propTypes = {
  isModal: PropTypes.bool.isRequired,
  // functions only used when not modal
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  disableDown: PropTypes.bool,
  disableUp: PropTypes.bool,
  handleDown: PropTypes.func,
  handleUp: PropTypes.func,
  disableSaveCallback: PropTypes.func,
  // functions for components
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    action: PropTypes.string,
    // not required for sg
    destination: PropTypes.string,
    // not required for sg
    direction: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rule: PropTypes.shape({
      // can be null
      port_min: PropTypes.number,
      port_max: PropTypes.number,
      source_port_min: PropTypes.number,
      source_port_max: PropTypes.number,
      type: PropTypes.number,
      code: PropTypes.number
    }).isRequired,
    source: PropTypes.string.isRequired
  }),
  isSecurityGroup: PropTypes.bool.isRequired
};

/**
 * readability shortcut for nw rules
 * @param {*} props
 * @param {string} props.name field to update
 * @param {Object} props.state parent state
 * @param {Function} props.onChange onchange function
 */
var NetworkingRuleTextField = function NetworkingRuleTextField(props) {
  return /*#__PURE__*/React.createElement(IcseTextInput, {
    id: "".concat(props.state.name, "-nw-").concat(kebabCase(props.name), "-input"),
    field: props.name,
    labelText: titleCase(props.name),
    value: String(props.state[props.name]),
    onChange: function onChange(e) {
      return props.onChange(props.name, e);
    },
    className: "fieldWidthSmaller",
    placeholder: "x.x.x.x",
    invalidText: "Please provide a valid IPV4 IP address or CIDR notation.",
    invalidCallback: function invalidCallback() {
      return isIpv4CidrOrAddress(props.state[props.name]) === false;
    }
  });
};
NetworkingRuleTextField.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * rule protocol text field
 * @param {*} props
 * @param {string} props.name field to update
 * @param {Object} props.state parent state
 * @param {Function} props.onChange onchange function
 */
var NetworkingRuleProtocolTextField = function NetworkingRuleProtocolTextField(props) {
  return /*#__PURE__*/React.createElement(TextInput, {
    id: "".concat(props.state.name, "-nw-").concat(kebabCase(props.name), "-input"),
    labelText: titleCase(props.name),
    placeholder: String(props.state.rule[props.name] || ""),
    value: props.state.rule[props.name] || "",
    onChange: function onChange(e) {
      return props.onChange(props.name, e);
    },
    invalid: validPortRange(props.name, props.state.rule[props.name] || -1) === false && isNullOrEmptyString(props.state.rule[props.name]) === false,
    invalidText: contains(["type", "code"], props.name) ? "0 to ".concat(props.name === "type" ? 254 : 255) : "1 to 65535",
    className: "fieldWidthSmaller"
  });
};
NetworkingRuleProtocolTextField.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.shape({
    rule: PropTypes.shape({}).isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * readability shortcut for nw rules
 * @param {*} props
 * @param {string} props.name field to update
 * @param {Object} props.state parent state
 * @param {Function} props.onChange onchange function
 * @param {Array<string>} props.groups list of groups for select
 */
var NetworkingRuleSelect = function NetworkingRuleSelect(props) {
  return /*#__PURE__*/React.createElement(IcseSelect, {
    formName: props.state.name + "-nw-rule-" + props.name,
    name: props.name,
    groups: props.groups,
    value: capitalize(props.state[props.name]),
    labelText: capitalize(props.name),
    handleInputChange: function handleInputChange(e) {
      return props.onChange(props.name, e, true);
    },
    className: "fieldWidthSmaller"
  });
};
NetworkingRuleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.shape({
    rule: PropTypes.shape({}).isRequired,
    name: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
};

var NetworkingRulesOrderCard = /*#__PURE__*/function (_Component) {
  _inherits(NetworkingRulesOrderCard, _Component);
  var _super = _createSuper(NetworkingRulesOrderCard);
  function NetworkingRulesOrderCard(props) {
    var _this;
    _classCallCheck(this, NetworkingRulesOrderCard);
    _this = _super.call(this, props);
    _this.state = {
      rules: _toConsumableArray(_this.props.rules),
      collapse: {},
      allCollapsed: false,
      showModal: false
    };
    _this.swapArrayElements = _this.swapArrayElements.bind(_assertThisInitialized(_this));
    _this.handleUp = _this.handleUp.bind(_assertThisInitialized(_this));
    _this.handleDown = _this.handleDown.bind(_assertThisInitialized(_this));
    _this.toggleCollapse = _this.toggleCollapse.bind(_assertThisInitialized(_this));
    _this.collapseAll = _this.collapseAll.bind(_assertThisInitialized(_this));
    _this.toggleModal = _this.toggleModal.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.getRuleProtocol = _this.getRuleProtocol.bind(_assertThisInitialized(_this));
    _this.getSubRule = _this.getSubRule.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(NetworkingRulesOrderCard, [{
    key: "getRuleProtocol",
    value: function getRuleProtocol(rule) {
      var protocol = "all";
      // for each possible protocol
      ["icmp", "tcp", "udp"].forEach(function (field) {
        // set protocol to that field if not all fields are null
        if (allFieldsNull(rule[field]) === false) {
          protocol = field;
        }
      });
      return protocol;
    }

    /**
     * create sub rule
     * @param {*} rule rule object
     * @param {string} protocol all, tcp, icmp, or udp
     * @returns {Object} default rule object
     */
  }, {
    key: "getSubRule",
    value: function getSubRule(rule) {
      var defaultRule = {
        port_max: null,
        port_min: null,
        source_port_max: null,
        source_port_min: null,
        type: null,
        code: null
      };
      if (this.props.isSecurityGroup) {
        delete defaultRule.source_port_min;
        delete defaultRule.source_port_max;
      }
      if (this.getRuleProtocol(rule) !== "all") {
        transpose(rule[protocol], defaultRule);
      }
      return defaultRule;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.allCollapsed === false && this.props.expandAll === false) this.collapseAll();
    }
  }, {
    key: "toggleModal",
    value: function toggleModal() {
      this.setState({
        showModal: !this.state.showModal
      });
    }

    /**
     * toggle collapse rule
     * @param {string} ruleName rule name
     */
  }, {
    key: "toggleCollapse",
    value: function toggleCollapse(ruleName) {
      var collapse = this.state.collapse;
      collapse[ruleName] = !containsKeys(this.state.collapse, ruleName) // if rule dies not exist
      ? true // set to true
      : !this.state.collapse[ruleName]; // otherwise set to opposite
      this.setState({
        collapse: collapse
      });
    }

    /**
     * collapse each rule
     */
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      var _this2 = this;
      var collapse = this.state.collapse;
      this.state.rules.forEach(function (rule) {
        collapse[rule.name] = !_this2.state.allCollapsed;
      });
      this.setState({
        collapse: collapse,
        allCollapsed: !this.state.allCollapsed
      });
    }

    /**
     * Helper function to move items up and down in the list so they can be rendered properly
     * @param {Array} arr
     * @param {number} indexA
     * @param {number} indexB
     */
  }, {
    key: "swapArrayElements",
    value: function swapArrayElements(arr, indexA, indexB) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    }

    /**
     * Move the card up
     * @param {number} index
     */
  }, {
    key: "handleUp",
    value: function handleUp(index) {
      var prevRulesState = _toConsumableArray(this.state.rules);
      if (index !== 0) {
        this.swapArrayElements(prevRulesState, index, index - 1);
      }
      this.props.networkRuleOrderDidChange(prevRulesState);
      this.setState({
        rules: prevRulesState
      });
    }

    /**
     * Move the card down
     * @param {number} index
     */
  }, {
    key: "handleDown",
    value: function handleDown(index) {
      var prevRulesState = _toConsumableArray(this.state.rules);
      var maxLen = prevRulesState.length - 1;
      if (index !== maxLen) {
        this.swapArrayElements(prevRulesState, index, index + 1);
      }
      this.props.networkRuleOrderDidChange(prevRulesState);
      this.setState({
        rules: prevRulesState
      });
    }

    /**
     * @param {Object} modalData data from the modal form passed back from instanceFormModal
     */
  }, {
    key: "handleSubmit",
    value: function handleSubmit(modalData) {
      this.props.onSubmitCallback(modalData, this.props);
      this.toggleModal();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseHeading, {
        name: "Rules",
        className: "marginBottomSmall",
        type: "subHeading",
        buttons: /*#__PURE__*/React.createElement(DynamicRender, {
          hide: this.props.hideCreate,
          show: /*#__PURE__*/React.createElement(SaveAddButton, {
            type: "add",
            onClick: this.toggleModal
          })
        })
      }), /*#__PURE__*/React.createElement(FormModal, {
        name: "Create a Network Rule",
        show: this.state.showModal,
        onRequestSubmit: this.handleSubmit,
        onRequestClose: this.toggleModal
      }, /*#__PURE__*/React.createElement(NetworkingRuleForm, {
        isSecurityGroup: this.props.isSecurityGroup,
        invalidCallback: this.props.invalidCallback,
        invalidTextCallback: this.props.invalidTextCallback,
        parent_name: this.props.parent_name,
        disableModalSubmit: function disableModalSubmit() {
          //set modal form enable submit
          if (this.props.disableModalSubmitCallback(this.state, this.props) === false) {
            this.props.enableModal();
          } else {
            this.props.disableModal();
          }
        }
      })), /*#__PURE__*/React.createElement(EmptyResourceTile, {
        name: "Network Rules",
        showIfEmpty: this.state.rules
      }), this.state.rules.map(function (rule, index) {
        return /*#__PURE__*/React.createElement("div", {
          key: "rule-div-" + rule.name + "-wrapper",
          className: "marginBottomSmall positionRelative formInSubForm"
        }, /*#__PURE__*/React.createElement(NetworkingRuleForm, {
          hide: _this3.state.collapse[rule.name],
          onToggle: function onToggle() {
            return _this3.toggleCollapse(rule.name);
          },
          disableUp: index === 0,
          handleUp: function handleUp() {
            return _this3.handleUp(index);
          },
          disableDown: index === _this3.state.rules.length - 1,
          handleDown: function handleDown() {
            return _this3.handleDown(index);
          },
          key: _this3.props.vpc_name + "-nw-rule-" + rule.name,
          id: _this3.props.vpc_name + "-nw-rule-form-" + rule.name,
          invalidCallback: _this3.props.invalidCallback,
          invalidTextCallback: _this3.props.invalidTextCallback,
          data: {
            name: rule.name,
            action: rule.action || null,
            direction: rule.direction,
            source: rule.source,
            destination: rule.destination || null,
            ruleProtocol: _this3.getRuleProtocol(rule),
            rule: _this3.getSubRule(rule)
          },
          disableSaveCallback: _this3.props.disableSaveCallback,
          isSecurityGroup: _this3.props.isSecurityGroup,
          onSave: _this3.props.onRuleSave,
          onDelete: _this3.props.onRuleDelete,
          parent_name: _this3.props.parent_name
        }));
      }));
    }
  }]);
  return NetworkingRulesOrderCard;
}(Component);
NetworkingRulesOrderCard.defaultProps = {
  rules: [],
  hideCreate: false,
  isSecurityGroup: false,
  expandAll: false
};
NetworkingRulesOrderCard.propTypes = {
  isSecurityGroup: PropTypes.bool.isRequired,
  rules: PropTypes.array.isRequired,
  hideCreate: PropTypes.bool.isRequired,
  expandAll: PropTypes.bool.isRequired,
  disableModalSubmitCallback: PropTypes.func.isRequired,
  disableSaveCallback: PropTypes.func.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  vpc_name: PropTypes.string.isRequired,
  networkRuleOrderDidChange: PropTypes.func.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  onRuleSave: PropTypes.func.isRequired,
  onRuleDelete: PropTypes.func.isRequired,
  parent_name: PropTypes.string.isRequired
};

/** NetworkAclForm
 * @param {Object} props
 */
var NetworkAclForm = /*#__PURE__*/function (_Component) {
  _inherits(NetworkAclForm, _Component);
  var _super = _createSuper(NetworkAclForm);
  function NetworkAclForm(props) {
    var _this;
    _classCallCheck(this, NetworkAclForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleTextInput = _this.handleTextInput.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.networkRuleOrderDidChange = _this.networkRuleOrderDidChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Handle input change for a text field
   * @param {event} event
   */
  _createClass(NetworkAclForm, [{
    key: "handleTextInput",
    value: function handleTextInput(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the toggle to change
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(this.toggleStateBoolean(name, this.state));
    }
    /**
     * Check if the order of network rules updated - then update state to allow save
     * @param {Array} rules list of rule objects
     */
  }, {
    key: "networkRuleOrderDidChange",
    value: function networkRuleOrderDidChange(rules) {
      this.props.networkRuleOrderDidChange(this.state, this.props);
      this.setState({
        rules: rules
      }); // update rules state when an update occurs
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        componentName: this.props.data.name,
        value: this.state.name,
        onChange: this.handleTextInput,
        placeholder: "my-network-acl-name",
        component: "network_acls",
        helperTextCallback: function helperTextCallback() {
          return _this2.props.helperTextCallback(_this2.state, _this2.props);
        },
        invalidCallback: function invalidCallback() {
          return _this2.props.invalidCallback(_this2.state, _this2.props);
        },
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Automatically add to ACL rules needed to allow cluster provisioning from private service endpoints.",
          link: "https://cloud.ibm.com/docs/openshift?topic=openshift-vpc-acls"
        },
        labelText: "Use Cluster Rules",
        toggleFieldName: "add_cluster_rules",
        defaultToggled: this.state.add_cluster_rules,
        id: this.state.name + "acl-add-rules-toggle",
        onToggle: this.handleToggle,
        isModal: this.props.isModal
      })), !this.props.isModal &&
      /*#__PURE__*/
      // ability to move rules up and down
      React.createElement(NetworkingRulesOrderCard, {
        rules: this.state.rules,
        vpc_name: this.props.arrayParentName,
        parent_name: this.props.data.name,
        networkRuleOrderDidChange: this.networkRuleOrderDidChange,
        isAclForm: true,
        invalidCallback: this.props.invalidCallback,
        invalidTextCallback: this.props.invalidTextCallback,
        onSubmitCallback: this.props.onSubmitCallback,
        onRuleSave: this.props.onRuleSave,
        onRuleDelete: this.props.onRuleDelete,
        disableModalSubmitCallback: this.props.disableModalSubmitCallback,
        disableSaveCallback: this.props.disableSaveCallback
      }));
    }
  }]);
  return NetworkAclForm;
}(Component);
NetworkAclForm.defaultProps = {
  data: {
    name: "",
    add_cluster_rules: false,
    rules: []
  },
  isModal: false
};
NetworkAclForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    add_cluster_rules: PropTypes.bool.isRequired,
    rules: PropTypes.array
  }),
  isModal: PropTypes.bool.isRequired,
  networkRuleOrderDidChange: PropTypes.func,
  // can be undefined
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  helperTextCallback: PropTypes.func.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  onRuleSave: PropTypes.func.isRequired,
  onRuleDelete: PropTypes.func.isRequired,
  disableModalSubmitCallback: PropTypes.func.isRequired,
  disableSaveCallback: PropTypes.func.isRequired
};

var ObjectStorageBucketForm = /*#__PURE__*/function (_Component) {
  _inherits(ObjectStorageBucketForm, _Component);
  var _super = _createSuper(ObjectStorageBucketForm);
  function ObjectStorageBucketForm(props) {
    var _this;
    _classCallCheck(this, ObjectStorageBucketForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleStorageClassChange = _this.handleStorageClassChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Handler for toggle
   */
  _createClass(ObjectStorageBucketForm, [{
    key: "handleToggle",
    value: function handleToggle() {
      this.setState(this.toggleStateBoolean("force_delete", this.state));
    }

    /**
     * handle storage class change and convert to lowercase for value
     * @param {event} event event
     */
  }, {
    key: "handleStorageClassChange",
    value: function handleStorageClassChange(event) {
      this.setState({
        storage_class: event.target.value.toLowerCase()
      });
    }

    /**
     * handle input change
     * @param {event} event event
     */
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      // composed id for bucket
      var composedId = "bucket-form-".concat(this.props.data.name ? this.props.data.name : "new-bucket");
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.props.data.name + "-object-storage-bucket-name",
        componentName: this.state.name,
        value: this.state.name,
        onChange: this.handleInputChange,
        helperTextCallback: function helperTextCallback() {
          return _this2.props.composedNameCallback(_this2.state, _this2.props);
        },
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props),
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        component: this.state.name,
        formName: this.props.data.name + "-object-storage-bucket-class",
        name: "storage_class",
        groups: ["Standard", "Vault", "Cold", "Smart"],
        value: capitalize$1(this.state.storage_class),
        labelText: "Bucket Class",
        handleInputChange: this.handleStorageClassChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(EndpointSelect, {
        formName: "Object Storage Bucket",
        handleInputChange: this.handleInputChange,
        value: this.state.endpoint,
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        component: this.state.name,
        formName: this.props.data.name + "-object-storage-bucket-key",
        name: "kms_key",
        groups: this.props.encryptionKeys,
        value: this.state.kms_key,
        labelText: "Encryption Key",
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Toggling this on will force delete contents of the bucket after the bucket is deleted"
        },
        id: composedId + "force-delete",
        labelText: "Force Delete Contents",
        defaultToggled: this.state.force_delete,
        toggleFieldName: "force_delete",
        onToggle: this.handleToggle
      })));
    }
  }]);
  return ObjectStorageBucketForm;
}(Component);
ObjectStorageBucketForm.defaultProps = {
  data: {
    force_delete: false,
    name: "",
    storage_class: "Standard",
    kms_key: "",
    endpoint: "public"
  },
  encryptionKeys: []
};
ObjectStorageBucketForm.propTypes = {
  data: PropTypes.shape({
    force_delete: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    storage_class: PropTypes.string.isRequired,
    kms_key: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired
  }).isRequired,
  encryptionKeys: PropTypes.array.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  composedNameCallback: PropTypes.func.isRequired
};

var ObjectStorageKeyForm = /*#__PURE__*/function (_Component) {
  _inherits(ObjectStorageKeyForm, _Component);
  var _super = _createSuper(ObjectStorageKeyForm);
  function ObjectStorageKeyForm(props) {
    var _this;
    _classCallCheck(this, ObjectStorageKeyForm);
    _this = _super.call(this, props);
    _this.state = {
      name: _this.props.data.name,
      role: _this.props.data.role || "Writer",
      enable_hmac: _this.props.data.enable_hmac,
      use_random_suffix: _this.props.data.use_random_suffix
    };
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Handler for toggle
   * @param {String} name specifies the name of the state value you wish to change
   */
  _createClass(ObjectStorageKeyForm, [{
    key: "handleToggle",
    value: function handleToggle() {
      this.setState(this.toggleStateBoolean("enable_hmac", this.state));
    }

    /**
     * handle input change
     * @param {event} event event
     */
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      // composed id
      var composedId = "key-form-".concat(this.props.data.name ? this.props.data.name : "new-key");
      var inputSize = this.props.isModal ? "fieldWidthSmaller" : "fieldWidth";
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        componentName: this.props.data.name,
        value: this.state.name,
        onChange: this.handleInputChange,
        componentProps: this.props,
        placeholder: "my-cos-key-name",
        className: inputSize,
        helperTextCallback: function helperTextCallback() {
          return _this2.props.composedNameCallback(_this2.state, _this2.props);
        },
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        name: "role",
        groups: ["Object Writer", "Object Reader", "Content Reader", "Reader", "Writer", "Manager"],
        value: this.state.role,
        labelText: "Role",
        handleInputChange: this.handleInputChange,
        className: inputSize,
        formName: this.props.data.name + "-object-storage-key-role"
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          link: "https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-uhc-hmac-credentials-main",
          content: "HMAC (hash-based message authentication code) is required for Teleport VSI instances."
        },
        id: composedId + "cos-instance-key-hmac",
        labelText: "Enable HMAC",
        defaultToggled: this.props.forceEnableHmac,
        onToggle: this.handleToggle,
        isModal: this.props.isModal,
        disabled: this.props.forceEnableHmac
      })));
    }
  }]);
  return ObjectStorageKeyForm;
}(Component);
ObjectStorageKeyForm.defaultProps = {
  data: {
    name: "",
    enable_hmac: false
  },
  forceEnableHmac: false
};
ObjectStorageKeyForm.propTypes = {
  isModal: PropTypes.bool,
  data: PropTypes.shape({
    enable_hmac: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string
  }),
  shouldDisableSave: PropTypes.func,
  shouldDisableSubmit: PropTypes.func,
  forceEnableHmac: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  composedNameCallback: PropTypes.func.isRequired
};

/**
 * Object storage
 */
var ObjectStorageInstancesForm = /*#__PURE__*/function (_Component) {
  _inherits(ObjectStorageInstancesForm, _Component);
  var _super = _createSuper(ObjectStorageInstancesForm);
  function ObjectStorageInstancesForm(props) {
    var _this;
    _classCallCheck(this, ObjectStorageInstancesForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2({}, _this.props.data);
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {string} name key to change in the instance
   * @param {*} value value
   */
  _createClass(ObjectStorageInstancesForm, [{
    key: "handleInputChange",
    value: function handleInputChange(name, value) {
      var inst = _objectSpread2({}, this.state);
      inst[name] = value;
      this.setState(_objectSpread2({}, inst));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var composedId = "object-storage-form-".concat(this.props.data.name, "-");
      var bucketInnerFormProps = {
        invalidCallback: this.props.invalidBucketCallback,
        invalidTextCallback: this.props.invalidBucketTextCallback,
        composedNameCallback: this.props.composedNameCallback,
        arrayParentName: this.props.data.name
      };
      transpose$1(_objectSpread2({}, this.props.bucketProps), bucketInnerFormProps);
      var keyInnerFormProps = {
        invalidCallback: this.props.invalidKeyCallback,
        invalidTextCallback: this.props.invalidKeyTextCallback,
        composedNameCallback: this.props.composedNameCallback,
        arrayParentName: this.props.data.name
      };
      transpose$1(_objectSpread2({}, this.props.keyProps), keyInnerFormProps);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Service credentials and buckets will be created for your environment even when using an existing Object Storage instance."
        },
        id: composedId + "use-data",
        toggleFieldName: "use_data",
        labelText: "Use Existing Instance",
        defaultToggled: this.state.use_data,
        onToggle: this.handleInputChange,
        isModal: this.props.isModal
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Object storage bucket names must be unique across an account. Append a random suffix to maintain unique names across deployments."
        },
        id: composedId + "random-suffix",
        labelText: "Append Random Suffix to Names",
        toggleFieldName: "random_suffix",
        defaultToggled: this.state.random_suffix,
        onToggle: this.handleInputChange,
        isModal: this.props.isModal
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: this.props.data.name + "-object-storage-kms",
        name: "kms",
        labelText: "Key Management Instance",
        groups: this.props.kmsList,
        value: this.state.kms,
        handleInputChange: function handleInputChange(event) {
          return _this2.handleInputChange("kms", event.target.value);
        }
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.props.data.name + "-object-storage-name",
        componentName: this.props.data.name,
        value: this.state.name,
        onChange: function onChange(event) {
          return _this2.handleInputChange("name", event.target.value);
        },
        helperTextCallback: function helperTextCallback() {
          return _this2.props.composedNameCallback(_this2.state, _this2.props);
        },
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: this.props.data.name + "-object-storage-rg",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: function handleInputChange(event) {
          return _this2.handleInputChange("resource_group", event.target.value);
        }
      })), this.props.isModal !== true && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormTemplate, {
        name: "Service Credentials",
        subHeading: true,
        tooltip: {
          content: "A service credential allows for a service instance to connect to Object Storage.",
          link: "https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-service-credentials"
        },
        addText: "Create a Service Credential",
        arrayData: this.props.data.keys,
        innerForm: ObjectStorageKeyForm,
        disableSave: this.props.keyProps.disableSave,
        onDelete: this.props.keyProps.onDelete,
        onSave: this.props.keyProps.onSave,
        onSubmit: this.props.keyProps.onSubmit,
        propsMatchState: this.props.propsMatchState,
        innerFormProps: _objectSpread2({}, keyInnerFormProps),
        hideAbout: true,
        toggleFormProps: {
          hideName: true,
          submissionFieldName: "cos_keys",
          disableSave: this.props.keyProps.disableSave,
          type: "formInSubForm"
        }
      }), /*#__PURE__*/React.createElement(IcseFormTemplate, {
        name: "Buckets",
        subHeading: true,
        addText: "Create a Bucket",
        arrayData: this.props.data.buckets,
        innerForm: ObjectStorageBucketForm,
        disableSave: this.props.bucketProps.disableSave,
        onDelete: this.props.bucketProps.onDelete,
        onSave: this.props.bucketProps.onSave,
        onSubmit: this.props.bucketProps.onSubmit,
        propsMatchState: this.props.propsMatchState,
        innerFormProps: _objectSpread2({}, bucketInnerFormProps),
        hideAbout: true,
        toggleFormProps: {
          hideName: true,
          submissionFieldName: "buckets",
          disableSave: this.props.bucketProps.disableSave,
          type: "formInSubForm"
        }
      })));
    }
  }]);
  return ObjectStorageInstancesForm;
}(Component);
ObjectStorageInstancesForm.defaultProps = {
  data: {
    name: "",
    use_data: false,
    resource_group: "",
    random_suffix: true
  },
  resourceGroups: []
};
ObjectStorageInstancesForm.propTypes = {
  isModal: PropTypes.bool,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    use_data: PropTypes.bool.isRequired,
    resource_group: PropTypes.string,
    random_suffix: PropTypes.bool.isRequired
  }),
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  composedNameCallback: PropTypes.func.isRequired,
  subForms: PropTypes.arrayOf(PropTypes.node)
};

/** Resource Groups
 * @param {Object} props
 */
var ResourceGroupForm = /*#__PURE__*/function (_Component) {
  _inherits(ResourceGroupForm, _Component);
  var _super = _createSuper(ResourceGroupForm);
  function ResourceGroupForm(props) {
    var _this;
    _classCallCheck(this, ResourceGroupForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleTextInput = _this.handleTextInput.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  _createClass(ResourceGroupForm, [{
    key: "handleToggle",
    value: function handleToggle(name) {
      // Turn off the use_prefix toggle when not using data.
      if (name === "use_data" && this.state.use_data === false) {
        var _this$setState;
        this.setState((_this$setState = {}, _defineProperty(_this$setState, name, !this.state[name]), _defineProperty(_this$setState, "use_prefix", false), _this$setState));
      } else {
        this.setState(_defineProperty({}, name, !this.state[name]));
      }
    }

    /**
     * Handle input change for a text field
     * @param {event} event
     */
  }, {
    key: "handleTextInput",
    value: function handleTextInput(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var composedId = "resource-group-".concat(this.props.data.name, "-");
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "If true, get data from an existing resource group"
        },
        labelText: "Use Existing Instance",
        toggleFieldName: this.props.toggleName,
        defaultToggled: this.state.use_data,
        id: composedId + "-use-data-toggle",
        onToggle: function onToggle() {
          return _this2.handleToggle("use_data");
        },
        isModal: this.props.isModal
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: composedId,
        componentName: "resource_groups",
        value: this.state.name,
        onChange: this.handleTextInput,
        useData: this.state.use_data || this.state.use_prefix === false,
        invalidCallback: function invalidCallback() {
          return _this2.props.invalidCallback(_this2.state, _this2.props);
        },
        invalidText: this.props.invalidTextCallback(this.state, this.props),
        helperTextCallback: function helperTextCallback() {
          return _this2.props.helperTextCallback(_this2.state, _this2.props);
        }
      }), this.state.use_data === false && /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Append your environment prefix to the beginning of the resource group."
        },
        labelText: "Use Prefix",
        defaultToggled: this.state.use_prefix,
        id: composedId + "-use-prefix-toggle",
        onToggle: this.handleToggle,
        isModal: this.props.isModal
      })));
    }
  }]);
  return ResourceGroupForm;
}(Component);
ResourceGroupForm.defaultProps = {
  data: {
    use_data: false,
    name: "",
    use_prefix: true
  },
  toggleName: "use_data",
  isModal: false
};
ResourceGroupForm.propTypes = {
  data: PropTypes.shape({
    use_data: PropTypes.bool,
    name: PropTypes.string.isRequired,
    use_prefix: PropTypes.bool
  }),
  isModal: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  helperTextCallback: PropTypes.func.isRequired
};

var sccRegions = [{
  id: "us",
  label: "us"
}, {
  id: "eu",
  label: "eu"
}, {
  id: "uk",
  label: "uk"
}];

/**
 * SccForm
 * @param {Object} props
 */
var SccForm = /*#__PURE__*/function (_Component) {
  _inherits(SccForm, _Component);
  var _super = _createSuper(SccForm);
  function SccForm(props) {
    var _this;
    _classCallCheck(this, SccForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleLocationChange = _this.handleLocationChange.bind(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    _this.state.enable = true;
    return _this;
  }

  /**
   * Handle input change
   * @param {event} event
   */
  _createClass(SccForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * handle input change
     * @param {event} event event
     */
  }, {
    key: "handleLocationChange",
    value: function handleLocationChange(selectedItem) {
      this.setState({
        location: selectedItem.selectedItem.label
      });
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     * @param {bool} setDefaults set default values, default is false
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(this.toggleStateBoolean(name, this.state));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(Dropdown, {
        ariaLabel: "Dropdown",
        id: "location",
        items: sccRegions,
        label: "SCC Region Options",
        titleText: "Region",
        onChange: function onChange(selectedItem) {
          _this2.handleLocationChange(selectedItem);
        },
        className: "leftTextAlign fieldWidth"
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "Determines whether the collector endpoint is accessible on a public network."
        },
        labelText: "Is Public",
        defaultToggled: this.state.is_public,
        className: "leftTextAlign",
        onToggle: this.handleToggle,
        id: "scc-is-public"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        id: "scc_scope_description",
        tooltip: {
          content: "A detailed description of the scope."
        },
        componentName: "SCC",
        field: "scope_description",
        labelText: "Scope Description",
        value: this.state.scope_description,
        onChange: this.handleInputChange,
        maxLength: 255,
        invalid: lib_10("scope_description", this.state.scope_description, this.props.descriptionRegex).invalid,
        invalidText: lib_10("scope_description", this.state.scope_description, this.props.descriptionRegex).invalidText
      }), /*#__PURE__*/React.createElement(IcseTextInput, {
        id: "scc_collector",
        tooltip: {
          content: "A detailed description of the collector.",
          align: "top-left"
        },
        labelText: "Collector Description",
        field: "collector_description",
        value: this.state.collector_description,
        onChange: this.handleInputChange,
        componentName: "SCC",
        maxLength: 1000,
        invalid: lib_10("collector_description", this.state.collector_description, this.props.descriptionRegex).invalid,
        invalidText: lib_10("collector_description", this.state.collector_description, this.props.descriptionRegex).invalidText
      })));
    }
  }]);
  return SccForm;
}(Component);
SccForm.defaultProps = {
  data: {
    enable: false
  },
  descriptionRegex: /^[A-z][a-zA-Z0-9-\._,\s]*$/i
};
SccForm.propTypes = {
  data: PropTypes.shape({
    enable: PropTypes.bool.isRequired,
    collector_description: PropTypes.string,
    is_public: PropTypes.bool,
    location: PropTypes.string,
    scope_description: PropTypes.string,
    passphrase: PropTypes.string
  }),
  descriptionRegex: PropTypes.instanceOf(RegExp).isRequired
};

/**
 * SecretsManagerForm
 * @param {Object} props
 */
var SecretsManagerForm = /*#__PURE__*/function (_Component) {
  _inherits(SecretsManagerForm, _Component);
  var _super = _createSuper(SecretsManagerForm);
  function SecretsManagerForm(props) {
    var _this;
    _classCallCheck(this, SecretsManagerForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    _this.state.use_secrets_manager = true;
    return _this;
  }

  /**
   * handle input change
   * @param {event} event event
   */
  _createClass(SecretsManagerForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        componentName: "Secrets Manager",
        component: "secrets_manager",
        value: this.state.name,
        onChange: this.handleInputChange,
        componentProps: this.props,
        hideHelperText: true,
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "Secrets Manager",
        value: this.state.resource_group,
        groups: this.props.resourceGroups,
        handleInputChange: this.handleInputChange,
        className: "fieldWidth",
        name: "resource_group",
        labelText: "Resource Group"
      })), /*#__PURE__*/React.createElement("div", {
        className: "fieldWidth"
      }, /*#__PURE__*/React.createElement(IcseSelect, {
        value: this.state.kms_key_name,
        groups: this.props.encryptionKeys,
        formName: "Secrets Manager",
        name: "kms_key_name",
        className: "fieldWidth",
        labelText: "Encryption Key",
        handleInputChange: this.handleInputChange
      })));
    }
  }]);
  return SecretsManagerForm;
}(Component);
SecretsManagerForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    resource_group: PropTypes.string,
    kms_key_name: PropTypes.string
  }).isRequired,
  encryptionKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired
};

/**
 * security group form
 */
var SecurityGroupForm = /*#__PURE__*/function (_Component) {
  _inherits(SecurityGroupForm, _Component);
  var _super = _createSuper(SecurityGroupForm);
  function SecurityGroupForm(props) {
    var _this;
    _classCallCheck(this, SecurityGroupForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2(_objectSpread2({}, _this.props.data), {}, {
      show: false
    });
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    _this.handleShowToggle = _this.handleShowToggle.bind(_assertThisInitialized(_this));
    _this.networkRuleOrderDidChange = _this.networkRuleOrderDidChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {event} event
   */
  _createClass(SecurityGroupForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "handleShowToggle",
    value: function handleShowToggle() {
      this.setState(this.toggleStateBoolean("show", this.state));
    }

    /**
     * Check if the order of network rules updated - then update state to allow save
     * @param {Array} rules list of rule objects
     */
  }, {
    key: "networkRuleOrderDidChange",
    value: function networkRuleOrderDidChange(rules) {
      this.props.networkRuleOrderDidChange(this.state, this.props);
      this.setState({
        rules: rules
      }); // if the order of the rules changed, update rules state
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var composedId = "security-group-form-".concat(this.props.data.name);
      var className = this.props.isModal ? "fieldWidthSmaller" : "fieldWidth";
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: composedId,
        componentName: "security_groups",
        value: this.state.name,
        onChange: this.handleInputChange,
        hideHelperText: true,
        className: className,
        invalidCallback: function invalidCallback() {
          return _this2.props.invalidCallback(_this2.state, _this2.props);
        },
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "security_Group",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        className: className
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "security_Group",
        name: "vpc",
        labelText: "VPC",
        groups: this.props.vpcList,
        value: this.state.vpc,
        handleInputChange: this.handleInputChange,
        className: className
      })), !this.props.isModal && /*#__PURE__*/React.createElement(NetworkingRulesOrderCard, {
        rules: this.state.rules,
        vpc_name: this.state.vpc,
        parent_name: this.props.data.name,
        isSecurityGroup: true,
        networkRuleOrderDidChange: this.networkRuleOrderDidChange,
        invalidCallback: this.props.invalidCallback,
        invalidTextCallback: this.props.invalidTextCallback,
        onSubmitCallback: this.props.onSubmitCallback,
        onRuleSave: this.props.onRuleSave,
        onRuleDelete: this.props.onRuleDelete,
        disableModalSubmitCallback: this.props.disableModalSubmitCallback,
        disableSaveCallback: this.props.disableSaveCallback
      }));
    }
  }]);
  return SecurityGroupForm;
}(Component);
SecurityGroupForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    vpc: "",
    rules: []
  },
  isModal: false
};
SecurityGroupForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    vpc: PropTypes.string,
    resource_group: PropTypes.string,
    rules: PropTypes.array
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  networkRuleOrderDidChange: PropTypes.func,
  // can be undefined
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  onRuleSave: PropTypes.func.isRequired,
  onRuleDelete: PropTypes.func.isRequired,
  disableModalSubmitCallback: PropTypes.func.isRequired,
  disableSaveCallback: PropTypes.func.isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  vpcList: PropTypes.arrayOf(PropTypes.string).isRequired
};

var css_248z$1 = ".leftTextAlign {\n  text-align: left;\n}\n\n.fieldWidthBigger {\n  width: 30rem\n}\n";
styleInject(css_248z$1);

/**
 * ssh key form
 */
var SshKeyForm = /*#__PURE__*/function (_Component) {
  _inherits(SshKeyForm, _Component);
  var _super = _createSuper(SshKeyForm);
  function SshKeyForm(props) {
    var _this;
    _classCallCheck(this, SshKeyForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle other input events
   * @param {*} event
   */
  _createClass(SshKeyForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        componentName: this.props.data.name + "-ssh-key-name",
        value: this.state.name,
        onChange: this.handleInputChange,
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props),
        hideHelperText: true
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        name: "resource_group",
        formName: "".concat(kebabCase$2(this.props.data.name), "-ssh-rg-select"),
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        invalidText: "Select a Resource Group.",
        labelText: "Resource Group"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "fieldWidthBigger leftTextAlign"
      }, /*#__PURE__*/React.createElement(TextInput.PasswordInput, {
        labelText: "Public Key",
        name: "public_key",
        id: this.props.data.name + "-ssh-public-key",
        value: this.state.public_key,
        onChange: this.handleInputChange,
        invalid: this.props.invalidKeyCallback(this.state.public_key).invalid,
        invalidText: this.props.invalidKeyCallback(this.state.public_key).invalidText
      }))));
    }
  }]);
  return SshKeyForm;
}(Component);
SshKeyForm.defaultProps = {
  data: {
    name: "",
    public_key: ""
  },
  resourceGroups: [],
  isModal: false
};
SshKeyForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string,
    public_key: PropTypes.string.isRequired
  }).isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  invalidKeyCallback: PropTypes.func.isRequired
};

/**
 * create a tile for each subnet
 * @param {Object} props
 * @returns {SubnetTile} react component
 */
var SubnetForm = /*#__PURE__*/function (_React$Component) {
  _inherits(SubnetForm, _React$Component);
  var _super = _createSuper(SubnetForm);
  function SubnetForm(props) {
    var _this;
    _classCallCheck(this, SubnetForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2({}, _this.props.data);
    _this.handleSave = _this.handleSave.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(SubnetForm, [{
    key: "handleChange",
    value: function handleChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.props.componentDidUpdateCallback(this.state, this.props);
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      this.props.onSave(this.state, this.props);
    }
  }, {
    key: "handleToggle",
    value: function handleToggle() {
      this.setState({
        public_gateway: !this.state.public_gateway
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(Tile, {
        key: this.props.vpc_name + "-subnets-" + this.props.data.name,
        className: "marginRight fieldWidth"
      }, /*#__PURE__*/React.createElement(IcseHeading, {
        name: this.props.data.name,
        type: "subHeading",
        className: "marginBottomSmall",
        buttons: /*#__PURE__*/React.createElement(DynamicRender, {
          hide: this.props.isModal,
          show: /*#__PURE__*/React.createElement(SaveAddButton, {
            disabled: this.props.disableSaveCallback(this.state, this.props),
            onClick: this.handleSave,
            noDeleteButton: true
          })
        })
      }), /*#__PURE__*/React.createElement(IcseFormGroup, {
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(TextInput, {
        id: this.props.data.name + "-cidr",
        invalidText: "Invalid subnet CIDR.",
        labelText: "Subnet CIDR",
        value: this.props.data.cidr,
        className: "fieldWidthSmaller",
        readOnly: true
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(IcseSelect, {
        name: "acl_name",
        formName: "".concat(this.props.data.name, "-subnet-acl"),
        labelText: "Network ACL",
        groups: this.props.networkAcls,
        value: this.state.acl_name,
        handleInputChange: this.handleChange,
        className: "fieldWidthSmaller",
        disabled: this.props.isModal,
        invalid: isNullOrEmptyString$3(this.state.acl_name),
        invalidText: "Select a Network ACL."
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: "A Public Gateway must be enabled in this zone to use. To enable public gateways, see the VPC page."
        },
        id: "new-subnet-public-gateway-" + this.props.data.name,
        labelText: "Use Public Gateway",
        toggleFieldName: "public_gateway",
        defaultToggled: this.state.public_gateway,
        onToggle: this.handleToggle,
        disabled: this.props.isModal || this.props.shouldDisableGatewayToggle(this.state, this.props)
      })));
    }
  }]);
  return SubnetForm;
}(React.Component);
SubnetForm.defaultProps = {
  isModal: false
};
SubnetForm.propTypes = _defineProperty({
  isModal: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  vpc_name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cidr: PropTypes.string.isRequired,
    public_gateway: PropTypes.bool,
    acl_name: PropTypes.string.isRequired
  }).isRequired,
  disableSaveCallback: PropTypes.func,
  shouldDisableGatewayToggle: PropTypes.func,
  networkAcls: PropTypes.arrayOf(PropTypes.string).isRequired,
  componentDidUpdateCallback: PropTypes.func.isRequired
}, "onSave", PropTypes.func);

var css_248z = ".subnetTileFormMargin {\n  margin-bottom: -0.5rem;\n  margin-top: 0.5rem;\n}\n\n.marginRight {\n  margin-right: 10px;\n}\n";
styleInject(css_248z);

var SubnetTileForm = /*#__PURE__*/function (_React$Component) {
  _inherits(SubnetTileForm, _React$Component);
  var _super = _createSuper(SubnetTileForm);
  function SubnetTileForm(props) {
    var _this;
    _classCallCheck(this, SubnetTileForm);
    _this = _super.call(this, props);
    _this.state = {
      subnetData: {}
    };
    if (!_this.props.isModal) {
      _this.props.data.forEach(function (subnet) {
        _this.state.subnetData[subnet.name] = true;
      });
    }
    _this.shouldDisableGatewayToggle = _this.shouldDisableGatewayToggle.bind(_assertThisInitialized(_this));
    _this.childSubnetHasChanged = _this.childSubnetHasChanged.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * check if child subnet has changed
   * @param {Object} stateData
   * @param {string} stateData.name
   * @param {Object} componentProps
   * @param {Object} componentProps.data
   */
  _createClass(SubnetTileForm, [{
    key: "childSubnetHasChanged",
    value: function childSubnetHasChanged(stateData, componentProps) {
      var name = stateData.name;
      if (this.state.subnetData[name] && !deepEqual(stateData, componentProps.data)) {
        var subnetData = _objectSpread2({}, this.state.subnetData);
        subnetData[name] = false;
        this.setState({
          subnetData: subnetData
        });
      }
    }

    /**
     * check if gateway should be disabled
     * @param {Object} stateData
     * @param {string} stateData.name
     */
  }, {
    key: "shouldDisableGatewayToggle",
    value: function shouldDisableGatewayToggle(stateData) {
      var zone = parseIntFromZone(stateData.name);
      if (contains$1(this.props.enabledPublicGateways, zone)) {
        return false;
      } else return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var subnetMap = _toConsumableArray(this.props.data);
      return /*#__PURE__*/React.createElement(IcseSubForm, {
        id: "subnet-tile-".concat(this.props.tier, "-").concat(this.props.vpc_name),
        formInSubForm: true,
        className: "popoverLeft subnetTileFormMargin"
      }, /*#__PURE__*/React.createElement(IcseHeading, {
        name: "Subnets",
        type: "subHeading",
        className: "marginBottomSmall"
      }), /*#__PURE__*/React.createElement("div", {
        className: "displayFlex"
      }, subnetMap.map(function (subnet) {
        return /*#__PURE__*/React.createElement(SubnetForm // change so doesn't show buttons
        , {
          key: "".concat(subnet.name, "-tile-").concat(_this2.props.tier, "-").concat(_this2.props.vpc_name, "-").concat(JSON.stringify(subnet)),
          vpc_name: _this2.props.vpc_name,
          data: subnet,
          onSave: _this2.props.onSave,
          isModal: _this2.props.isModal || _this2.props.readOnly,
          componentDidUpdateCallback: _this2.childSubnetHasChanged,
          networkAcls: _this2.props.networkAcls,
          disableSaveCallback: _this2.props.disableSaveCallback,
          shouldDisableGatewayToggle: _this2.shouldDisableGatewayToggle
        });
      })));
    }
  }]);
  return SubnetTileForm;
}(React.Component);
SubnetTileForm.defaultProps = {
  isModal: false,
  readOnly: false
};
SubnetTileForm.propTypes = {
  isModal: PropTypes.bool.isRequired,
  disableSaveCallback: PropTypes.func,
  vpc_name: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  networkAcls: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSave: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cidr: PropTypes.string.isRequired,
    public_gateway: PropTypes.bool,
    acl_name: PropTypes.string.isRequired
  })),
  readOnly: PropTypes.bool.isRequired,
  enabledPublicGateways: PropTypes.arrayOf(PropTypes.number).isRequired
};

var SubnetTierForm = /*#__PURE__*/function (_React$Component) {
  _inherits(SubnetTierForm, _React$Component);
  var _super = _createSuper(SubnetTierForm);
  function SubnetTierForm(props) {
    var _this;
    _classCallCheck(this, SubnetTierForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2({}, _this.props.data);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.onSave = _this.onSave.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    _this.handleShowToggle = _this.handleShowToggle.bind(_assertThisInitialized(_this));
    _this.shouldDisableSubmit = _this.shouldDisableSubmit.bind(_assertThisInitialized(_this));
    _this.toggleDeleteModal = _this.toggleDeleteModal.bind(_assertThisInitialized(_this));
    _this.onSubnetSave = _this.onSubnetSave.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Handle input change
   * @param {event} event
   */
  _createClass(SubnetTierForm, [{
    key: "handleChange",
    value: function handleChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      this.setState(_defineProperty({}, name, value));
    }

    /**
     * handle toggle
     */
  }, {
    key: "handleToggle",
    value: function handleToggle() {
      this.setState({
        addPublicGateway: !this.state.addPublicGateway
      });
    }
    /**
     * toggle delete modal
     */
  }, {
    key: "toggleDeleteModal",
    value: function toggleDeleteModal() {
      this.setState({
        showDeleteModal: !this.state.showDeleteModal
      });
    }

    /**
     * handle hide/show form data
     */
  }, {
    key: "handleShowToggle",
    value: function handleShowToggle() {
      this.setState({
        hide: !this.state.hide
      });
    }
  }, {
    key: "onSave",
    value: function onSave() {
      this.props.onSave(this.state, this.props);
    }
  }, {
    key: "onSubnetSave",
    value: function onSubnetSave(stateData, componentProps) {
      this.props.onSubnetSave(stateData, componentProps);
    }
  }, {
    key: "onDelete",
    value: function onDelete() {
      this.props.onDelete(this.state, this.props);
    }
  }, {
    key: "shouldDisableSubmit",
    value: function shouldDisableSubmit() {
      if (this.props.isModal) {
        if (this.props.shouldDisableSubmit(this.state, this.props) === false) this.props.enableModal();else this.props.disableModal();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.shouldDisableSubmit();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.shouldDisableSubmit();
    }
  }, {
    key: "render",
    value: function render() {
      var composedId = "".concat(this.props.vpc_name, "-tier-").concat(this.props.data.name === "" ? "new-subnet-tier" : this.props.data.name);
      var formName = this.props.data.name + "-subnet-tier";
      var tierName = this.props.data.name === "" ? "New Subnet Tier" : titleCase$1(formName).replace(/Vsi/g, "VSI").replace(/Vpe/g, "VPE").replace(/Vpn/g, "VPN");
      return /*#__PURE__*/React.createElement(IcseSubForm, {
        formInSubForm: true,
        id: composedId,
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(DeleteModal, {
        name: tierName,
        modalOpen: this.state.showDeleteModal,
        onModalClose: this.toggleDeleteModal,
        onModalSubmit: this.onDelete
      }), /*#__PURE__*/React.createElement(StatelessToggleForm, {
        hideTitle: this.props.isModal === true,
        hide: this.state.hide,
        name: tierName,
        onIconClick: this.handleShowToggle,
        toggleFormTitle: true,
        buttons: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SaveAddButton, {
          onClick: this.onSave,
          noDeleteButton: this.props.noDeleteButton,
          disabled: this.props.shouldDisableSave(this.state, this.props)
        }), /*#__PURE__*/React.createElement(DynamicRender, {
          hide: this.props.noDeleteButton,
          show: /*#__PURE__*/React.createElement(DeleteButton, {
            name: tierName,
            onClick: this.toggleDeleteModal
          })
        }))
      }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.props.isModal ? "new-tier-name" : this.props.data.name + "-tier-name",
        value: this.state.name,
        componentName: formName,
        onChange: this.handleChange,
        className: "fieldWidthSmaller",
        readOnly: this.props.readOnly,
        invalidCallback: this.props.invalidCallback,
        invalidText: this.props.invalidTextCallback(this.state, this.props),
        hideHelperText: true
      }), /*#__PURE__*/React.createElement(IcseNumberSelect, {
        max: 3,
        value: this.state.zones,
        labelText: "Subnet Tier Zones",
        name: "zones",
        handleInputChange: this.handleChange,
        className: "fieldWidthSmaller",
        invalid: this.state.zones === 0,
        invalidText: "At least one zone must be selected.",
        formName: formName
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        tooltip: {
          content: "Changing this field will overwrite existing Network ACL changes to subnets in this data."
        },
        className: "fieldWidthSmaller",
        field: "networkAcl",
        name: "networkAcl",
        value: this.state.networkAcl || "",
        vpcName: this.props.vpc_name,
        labelText: "Network ACL",
        groups: this.props.networkAcls,
        handleInputChange: this.handleChange,
        isModal: this.props.isModal,
        formName: formName
      })), /*#__PURE__*/React.createElement(IcseFormGroup, {
        className: "marginBottomSmall"
      }, /*#__PURE__*/React.createElement(IcseToggle, {
        tooltip: {
          content: this.props.enabledPublicGateways.length === 0 ? "This VPC has no public gateways enabled. To add public gateways, return to the VPC page." : "Changing this field will overwrite existing Public Gateway changes to subnets in this data."
        },
        id: composedId + "-public-gateway",
        labelText: "Use Public Gateways",
        defaultToggled: this.state.addPublicGateway,
        onToggle: this.handleToggle,
        isModal: this.props.isModal,
        disabled: this.props.enabledPublicGateways.length === 0
      })), /*#__PURE__*/React.createElement(SubnetTileForm, {
        tier: this.props.data.name,
        vpc_name: this.props.vpc_name,
        onSave: this.onSubnetSave,
        isModal: this.props.isModal,
        data: this.props.subnetListCallback(this.state, this.props),
        key: this.state.zones,
        enabledPublicGateways: this.props.enabledPublicGateways,
        networkAcls: this.props.networkAcls,
        disableSaveCallback: this.props.disableSubnetSaveCallback
      }))));
    }
  }]);
  return SubnetTierForm;
}(React.Component);
SubnetTierForm.defaultProps = {
  isModal: false,
  hide: true,
  readOnly: false,
  noDeleteButton: false,
  data: {
    hide: false,
    name: "",
    zones: 3,
    networkAcl: null,
    addPublicGateway: false
  }
};
SubnetTierForm.propTypes = {
  data: PropTypes.shape({
    hide: PropTypes.bool,
    name: PropTypes.string.isRequired,
    zones: PropTypes.number.isRequired,
    networkAcl: PropTypes.string,
    addPublicGateway: PropTypes.bool
  }),
  // save and delete functions can be null when form rendered as modal
  onSave: PropTypes.func,
  onSubnetSave: PropTypes.func,
  onDelete: PropTypes.func,
  disableSubnetSaveCallback: PropTypes.func,
  // can be null when modal
  shouldDisableSave: PropTypes.func,
  shouldDisableSubmit: PropTypes.func,
  // can be null when not modal
  noDeleteButton: PropTypes.bool,
  // can be null when modal
  isModal: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  networkAcls: PropTypes.arrayOf(PropTypes.string).isRequired,
  enabledPublicGateways: PropTypes.arrayOf(PropTypes.number).isRequired,
  hide: PropTypes.bool.isRequired,
  vpc_name: PropTypes.string.isRequired,
  subnetListCallback: PropTypes.func.isRequired,
  enableModal: PropTypes.func,
  disableModal: PropTypes.func
};

var emailRegex = /^[\w-_\.]+@([\w-_]+\.)+[\w]{1,4}$/g;
var TeleportClaimToRoleForm = /*#__PURE__*/function (_Component) {
  _inherits(TeleportClaimToRoleForm, _Component);
  var _super = _createSuper(TeleportClaimToRoleForm);
  function TeleportClaimToRoleForm(props) {
    var _this;
    _classCallCheck(this, TeleportClaimToRoleForm);
    _this = _super.call(this, props);
    _this.state = {
      email: _this.props.data.email,
      roles: _this.props.data.roles
    };
    _this.onChangeTextInput = _this.onChangeTextInput.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    return _this;
  }

  /**
   *
   * @param {String} name specifies name of state value to change
   * @param {String} value value to set it to
   */
  _createClass(TeleportClaimToRoleForm, [{
    key: "onChangeTextInput",
    value: function onChangeTextInput(name, value) {
      if (name === "roles") {
        this.setState(_defineProperty({}, name, [value]));
      } else this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var composedId = "teleport-claim-form-".concat(this.props.data.email);
      return /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        id: composedId + "-email",
        componentName: "teleport-claim",
        field: "email",
        invalid: !this.state.email.match(emailRegex),
        value: this.state.email,
        onChange: function onChange(event) {
          return _this2.onChangeTextInput("email", event.target.value);
        },
        className: "fieldWidth"
      }), /*#__PURE__*/React.createElement(IcseTextInput, {
        id: composedId + "roles",
        componentName: "teleport-claim",
        field: "roles",
        value: this.state.roles[0] || "",
        onChange: function onChange(event) {
          return _this2.onChangeTextInput("roles", event.target.value);
        },
        invalid: this.props.invalidRolesCallback(this.state),
        className: "fieldWidth"
      }));
    }
  }]);
  return TeleportClaimToRoleForm;
}(Component);
TeleportClaimToRoleForm.defaultProps = {
  data: {
    email: "",
    roles: []
  }
};
TeleportClaimToRoleForm.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired
  }).isRequired
};

var TransitGatewayForm = /*#__PURE__*/function (_Component) {
  _inherits(TransitGatewayForm, _Component);
  var _super = _createSuper(TransitGatewayForm);
  function TransitGatewayForm(props) {
    var _this;
    _classCallCheck(this, TransitGatewayForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleVpcSelect = _this.handleVpcSelect.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  _createClass(TransitGatewayForm, [{
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(_defineProperty({}, name, !this.state[name]));
    }

    /**
     * handle vpc selection
     * @param {event} event
     */
  }, {
    key: "handleVpcSelect",
    value: function handleVpcSelect(event) {
      this.setState({
        connections: event
      });
    }

    /**
     * Handle input change
     * @param {event} event
     */
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        labelText: "Global",
        toggleFieldName: "global",
        id: "tg-global",
        onToggle: this.handleToggle,
        defaultToggled: this.state.global
      }), /*#__PURE__*/React.createElement(IcseTextInput, {
        onChange: this.handleInputChange,
        componentName: "Transit Gateway",
        field: "name",
        value: this.state.name,
        readOnly: this.props.readOnlyName,
        id: "tg-name",
        invalid: this.props.invalidCallback(this.state),
        invalidText: this.props.invalidTextCallback(this.state)
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "Transit Gateway",
        value: this.state.resource_group,
        groups: this.props.resourceGroups,
        handleInputChange: this.handleInputChange,
        name: "resource_group",
        labelText: "Resource Group"
      }), /*#__PURE__*/React.createElement(VpcListMultiSelect, {
        id: "tg-vpc-multiselect",
        titleText: "Connected VPCs",
        initialSelectedItems: this.state.connections,
        vpcList: this.props.vpcList,
        onChange: this.handleVpcSelect,
        invalid: this.state.connections.length === 0,
        invalidText: "At least one VPC must be connected"
      })));
    }
  }]);
  return TransitGatewayForm;
}(Component);
TransitGatewayForm.defaultProps = {
  data: {
    global: true,
    connections: [],
    resource_group: "",
    name: ""
  },
  readOnlyName: true,
  vpcList: [],
  resourceGroups: []
};
TransitGatewayForm.propTypes = {
  data: PropTypes.shape({
    global: PropTypes.bool.isRequired,
    connections: PropTypes.array.isRequired,
    resource_group: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired,
  readOnlyName: PropTypes.bool.isRequired,
  vpcList: PropTypes.array.isRequired,
  resourceGroups: PropTypes.array.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired
};

var nameFields = ["default_network_acl_name", "default_routing_table_name", "default_security_group_name"];
var VpcNetworkForm = /*#__PURE__*/function (_React$Component) {
  _inherits(VpcNetworkForm, _React$Component);
  var _super = _createSuper(VpcNetworkForm);
  function VpcNetworkForm(props) {
    var _this;
    _classCallCheck(this, VpcNetworkForm);
    _this = _super.call(this, props);
    _this.state = _objectSpread2({}, _this.props.data);
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handPgwToggle = _this.handPgwToggle.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {event} event event
   */
  _createClass(VpcNetworkForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(_defineProperty({}, name, !this.state[name]));
    }

    /**
     * handle change of public gateway by zone
     * @param {string} zone zone-1, zone-2, or zone-3
     */
  }, {
    key: "handPgwToggle",
    value: function handPgwToggle(zone) {
      var vpc = _objectSpread2({}, this.state);
      var currentGw = _objectSpread2({}, this.state.use_public_gateways);
      currentGw[zone] = !currentGw[zone];
      vpc.use_public_gateways = currentGw;
      this.setState(_objectSpread2({}, vpc));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var composedId = "".concat(this.props.data.name, "-vpc-form");
      var classNameModalCheck = this.props.isModal ? "fieldWidthSmaller" : "fieldWidth";
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        tooltip: {
          content: "This name will be prepended to all components within this VPC.",
          alignModal: "bottom-left",
          align: "bottom-left"
        },
        id: composedId + "-prefix",
        componentProps: this.props,
        component: "vpc",
        componentName: this.props.data.name,
        field: "name",
        labelText: "Name",
        placeholder: "my-vpc-name",
        hideHelperText: true,
        value: this.state.name,
        onChange: this.handleInputChange,
        invalid: this.props.invalidCallback("name", this.state, this.props),
        invalidText: this.props.invalidTextCallback("name", this.state, this.props),
        className: classNameModalCheck
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        labelText: "Resource Group",
        name: "resource_group",
        formName: "resource_group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.resource_group),
        invalidText: "Select a Resource Group.",
        className: classNameModalCheck
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        labelText: "Flow Logs Bucket Name",
        name: "flow_logs_bucket_name",
        formName: this.props.data.name + "-vpc",
        groups: this.props.cosBuckets,
        value: this.state.flow_logs_bucket_name || "",
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.flow_logs_bucket_name),
        invalidText: "Select a Bucket.",
        className: classNameModalCheck
      })), /*#__PURE__*/React.createElement(IcseHeading, {
        name: "VPC Options",
        type: "subHeading"
      }), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseToggle, {
        id: this.props.data.name + "-classic-access",
        labelText: "Classic Infrastructure Access",
        toggleFieldName: "classic_access",
        defaultToggled: this.state.classic_access,
        onToggle: this.handleToggle,
        className: classNameModalCheck + " leftTextAlign"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, nameFields.map(function (field) {
        return /*#__PURE__*/React.createElement("div", {
          className: "fitContent",
          key: _this2.props.data.name + "-" + kebabCase$2(field) + "-div"
        }, /*#__PURE__*/React.createElement(IcseTextInput, {
          id: composedId + "-" + field,
          componentName: "VPC Network",
          field: field,
          labelText: titleCase$1(field),
          value: _this2.state[field],
          onChange: _this2.handleInputChange,
          invalid: _this2.props.invalidCallback(field, _this2.state, _this2.props),
          invalidText: _this2.props.invalidTextCallback(field, _this2.state, _this2.props),
          className: classNameModalCheck
        }));
      })), /*#__PURE__*/React.createElement(IcseHeading, {
        name: "Public Gateways",
        type: "subHeading",
        noLabelText: true,
        tooltip: {
          content: "Public Gateways allow for all resources in a zone to communicate with the public internet. Public Gateways are not needed for subnets where a VPN gateway is created."
        }
      }), /*#__PURE__*/React.createElement(IcseFormGroup, {
        noMarginBottom: true
      }, ["zone-1", "zone-2", "zone-3"].map(function (zone) {
        return /*#__PURE__*/React.createElement(IcseToggle, {
          key: _this2.props.data.name + "-gateway-toggle-" + zone,
          id: _this2.props.data.name + "-pgw-" + zone,
          labelText: "Create in Zone " + parseIntFromZone(zone),
          defaultToggled: _this2.state.use_public_gateways[zone],
          onToggle: function onToggle() {
            return _this2.handPgwToggle(zone);
          },
          className: classNameModalCheck + " leftTextAlign"
        });
      })));
    }
  }]);
  return VpcNetworkForm;
}(React.Component);
VpcNetworkForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    flow_logs_bucket_name: "",
    default_network_acl_name: "",
    default_routing_table_name: "",
    default_security_group_name: "",
    classic_access: false,
    use_manual_address_prefixes: false,
    use_public_gateways: {
      "zone-1": false,
      "zone-2": false,
      "zone-3": false
    }
  },
  isModal: false
};
VpcNetworkForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string,
    flow_logs_bucket_name: PropTypes.string,
    default_network_acl_name: PropTypes.string,
    default_security_group_name: PropTypes.string,
    default_routing_table_name: PropTypes.string,
    classic_access: PropTypes.bool.isRequired,
    use_manual_address_prefixes: PropTypes.bool.isRequired,
    use_public_gateways: PropTypes.object.isRequired
  }),
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  cosBuckets: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  isModal: PropTypes.bool.isRequired
};

var services = {
  hpcs: "Hyper Protect Crypto Services",
  kms: "Key Protect",
  cos: "Object Storage",
  icr: "Container Registry",
  "Hyper Protect Crypto Services": "hpcs",
  "Key Protect": "kms",
  "Object Storage": "cos",
  "Container Registry": "icr"
};
var serviceGroups = ["Hyper Protect Crypto Services", "Key Protect", "Object Storage", "Container Registry"];

/**
 * Vpe Form
 */
var VpeForm = /*#__PURE__*/function (_Component) {
  _inherits(VpeForm, _Component);
  var _super = _createSuper(VpeForm);
  function VpeForm(props) {
    var _this;
    _classCallCheck(this, VpeForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleServiceDropdown = _this.handleServiceDropdown.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleMultiSelect = _this.handleMultiSelect.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Handle input change
   * @param {event} event
   */
  _createClass(VpeForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState(this.eventTargetToNameAndValue(event));
    }

    /**
     * handle service dropdown
     * @param {event} event event
     */
  }, {
    key: "handleServiceDropdown",
    value: function handleServiceDropdown(event) {
      this.setState({
        service: services[event.target.value]
      });
    }

    /**
     * Toggle on and off param in state at name
     * @param {string} name name of the object key to change
     */
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(_defineProperty({}, name, !this.state[name]));
    }

    /**
     * handle multiselects
     * @param {event} event
     */
  }, {
    key: "handleMultiSelect",
    value: function handleMultiSelect(name, event) {
      this.setState(_defineProperty({}, name, event));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseTextInput, {
        componentName: "Vpe",
        field: "vpc",
        labelText: "VPC Name",
        className: "fieldWidthSmaller",
        value: this.state.vpc,
        onChange: function onChange() {} // nothing
        ,
        readOnly: true,
        id: "vpe-vpc-name",
        invalid: false
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        name: "service",
        formName: "vpe",
        groups: serviceGroups,
        value: services[this.state.service],
        labelText: "Service Type",
        handleInputChange: this.handleServiceDropdown,
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "resource_group",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(SecurityGroupMultiSelect, {
        id: "vpe-security-groups",
        initialSelectedItems: this.state.security_groups,
        vpc_name: this.state.vpc,
        onChange: function onChange(event) {
          return _this2.handleMultiSelect("security_groups", event);
        },
        securityGroups: this.props.securityGroups,
        className: "fieldWidthSmaller",
        invalid: this.state.security_groups.length === 0
      }), /*#__PURE__*/React.createElement(SubnetMultiSelect, {
        id: "vpe-subnets",
        initialSelectedItems: this.state.subnets,
        vpc_name: this.state.vpc,
        onChange: function onChange(event) {
          return _this2.handleMultiSelect("subnets", event);
        },
        subnets: this.props.subnetList,
        className: "fieldWidthSmaller"
      })));
    }
  }]);
  return VpeForm;
}(Component);
VpeForm.defaultProps = {
  data: {
    vpc: "",
    service: "kms",
    resource_group: "",
    security_groups: [],
    subnets: []
  },
  resourceGroups: [],
  subnetList: [],
  securityGroups: [],
  isModal: false
};
VpeForm.propTypes = {
  data: PropTypes.shape({
    vpc: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    resource_group: PropTypes.string.isRequired,
    security_groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    subnets: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  subnetList: PropTypes.arrayOf(PropTypes.string).isRequired,
  securityGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired
};

/**
 * vpn gateway form
 */
var VpnGatewayForm = /*#__PURE__*/function (_Component) {
  _inherits(VpnGatewayForm, _Component);
  var _super = _createSuper(VpnGatewayForm);
  function VpnGatewayForm(props) {
    var _this;
    _classCallCheck(this, VpnGatewayForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * handle input change
   * @param {event} event
   */
  _createClass(VpnGatewayForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      if (event.target.name === "vpc") {
        this.setState({
          vpc: event.target.value,
          subnet: ""
        });
      } else if (event.target.name === "subnet" && lib_4(this.state.vpc)) {
        this.setState({
          subnet: ""
        });
      } else {
        this.setState(this.eventTargetToNameAndValue(event));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var composedId = "vpn-gateway-form-".concat(this.props.data.name, "-");
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: composedId,
        component: "vpn_gateways",
        componentName: this.props.data.name,
        componentProps: this.props,
        value: this.state.name,
        onChange: this.handleInputChange,
        placeholder: "my-vpn-gateway-name",
        hideHelperText: true,
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "resource_group",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.resource_group),
        invalidText: "Select a Resource Group.",
        className: "fieldWidth"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        id: composedId,
        formName: "vpc",
        name: "vpc",
        labelText: "VPC",
        groups: this.props.vpcList,
        value: this.state.vpc,
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.vpc),
        invalidText: "Select a VPC.",
        className: "fieldWidth"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        id: composedId,
        formName: "subnet",
        name: "subnet",
        labelText: "Subnet",
        groups: this.props.subnetList,
        value: this.state.subnet,
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.vpc) || lib_4(this.state.subnet),
        invalidText: lib_4(this.state.vpc) ? "No VPC Selected." : "Select a Subnet.",
        className: "fieldWidth"
      })));
    }
  }]);
  return VpnGatewayForm;
}(Component);
VpnGatewayForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    vpc: "",
    subnet: null
  },
  isModal: false
};
VpnGatewayForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string,
    // can be null
    vpc: PropTypes.string,
    // can be null
    subnet: PropTypes.string // can be null
  }).isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  vpcList: PropTypes.arrayOf(PropTypes.string).isRequired,
  subnetList: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  isModal: PropTypes.bool.isRequired
};

var VsiForm = /*#__PURE__*/function (_Component) {
  _inherits(VsiForm, _Component);
  var _super = _createSuper(VsiForm);
  function VsiForm(props) {
    var _this;
    _classCallCheck(this, VsiForm);
    _this = _super.call(this, props);
    _this.state = _this.props.data;
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleMultiSelectChange = _this.handleMultiSelectChange.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(VsiForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      var stateChangeParams = _defineProperty({}, name, name === "vsi_per_subnet" && value !== "" ? Number(value) : value);
      if (name === "vpc") transpose$1({
        subnets: [],
        subnet: ""
      }, stateChangeParams);
      this.setState(stateChangeParams);
    }
  }, {
    key: "handleMultiSelectChange",
    value: function handleMultiSelectChange(name, value) {
      this.setState(this.setNameToValue(name, value));
    }
  }, {
    key: "handleToggle",
    value: function handleToggle(name) {
      this.setState(this.toggleStateBoolean(name, this.state));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var composedId = "vsi-deployment-form-".concat(this.props.data.name);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: composedId,
        componentName: "vsi",
        value: this.state.name,
        onChange: this.handleInputChange,
        invalid: this.props.invalidCallback(this.state),
        invalidText: this.props.invalidTextCallback(this.state),
        hideHelperText: true
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "vsi_form",
        name: "resource_group",
        labelText: "Resource Group",
        groups: this.props.resourceGroupList,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "vsi_form",
        name: "vpc",
        labelText: "VPC",
        groups: this.props.vpcList,
        value: this.state.vpc,
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.vpc),
        invalidText: "Select a VPC."
      }), this.props.isTeleport ?
      /*#__PURE__*/
      // render dropdown for teleport instance
      React.createElement(IcseSelect, {
        formName: "vsi_form",
        name: "subnet",
        labelText: "Subnet",
        groups: this.props.subnetList,
        value: this.state.subnet,
        handleInputChange: this.handleInputChange,
        invalid: lib_4(this.state.vpc) || lib_4(this.state.subnet),
        invalidText: lib_4(this.state.vpc) ? "No VPC Selected." : "Select a Subnet."
      }) : /*#__PURE__*/React.createElement(SubnetMultiSelect, {
        id: "subnet",
        initialSelectedItems: this.state.subnets,
        vpc_name: this.state.vpc,
        subnets: this.props.subnetList,
        onChange: function onChange(value) {
          return _this2.handleMultiSelectChange("subnets", value);
        }
      }), /*#__PURE__*/React.createElement(NumberInput, {
        label: "Instances per Subnet",
        id: composedId + "-vsi-per-subnet",
        allowEmpty: false,
        value: this.state.vsi_per_subnet,
        defaultValue: 1,
        max: 10,
        min: 1,
        onChange: this.handleInputChange,
        name: "vsi_per_subnet",
        hideSteppers: true,
        invalidText: "Please input a number 1-10",
        className: "fieldWidth leftTextAlign"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(SshKeyMultiSelect, {
        id: "sshkey",
        sshKeys: this.props.sshKeyList,
        onChange: function onChange(value) {
          return _this2.handleMultiSelectChange("ssh_keys", value);
        },
        initialSelectedItems: this.state.ssh_keys
      }), /*#__PURE__*/React.createElement(FetchSelect, {
        formName: "vsi_form",
        labelText: "Image",
        name: "image_name",
        apiEndpoint: this.props.apiEndpointImages,
        handleInputChange: this.handleInputChange,
        value: this.state.image_name
      }), /*#__PURE__*/React.createElement(FetchSelect, {
        formName: "vsi_form",
        labelText: "Flavor",
        name: "profile",
        apiEndpoint: this.props.apiEndpointFlavors,
        handleInputChange: this.handleInputChange,
        value: this.state.profile
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "vsi_form",
        name: "encryption_key",
        labelText: "Encryption Key",
        groups: this.props.encryptionKeyList,
        value: this.state.encryption_key,
        handleInputChange: this.handleInputChange,
        invalid: this.props.invalidCallback(this.state),
        invalidText: "Select a valid encryption key."
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        id: composedId + "-fips-toggle",
        labelText: "Enable Floating IP",
        defaultToggled: this.state.enable_floating_ip,
        onToggle: this.handleToggle
      })), /*#__PURE__*/React.createElement(DynamicRender, {
        hide: this.props.isTeleport,
        show: /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(TextArea, {
          id: composedId + "-vsi-user-data",
          placeholder: "Cloud init data",
          labelText: "User Data",
          name: "user_data",
          value: this.state.user_data || "",
          onChange: this.handleInputChange,
          invalidText: "Invalid error message.",
          className: "fieldWidthBigger"
        }))
      }));
    }
  }]);
  return VsiForm;
}(Component);
VsiForm.defaultProps = {
  data: {
    name: "",
    ssh_keys: [],
    subnet: "",
    subnets: [],
    enable_floating_ip: false,
    vpc: "",
    image_name: "",
    profile: "",
    resource_group: "",
    encryption_key: "",
    vsi_per_subnet: 1
  },
  isModal: false,
  isTeleport: false,
  resourceGroupList: [],
  vpcList: [],
  subnetList: [],
  sshKeyList: [],
  encryptionKeyList: [],
  apiEndpointImages: "",
  apiEndpointFlavors: ""
};
VsiForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    ssh_keys: PropTypes.array,
    subnet: PropTypes.string,
    subnets: PropTypes.array,
    enable_floating_ip: PropTypes.bool,
    vpc: PropTypes.string,
    image_name: PropTypes.string,
    profile: PropTypes.string,
    resource_group: PropTypes.string,
    encryption_key: PropTypes.string,
    vsi_per_subnet: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  /* bools */
  isModal: PropTypes.bool.isRequired,
  isTeleport: PropTypes.bool.isRequired,
  /* lists */
  resourceGroupList: PropTypes.array.isRequired,
  vpcList: PropTypes.array.isRequired,
  subnetList: PropTypes.array.isRequired,
  sshKeyList: PropTypes.array.isRequired,
  encryptionKeyList: PropTypes.array.isRequired,
  /* api endpoints */
  apiEndpointImages: PropTypes.string.isRequired,
  apiEndpointFlavors: PropTypes.string.isRequired,
  /* callbacks */
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired
};

var WorkerPoolForm = /*#__PURE__*/function (_Component) {
  _inherits(WorkerPoolForm, _Component);
  var _super = _createSuper(WorkerPoolForm);
  function WorkerPoolForm(props) {
    var _this;
    _classCallCheck(this, WorkerPoolForm);
    _this = _super.call(this, props);
    _this.state = _this.props.isModal ? {
      name: "",
      flavor: _this.props.cluster.flavor,
      subnets: _this.props.cluster.subnets,
      vpc: _this.props.cluster.vpc,
      workers_per_subnet: _this.props.cluster.workers_per_subnet,
      entitlement: _this.props.cluster.entitlement
    } : _this.props.data, _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleSubnetChange = _this.handleSubnetChange.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    return _this;
  }

  // Handle pool input change
  _createClass(WorkerPoolForm, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      var pool = _objectSpread2({}, this.state);
      if (name === "workers_per_subnet") {
        pool[name] = Number(value);
      } else {
        pool[name] = value === "null" ? null : value;
      }
      this.setState({
        pool: pool
      });
    }

    // Handle subnet multiselect change
  }, {
    key: "handleSubnetChange",
    value: function handleSubnetChange(event) {
      var pool = _objectSpread2({}, this.state);
      pool.subnets = event.selectedItems;
      this.setState({
        pool: pool
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        componentName: "Worker Pools",
        onChange: this.handleInputChange,
        componentProps: this.props,
        value: this.state.name,
        className: "fieldWidthSmaller",
        placeholder: "my-worker-pool-name",
        hideHelperText: true,
        invalid: this.props.invalidCallback(this.state, this.props),
        invalidText: this.props.invalidTextCallback(this.state, this.props)
      }), /*#__PURE__*/React.createElement(EntitlementSelect, {
        name: "entitlement",
        value: this.state.entitlement,
        handleInputChange: this.handleInputChange,
        component: this.props.data.name,
        formName: "Worker Pools"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        formName: "Worker Pools",
        name: "flavor",
        labelText: "Flavor Select",
        value: this.state.flavor,
        groups: ["bx2.16x64", "bx2.2x8"],
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(SubnetMultiSelect, {
        id: this.props.data.name,
        slz: this.props.slz,
        disabled: this.props.cluster.vpc === null,
        vpc_name: this.state.vpc,
        initialSelectedItems: this.props.data.subnets,
        subnets: this.props.subnetList,
        onChange: this.handleSubnetChange,
        component: this.props.data.name,
        className: "fieldWidthSmaller cds--form-item"
      }), /*#__PURE__*/React.createElement(IcseNumberSelect, {
        name: "workers_per_subnet",
        formName: "Worker Pools",
        labelText: "Workers Per Subnet",
        value: this.state.workers_per_subnet,
        max: 10,
        min: 0,
        handleInputChange: this.handleInputChange,
        component: this.props.data.name,
        className: "fieldWidthSmaller"
      })));
    }
  }]);
  return WorkerPoolForm;
}(Component);
WorkerPoolForm.defaultProps = {
  data: {
    entitlement: "",
    flavor: "bx2.16x64",
    name: "",
    subnets: [],
    vpc: "",
    workers_per_subnet: 2
  },
  isModal: false
};
WorkerPoolForm.propTypes = {
  subnetList: PropTypes.array.isRequired,
  isModal: PropTypes.bool.isRequired,
  cluster: PropTypes.shape({
    entitlement: PropTypes.string,
    // can be null
    flavor: PropTypes.string.isRequired,
    vpc: PropTypes.string.isRequired,
    workers_per_subnet: PropTypes.number.isRequired,
    subnets: PropTypes.array.isRequired
  }),
  // can be null
  data: PropTypes.shape({
    entitlement: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vpc: PropTypes.string.isRequired,
    workers_per_subnet: PropTypes.number.isRequired,
    subnets: PropTypes.array.isRequired
  }).isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired
};

var ClusterForm = /*#__PURE__*/function (_Component) {
  _inherits(ClusterForm, _Component);
  var _super = _createSuper(ClusterForm);
  function ClusterForm(props) {
    var _this;
    _classCallCheck(this, ClusterForm);
    _this = _super.call(this, props);
    // Handle cluster input change
    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      var cluster = _objectSpread2({}, _this.state);
      _this.setState(lib_11(name, value, cluster));
    });
    /**
     * handle toggle change
     * @param {*} event event
     */
    _defineProperty(_assertThisInitialized(_this), "handleToggleChange", function () {
      var cluster = _objectSpread2({}, _this.state);
      cluster.update_all_workers = !cluster.update_all_workers;
      _this.setState(cluster);
    });
    _this.state = _objectSpread2({}, _this.props.data);
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleToggleChange = _this.handleToggleChange.bind(_assertThisInitialized(_this));
    _this.handleMultiSelect = _this.handleMultiSelect.bind(_assertThisInitialized(_this));
    buildFormFunctions(_assertThisInitialized(_this));
    buildFormDefaultInputMethods(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ClusterForm, [{
    key: "handleMultiSelect",
    value:
    /**
     * handle subnet multiselect
     * @param {event} event
     */
    function handleMultiSelect(name, event) {
      this.setState(_defineProperty({}, name, event));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var clusterComponent = this.props.isModal ? "new-cluster" : this.props.data.name;
      var innerFormProps = {
        arrayParentName: this.props.data.name,
        cluster: this.props.data,
        invalidTextCallback: this.props.invalidPoolTextCallback,
        invalidCallback: this.props.invalidPoolCallback,
        subnetList: this.props.subnetList
      };
      transpose$1(_objectSpread2({}, this.props.workerPoolProps), innerFormProps);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseNameInput, {
        id: this.state.name + "-name",
        labelText: "Cluster Name",
        componentName: clusterComponent,
        value: this.state.name,
        onChange: this.handleInputChange,
        invalidCallback: function invalidCallback() {
          return _this2.props.invalidCallback(_this2.state, _this2.props);
        },
        invalidText: this.props.invalidTextCallback(this.state, this.props),
        helperTextCallback: function helperTextCallback() {
          return _this2.props.helperTextCallback(_this2.state, _this2.props);
        },
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        labelText: "Resource Group",
        name: "resource_group",
        formName: clusterComponent + "resource_group",
        groups: this.props.resourceGroups,
        value: this.state.resource_group,
        handleInputChange: this.handleInputChange,
        invalidText: "Select a Resource Group.",
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseSelect, {
        name: "kube_type",
        formName: clusterComponent + "kube_type",
        labelText: "Kube Type",
        groups: ["OpenShift", "IBM Kubernetes Service"],
        handleInputChange: this.handleInputChange,
        invalidText: "Select a cluster type.",
        value: this.state.kube_type === "" ? "" : this.state.kube_type === "openshift" ? "OpenShift" : "IBM Kubernetes Service",
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(EntitlementSelect, {
        name: "entitlement",
        formName: clusterComponent + "entitlement",
        labelText: "Entitlement",
        value: this.state.entitlement,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(FetchSelect, {
        name: "flavor",
        formName: clusterComponent + "flavor",
        labelText: "Instance Profile",
        value: this.state.flavor,
        apiEndpoint: this.props.flavorApiEndpoint,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), this.state.kube_type === "openshift" && /*#__PURE__*/React.createElement(IcseSelect, {
        name: "cos",
        formName: clusterComponent + "cos",
        labelText: "Cloud Object Storage Instance",
        groups: this.props.cosNames,
        value: this.state.cos,
        handleInputChange: this.handleInputChange,
        invalidText: "Select an Object Storage instance",
        className: "fieldWidthSmaller"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        id: clusterComponent + "-vpc-name",
        name: "vpc",
        formName: clusterComponent + "vpc",
        labelText: "VPC",
        groups: this.props.vpcList,
        value: this.state.vpc,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(SubnetMultiSelect, {
        id: clusterComponent,
        key: this.state.vpc,
        vpc_name: this.state.vpc,
        subnets: this.props.subnetList,
        initialSelectedItems: this.state.subnets,
        onChange: function onChange(event) {
          return _this2.handleMultiSelect("subnets", event);
        },
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseNumberSelect, {
        max: 10,
        name: "workers_per_subnet",
        formName: clusterComponent + "workers_per_subnet",
        labelText: "Workers per Subnet",
        value: this.state.workers_per_subnet,
        handleInputChange: this.handleInputChange,
        isModal: this.props.isModal,
        className: "fieldWidthSmaller",
        invalid: this.state.kube_type === "openshift" && this.state.subnets.length * this.state.workers_per_subnet < 2,
        invalidText: "OpenShift clusters require at least 2 worker nodes across any number of subnets"
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(FetchSelect, {
        name: "kube_version",
        formName: clusterComponent + "kube_version",
        labelText: "Kube Version",
        value: this.state.kube_version,
        apiEndpoint: this.props.kubeVersionApiEndpoint,
        filter: function filter(version) {
          if (_this2.state.kube_type === "openshift" && version.indexOf("openshift") !== -1 ||
          // is openshift and contains openshift
          _this2.state.kube_type !== "openshift" && version.indexOf("openshift") === -1 ||
          // is not openshift and does not contain openshift
          version === "default" // or is default
          ) {
            return version.replace(/\s\(Default\)/g, ""); // replace default with empty string
          }
        },

        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        id: clusterComponent + "-update-all",
        labelText: "Update All Workers",
        toggleFieldName: "update_all_workers",
        defaultToggled: this.state.update_all_workers,
        onToggle: this.handleToggleChange
      })), /*#__PURE__*/React.createElement(IcseFormGroup, null, /*#__PURE__*/React.createElement(IcseSelect, {
        name: "encryption_key",
        formName: clusterComponent + "encryption_key",
        labelText: "Encryption Key",
        groups: this.props.encryptionKeys,
        value: this.state.encryption_key,
        handleInputChange: this.handleInputChange,
        className: "fieldWidthSmaller"
      }), /*#__PURE__*/React.createElement(IcseToggle, {
        id: clusterComponent + "-service-endpoint",
        tooltip: {
          content: "Use private service endpoint for Encryption Key"
        },
        labelText: "Private Endpoint",
        toggleFieldName: "private_endpoint",
        defaultToggled: this.state.private_endpoint,
        onToggle: this.handleToggleChange
      })), /*#__PURE__*/React.createElement(React.Fragment, null, this.props.isModal === false && /*#__PURE__*/React.createElement(IcseFormTemplate, {
        name: "Worker Pools",
        subHeading: true,
        addText: "Create a Worker Pool",
        arrayData: this.props.data.worker_pools,
        innerForm: WorkerPoolForm,
        disableSave: this.props.workerPoolProps.disableSave,
        onDelete: this.props.workerPoolProps.onDelete,
        onSave: this.props.workerPoolProps.onSave,
        onSubmit: this.props.workerPoolProps.onSubmit,
        propsMatchState: this.props.propsMatchState,
        innerFormProps: _objectSpread2({}, innerFormProps),
        hideAbout: true,
        toggleFormProps: {
          hideName: true,
          submissionFieldName: "worker_pools",
          disableSave: this.props.workerPoolProps.disableSave,
          type: "formInSubForm"
        }
      })));
    }
  }]);
  return ClusterForm;
}(Component);
ClusterForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    kube_type: "openshift",
    entitlement: "null",
    encryption_key: null,
    cos: "",
    vpc: "",
    subnets: [],
    workers_per_subnet: 2,
    flavor: "",
    kube_version: "default",
    update_all_workers: false,
    worker_pools: []
  },
  resourceGroups: [],
  encryptionKeys: [],
  cosNames: [],
  vpcList: [],
  subnetList: [],
  isModal: false
};
ClusterForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string,
    kube_type: PropTypes.string.isRequired,
    entitlement: PropTypes.string,
    // can be null
    encryption_key: PropTypes.string,
    cos: PropTypes.string.isRequired,
    subnets: PropTypes.array.isRequired,
    workers_per_subnet: PropTypes.number.isRequired,
    vpc: PropTypes.string.isRequired,
    kube_version: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    update_all_workers: PropTypes.bool.isRequired,
    worker_pools: PropTypes.array.isRequired
  }),
  /* bools */
  isModal: PropTypes.bool.isRequired,
  /* lists */
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  encryptionKeys: PropTypes.arrayOf(PropTypes.string),
  cosNames: PropTypes.arrayOf(PropTypes.string),
  vpcList: PropTypes.arrayOf(PropTypes.string),
  subnetList: PropTypes.arrayOf(PropTypes.string).isRequired,
  /* api endpoints */
  kubeVersionApiEndpoint: PropTypes.string.isRequired,
  flavorApiEndpoint: PropTypes.string.isRequired,
  /* callbacks */
  invalidCallback: PropTypes.func,
  invalidTextCallback: PropTypes.func,
  helperTextCallback: PropTypes.func,
  invalidPoolCallback: PropTypes.func,
  invalidPoolTextCallback: PropTypes.func,
  /* forms */
  workerPoolProps: PropTypes.shape({
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disableSave: PropTypes.func.isRequired
  }).isRequired
};

export { AppIdForm, AppIdKeyForm, AtrackerForm, ClusterForm, DeleteButton, DeleteModal, Docs, DynamicRender, DynamicToolTipWrapper, EditCloseIcon, EmptyResourceTile, EncryptionKeyForm, EndpointSelect, EntitlementSelect, F5VsiForm, F5VsiTemplateForm, FetchSelect, FormModal, IamAccountSettingsForm, IcseFormGroup, IcseFormTemplate, IcseHeading, IcseModal, IcseMultiSelect, IcseNameInput, IcseNumberSelect, IcseSelect, IcseSubForm, IcseTextInput, IcseToggle, IcseToolTip, KeyManagementForm, LocationsMultiSelect, NetworkAclForm, NetworkingRuleForm, NetworkingRulesOrderCard, ObjectStorageBucketForm, ObjectStorageInstancesForm as ObjectStorageForm, ObjectStorageKeyForm, PopoverWrapper, RenderForm, ResourceGroupForm, SaveAddButton, SaveIcon, SccForm, SecretsManagerForm, SecurityGroupForm, SecurityGroupMultiSelect, SshKeyForm, SshKeyMultiSelect, StatefulTabPanel, StatelessToggleForm, SubnetForm, SubnetMultiSelect, SubnetTierForm, SubnetTileForm, TeleportClaimToRoleForm, TitleGroup, ToggleForm, ToolTipWrapper, TransitGatewayForm, UnderConstruction, UnsavedChangesModal, UpDownButtons, VpcNetworkForm as VpcForm, VpcListMultiSelect, VpeForm, VpnGatewayForm, VsiForm, WorkerPoolForm, buildFormDefaultInputMethods, buildFormFunctions };
