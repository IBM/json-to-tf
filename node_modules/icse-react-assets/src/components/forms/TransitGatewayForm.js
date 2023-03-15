import React, { Component } from "react";
import { IcseTextInput, IcseToggle } from "../Inputs";
import { IcseFormGroup } from "../Utils";
import { IcseSelect } from "../Dropdowns";
import { VpcListMultiSelect } from "../MultiSelects";
import {
  buildFormFunctions,
  buildFormDefaultInputMethods,
} from "../component-utils";
import PropTypes from "prop-types";

class TransitGatewayForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleToggle = this.handleToggle.bind(this);
    this.handleVpcSelect = this.handleVpcSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  handleToggle(name) {
    this.setState({ [name]: !this.state[name] });
  }

  /**
   * handle vpc selection
   * @param {event} event
   */
  handleVpcSelect(event) {
    this.setState({ connections: event });
  }

  /**
   * Handle input change
   * @param {event} event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  render() {
    return (
      <>
        <IcseFormGroup>
          <IcseToggle
            labelText="Global"
            toggleFieldName="global"
            id="tg-global"
            onToggle={this.handleToggle}
            defaultToggled={this.state.global}
          />
          <IcseTextInput
            onChange={this.handleInputChange}
            componentName="Transit Gateway"
            field="name"
            value={this.state.name}
            readOnly={this.props.readOnlyName}
            id="tg-name"
            invalid={this.props.invalidCallback(this.state)}
            invalidText={this.props.invalidTextCallback(this.state)}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            formName="Transit Gateway"
            value={this.state.resource_group}
            groups={this.props.resourceGroups}
            handleInputChange={this.handleInputChange}
            name="resource_group"
            labelText="Resource Group"
          />
          <VpcListMultiSelect
            id="tg-vpc-multiselect"
            titleText="Connected VPCs"
            initialSelectedItems={this.state.connections}
            vpcList={this.props.vpcList}
            onChange={this.handleVpcSelect}
            invalid={this.state.connections.length === 0}
            invalidText="At least one VPC must be connected"
          />
        </IcseFormGroup>
      </>
    );
  }
}

TransitGatewayForm.defaultProps = {
  data: {
    global: true,
    connections: [],
    resource_group: "",
    name: "",
  },
  readOnlyName: true,
  vpcList: [],
  resourceGroups: [],
};

TransitGatewayForm.propTypes = {
  data: PropTypes.shape({
    global: PropTypes.bool.isRequired,
    connections: PropTypes.array.isRequired,
    resource_group: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  readOnlyName: PropTypes.bool.isRequired,
  vpcList: PropTypes.array.isRequired,
  resourceGroups: PropTypes.array.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
};

export default TransitGatewayForm;
