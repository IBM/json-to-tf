import { ObjectStorageBucketForm } from "icse-react-assets";
import React from "react";
import { contains } from "lazy-z";

export default {
  component: ObjectStorageBucketForm,
  title: "Components/Forms/ObjectStorage/ObjectStorageBucketForm",
  argTypes: {
    data: {
      summary: "An object that contains the data for the form.",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string value of the object storage bucket name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.force_delete"]: {
      description:
        "A boolean that indicates whether to force delete contents of the bucket after the bucket is deleted",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.storage_class"]: {
      description: "A string value of the storage class",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.kms_key"]: {
      description: "A string value of the encryption key",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.endpoint"]: {
      description:
        "A string value of the endpoint. Can be `public`, `private`, or `public-and-private`",
      control: "none",
      type: { required: true }, // required prop or not
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
    resourceGroups: {
      description: "An array of string resource group names",
      type: { required: true }, // required prop or not
      control: "none",
    },
    encryptionKeys: {
      description: "An array of string encryption key names",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "ObjectStorageBucketForm allows users to create and edit Object Storage bucket",
      },
    },
  },
};

export const ObjectStorageBucketFormStory = () => {
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
    <ObjectStorageBucketForm
      data={{
        force_delete: false,
        name: "test-bucket",
        storage_class: "Standard",
        kms_key: "key1",
        endpoint: "public",
      }}
      encryptionKeys={["key1", "key2"]}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      composedNameCallback={composedNameCallback}
    />
  );
};
