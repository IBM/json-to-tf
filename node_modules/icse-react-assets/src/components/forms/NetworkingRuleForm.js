import React, { Component } from "react";
import { TextInput } from "@carbon/react";
const {
  capitalize,
  titleCase,
  kebabCase,
  isIpv4CidrOrAddress,
  validPortRange,
  isNullOrEmptyString,
  contains,
} = require("lazy-z");
import { buildFormFunctions } from "../component-utils";
import { DeleteModal } from "../Modals";
import PropTypes from "prop-types";
import { DynamicRender, IcseFormGroup, StatelessToggleForm } from "../Utils";
import { DeleteButton, SaveAddButton, UpDownButtons } from "../Buttons";
import { IcseNameInput, IcseTextInput } from "../Inputs";
import { IcseSelect } from "../Dropdowns";
import "../styles/NetworkingRuleForm.css";

/** NetworkingRuleForm
 * @param {Object} props
 * @param {configDotJson} props.configDotJson config dot json
 * @param {slz} props.slz slz state store
 */
class NetworkingRuleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
    this.handleInput = this.handleInput.bind(this);
    this.handleRuleUpdate = this.handleRuleUpdate.bind(this);
    this.handleRuleDelete = this.handleRuleDelete.bind(this);
    this.handleRuleDataUpdate = this.handleRuleDataUpdate.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.shouldDisableSave = this.shouldDisableSave.bind(this);
    buildFormFunctions(this);
  }

  /**
   * Handle input change for a text field
   * @param {String} inputName name of the field to set state
   * @param {event} event
   * @param {boolean=} lowercase set value to lowercase
   */
  handleInput(inputName, event, lowercase) {
    let newValue = lowercase
      ? event.target.value.toLowerCase()
      : event.target.value;
    this.setState({ [inputName]: newValue });
  }

  /**
   * Handler function for the rule updates
   * @param {String} inputName name of the field to set state in Rule
   * @param event event
   */
  handleRuleDataUpdate(inputName, event) {
    let value = parseInt(event.target.value) || null;
    this.setState((prevState) => ({
      rule: {
        // object that we want to update
        ...prevState.rule, // keep all other key-value pairs
        [inputName]: value, // update the value of specific key
      },
    }));
  }

  /**
   * update a network rule
   */
  handleRuleUpdate() {
    this.props.onSave(this.state, this.props);
  }

  /**
   * delete a network rule
   */
  handleRuleDelete() {
    this.props.onDelete(this.state, this.props);
  }

  /**
   * toggle delete modal
   */
  toggleDeleteModal() {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  }

  /**
   * Returns true if save should be disabled or if props match state (save disabled)
   * @returns {boolean} if save is disabled
   */
  shouldDisableSave() {
    return this.props.disableSaveCallback(this.state, this.props);
  }

  render() {
    let ruleName = this.props.isModal ? "new-rule" : this.props.data.name;
    return (
      <>
        <div
          key={"rule-div-" + ruleName}
          className={
            this.props.hide ? "" : "marginBottomSmall" // add margin bottom small if shown
          }
        >
          {this.props.isModal !== true && (
            <DeleteModal
              name={ruleName}
              modalOpen={this.state.showDeleteModal}
              onModalClose={this.toggleDeleteModal}
              onModalSubmit={this.handleRuleDelete}
            />
          )}
          <DynamicRender
            hide={this.props.hide && this.props.isModal === true}
            show={
              <StatelessToggleForm
                key={"rule-name-" + ruleName}
                name={this.props.isModal ? "" : ruleName} // do not show name when modal
                onIconClick={this.props.onToggle}
                toggleFormTitle
                hide={this.props.hide && this.props.isModal !== true}
                hideIcon={this.props.isModal}
                alwaysShowButtons
                buttons={
                  this.props.isModal ? (
                    ""
                  ) : this.props.hide === false ? (
                    <>
                      <SaveAddButton
                        onClick={this.handleRuleUpdate}
                        disabled={this.shouldDisableSave()}
                      />
                      <DeleteButton
                        onClick={this.toggleDeleteModal}
                        name={ruleName}
                      />
                    </>
                  ) : (
                    <UpDownButtons
                      name={ruleName}
                      handleUp={this.props.handleUp}
                      handleDown={this.props.handleDown}
                      disableUp={this.props.disableUp}
                      disableDown={this.props.disableDown}
                    />
                  )
                }
              >
                <>
                  <IcseFormGroup>
                    <IcseNameInput
                      id={this.state.name + "-name"}
                      componentName={this.props.data.name + "-rule"}
                      value={this.state.name}
                      onChange={(event) => this.handleInput("name", event)}
                      invalidCallback={() =>
                        this.props.invalidCallback(this.state, this.props)
                      }
                      invalidTextCallback={() =>
                        this.props.invalidCallback(this.state, this.props)
                      }
                      hideHelperText
                      className="fieldWidthSmaller"
                    />
                    {/* show action if not security group */}
                    {!this.props.isSecurityGroup && (
                      <NetworkingRuleSelect
                        state={this.state}
                        name="action"
                        onChange={this.handleInput}
                        groups={["Allow", "Deny"]}
                        props={this.props}
                      />
                    )}
                    <NetworkingRuleSelect
                      name="direction"
                      state={this.state}
                      onChange={this.handleInput}
                      groups={["Inbound", "Outbound"]}
                      props={this.props}
                    />
                    {/* show source if security group */}
                    {this.props.isSecurityGroup && (
                      <NetworkingRuleTextField
                        name="source"
                        state={this.state}
                        onChange={this.handleInput}
                      />
                    )}
                  </IcseFormGroup>
                  {/* Source, Dest, Protocol */}
                  <IcseFormGroup>
                    {/* render source and destination here if ACL rule */}
                    {!this.props.isSecurityGroup && (
                      <>
                        <NetworkingRuleTextField
                          name="source"
                          state={this.state}
                          onChange={this.handleInput}
                        />
                        <NetworkingRuleTextField
                          name="destination"
                          state={this.state}
                          onChange={this.handleInput}
                        />
                      </>
                    )}
                    {/* rule protocol */}
                    <IcseSelect
                      formName={ruleName + "-protocol"}
                      groups={["ALL", "TCP", "UDP", "ICMP"]}
                      value={this.state.ruleProtocol.toUpperCase()}
                      labelText="Protocol"
                      name="ruleProtocol"
                      handleInputChange={(event) =>
                        this.handleInput("ruleProtocol", event, true)
                      }
                      className="fieldWidthSmaller"
                    />
                  </IcseFormGroup>
                  {/* Rendering for TCP or UDP */}
                  {(this.state.ruleProtocol === "tcp" ||
                    this.state.ruleProtocol === "udp") && (
                    <div>
                      <IcseFormGroup>
                        <NetworkingRuleProtocolTextField
                          name="port_min"
                          state={this.state}
                          onChange={this.handleRuleDataUpdate}
                        />
                        <NetworkingRuleProtocolTextField
                          name="port_max"
                          state={this.state}
                          onChange={this.handleRuleDataUpdate}
                        />
                      </IcseFormGroup>
                      {/* render source port min and source port max if acl */}
                      {!this.props.isSecurityGroup && (
                        <IcseFormGroup>
                          <NetworkingRuleProtocolTextField
                            name="source_port_min"
                            state={this.state}
                            onChange={this.handleRuleDataUpdate}
                          />
                          <NetworkingRuleProtocolTextField
                            name="source_port_max"
                            state={this.state}
                            onChange={this.handleRuleDataUpdate}
                          />
                        </IcseFormGroup>
                      )}
                    </div>
                  )}
                  {/* Rendering for ICMP */}
                  {this.state.ruleProtocol === "icmp" && (
                    <IcseFormGroup>
                      <NetworkingRuleProtocolTextField
                        name="type"
                        state={this.state}
                        onChange={this.handleRuleDataUpdate}
                      />
                      <NetworkingRuleProtocolTextField
                        name="code"
                        state={this.state}
                        onChange={this.handleRuleDataUpdate}
                      />
                    </IcseFormGroup>
                  )}
                </>
              </StatelessToggleForm>
            }
          />
        </div>
      </>
    );
  }
}

NetworkingRuleForm.defaultProps = {
  isSecurityGroup: false,
  isModal: false,
  disableUp: false,
  disableDown: false,
  data: {
    name: "",
    action: "allow",
    direction: "inbound",
    source: "",
    destination: "",
    ruleProtocol: "all",
    rule: {
      port_max: null,
      port_min: null,
      source_port_max: null,
      source_port_min: null,
      type: null,
      code: null,
    },
  },
  hide: false,
};

NetworkingRuleForm.propTypes = {
  isModal: PropTypes.bool.isRequired,
  // functions only used when not modal
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  disableDown: PropTypes.bool,
  disableUp: PropTypes.bool,
  handleDown: PropTypes.func,
  handleUp: PropTypes.func,
  disableSaveCallback: PropTypes.func,
  // functions for components
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    action: PropTypes.string, // not required for sg
    destination: PropTypes.string, // not required for sg
    direction: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rule: PropTypes.shape({
      // can be null
      port_min: PropTypes.number,
      port_max: PropTypes.number,
      source_port_min: PropTypes.number,
      source_port_max: PropTypes.number,
      type: PropTypes.number,
      code: PropTypes.number,
    }).isRequired,
    source: PropTypes.string.isRequired,
  }),
  isSecurityGroup: PropTypes.bool.isRequired,
};

/**
 * readability shortcut for nw rules
 * @param {*} props
 * @param {string} props.name field to update
 * @param {Object} props.state parent state
 * @param {Function} props.onChange onchange function
 */
const NetworkingRuleTextField = (props) => {
  return (
    <IcseTextInput
      id={`${props.state.name}-nw-${kebabCase(props.name)}-input`}
      field={props.name}
      labelText={titleCase(props.name)}
      value={String(props.state[props.name])}
      onChange={(e) => props.onChange(props.name, e)}
      className="fieldWidthSmaller"
      placeholder="x.x.x.x"
      invalidText="Please provide a valid IPV4 IP address or CIDR notation."
      invalidCallback={() => {
        return isIpv4CidrOrAddress(props.state[props.name]) === false;
      }}
    />
  );
};

NetworkingRuleTextField.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

/**
 * rule protocol text field
 * @param {*} props
 * @param {string} props.name field to update
 * @param {Object} props.state parent state
 * @param {Function} props.onChange onchange function
 */
const NetworkingRuleProtocolTextField = (props) => {
  return (
    <TextInput
      id={`${props.state.name}-nw-${kebabCase(props.name)}-input`}
      labelText={titleCase(props.name)}
      placeholder={String(props.state.rule[props.name] || "")}
      value={props.state.rule[props.name] || ""}
      onChange={(e) => props.onChange(props.name, e)}
      invalid={
        validPortRange(props.name, props.state.rule[props.name] || -1) ===
          false && isNullOrEmptyString(props.state.rule[props.name]) === false
      }
      invalidText={
        contains(["type", "code"], props.name)
          ? `0 to ${props.name === "type" ? 254 : 255}`
          : "1 to 65535"
      }
      className="fieldWidthSmaller"
    />
  );
};

NetworkingRuleProtocolTextField.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.shape({
    rule: PropTypes.shape({}).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

/**
 * readability shortcut for nw rules
 * @param {*} props
 * @param {string} props.name field to update
 * @param {Object} props.state parent state
 * @param {Function} props.onChange onchange function
 * @param {Array<string>} props.groups list of groups for select
 */
const NetworkingRuleSelect = (props) => {
  return (
    <IcseSelect
      formName={props.state.name + "-nw-rule-" + props.name}
      name={props.name}
      groups={props.groups}
      value={capitalize(props.state[props.name])}
      labelText={capitalize(props.name)}
      handleInputChange={(e) => props.onChange(props.name, e, true)}
      className="fieldWidthSmaller"
    />
  );
};

NetworkingRuleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.shape({
    rule: PropTypes.shape({}).isRequired,
    name: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};

export default NetworkingRuleForm;
