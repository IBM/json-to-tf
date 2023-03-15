import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import PropTypes from "prop-types";
import { IcseTextInput, IcseToggle } from "../Inputs";
import { IcseFormGroup } from "../Utils";
import { IcseSelect } from "../Dropdowns";
import { LocationsMultiSelect } from "..";

/**
 * Atracker
 * @param {Object} props
 * @param {Object} props.data
 * @param {string} props.data.resource_group
 * @param {string} props.data.cos_bucket
 * @param {string} props.data.cos_key
 * @param {boolean} props.data.add_route
 * @param {Array} props.resourceGroups list of resource groups
 * @param {Array} props.cosBuckets list of cos buckets
 * @param {Array} props.cosKeys list of cos Keys
 * @param {string} props.prefix
 */
class AtrackerForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
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

  handleMultiSelect(event) {
    this.setState({ locations: event });
  }

  /**
   * Toggle on and off param in state at name
   * @param {string} name name of the object key to change
   */
  handleToggle(name) {
    this.setState(this.toggleStateBoolean(name, this.state));
  }

  render() {
    return (
      <div id="atracker-form">
        <IcseFormGroup>
          <IcseTextInput
            componentName="Activity Tracker"
            field="Name"
            labelText="Name"
            className="fieldWidth"
            value={this.props.prefix + "-atracker"}
            onChange={() => {
              /** does not change **/
            }}
            readOnly
            id="atracker-name"
            invalid={false}
          />
          <IcseSelect
            formName={this.props.data.name + "-activity-tracker-rg"}
            value={this.state.resource_group}
            groups={this.props.resourceGroups}
            handleInputChange={this.handleInputChange}
            className="fieldWidth"
            name="resource_group"
            labelText="Resource Group"
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            tooltip={{
              content:
                "The bucket name under the Cloud Object Storage instance where Activity Tracker logs will be stored",
            }}
            groups={this.props.cosBuckets}
            formName={this.props.data.name + "-activity-tracker-bucket"}
            field="bucket"
            name="bucket"
            value={this.state.bucket}
            handleInputChange={this.handleInputChange}
            className="fieldWidth"
            labelText="Object Storage Log Bucket"
            invalidText="Select an Object Storage bucket."
          />
          <IcseToggle
            tooltip={{
              content:
                "Must be enabled in order to forward all logs to the Cloud Object Storage bucket",
            }}
            labelText="Create Activity Tracker Route"
            defaultToggled={this.state.add_route}
            toggleFieldName="add_route"
            onToggle={this.handleToggle}
            id="app-id-add-route"
          />
        </IcseFormGroup>
        <IcseFormGroup noMarginBottom>
          <IcseSelect
            tooltip={{
              content:
                "The IAM API key that has writer access to the Cloud Object Storage instance",
            }}
            formName={this.props.data.name + "-activity-tracker-cos-key"}
            name="cos_key"
            groups={this.props.cosKeys}
            value={this.state.cos_key}
            labelText="Privileged IAM Object Storage Key"
            handleInputChange={this.handleInputChange}
            className="fieldWidth"
            invalidText="Select an Object Storage key."
          />
          <LocationsMultiSelect
            id={this.props.data.name + "-activity-tracker-location"}
            region={this.props.region}
            onChange={this.handleMultiSelect}
            invalid={this.state.locations.length === 0}
            invalidText="Select at least one location."
          />
        </IcseFormGroup>
      </div>
    );
  }
}

export default AtrackerForm;

AtrackerForm.defaultProps = {
  isModal: false,
  data: {
    bucket: "",
    cos_key: "",
    resource_group: "",
    add_route: false,
    locations: [],
  },
};

AtrackerForm.propTypes = {
  data: PropTypes.shape({
    bucket: PropTypes.string.isRequired,
    cos_key: PropTypes.string.isRequired,
    resource_group: PropTypes.string.isRequired,
    add_route: PropTypes.bool.isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  region: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  cosKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  cosBuckets: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModal: PropTypes.bool.isRequired,
};
