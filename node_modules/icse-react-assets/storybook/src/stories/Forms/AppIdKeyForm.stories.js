import React from "react";
import { AppIdKeyForm } from "icse-react-assets";
import { contains } from "lazy-z";

export default {
  component: AppIdKeyForm,
  title: "Components/Forms/AppIdKeyForm",
  argTypes: {
    data: {
      summary: "An object containing a key name and list of keys",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.key_name"]: {
      description: "A string value of the key name",
      control: "none",
      type: { required: true }, // required prop or not
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
          "AppIdKeyForm is a form component that provides functionality for creating and editing AppID Keys",
      },
    },
  },
};

const AppIdKeyFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return (
      !validName(stateData.key_name) ||
      contains(["example-key"], stateData.key_name)
    );
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["example-key"], stateData.key_name)
      ? `Key name ${stateData.key_name} already in use.`
      : `Invalid Key Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }
  return (
    <AppIdKeyForm
      data={{ key_name: "test-key", keys: ["foo", "bar"] }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
    />
  );
};

export const Default = AppIdKeyFormStory.bind({});
