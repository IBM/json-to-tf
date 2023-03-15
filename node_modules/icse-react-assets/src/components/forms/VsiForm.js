import React, { Component } from "react";
import { TextArea, NumberInput } from "@carbon/react";
import { IcseFormGroup, DynamicRender } from "../Utils";
import { IcseToggle, IcseNameInput } from "../Inputs";
import { FetchSelect, IcseSelect } from "../Dropdowns";
import { SshKeyMultiSelect, SubnetMultiSelect } from "../MultiSelects";
import { checkNullorEmptyString } from "../../lib";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { transpose } from "lazy-z";
import PropTypes from "prop-types";
import "../styles/Utils.css";

class VsiForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }

  handleInputChange(event) {
    let { name, value } = event.target;

    let stateChangeParams = {
      [name]: name === "vsi_per_subnet" && value !== "" ? Number(value) : value,
    };
    if (name === "vpc")
      transpose({ subnets: [], subnet: "" }, stateChangeParams);

    this.setState(stateChangeParams);
  }

  handleMultiSelectChange(name, value) {
    this.setState(this.setNameToValue(name, value));
  }

  handleToggle(name) {
    this.setState(this.toggleStateBoolean(name, this.state));
  }

  render() {
    let composedId = `vsi-deployment-form-${this.props.data.name}`;
    return (
      <>
        <IcseFormGroup>
          <IcseNameInput
            id={composedId}
            componentName={"vsi"}
            value={this.state.name}
            onChange={this.handleInputChange}
            invalid={this.props.invalidCallback(this.state)}
            invalidText={this.props.invalidTextCallback(this.state)}
            hideHelperText
          />
          <IcseSelect
            formName="vsi_form"
            name="resource_group"
            labelText="Resource Group"
            groups={this.props.resourceGroupList}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            formName="vsi_form"
            name="vpc"
            labelText="VPC"
            groups={this.props.vpcList}
            value={this.state.vpc}
            handleInputChange={this.handleInputChange}
            invalid={checkNullorEmptyString(this.state.vpc)}
            invalidText="Select a VPC."
          />
          {/* subnets */}
          {this.props.isTeleport ? (
            // render dropdown for teleport instance
            <IcseSelect
              formName="vsi_form"
              name="subnet"
              labelText="Subnet"
              groups={this.props.subnetList}
              value={this.state.subnet}
              handleInputChange={this.handleInputChange}
              invalid={
                checkNullorEmptyString(this.state.vpc) ||
                checkNullorEmptyString(this.state.subnet)
              }
              invalidText={
                checkNullorEmptyString(this.state.vpc)
                  ? `No VPC Selected.`
                  : `Select a Subnet.`
              }
            />
          ) : (
            <SubnetMultiSelect
              id="subnet"
              initialSelectedItems={this.state.subnets}
              vpc_name={this.state.vpc}
              subnets={this.props.subnetList}
              onChange={(value) =>
                this.handleMultiSelectChange("subnets", value)
              }
            />
          )}
          <NumberInput
            label="Instances per Subnet"
            id={composedId + "-vsi-per-subnet"}
            allowEmpty={false}
            value={this.state.vsi_per_subnet}
            defaultValue={1}
            max={10}
            min={1}
            onChange={this.handleInputChange}
            name="vsi_per_subnet"
            hideSteppers={true}
            invalidText="Please input a number 1-10"
            className="fieldWidth leftTextAlign"
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <SshKeyMultiSelect
            id="sshkey"
            sshKeys={this.props.sshKeyList}
            onChange={(value) =>
              this.handleMultiSelectChange("ssh_keys", value)
            }
            initialSelectedItems={this.state.ssh_keys}
          />
          <FetchSelect
            formName="vsi_form"
            labelText="Image"
            name="image_name"
            apiEndpoint={this.props.apiEndpointImages}
            handleInputChange={this.handleInputChange}
            value={this.state.image_name}
          />
          <FetchSelect
            formName="vsi_form"
            labelText="Flavor"
            name="profile"
            apiEndpoint={this.props.apiEndpointFlavors}
            handleInputChange={this.handleInputChange}
            value={this.state.profile}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            formName="vsi_form"
            name="encryption_key"
            labelText="Encryption Key"
            groups={this.props.encryptionKeyList}
            value={this.state.encryption_key}
            handleInputChange={this.handleInputChange}
            invalid={this.props.invalidCallback(this.state)}
            invalidText="Select a valid encryption key."
          />
          <IcseToggle
            id={composedId + "-fips-toggle"}
            labelText="Enable Floating IP"
            defaultToggled={this.state.enable_floating_ip}
            onToggle={this.handleToggle}
          />
        </IcseFormGroup>
        {/* cloud init data, show if not f5 or teleport */}
        <DynamicRender
          hide={this.props.isTeleport}
          show={
            <IcseFormGroup>
              <TextArea
                id={composedId + "-vsi-user-data"}
                placeholder="Cloud init data"
                labelText="User Data"
                name="user_data"
                value={this.state.user_data || ""}
                onChange={this.handleInputChange}
                invalidText="Invalid error message."
                className="fieldWidthBigger"
              />
            </IcseFormGroup>
          }
        />
      </>
    );
  }
}

VsiForm.defaultProps = {
  data: {
    name: "",
    ssh_keys: [],
    subnet: "",
    subnets: [],
    enable_floating_ip: false,
    vpc: "",
    image_name: "",
    profile: "",
    resource_group: "",
    encryption_key: "",
    vsi_per_subnet: 1,
  },
  isModal: false,
  isTeleport: false,
  resourceGroupList: [],
  vpcList: [],
  subnetList: [],
  sshKeyList: [],
  encryptionKeyList: [],
  apiEndpointImages: "",
  apiEndpointFlavors: "",
};

VsiForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    ssh_keys: PropTypes.array,
    subnet: PropTypes.string,
    subnets: PropTypes.array,
    enable_floating_ip: PropTypes.bool,
    vpc: PropTypes.string,
    image_name: PropTypes.string,
    profile: PropTypes.string,
    resource_group: PropTypes.string,
    encryption_key: PropTypes.string,
    vsi_per_subnet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  /* bools */
  isModal: PropTypes.bool.isRequired,
  isTeleport: PropTypes.bool.isRequired,
  /* lists */
  resourceGroupList: PropTypes.array.isRequired,
  vpcList: PropTypes.array.isRequired,
  subnetList: PropTypes.array.isRequired,
  sshKeyList: PropTypes.array.isRequired,
  encryptionKeyList: PropTypes.array.isRequired,
  /* api endpoints */
  apiEndpointImages: PropTypes.string.isRequired,
  apiEndpointFlavors: PropTypes.string.isRequired,
  /* callbacks */
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
};

export default VsiForm;
