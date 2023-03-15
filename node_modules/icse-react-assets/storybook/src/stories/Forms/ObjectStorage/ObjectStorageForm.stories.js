import { ObjectStorageForm } from "icse-react-assets";
import { ObjectStorageBucketFormStory } from "./ObjectStorageBucketForm.stories";
import { ObjectStorageKeyFormStory } from "./ObjectStorageKeyForm.stories";
import React from "react";
import { contains } from "lazy-z";

export default {
  component: ObjectStorageForm,
  title: "Components/Forms/ObjectStorage/ObjectStorageForm",
  argTypes: {
    data: {
      summary: "An object that contains the data for the form.",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string value of the object storage instance name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.use_data"]: {
      description:
        "A boolean describing whether or not to use an existing instance",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string value of the resource group",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.random_suffix"]: {
      description:
        "A boolean describing whether or not to add a random suffix to the end of the instance name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.kms"]: {
      description:
        "A string of the key management instance name used to encrypt buckets",
      control: "none",
      type: { required: true }, // required prop or not
    },
    kmsList: {
      description: "An array of string key management instance names",
      type: { required: true }, // required prop or not
      control: "none",
    },
    subForms: {
      description:
        "An array react nodes containing forms to render beneath this form",
      type: { required: true }, // required prop or not
      control: "none",
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
    resourceGroups: {
      description: "An array of string resource group names",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "ObjectStorageForm allows the user to create and edit Object Storage instances.",
      },
    },
  },
};

const ObjectStorageFormStory = () => {
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
    <ObjectStorageForm
      data={{
        buckets: [
          {
            endpoint: "public",
            force_delete: true,
            kms_key: "atracker-key",
            name: "atracker-bucket",
            storage_class: "standard",
          },
        ],
        keys: [
          {
            name: "cos-bind-key",
            role: "Writer",
            enable_hmac: false,
          },
        ],
        name: "atracker-cos",
        plan: "standard",
        resource_group: "service-rg",
        use_data: false,
        use_random_suffix: false,
        kms: "kms",
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      composedNameCallback={composedNameCallback}
      resourceGroups={["rg1", "rg2", "rg3"]}
      kmsList={["kms-1", "kms-2"]}
      propsMatchState={() => {}}
      invalidBucketCallback={invalidCallback}
      invalidBucketTextCallback={invalidTextCallback}
      composedBucketNameCallback={composedNameCallback}
      bucketProps={{
        onSave: () => {},
        onDelete: () => {},
        onSubmit: () => {},
        disableSave: () => {},
      }}
      invalidKeyCallback={invalidCallback}
      invalidKeyTextCallback={invalidTextCallback}
      composedKeyNameCallback={composedNameCallback}
      keyProps={{
        onSave: () => {},
        onDelete: () => {},
        onSubmit: () => {},
        disableSave: () => {},
      }}
    />
  );
};

export const Default = ObjectStorageFormStory.bind({});
