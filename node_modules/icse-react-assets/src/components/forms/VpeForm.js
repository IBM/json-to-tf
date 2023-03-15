import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { IcseFormGroup } from "../Utils";
import { IcseTextInput } from "../Inputs";
import { IcseSelect } from "../Dropdowns";
import { SecurityGroupMultiSelect, SubnetMultiSelect } from "../MultiSelects";
import PropTypes from "prop-types";

const services = {
  hpcs: "Hyper Protect Crypto Services",
  kms: "Key Protect",
  cos: "Object Storage",
  icr: "Container Registry",
  "Hyper Protect Crypto Services": "hpcs",
  "Key Protect": "kms",
  "Object Storage": "cos",
  "Container Registry": "icr",
};
const serviceGroups = [
  "Hyper Protect Crypto Services",
  "Key Protect",
  "Object Storage",
  "Container Registry",
];

/**
 * Vpe Form
 */
class VpeForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleServiceDropdown = this.handleServiceDropdown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }

  /**
   * Handle input change
   * @param {event} event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  /**
   * handle service dropdown
   * @param {event} event event
   */
  handleServiceDropdown(event) {
    this.setState({
      service: services[event.target.value],
    });
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  handleToggle(name) {
    this.setState({ [name]: !this.state[name] });
  }

  /**
   * handle multiselects
   * @param {event} event
   */
  handleMultiSelect(name, event) {
    this.setState({ [name]: event });
  }

  render() {
    return (
      <>
        <IcseFormGroup>
          <IcseTextInput
            componentName="Vpe"
            field="vpc"
            labelText="VPC Name"
            className="fieldWidthSmaller"
            value={this.state.vpc}
            onChange={() => {}} // nothing
            readOnly
            id="vpe-vpc-name"
            invalid={false}
          />
          <IcseSelect
            name="service"
            formName="vpe"
            groups={serviceGroups}
            value={services[this.state.service]}
            labelText="Service Type"
            handleInputChange={this.handleServiceDropdown}
            className="fieldWidthSmaller"
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            formName="resource_group"
            name="resource_group"
            labelText="Resource Group"
            groups={this.props.resourceGroups}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
            className="fieldWidthSmaller"
          />
          <SecurityGroupMultiSelect
            id="vpe-security-groups"
            initialSelectedItems={this.state.security_groups}
            vpc_name={this.state.vpc}
            onChange={(event) =>
              this.handleMultiSelect("security_groups", event)
            }
            securityGroups={this.props.securityGroups}
            className="fieldWidthSmaller"
            invalid={this.state.security_groups.length === 0}
          />
          <SubnetMultiSelect
            id="vpe-subnets"
            initialSelectedItems={this.state.subnets}
            vpc_name={this.state.vpc}
            onChange={(event) => this.handleMultiSelect("subnets", event)}
            subnets={this.props.subnetList}
            className="fieldWidthSmaller"
          />
        </IcseFormGroup>
      </>
    );
  }
}

VpeForm.defaultProps = {
  data: {
    vpc: "",
    service: "kms",
    resource_group: "",
    security_groups: [],
    subnets: [],
  },
  resourceGroups: [],
  subnetList: [],
  securityGroups: [],
  isModal: false,
};

VpeForm.propTypes = {
  data: PropTypes.shape({
    vpc: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    resource_group: PropTypes.string.isRequired,
    security_groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    subnets: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  subnetList: PropTypes.arrayOf(PropTypes.string).isRequired,
  securityGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired,
};

export default VpeForm;
