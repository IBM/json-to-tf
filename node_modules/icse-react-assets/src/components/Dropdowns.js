import { Select, SelectItem } from "@carbon/react";
import {
  isEmpty,
  isNullOrEmptyString,
  kebabCase,
  buildNumberDropdownList,
  titleCase,
} from "lazy-z";
import PopoverWrapper from "./PopoverWrapper";
import PropTypes from "prop-types";
import { addClassName, prependEmptyStringWhenNull } from "../lib";
import { DynamicToolTipWrapper } from "./Tooltips";
import React from "react";
import "./styles/Dropdowns.css";

export const IcseSelect = (props) => {
  let invalid = // automatically set to invalid is is null or empty string and invalid not disabled
    props.disableInvalid !== true && isNullOrEmptyString(props.value)
      ? true
      : props.invalid;
  let groups =
    props.groups.length === 0
      ? [] // if no groups, empty array
      : prependEmptyStringWhenNull(
          // otherwise try and prepend empty string if null
          props.value,
          props.groups
        );
  // please leave debug here //
  if (props.debug) {
    console.log("PROPS: ", props);
    console.log("GROUPS: ", groups);
  }
  return (
    <DynamicToolTipWrapper
      id={kebabCase(props.name) + "-dropdown-tooltip"}
      innerForm={() => {
        return (
          <PopoverWrapper
            hoverText={props.value || ""}
            // inherit classnames from tooltip
            className={
              props.tooltip ? "cds--form-item tooltip" : "cds--form-item"
            }
          >
            <Select
              id={kebabCase(props.formName + " " + props.name)}
              name={props.name}
              labelText={props.tooltip ? null : props.labelText}
              value={props.value || undefined}
              className={addClassName("leftTextAlign", props)}
              disabled={props.disabled}
              invalid={invalid}
              invalidText={props.invalidText}
              readOnly={props.readOnly}
              onChange={props.handleInputChange}
            >
              {groups.map((value) => (
                <SelectItem
                  key={`${props.id}-${value}`}
                  text={value}
                  value={value}
                />
              ))}
            </Select>
          </PopoverWrapper>
        );
      }}
      {...props}
    />
  );
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
  className: "fieldWidth",
};

IcseSelect.propTypes = {
  value: PropTypes.any, // must accept null
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
    align: PropTypes.string,
  }),
};

export class FetchSelect extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.dataToGroups = this.dataToGroups.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if (isEmpty(this.state.data))
      fetch(this.props.apiEndpoint)
        .then((res) => res.json())
        .then((data) => {
          if (this.props.onReturnFunction) {
            this.props.onReturnFunction(data);
          }

          if (this._isMounted) this.setState({ data: data });
        })
        .catch((err) => {
          console.error(err);
        });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  dataToGroups() {
    if (this.props.filter) {
      return this.state.data.filter(this.props.filter);
    } else {
      return this.state.data;
    }
  }
  render() {
    return (
      <IcseSelect
        labelText={this.props.labelText}
        handleInputChange={this.props.handleInputChange}
        name={this.props.name}
        className={this.props.className}
        formName={this.props.formName}
        groups={this.dataToGroups()}
        value={this.props.value || "null"}
      />
    );
  }
}

FetchSelect.propTypes = {
  labelText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  filterArr: PropTypes.array,
  className: PropTypes.string, // can be null or undefined
  value: PropTypes.string, // can be null or undefined
  groups: PropTypes.array,
  apiEndpoint: PropTypes.string.isRequired,
  onReturnFunction: PropTypes.func,
  filter: PropTypes.func,
  name: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
};

export const IcseNumberSelect = (props) => {
  return (
    <IcseSelect
      formName={props.formName}
      groups={buildNumberDropdownList(props.max, props.min)}
      value={props.value.toString()}
      name={props.name || "Icse Number Select"}
      className={props.className}
      handleInputChange={(event) => {
        // set name target value and parse int
        let sendEvent = {
          target: {
            name: event.target.name,
            value: parseInt(event.target.value),
          },
        };
        props.handleInputChange(sendEvent);
      }}
      invalid={props.invalid}
      invalidText={props.invalidText}
      tooltip={props.tooltip}
      labelText={props.labelText}
      isModal={props.isModal}
    />
  );
};

IcseNumberSelect.defaultProps = {
  min: 1,
  max: 10,
  invalid: false,
  isModal: false,
};

IcseNumberSelect.propTypes = {
  formName: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number, // can be null
  name: PropTypes.string,
  className: PropTypes.string,
  invalidText: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    alignModal: PropTypes.string,
    align: PropTypes.string,
  }),

  labelText: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired,
};

export const EntitlementSelect = (props) => {
  return (
    <IcseSelect
      name={props.name}
      labelText="Entitlement"
      groups={["null", "cloud_pak"]}
      value={props.value || "null"}
      handleInputChange={props.handleInputChange}
      className={props.className}
      formName={props.formName}
    />
  );
};

EntitlementSelect.propTypes = {
  value: PropTypes.string, // can be null
  handleInputChange: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

EntitlementSelect.defaultProps = {
  className: "fieldWidthSmaller",
};

export const EndpointSelect = (props) => {
  let titleCaseGroups = [];
  props.groups.forEach((group) => {
    titleCaseGroups.push(titleCase(group).replace(/And/g, "and"));
  });
  return (
    <IcseSelect
      name="endpoint"
      labelText="Endpoint Type"
      groups={titleCaseGroups}
      value={titleCase(props.value).replace(/And/g, "and")}
      handleInputChange={(event) => {
        let { name, value } = event.target;
        props.handleInputChange({
          target: {
            name: name,
            value: kebabCase(value),
          },
        });
      }}
      className={props.className}
      formName={props.formName}
    />
  );
};

EndpointSelect.propTypes = {
  value: PropTypes.string, // can be null
  handleInputChange: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  className: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

EndpointSelect.defaultProps = {
  groups: ["private", "public", "public-and-private"],
};
