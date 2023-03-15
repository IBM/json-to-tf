import React, { Component } from "react";
import { TextInput } from "@carbon/react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { IcseFormGroup } from "../Utils";
import { IcseNameInput } from "../Inputs";
import { IcseSelect } from "../Dropdowns";
import PropTypes from "prop-types";
import { kebabCase } from "lazy-z";
import "../styles/SshKeyForm.css";

/**
 * ssh key form
 */
class SshKeyForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * handle other input events
   * @param {*} event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  render() {
    return (
      <>
        <IcseFormGroup>
          {/* name */}
          <IcseNameInput
            id={this.state.name + "-name"}
            componentName={this.props.data.name + "-ssh-key-name"}
            value={this.state.name}
            onChange={this.handleInputChange}
            invalid={this.props.invalidCallback(this.state, this.props)}
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
            hideHelperText
          />
          {/* resource group */}
          <IcseSelect
            name="resource_group"
            formName={`${kebabCase(this.props.data.name)}-ssh-rg-select`}
            groups={this.props.resourceGroups}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
            invalidText="Select a Resource Group."
            labelText="Resource Group"
          />
        </IcseFormGroup>
        <IcseFormGroup noMarginBottom>
          <div className="fieldWidthBigger leftTextAlign">
            <TextInput.PasswordInput
              labelText="Public Key"
              name="public_key"
              id={this.props.data.name + "-ssh-public-key"}
              value={this.state.public_key}
              onChange={this.handleInputChange}
              invalid={
                this.props.invalidKeyCallback(this.state.public_key).invalid
              }
              invalidText={
                this.props.invalidKeyCallback(this.state.public_key).invalidText
              }
            />
          </div>
        </IcseFormGroup>
      </>
    );
  }
}

SshKeyForm.defaultProps = {
  data: {
    name: "",
    public_key: "",
  },
  resourceGroups: [],
  isModal: false,
};

SshKeyForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string,
    public_key: PropTypes.string.isRequired,
  }).isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  invalidKeyCallback: PropTypes.func.isRequired,
};

export default SshKeyForm;
