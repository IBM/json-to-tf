import React, { Component } from "react";
import { Dropdown } from "@carbon/react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { invalidRegex } from "../../lib";
import { IcseTextInput, IcseToggle } from "../Inputs";
import { IcseFormGroup } from "../Utils";
import PropTypes from "prop-types";

const sccRegions = [
  {
    id: "us",
    label: "us",
  },
  {
    id: "eu",
    label: "eu",
  },
  {
    id: "uk",
    label: "uk",
  },
];

/**
 * SccForm
 * @param {Object} props
 */
class SccForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleToggle = this.handleToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    buildFormDefaultInputMethods(this);
    buildFormFunctions(this);
    this.state.enable = true;
  }

  /**
   * Handle input change
   * @param {event} event
   */
  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  /**
   * handle input change
   * @param {event} event event
   */
  handleLocationChange(selectedItem) {
    this.setState({ location: selectedItem.selectedItem.label });
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   * @param {bool} setDefaults set default values, default is false
   */
  handleToggle(name) {
    this.setState(this.toggleStateBoolean(name, this.state));
  }

  render() {
    return (
      <>
        <IcseFormGroup>
          <Dropdown
            ariaLabel="Dropdown"
            id="location"
            items={sccRegions}
            label="SCC Region Options"
            titleText="Region"
            onChange={(selectedItem) => {
              this.handleLocationChange(selectedItem);
            }}
            className="leftTextAlign fieldWidth"
          />
          {/* is-public toggle input */}
          <IcseToggle
            tooltip={{
              content:
                "Determines whether the collector endpoint is accessible on a public network.",
            }}
            labelText="Is Public"
            defaultToggled={this.state.is_public}
            className="leftTextAlign"
            onToggle={this.handleToggle}
            id="scc-is-public"
          />
        </IcseFormGroup>
        <IcseFormGroup>
          {/* scope-description text input */}
          <IcseTextInput
            id="scc_scope_description"
            tooltip={{ content: "A detailed description of the scope." }}
            componentName="SCC"
            field="scope_description"
            labelText="Scope Description"
            value={this.state.scope_description}
            onChange={this.handleInputChange}
            maxLength={255}
            invalid={
              invalidRegex(
                "scope_description",
                this.state.scope_description,
                this.props.descriptionRegex
              ).invalid
            }
            invalidText={
              invalidRegex(
                "scope_description",
                this.state.scope_description,
                this.props.descriptionRegex
              ).invalidText
            }
          />
          {/* collector-description text input */}
          <IcseTextInput
            id="scc_collector"
            tooltip={{
              content: "A detailed description of the collector.",
              align: "top-left",
            }}
            labelText="Collector Description"
            field="collector_description"
            value={this.state.collector_description}
            onChange={this.handleInputChange}
            componentName="SCC"
            maxLength={1000}
            invalid={
              invalidRegex(
                "collector_description",
                this.state.collector_description,
                this.props.descriptionRegex
              ).invalid
            }
            invalidText={
              invalidRegex(
                "collector_description",
                this.state.collector_description,
                this.props.descriptionRegex
              ).invalidText
            }
          />
        </IcseFormGroup>
      </>
    );
  }
}

SccForm.defaultProps = {
  data: {
    enable: false,
  },
  descriptionRegex: /^[A-z][a-zA-Z0-9-\._,\s]*$/i,
};

SccForm.propTypes = {
  data: PropTypes.shape({
    enable: PropTypes.bool.isRequired,
    collector_description: PropTypes.string,
    is_public: PropTypes.bool,
    location: PropTypes.string,
    scope_description: PropTypes.string,
    passphrase: PropTypes.string,
  }),
  descriptionRegex: PropTypes.instanceOf(RegExp).isRequired,
};

export default SccForm;
