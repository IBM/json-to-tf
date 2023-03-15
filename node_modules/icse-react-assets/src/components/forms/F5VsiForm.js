import React, { Component } from "react";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { buildNumberDropdownList } from "lazy-z";
import PropTypes from "prop-types";
import { Tile } from "@carbon/react";
import { IcseFormGroup, IcseHeading, DynamicRender } from "../Utils";
import { FetchSelect, IcseSelect } from "../Dropdowns";
import { IcseNameInput } from "../Inputs";
import { SshKeyMultiSelect } from "../MultiSelects";
import { SaveAddButton } from "../Buttons";
import "../styles/Utils.css";

class F5VsiForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.data;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleVsiSave = this.handleVsiSave.bind(this);

    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
  }

  handleInputChange(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  handleMultiSelectChange(name, value) {
    this.setState(this.setNameToValue(name, value));
  }

  handleVsiSave(stateData) {
    this.props.saveVsiCallback(stateData);
  }

  render() {
    let vsis = [...this.props.vsis];

    while (vsis.length < this.state.zones) {
      // add a new vsi to display
      vsis.push(
        this.props.initVsiCallback(
          this.props.edge_pattern,
          `zone-${vsis.length + 1}`,
          this.props.f5_on_management,
          {
            f5_image_name: this.state.f5_image_name,
            resource_group: this.state.resource_group,
            ssh_keys: this.state.ssh_keys,
            machine_type: this.state.machine_type,
          }
        )
      );
    }

    return (
      <>
        <IcseFormGroup>
          <IcseSelect
            formName="f5_vsi_form"
            name="zones"
            labelText="F5 Instance Zones"
            groups={buildNumberDropdownList(4)} // 0-3 Zones
            value={this.state.zones.toString()}
            handleInputChange={this.handleInputChange}
          />
          <IcseSelect
            formName="f5_vsi_form"
            name="resource_group"
            labelText="Resource Group"
            groups={this.props.resourceGroupList}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
          />
          <SshKeyMultiSelect
            id="sshkey"
            sshKeys={this.props.sshKeyList}
            initialSelectedItems={this.state.ssh_keys}
            onChange={(value) =>
              this.handleMultiSelectChange("ssh_keys", value)
            }
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            formName="f5_vsi_form"
            name="f5_image_name"
            labelText="F5 Image"
            groups={[
              "f5-bigip-15-1-5-1-0-0-14-all-1slot",
              "f5-bigip-15-1-5-1-0-0-14-ltm-1slot",
              "f5-bigip-16-1-2-2-0-0-28-ltm-1slot",
              "f5-bigip-16-1-2-2-0-0-28-all-1slot",
              "f5-bigip-16-1-3-2-0-0-4-ltm-1slot",
              "f5-bigip-16-1-3-2-0-0-4-all-1slot",
              "f5-bigip-17-0-0-1-0-0-4-ltm-1slot",
              "f5-bigip-17-0-0-1-0-0-4-all-1slot",
            ]}
            value={this.state.f5_image_name}
            handleInputChange={this.handleInputChange}
          />
          <FetchSelect
            formName="f5_vsi_form"
            labelText="Flavor"
            name="machine_type"
            apiEndpoint={this.props.apiEndpointFlavors}
            handleInputChange={this.handleInputChange}
            value={this.state.machine_type}
          />
        </IcseFormGroup>
        {/* Dynamically render tile per f5 vsi */}
        {vsis.length > 0 && (
          <div>
            <IcseHeading
              name="F5 Big IP Virtual Servers"
              type="subHeading"
              className="marginBottomSmall"
            />
            <div className="displayFlex evenSpacing">
              {vsis.map((instance, index) => {
                if (index < this.state.zones)
                  return (
                    <F5VsiTile
                      key={"f5-vsi-tile" + JSON.stringify(instance) + index}
                      data={instance}
                      hide={false}
                      onSave={this.handleVsiSave}
                      totalZones={this.state.zones}
                      index={index}
                      resourceGroupList={this.props.resourceGroupList}
                      encryptionKeyList={this.props.encryptionKeyList}
                      hideSaveCallback={this.props.hideSaveCallback}
                      disableSaveCallback={this.props.disableSaveCallback}
                    />
                  );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}

class F5VsiTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.data;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.shouldHideSave = this.shouldHideSave.bind(this);
    this.shouldDisableSave = this.shouldDisableSave.bind(this);
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  shouldHideSave() {
    return this.props.hideSaveCallback(this.state, this.props);
  }

  shouldDisableSave() {
    return this.props.disableSaveCallback(this.state, this.props);
  }

  render() {
    return (
      <Tile className="fieldWidth">
        <IcseHeading
          name={this.state.name}
          type="subHeading"
          className="marginBottomSmall"
          buttons={
            <DynamicRender
              hide={this.shouldHideSave(this.state, this.props)}
              show={
                <SaveAddButton
                  onClick={() => this.props.onSave(this.state)}
                  noDeleteButton
                  disabled={this.shouldDisableSave()}
                />
              }
            />
          }
        />
        <IcseFormGroup className="marginBottomSmall">
          <IcseNameInput
            id={this.state.name}
            componentName={"f5_vsi_form"}
            value={this.state.name}
            onChange={this.handleInputChange}
            useData
            readOnly
            invalidCallback={() => {}}
            invalidText={""}
            className="fieldWidthSmaller"
          />
        </IcseFormGroup>
        <IcseFormGroup className="marginBottomSmall">
          <IcseSelect
            formName="f5_vsi_form"
            name="resource_group"
            labelText="Resource Group"
            groups={this.props.resourceGroupList}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
            className="fieldWidthSmaller"
          />
        </IcseFormGroup>
        <IcseFormGroup className="marginBottomSmall">
          <IcseSelect
            formName="f5_vsi_form"
            name="boot_volume_encryption_key_name"
            labelText="Encryption Key"
            groups={this.props.encryptionKeyList}
            value={this.state.boot_volume_encryption_key_name}
            handleInputChange={this.handleInputChange}
            className="fieldWidthSmaller"
          />
        </IcseFormGroup>
      </Tile>
    );
  }
}

F5VsiForm.defaultProps = {
  data: {
    zones: 0,
    resource_group: "",
    ssh_keys: [],
    f5_image_name: "",
    machine_type: "",
  },
  vsis: [],
  edge_pattern: "vpn-and-waf",
  f5_on_management: true,
};

F5VsiForm.propTypes = {
  data: PropTypes.shape({
    zones: PropTypes.number.isRequired,
    resource_group: PropTypes.string.isRequired,
    ssh_keys: PropTypes.array,
    f5_image_name: PropTypes.string.isRequired,
    machine_type: PropTypes.string.isRequired,
  }).isRequired,
  vsis: PropTypes.array.isRequired,
  edge_pattern: PropTypes.string.isRequired,
  f5_on_management: PropTypes.bool.isRequired, // use management
  /* api endpoints */
  apiEndpointFlavors: PropTypes.string.isRequired,
  /* lists */
  resourceGroupList: PropTypes.array.isRequired,
  sshKeyList: PropTypes.array.isRequired,
  encryptionKeyList: PropTypes.array.isRequired,
  /* callbacks */
  initVsiCallback: PropTypes.func.isRequired,
  saveVsiCallback: PropTypes.func.isRequired,
  hideSaveCallback: PropTypes.func.isRequired,
  disableSaveCallback: PropTypes.func.isRequired,
};

export default F5VsiForm;
