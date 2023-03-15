import React, { Component } from "react";
import NetworkingRulesOrderCard from "./NetworkingRulesOrderCard";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import PropTypes from "prop-types";
import { IcseNameInput } from "../Inputs";
import { IcseFormGroup } from "../Utils";
import { IcseSelect } from "../Dropdowns";

/**
 * security group form
 */
class SecurityGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data, show: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.networkRuleOrderDidChange = this.networkRuleOrderDidChange.bind(this);
  }

  /**
   * handle input change
   * @param {event} event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  handleShowToggle() {
    this.setState(this.toggleStateBoolean("show", this.state));
  }

  /**
   * Check if the order of network rules updated - then update state to allow save
   * @param {Array} rules list of rule objects
   */
  networkRuleOrderDidChange(rules) {
    this.props.networkRuleOrderDidChange(this.state, this.props);
    this.setState({ rules: rules }); // if the order of the rules changed, update rules state
  }

  render() {
    let composedId = `security-group-form-${this.props.data.name}`;
    let className = this.props.isModal ? "fieldWidthSmaller" : "fieldWidth";
    return (
      <>
        <IcseFormGroup>
          {/* name */}
          <IcseNameInput
            id={composedId}
            componentName="security_groups"
            value={this.state.name}
            onChange={this.handleInputChange}
            hideHelperText
            className={className}
            invalidCallback={() =>
              this.props.invalidCallback(this.state, this.props)
            }
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
          />
          {/* resource group */}
          <IcseSelect
            formName="security_Group"
            name="resource_group"
            labelText="Resource Group"
            groups={this.props.resourceGroups}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
            className={className}
          />
          {/* vpc name */}
          <IcseSelect
            formName="security_Group"
            name="vpc"
            labelText="VPC"
            groups={this.props.vpcList}
            value={this.state.vpc}
            handleInputChange={this.handleInputChange}
            className={className}
          />
        </IcseFormGroup>
        {!this.props.isModal && (
          <NetworkingRulesOrderCard
            rules={this.state.rules}
            vpc_name={this.state.vpc}
            parent_name={this.props.data.name}
            isSecurityGroup={true}
            networkRuleOrderDidChange={this.networkRuleOrderDidChange}
            invalidCallback={this.props.invalidCallback}
            invalidTextCallback={this.props.invalidTextCallback}
            onSubmitCallback={this.props.onSubmitCallback}
            onRuleSave={this.props.onRuleSave}
            onRuleDelete={this.props.onRuleDelete}
            disableModalSubmitCallback={this.props.disableModalSubmitCallback}
            disableSaveCallback={this.props.disableSaveCallback}
          />
        )}
      </>
    );
  }
}

SecurityGroupForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    vpc: "",
    rules: [],
  },
  isModal: false,
};

SecurityGroupForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    vpc: PropTypes.string,
    resource_group: PropTypes.string,
    rules: PropTypes.array,
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  networkRuleOrderDidChange: PropTypes.func, // can be undefined
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  onRuleSave: PropTypes.func.isRequired,
  onRuleDelete: PropTypes.func.isRequired,
  disableModalSubmitCallback: PropTypes.func.isRequired,
  disableSaveCallback: PropTypes.func.isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  vpcList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SecurityGroupForm;
