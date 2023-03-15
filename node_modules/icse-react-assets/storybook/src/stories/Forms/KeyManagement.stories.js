import React from "react";
import { contains } from "lazy-z";
import { KeyManagementForm } from "icse-react-assets";

export default {
  component: KeyManagementForm,
  title: "Components/Forms/KeyManagementForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.use_hs_crypto"]: {
      description:
        "A boolean specifying which key management solution to use (Key Protect or HPCS)",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.authorize_vpc_reader_role"]: {
      description:
        "A boolean specifying if a VPC Reader role should be created to allow VSI volumes to be encrypted with Key Management service",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.use_data"]: {
      description:
        "A boolean specifying if an existing key management instance should be used (defaults to `true` if HPCS solution is selected)",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.name"]: {
      description: "A string specifying the name of the Key Management service",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string value of the resource group selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    resourceGroups: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidCallback: {
      description:
        "A function to determine if the value supplied is invalid and returns a single boolean",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description:
        "A function to determine the invalid text displayed to the user and returns the string to display",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidKeyCallback: {
      description:
        "A function to determine if the value supplied for each encryption key name is invalid and returns a single boolean",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidKeyTextCallback: {
      description:
        "A function to determine the invalid text displayed for each encryption key name to the user and returns the string to display",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidRingCallback: {
      description:
        "A function to determine if the value supplied for each encryption key ring name is invalid and returns a single boolean",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidRingText: {
      description:
        "A string to show when an encryption key ring has an invalid name",
      type: { required: true }, // required prop or not
      control: "none",
    },
    propsMatchState: {
      description:
        "A function that returns a single boolean describing whether the encryption key form props and the form's state match",
      type: { required: true },
      control: "none",
    },
    encryptionKeyProps: {
      description: "Pass through props for encryption key forms",
      type: { required: true },
      control: "none",
    },
    "encryptionKeyProps.onSubmit": {
      description:
        "A function that defines what occurs when a modal is submitted",
      type: { required: true },
    },
    "encryptionKeyProps.onSave": {
      description: "A function that defines what occurs when the form is saved",
      type: { required: true },
    },
    "encryptionKeyProps.onDelete": {
      description:
        "A function that defines what occurs when the resource is deleted",
      type: { required: true },
    },
    "encryptionKeyProps.disableSave": {
      description:
        "A function that returns a single boolean describing whether the save button should be disabled",
      type: { required: true },
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "KeyManagementForm is a form that provides functionality for adding a key management service used to create, import, rotate, and manage encryption keys.",
      },
    },
  },
};

const KeyManagementFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData) {
    return (
      !validName(stateData.name) || contains(["foo", "bar"], stateData.name)
    );
  }

  function invalidTextCallback(stateData) {
    return contains(["foo", "bar"], stateData.name)
      ? `Key name ${stateData.name} already in use.`
      : `Invalid Key Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function invalidKeyCallback(stateData, componentProps) {
    return (
      !validName(stateData.name) || contains(["foo", "bar"], stateData.name)
    );
  }

  function invalidKeyTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Key name ${stateData.name} already in use.`
      : `Invalid Key Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])*$/s`;
  }

  function invalidRingCallback(stateData, componentProps) {
    return stateData.key_ring === "" ? false : !validName(stateData.key_ring);
  }

  let invalidRingText = `Invalid Key Ring Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])*$/s`;

  return (
    <KeyManagementForm
      data={{
        use_hs_crypto: false,
        use_data: false,
        name: "test-key-protect",
        resource_group: "service-rg",
        authorize_vpc_reader_role: false,
        keys: [
          {
            key_ring: "slz-slz-ring",
            name: "slz-slz-key",
            root_key: true,
            force_delete: true,
            endpoint: "public",
            rotation: 12,
            dual_auth_delete: false,
          },
          {
            key_ring: "slz-slz-ring",
            name: "slz-atracker-key",
            root_key: true,
            force_delete: true,
            endpoint: "public",
            rotation: 12,
            dual_auth_delete: false,
          },
          {
            key_ring: "slz-slz-ring",
            name: "slz-vsi-volume-key",
            root_key: true,
            force_delete: true,
            endpoint: "public",
            rotation: 12,
            dual_auth_delete: false,
          },
        ],
      }}
      resourceGroups={["service-rg", "management-rg", "workload-rg"]}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      invalidKeyCallback={invalidKeyCallback}
      invalidKeyTextCallback={invalidKeyTextCallback}
      invalidRingCallback={invalidRingCallback}
      invalidRingText={invalidRingText}
      propsMatchState={() => {}}
      encryptionKeyProps={{
        onSave: () => {},
        onDelete: () => {},
        onSubmit: () => {},
        disableSave: () => {},
      }}
    />
  );
};

export const Default = KeyManagementFormStory.bind({});
