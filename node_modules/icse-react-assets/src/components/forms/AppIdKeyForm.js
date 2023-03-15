import React from "react";
import PropTypes from "prop-types";
import { buildFormFunctions } from "../component-utils";
import { IcseTextInput } from "../Inputs";
import "../styles/AppIdKeyForm.css";

class AppIdKeyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleInputChange = this.handleInputChange.bind(this);
    buildFormFunctions(this);
  }

  /**
   * handle input change
   * @param {string} name key to change in state
   * @param {*} value value to update
   */
  handleInputChange(event) {
    this.setState({ key_name: event.target.value });
  }

  render() {
    return (
      <>
        <IcseTextInput
          id={"app-id-key-name"}
          value={this.state.key_name}
          onChange={this.handleInputChange}
          field="key_name"
          labelText="App ID Key"
          componentName="appid"
          className="fieldWidthSmaller"
          invalid={this.props.invalidCallback(this.state, this.props)}
          invalidText={this.props.invalidTextCallback(this.state, this.props)}
        />
      </>
    );
  }
}

AppIdKeyForm.defaultProps = {
  data: {
    key_name: "",
  },
};

AppIdKeyForm.propTypes = {
  data: PropTypes.shape({
    key_name: PropTypes.string.isRequired,
  }),
  shouldDisableSubmit: PropTypes.func,
};

export default AppIdKeyForm;
