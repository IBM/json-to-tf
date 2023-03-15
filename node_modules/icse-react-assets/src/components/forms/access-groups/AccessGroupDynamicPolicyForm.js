import React from "react";
import {
  buildFormFunctions,
  buildFormDefaultInputMethods,
} from "../../component-utils";
import { eachKey, snakeCase } from "lazy-z";
import { IcseFormGroup, IcseHeading } from "../../Utils";
import { IcseNameInput, IcseTextInput } from "../../Inputs";
import { IcseSelect, IcseNumberSelect } from "../../Dropdowns";
import PropTypes from "prop-types";

const conditionOperators = {
  EQUALS: "Equals",
  EQUALS_IGNORE_CASE: "Equals (Ignore Case)",
  IN: "In",
  NOT_EQUALS_IGNORE_CASE: "Not Equals (Ignore Case)",
  NOT_EQUALS: "Not Equals",
  CONTAINS: "Contains",
};

class AccessGroupDynamicPolicyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputCondition = this.handleInputCondition.bind(this);
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
   * handle input change
   * @param {string} name key to change in state
   * @param {*} value value to update
   */
  handleInputCondition(event) {
    let { name, value } = event.target;
    let conditions = { ...this.state.conditions };
    if (name === "operator") {
      conditions[name] = snakeCase(value.replace(/[()]/g, "")).toUpperCase(); // remove all parentheses
    } else {
      conditions[name] = value;
    }
    this.setState({ conditions });
  }

  render() {
    let conditionOperatorGroups = [];
    eachKey(conditionOperators, (key) => {
      conditionOperatorGroups.push(conditionOperators[key]);
    });
    return (
      <>
        <IcseFormGroup>
          <IcseNameInput
            id="name"
            componentName="dynamic_policies"
            field="name"
            labelText="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            invalidText={this.props.invalidTextCallback(this.state, this.props)}
            invalid={this.props.invalidCallback("name", this.state, this.props)}
            helperTextCallback={() =>
              this.props.helperTextCallback(this.state, this.props)
            }
          />
          <IcseNumberSelect
            tooltip={{
              content:
                "How many hours authenticated users can work before refresh",
            }}
            formName="expiration"
            max={24}
            value={this.state.expiration}
            name="expiration"
            labelText="Expiration Hours"
            isModal={this.props.isModal}
            handleInputChange={this.handleInputChange}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseTextInput
            id="identity_provider"
            tooltip={{
              content: "URI for identity provider",
              alignModal: "bottom-left",
            }}
            componentName="identity_provider"
            field="identity_provider"
            isModal={this.props.isModal}
            labelText="Identity Provider"
            value={this.state.identity_provider}
            invalid={this.props.invalidCallback(
              "identity_provider",
              this.state,
              this.props
            )}
            onChange={this.handleInputChange}
            className="textInputWide"
          />
        </IcseFormGroup>
        <IcseFormGroup className="marginBottomSmall">
          <IcseHeading name="Condition Configuration" type="subHeading" />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseTextInput
            id="claim"
            tooltip={{
              content: "Key value to evaluate the condition against",
              alignModal: "bottom-left",
            }}
            componentName="claim"
            field="claim"
            isModal={this.props.isModal}
            labelText="Condition Claim"
            value={this.state.conditions.claim}
            invalid={false}
            onChange={this.handleInputCondition}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseSelect
            formName="dynamic_policies"
            tooltip={{
              content: "The operation to perform on the claim.",
            }}
            value={conditionOperators[this.state.conditions.operator]}
            groups={conditionOperatorGroups}
            field="operator"
            isModal={this.props.isModal}
            name="operator"
            disableInvalid
            labelText="Condition Operator"
            handleInputChange={this.handleInputCondition}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          <IcseTextInput
            id="value"
            tooltip={{ content: "Value to be compared against" }}
            componentName="value"
            field="value"
            isModal={this.props.isModal}
            value={this.state.conditions.value}
            labelText="Condition Value"
            invalid={false}
            onChange={this.handleInputCondition}
          />
        </IcseFormGroup>
      </>
    );
  }
}

AccessGroupDynamicPolicyForm.defaultProps = {
  data: {
    name: "",
    identity_provider: "",
    expiration: 1,
    conditions: {
      claim: "",
      operator: "",
      value: "",
    },
  },
  isModal: false,
};

AccessGroupDynamicPolicyForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identity_provider: PropTypes.string.isRequired,
    expiration: PropTypes.number.isRequired,
    conditions: PropTypes.shape({
      claim: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
  helperTextCallback: PropTypes.func.isRequired,
};

export default AccessGroupDynamicPolicyForm;
