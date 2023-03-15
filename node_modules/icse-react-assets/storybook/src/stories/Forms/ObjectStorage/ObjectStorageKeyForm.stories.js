import { ObjectStorageKeyForm } from "icse-react-assets";
import React from "react";
import { contains } from "lazy-z";

export default {
  component: ObjectStorageKeyForm,
  title: "Components/Forms/ObjectStorage/ObjectStorageKeyForm",
  argTypes: {
    data: {
      summary: "An object that contains the data for the form.",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "String value, key name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.role"]: {
      description:
        "String value, role the resource key can perform with the object storage instance",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.enable_hmac"]: {
      description:
        "Boolean, enable hash-based message authentication code for resource key",
      control: "none",
      type: { required: true }, // required prop or not
    },
    isModal: {
      description: "Boolean value determining if the form is a modal",
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: false } },
      control: "none",
    },
    invalidCallback: {
      description:
        "Function that determines invalid state for the `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description: "Function that determines invalid text for `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    composedNameCallback: {
      description:
        "A function to return a string value as helper text for the composed bucket name",
      type: { required: true }, // required prop or not
      control: "none",
    },
    forceEnableHmac: {
      description:
        "A boolean value to force the resource key to have `HMAC` enabled",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: false } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "ObjectStorageKeyForm allows users to create and manage Object Storage resource keys.",
      },
    },
  },
};

export const ObjectStorageKeyFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return (
      !validName(stateData.name) || contains(["foo", "bar"], stateData.name)
    );
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function composedNameCallback(stateData, componentProps) {
    return `${stateData.name}-<random suffix>`;
  }

  return (
    <ObjectStorageKeyForm
      data={{
        name: "test-encryption-key",
        enable_hmac: false,
        role: "Reader",
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      composedNameCallback={composedNameCallback}
    />
  );
};
