import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { IcseFormGroup } from "../Utils";
import { IcseNameInput, IcseToggle } from "../Inputs";
import { IcseSelect } from "../Dropdowns";
import EncryptionKeyForm from "./EncryptionKeyForm";
import PropTypes from "prop-types";
import IcseFormTemplate from "../IcseFormTemplate";
import { transpose } from "lazy-z";

/**
 * Key Management
 */
class KeyManagementForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSystemDropdown = this.handleSystemDropdown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }

  /**
   * handle input change
   * @param {event} event event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  /**
   * handle dropdown for key management system
   * @param {event} event event
   */
  handleSystemDropdown(event) {
    let selection = event.target.value; // selected value in dropdown
    selection === "HPCS"
      ? this.setState({ use_hs_crypto: true, use_data: true })
      : this.setState({ use_hs_crypto: false, use_data: false });
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  handleToggle(name) {
    this.setState({ [name]: !this.state[name] });
  }

  render() {
    let innerFormProps = {
      invalidCallback: this.props.invalidKeyCallback,
      invalidTextCallback: this.props.invalidKeyTextCallback,
      invalidRingCallback: this.props.invalidRingCallback,
      invalidRingText: this.props.invalidRingText,
      arrayParentName: this.props.data.name,
    };
    transpose({ ...this.props.encryptionKeyProps }, innerFormProps);
    return (
      <>
        <IcseFormGroup>
          <IcseSelect
            component="km-system-dropdown"
            name="system"
            formName="system"
            groups={["Key Protect", "HPCS"]}
            value={this.state.use_hs_crypto ? "HPCS" : "Key Protect"}
            labelText="Key Management System"
            handleInputChange={this.handleSystemDropdown}
            className="fieldWidth"
          />
          <IcseToggle
            tooltip={{
              content: "Get Key Management from Data Source",
              align: "bottom-left",
            }}
            labelText="Use Existing Instance"
            key={this.state.use_data}
            defaultToggled={this.state.use_data}
            onToggle={this.handleToggle}
            disabled={this.state.use_hs_crypto === true}
            className="fieldWidth"
            toggleFieldName="use_data"
            id={this.props.data.name + "-use-existing"}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseNameInput
            id={this.state.name + "-name"}
            value={this.state.name}
            componentProps={this.props}
            component="key_management"
            componentName={this.props.data.name}
            onChange={this.handleInputChange}
            className="fieldWidth"
            hideHelperText
            invalid={this.props.invalidCallback(this.state, this.props)}
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
          />
          <IcseSelect
            formName="resource_group"
            name="resource_group"
            labelText="Resource Group"
            groups={this.props.resourceGroups}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
            className="fieldWidth"
          />
        </IcseFormGroup>
        <IcseFormGroup noMarginBottom={this.props.isModal}>
          <IcseToggle
            tooltip={{
              content:
                "Allow for IAM Authorization policies to be created to allow this Key Management service to encrypt VPC block storage volumes. This should be false only if these policies already exist within your account.",
              align: "bottom-left",
            }}
            labelText="Authorize VPC Reader Role"
            key={this.state.authorize_vpc_reader_role}
            defaultToggled={this.state.authorize_vpc_reader_role}
            onToggle={() => this.handleToggle("authorize_vpc_reader_role")}
            className="fieldWidth"
            id={this.props.data.name + "-kms-vpc-reader-role"}
          />
        </IcseFormGroup>
        {this.props.isModal === false && (
          <IcseFormTemplate
            name="Encryption Keys"
            subHeading
            addText="Create an Encryption Key"
            arrayData={this.props.data.keys}
            innerForm={EncryptionKeyForm}
            disableSave={this.props.encryptionKeyProps.disableSave}
            onDelete={this.props.encryptionKeyProps.onDelete}
            onSave={this.props.encryptionKeyProps.onSave}
            onSubmit={this.props.encryptionKeyProps.onSubmit}
            propsMatchState={this.props.propsMatchState}
            innerFormProps={{ ...innerFormProps }}
            hideAbout
            toggleFormProps={{
              hideName: true,
              submissionFieldName: "encryption_keys",
              disableSave: this.props.encryptionKeyProps.disableSave,
              type: "formInSubForm",
            }}
          />
        )}
      </>
    );
  }
}

KeyManagementForm.defaultProps = {
  data: {
    use_hs_crypto: false,
    use_data: false,
    name: "",
    resource_group: "",
    authorize_vpc_reader_role: false,
    keys: [],
  },
  isModal: false,
};

KeyManagementForm.propTypes = {
  data: PropTypes.shape({
    use_hs_crypto: PropTypes.bool.isRequired,
    use_data: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    resource_group: PropTypes.string.isRequired,
    authorize_vpc_reader_role: PropTypes.bool.isRequired,
    keys: PropTypes.array.isRequired,
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
    disableSave: PropTypes.func.isRequired,
  }).isRequired,
};

export default KeyManagementForm;
