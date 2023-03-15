import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import PropTypes from "prop-types";
import { IcseFormGroup } from "../Utils";
import { IcseNameInput, IcseToggle } from "../Inputs";
import { IcseSelect } from "../Dropdowns";

class ObjectStorageKeyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      role: this.props.data.role || "Writer",
      enable_hmac: this.props.data.enable_hmac,
      use_random_suffix: this.props.data.use_random_suffix,
    };
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handler for toggle
   * @param {String} name specifies the name of the state value you wish to change
   */
  handleToggle() {
    this.setState(this.toggleStateBoolean("enable_hmac", this.state));
  }

  /**
   * handle input change
   * @param {event} event event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  render() {
    // composed id
    let composedId = `key-form-${
      this.props.data.name ? this.props.data.name : "new-key"
    }`;
    let inputSize = this.props.isModal ? "fieldWidthSmaller" : "fieldWidth";
    return (
      <>
        <IcseFormGroup noMarginBottom>
          {/* edit name */}
          <IcseNameInput
            id={this.state.name + "-name"}
            componentName={this.props.data.name}
            value={this.state.name}
            onChange={this.handleInputChange}
            componentProps={this.props}
            placeholder="my-cos-key-name"
            className={inputSize}
            helperTextCallback={() =>
              this.props.composedNameCallback(this.state, this.props)
            }
            invalid={this.props.invalidCallback(this.state, this.props)}
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
          />
          {/* role */}
          <IcseSelect
            name="role"
            groups={[
              "Object Writer",
              "Object Reader",
              "Content Reader",
              "Reader",
              "Writer",
              "Manager",
            ]}
            value={this.state.role}
            labelText="Role"
            handleInputChange={this.handleInputChange}
            className={inputSize}
            formName={this.props.data.name + "-object-storage-key-role"}
          />
          {/* use hmac */}
          <IcseToggle
            tooltip={{
              link: "https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-uhc-hmac-credentials-main",
              content:
                "HMAC (hash-based message authentication code) is required for Teleport VSI instances.",
            }}
            id={composedId + "cos-instance-key-hmac"}
            labelText="Enable HMAC"
            defaultToggled={this.props.forceEnableHmac}
            onToggle={this.handleToggle}
            isModal={this.props.isModal}
            disabled={this.props.forceEnableHmac}
          />
        </IcseFormGroup>
      </>
    );
  }
}

ObjectStorageKeyForm.defaultProps = {
  data: {
    name: "",
    enable_hmac: false,
  },
  forceEnableHmac: false,
};

ObjectStorageKeyForm.propTypes = {
  isModal: PropTypes.bool,
  data: PropTypes.shape({
    enable_hmac: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  shouldDisableSave: PropTypes.func,
  shouldDisableSubmit: PropTypes.func,
  forceEnableHmac: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  composedNameCallback: PropTypes.func.isRequired,
};

export default ObjectStorageKeyForm;
