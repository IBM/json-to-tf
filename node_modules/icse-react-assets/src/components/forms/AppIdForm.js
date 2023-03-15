import React, { Component } from "react";
import { Form } from "@carbon/react";
import { checkNullorEmptyString } from "../../lib";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import AppIdKeyForm from "./AppIdKeyForm";
import FormModal from "../FormModal";
import EmptyResourceTile from "../EmptyResourceTile";
import { IcseNameInput, IcseToggle } from "../Inputs";
import { IcseHeading, IcseFormGroup } from "../Utils";
import { IcseSelect } from "../Dropdowns";
import { DeleteModal } from "../Modals";
import { DeleteButton, SaveAddButton, EditCloseIcon } from "../Buttons";
import "../styles/AppIdForm.css";
import PropTypes from "prop-types";

/**
 * AppIdForm
 * @param {Object} props
 * @param {configDotJson} props.configDotJson config dot json
 * @param {slz} props.slz slz state store
 */
class AppIdForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.handleKeyAdd = this.handleKeyAdd.bind(this);
    this.handleKeyDelete = this.handleKeyDelete.bind(this);
    buildFormDefaultInputMethods(this);
    buildFormFunctions(this);
  }

  /**
   * If the appid form has been updated, must update state accordingly
   * @param {Object} prevProps
   * */
  componentDidUpdate(prevProps) {
    this.props.componentDidUpdateCallback(this.state, this.props);
  }

  /**
   * toggleModal modal for creating or editing AppId Key
   * * @param name name of key to edit
   */
  toggleModal(name) {
    let tempValueState;
    typeof name !== "object"
      ? (tempValueState = {
          open: !this.state.open,
          editKey: true,
          keyNameToEdit: name,
        })
      : (tempValueState = {
          open: !this.state.open,
          editKey: false,
        });
    this.setState(tempValueState);
  }

  /**
   * toggle delete appid key modal on and off
   * @param name name of key to delete
   */
  toggleDeleteModal(name) {
    let tempValueState = {
      showDeleteModal: !this.state.showDeleteModal,
      keyNameToDelete: name,
    };
    this.setState(tempValueState);
  }

  /**
   * handle input change
   * @param {event} event event
   */
  handleInputChange(event) {
    let newAppIdState = { ...this.state };
    let { name, value } = event.target;
    if (name === "name") {
      newAppIdState.name = value;
    } else newAppIdState.resource_group = value;
    this.setState(newAppIdState);
  }

  /**
   * Toggle on and off use_data param in state
   */
  handleToggle() {
    let newAppIdState = { ...this.state };
    newAppIdState.use_data = !newAppIdState.use_data;
    this.setState(newAppIdState);
  }

  /**
   * adds key to the appid keys list and closes the modal
   * @param {object} data
   * @param {object} data.key_name
   */
  handleKeyAdd(data) {
    let saveType = ``;
    let newAppIdState = { ...this.state };
    if (this.state.editKey === true) {
      saveType = "edit";
      newAppIdState.keys[
        newAppIdState.keys.indexOf(newAppIdState.keyNameToEdit)
      ] = data.key_name;
    } else {
      saveType = "add";
      newAppIdState.keys.push(data.key_name);
    }
    newAppIdState.open = false;
    return new Promise((resolve, reject) => {
      this.props.saveCallback(saveType);
      resolve();
    }).then(() => {
      //set state after save is run using promise
      this.setState(newAppIdState);
    });
  }

  /**
   * removes key from the appid keys list and closes the modal
   * @param name key which needs to be deleted
   */
  handleKeyDelete(name) {
    let newKeys = this.state.keys.filter((item) => item !== name);
    let newAppIdState = { ...this.state };
    newAppIdState.keys = newKeys;
    newAppIdState.showDeleteModal = false;
    return new Promise((resolve, reject) => {
      this.props.saveCallback("delete");
      resolve();
    }).then(() => {
      //set state after save is run using promise
      this.setState(newAppIdState);
    });
  }

  render() {
    return (
      <Form id="appid-form">
        <IcseFormGroup>
          {/* use data toggle */}
          <IcseToggle
            labelText="Use Existing Instance"
            key={this.state.use_data}
            defaultToggled={this.state.use_data}
            toggleFieldName="use_data"
            onToggle={this.handleToggle}
            className="fieldWidthSmallest"
            id="app-id-existing-instance"
          />
          {/* name text input */}
          <IcseNameInput
            id={this.state.name + "-name"}
            componentName={this.state.name}
            placeholder="my-appid-name"
            value={this.state.name}
            onChange={this.handleInputChange}
            hideHelperText
            invalid={this.props.invalidCallback("name", this.state, this.props)}
            invalidText={this.props.invalidTextCallback(
              "name",
              this.state,
              this.props
            )}
            className="fieldWidth"
          />
          {/* Select Resource Group */}
          <IcseSelect
            labelText="Resource Group"
            name="resource_group"
            formName="resource_group"
            groups={this.props.resourceGroups}
            value={this.state.resource_group}
            handleInputChange={this.handleInputChange}
            invalidText="Select a Resource Group."
            className="fieldWidth"
          />
        </IcseFormGroup>
        <IcseHeading
          name="App ID Keys"
          type="subHeading"
          className="marginBottomSmall"
          noLabelText
          tooltip={{
            content:
              "Keys can be added to connect an application to an IBM Cloud service.",
          }}
          buttons={
            <SaveAddButton
              id="appid-key-create"
              type="add"
              onClick={this.toggleModal}
              className="forceTertiaryButtonStyles"
              disabled={
                this.props.invalidCallback("name", this.state, this.props) ||
                checkNullorEmptyString(this.state.resource_group)
              }
              noDeleteButton
            />
          }
        />
        <div>
          <FormModal
            name={(this.state.editKey ? "Edit" : "Add") + " an App ID Key"}
            show={this.state.open}
            onRequestSubmit={this.handleKeyAdd}
            onRequestClose={this.toggleModal}
            size="sm"
          >
            <AppIdKeyForm
              shouldDisableSubmit={this.props.shouldDisableSubmitCallback(
                this.state,
                this.props
              )}
              keys={this.state.keys}
              invalidCallback={this.props.invalidCallback}
              invalidTextCallback={this.props.invalidTextCallback}
            />
          </FormModal>
        </div>
        <div>
          {/* render each appid key */}
          {this.state.keys.map((data, index) => (
            <div
              className={
                "positionRelative displayFlex formInSubForm marginBottomSmall alignItemsCenter spaceBetween"
              }
              key={`${data}-${this.state.keys[index]}`}
            >
              {data}
              <div className="alignButtons">
                <EditCloseIcon
                  hoverText="Edit AppID Key"
                  type="edit"
                  disabled={false}
                  onClick={() => this.toggleModal(data)}
                />
                <DeleteButton
                  name={data}
                  onClick={() => this.toggleDeleteModal(data)}
                />
              </div>
            </div>
          ))}
          {/* confirm deletion modal */}
          <DeleteModal
            name={this.state.keyNameToDelete || ""}
            modalOpen={this.state.showDeleteModal}
            //need to call toggleDeleteModal with "" name argument or else canceling deletion passes in the entire event to the name argument and causes the page to error
            onModalClose={() => this.toggleDeleteModal("")}
            onModalSubmit={() =>
              this.handleKeyDelete(this.state.keyNameToDelete)
            }
          />
        </div>
      </Form>
    );
  }
}

AppIdForm.defaultProps = {
  data: {
    name: "",
    resource_group: "",
    use_data: false,
    keys: [],
  },
  key_name: "",
  open: false,
  editKey: false,
  showDeleteModal: false,
  keyNameToEdit: "",
  keyNameToDelete: "",
};

AppIdForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    resource_group: PropTypes.string,
    use_data: PropTypes.bool,
    keys: PropTypes.array.isRequired,
  }).isRequired,
  key_name: PropTypes.string.isRequired,
  resourceGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalidCallback: PropTypes.func,
  invalidTextCallback: PropTypes.func,
};

export default AppIdForm;
