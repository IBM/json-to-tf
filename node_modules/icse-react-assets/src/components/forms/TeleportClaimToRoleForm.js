import React, { Component } from "react";
import { buildFormFunctions } from "../component-utils";
import { IcseTextInput } from "../Inputs";
import { IcseFormGroup } from "../Utils";
import PropTypes from "prop-types";

const emailRegex = /^[\w-_\.]+@([\w-_]+\.)+[\w]{1,4}$/g;

class TeleportClaimToRoleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.data.email,
      roles: this.props.data.roles,
    };
    this.onChangeTextInput = this.onChangeTextInput.bind(this);
    buildFormFunctions(this);
  }

  /**
   *
   * @param {String} name specifies name of state value to change
   * @param {String} value value to set it to
   */
  onChangeTextInput(name, value) {
    if (name === "roles") {
      this.setState({ [name]: [value] });
    } else this.setState({ [name]: value });
  }

  render() {
    let composedId = `teleport-claim-form-${this.props.data.email}`;
    return (
      <IcseFormGroup>
        <IcseTextInput
          id={composedId + "-email"}
          componentName="teleport-claim"
          field="email"
          invalid={!this.state.email.match(emailRegex)}
          value={this.state.email}
          onChange={(event) =>
            this.onChangeTextInput("email", event.target.value)
          }
          className="fieldWidth"
        />
        <IcseTextInput
          id={composedId + "roles"}
          componentName="teleport-claim"
          field="roles"
          value={this.state.roles[0] || ""}
          onChange={(event) =>
            this.onChangeTextInput("roles", event.target.value)
          }
          invalid={this.props.invalidRolesCallback(this.state)}
          className="fieldWidth"
        />
      </IcseFormGroup>
    );
  }
}

TeleportClaimToRoleForm.defaultProps = {
  data: {
    email: "",
    roles: [],
  },
};

TeleportClaimToRoleForm.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
  }).isRequired,
};

export default TeleportClaimToRoleForm;
