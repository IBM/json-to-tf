import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { IcseNameInput, IcseToggle } from "../Inputs";
import { IcseFormGroup } from "../Utils";
import PropTypes from "prop-types";

/** Resource Groups
 * @param {Object} props
 */
class ResourceGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }
  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  handleToggle(name) {
    // Turn off the use_prefix toggle when not using data.
    if (name === "use_data" && this.state.use_data === false) {
      this.setState({ [name]: !this.state[name], use_prefix: false });
    } else {
      this.setState({ [name]: !this.state[name] });
    }
  }

  /**
   * Handle input change for a text field
   * @param {event} event
   */
  handleTextInput(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  render() {
    let composedId = `resource-group-${this.props.data.name}-`;
    return (
      <>
        {/*  Inputs */}
        <IcseFormGroup>
          {/* use data */}
          <IcseToggle
            tooltip={{
              content: "If true, get data from an existing resource group",
            }}
            labelText="Use Existing Instance"
            toggleFieldName={this.props.toggleName}
            defaultToggled={this.state.use_data}
            id={composedId + "-use-data-toggle"}
            onToggle={() => this.handleToggle("use_data")}
            isModal={this.props.isModal}
          />
        </IcseFormGroup>
        <IcseFormGroup noMarginBottom>
          <IcseNameInput
            id={composedId}
            componentName="resource_groups"
            value={this.state.name}
            onChange={this.handleTextInput}
            useData={this.state.use_data || this.state.use_prefix === false}
            invalidCallback={() =>
              this.props.invalidCallback(this.state, this.props)
            }
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
            helperTextCallback={() =>
              this.props.helperTextCallback(this.state, this.props)
            }
          />
          {/* use prefix only if use_data is false */}
          {this.state.use_data === false && (
            <IcseToggle
              tooltip={{
                content:
                  "Append your environment prefix to the beginning of the resource group.",
              }}
              labelText="Use Prefix"
              defaultToggled={this.state.use_prefix}
              id={composedId + "-use-prefix-toggle"}
              onToggle={this.handleToggle}
              isModal={this.props.isModal}
            />
          )}
        </IcseFormGroup>
      </>
    );
  }
}

ResourceGroupForm.defaultProps = {
  data: {
    use_data: false,
    name: "",
    use_prefix: true,
  },
  toggleName: "use_data",
  isModal: false,
};

ResourceGroupForm.propTypes = {
  data: PropTypes.shape({
    use_data: PropTypes.bool,
    name: PropTypes.string.isRequired,
    use_prefix: PropTypes.bool,
  }),
  isModal: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  helperTextCallback: PropTypes.func.isRequired,
};

export default ResourceGroupForm;
