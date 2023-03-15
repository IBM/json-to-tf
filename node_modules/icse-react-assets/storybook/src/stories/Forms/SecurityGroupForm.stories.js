import React from "react";
import { SecurityGroupForm } from "icse-react-assets";

export default {
  component: SecurityGroupForm,
  title: "Components/Forms/SecurityGroupForm",
  argTypes: {
    isModal: {
      description: "Boolean value for if the form is a modal or not",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    invalidCallback: {
      description: "Function that determines invalid state for `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description: "Function that determines invalid text for `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    onSubmitCallback: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` that handles the submission of a new rule using a modal",
      type: { required: true },
      control: "none",
    },
    onRuleSave: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` that handles saving an existing rule",
      type: { required: true },
      control: "none",
    },
    onRuleDelete: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` that handles deleting an existing rule",
      type: { required: true },
      control: "none",
    },
    disableSaveCallback: {
      description:
        "Callback function that accepts two parameters `stateData` and `componentProps`. `disableSaveCallback` is used only in non-modal rule forms. Returns a boolean, disabled when true",
      type: { required: false }, // required prop or not
      control: "none",
    },
    disableModalSubmitCallback: {
      description:
        "Callback function that accepts two parameters `stateData` and `componentProps`. `disableSaveCallback` is used only in modal rule forms. Returns a boolean, disabled when true",
      type: { required: false }, // required prop or not
      control: "none",
    },
    networkRuleOrderDidChange: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` to run when the order of rules within the list has been changed",
      type: { required: true },
      control: "none",
    },
    data: {
      description: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string specifying the name of the security group",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.vpc"]: {
      description: "A string specifying the name of the vpc",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string specifying the selected resource group",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rules"]: {
      description: "An array of rule objects",
      control: "none",
      type: { required: true }, // required prop or not
    },
    resourceGroups: {
      description: "An array of string resource group names",
      type: { required: false }, // required prop or not
      control: "none",
    },
    vpcList: {
      description: "An array of string vpc names",
      type: { required: false }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SecurityGroupForm allows for the editing and creation of security groups",
      },
    },
  },
};

const SecurityGroupFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    if (stateData.name === "") return "Name cannot be empty";
    else
      return "Name must follow the regex pattern: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i";
  }
  function onSubmitCallback(newRulesOrder) {
    // add logic here to create new rule
  }

  function onRuleSave(stateData, componentProp) {
    // add logic here to save rule
  }

  function onRuleDelete(stateData, componentProp) {
    // add logic here to delete rule
  }
  function shouldDisableSave(stateData, componentProps) {
    return true;
  }

  function disableModalSubmit(stateData, componentProps) {
    return true;
  }

  function networkRuleOrderDidChange(stateData, componentProps) {
    // add logic here to save reordered network rules
  }

  return (
    <SecurityGroupForm
      data={{
        name: "example-sg",
        resource_group: "foo",
        vpc: "bar",
        rules: [],
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      disableSaveCallback={shouldDisableSave}
      disableModalSubmitCallback={disableModalSubmit}
      onSubmitCallback={onSubmitCallback}
      onRuleSave={onRuleSave}
      onRuleDelete={onRuleDelete}
      networkRuleOrderDidChange={networkRuleOrderDidChange}
      resourceGroups={["foo", "foo-2", "foo-3"]}
      vpcList={["bar", "bar-2", "bar-3"]}
    />
  );
};

export const Default = SecurityGroupFormStory.bind({});
