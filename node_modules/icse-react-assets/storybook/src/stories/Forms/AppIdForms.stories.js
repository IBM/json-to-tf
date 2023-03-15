import React from "react";
import { AppIdForm } from "icse-react-assets";
import { contains } from "lazy-z";

export default {
  component: AppIdForm,
  title: "Components/Forms/AppIdForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string specifying the name of the AppID instance",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.use_data"]: {
      description:
        "A string specifying the name of the resource group selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string value of the Resource Group",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.keys"]: {
      description: "An array of strings containing the list of AppID keys",
      control: "none",
      type: { required: true }, // required prop or not
    },
    resourceGroups: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    componentDidUpdateCallback: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps`. This function is used to force a parent component to rerender when an individual subnet is changed",
      type: { required: true }, // required prop or not
      control: "none",
    },
    saveCallback: {
      description:
        "A function that notifies the user when a the AppID service has been saved",
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
          "AppIdForm is a form component that provides functionality for editing an AppID instance",
      },
    },
  },
};

const AppIdFormStory = () => {
  function componentDidUpdateCallback(stateData, componentProps) {
    if (stateData.name !== componentProps.name) {
      // add logic here to force parent component to update state
      // when AppID form is a child component
    }
  }

  function saveCallback(saveType) {
    let saveStatus = `State updated. `;
    saveType === `add`
      ? (saveStatus = saveStatus + `Key added.`)
      : saveType === `edit`
      ? (saveStatus = saveStatus + `Key edited.`)
      : (saveStatus = saveStatus + `Key deleted.`);
    console.log(saveStatus);
  }

  function validName(str) {
    // regex name validation that only allows alphanumerical characters and "-", string cannot end with "-"
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function shouldDisableSubmitCallback(stateData, componentProps) {
    if (stateData.open === true) {
      if (
        !validName(stateData.key_name) ||
        contains(["key1", "key2"], stateData.key_name) ||
        (Array.isArray(stateData.keys) &&
          contains(stateData.keys, stateData.key_name))
      ) {
        console.log(false);
      } else {
        console.log(true);
      }
    }
  }

  function invalidCallback(field, stateData, componentProps) {
    let invalid = false;
    if (
      field === "name" &&
      (!validName(stateData[field]) || contains(["foo", "bar"], stateData.name))
    ) {
      invalid = true;
    } else {
      invalid =
        !validName(stateData[field]) ||
        contains(["key1", "key2"], stateData.key_name) ||
        (Array.isArray(stateData.keys) &&
          contains(stateData.keys, stateData.key_name));
    }
    return invalid;
  }

  function invalidTextCallback(field, stateData, componentProps) {
    let invalidText = ``;
    if (
      contains(["foo", "bar"], stateData[field]) ||
      contains(["key1", "key2"], stateData[field]) ||
      (Array.isArray(stateData.keys) &&
        contains(stateData.keys, stateData.key_name))
    ) {
      invalidText = `Name ${stateData[field]} already in use.`;
    } else {
      invalidText = `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
    }
    return invalidText;
  }
  return (
    <AppIdForm
      data={{
        name: "",
        resource_group: "",
        use_data: false,
        keys: [],
      }}
      resourceGroups={["service-rg", "management-rg", "workload-rg"]}
      componentDidUpdateCallback={componentDidUpdateCallback}
      saveCallback={saveCallback}
      shouldDisableSubmitCallback={shouldDisableSubmitCallback}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
    />
  );
};

export const Default = AppIdFormStory.bind({});
