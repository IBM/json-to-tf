import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { IcseFormGroup } from "../Utils";
import { IcseNameInput, IcseToggle, IcseTextInput } from "../Inputs";
import { EndpointSelect, IcseNumberSelect } from "../Dropdowns";
import PropTypes from "prop-types";

/**
 * kms keys
 */
class EncryptionKeyForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }

  /**
   * handle input change
   * @param {string} name key to change in state
   * @param {*} value value to update
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  handleToggle(name) {
    this.setState({ [name]: !this.state[name] });
  }

  /**
   * Handle input change for a text field
   * @param {event} event
   */
  handleTextInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Handle toggle for showing/hiding details of keys
  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    let composedId = `encryption-key-${this.props.data.name}-`;
    return (
      <>
        {/* edit name */}
        <IcseFormGroup>
          <IcseNameInput
            id={this.state.name + "-name"}
            component="kms_key"
            componentName={this.props.data.name}
            value={this.state.name}
            onChange={this.handleTextInput}
            componentProps={this.props}
            placeholder="my-encryption-key-name"
            hideHelperText
            invalid={this.props.invalidCallback(this.state, this.props)}
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
          />
          {/* edit key ring */}
          <IcseTextInput
            componentName={this.props.data.name}
            field="key_ring"
            labelText="Key Ring Name"
            value={this.state.key_ring || ""}
            onChange={this.handleTextInput} // nothing
            id={this.props.data.name + "-key-ring"}
            invalid={this.props.invalidRingCallback(this.state, this.props)}
            invalidText={this.props.invalidRingText}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseNumberSelect
            tooltip={{
              content:
                "Setting a rotation policy shortens the lifetime of the key at regular intervals. When it's time to rotate the key based on the rotation interval that you specify, the root key will be automatically replaced with new key material.",
              align: "bottom-left",
            }}
            component={this.props.data.name}
            max={12}
            value={this.state.rotation}
            formName="rotation"
            name="rotation"
            labelText="Rotation Interval (Months)"
            handleInputChange={this.handleInputChange}
            isModal={this.props.isModal}
          />
          <EndpointSelect
            formName={this.props.data.name}
            handleInputChange={this.handleInputChange}
            value={this.state.endpoint}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          {/* force delete */}
          <IcseToggle
            tooltip={{
              content:
                "Force deletion of a key refers to the deletion of any key that's actively protecting any registered cloud resources. KMS keys can be force-deleted by managers of the instance. However, the force-delete won't succeed if the key's associated resource is non-erasable due to a retention policy.",
              align: "bottom-left",
            }}
            id={composedId + "kms-key-force-delete"}
            labelText="Force Deletion of KMS Key"
            toggleFieldName="force_delete"
            defaultToggled={this.state.force_delete}
            onToggle={this.handleToggle}
            isModal={this.props.isModal}
          />
          {/* force delete */}
          <IcseToggle
            tooltip={{
              content:
                "Allow key to be deleted only by two users. One user can schedule the key for deletion, a second user must confirm it before the key will be destroyed.",
              align: "bottom-left",
            }}
            id={composedId + "kms-key-dual-auth-delete"}
            labelText="Dual Authorization Deletion Policy"
            toggleFieldName="dual_auth_delete"
            defaultToggled={this.state.dual_auth_delete}
            onToggle={this.handleToggle}
            isModal={this.props.isModal}
          />
        </IcseFormGroup>
        <IcseFormGroup noMarginBottom>
          {/* edit root key */}
          <IcseToggle
            tooltip={{
              content:
                "Root keys are symmetric key-wrapping keys used as roots of trust for encrypting/decrypting other keys. Can be either imported or generated by IBM Key Protect.",
              link: "https://cloud.ibm.com/docs/key-protect?topic=key-protect-envelope-encryption",
              align: "bottom-left",
            }}
            id={composedId + "kms-key-root"}
            labelText="Set as a Root Key"
            toggleFieldName="root_key"
            onToggle={this.handleToggle}
            defaultToggled={this.state.root_key}
            isModal={this.props.isModal}
          />
        </IcseFormGroup>
      </>
    );
  }
}

EncryptionKeyForm.defaultProps = {
  data: {
    name: "",
    rotation: 12,
    root_key: false,
    force_delete: false,
    dual_auth_delete: false,
    key_ring: "",
    endpoint: "private",
  },
  isModal: false,
};

EncryptionKeyForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rotation: PropTypes.number.isRequired,
    root_key: PropTypes.bool.isRequired,
    dual_auth_delete: PropTypes.bool.isRequired,
    force_delete: PropTypes.bool,
    key_ring: PropTypes.string,
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  invalidRingCallback: PropTypes.func.isRequired,
};

export default EncryptionKeyForm;
