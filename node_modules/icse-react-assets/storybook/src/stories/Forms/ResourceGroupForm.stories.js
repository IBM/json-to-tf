import React from "react";
import { ResourceGroupForm } from "icse-react-assets";

export default {
  component: ResourceGroupForm,
  title: "Components/Forms/ResourceGroupForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "String value of resource group name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.use_data"]: {
      description:
        "Boolean representing whether or not to get a resource group from data",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.use_prefix"]: {
      description:
        "Boolean representing whether or not to append your environment prefix to the beginning of the resource group when use_data is false",
      control: "none",
      type: { required: true }, // required prop or not
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
    helperTextCallback: {
      description: "Function that determines invalid text for `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    isModal: {
      description: "Boolean value for if the form is a modal or not",
      type: { required: true }, // required prop or not
      control: "none",
    },
    toggleName: {
      description: "String value representing the name of the toggle",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "ResourceGroupForm is a form component that allows for adding or editing resource groups.",
      },
    },
  },
};

const ResourceGroupStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    if (stateData.name === "") return "Cannot be an empty string";
    else
      return "String must follow the regex pattern: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i";
  }

  function helperTextCallback(stateData, componentProps) {
    return "<prefix>-" + stateData.name;
  }
  return (
    <ResourceGroupForm
      data={{
        name: "example-form",
        use_data: false,
        use_prefix: true,
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      helperTextCallback={helperTextCallback}
    />
  );
};

const ResourceGroupFromDataStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    if (stateData.name === "") return "Cannot be an empty string";
    else
      return "String must follow the regex pattern: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i";
  }

  function helperTextCallback(stateData, componentProps) {
    return "<prefix>-" + stateData.name;
  }
  return (
    <ResourceGroupForm
      data={{
        name: "example-form",
        use_data: true,
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      helperTextCallback={helperTextCallback}
    />
  );
};

export const Default = ResourceGroupStory.bind({});
export const ResourceGroupFromData = ResourceGroupFromDataStory.bind({});
