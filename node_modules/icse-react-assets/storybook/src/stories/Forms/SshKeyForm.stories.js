import React from "react";
import { SshKeyForm } from "icse-react-assets";

export default {
  component: SshKeyForm,
  title: "Components/Forms/SshKeyForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string specifying the name of the SSH Key",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string specifying the name of the resource group",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.public_key"]: {
      description: "A string value of the SSH Public Key Value",
      control: "none",
      type: { required: false }, // required prop or not
    },
    resourceGroups: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidKeyCallback: {
      description:
        "An array of strings containing the names of KMS keys to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidCallback: {
      description:
        "Function that determines invalid state and invalid text for `public_key` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description:
        "A function to determine the invalid text displayed to the user and returns the string to display",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SshKeyForm is a form component that provides functionality for editing an SSH Key",
      },
    },
  },
};

const SshKeyFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    return !validName(stateData.name)
      ? `Name ${stateData.name} is invalid.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function invalidKeyCallback(str) {
    const regex = /^ssh-rsa AAAA[0-9A-Za-z+\/]+([=]{0,3}([^@]+@[^@]+))?$/g;
    return {
      invalid: str.match(regex) === null,
      invalidText: `Provide a unique SSH public key that matches ${regex} and does not exist in the IBM Cloud account in your region`,
    };
  }

  return (
    <SshKeyForm
      data={{
        name: "SshKeyFormTest",
        resource_group: "rg1",
        public_key: "test-key",
      }}
      resourceGroups={["rg1", "rg2", "rg3"]}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      invalidKeyCallback={invalidKeyCallback}
    />
  );
};

export const Default = SshKeyFormStory.bind({});
