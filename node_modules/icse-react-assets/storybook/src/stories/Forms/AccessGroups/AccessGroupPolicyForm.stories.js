import { AccessGroupPolicyForm } from "icse-react-assets";
import React from "react";

export default {
  component: AccessGroupPolicyForm,
  title: "Components/Forms/AccessGroups/AccessGroupPolicyForm",
  argTypes: {
    data: {
      summary: "An object that contains the data for the form.",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string value of the access group name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.description"]: {
      description: "A string value of the access group description",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resources"]: {
      description: "An object containing information about the resources",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resources.resource_group"]: {
      description: "A string value of the resource group name",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resources.resource_type"]: {
      description:
        "A string value of the type of resource (ex. resource-group)",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resources.resource"]: {
      description: "A string value for the resource of the policy definition",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resources.service"]: {
      description:
        "String value for the service type of the policy (ex. cloud-object-storage)",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.resources.resource_instance_id"]: {
      description:
        "String value for the ID of the service instance to give permissions",
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
        "Function that determines invalid state for specified field (defaults to `name`) field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description: "Function that determines invalid text for `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    helperTextCallback: {
      description: "Function that determines helperText text for `name` field",
      type: { required: true }, // required prop or not
      control: "none",
    },
    resourceGroups: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "AccessGroupPolicyForm is a form component that provides functionality for adding or editing an Access Group policy. ",
      },
    },
  },
};

export const AccessGroupPolicyStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(field, stateData, componentProps) {
    if (field === "identity_provider")
      return !(stateData.identity_provider.length >= 6);
    else return !validName(stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    return !validName(stateData.name)
      ? `Name ${stateData.name} is invalid.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function composedNameCallback(stateData, componentProps) {
    return `${stateData.name}-<random suffix>`;
  }
  return (
    <AccessGroupPolicyForm
      data={{
        name: "test-policy",
        resources: {
          resource_group: "rg1",
          resource_type: "resource-group",
          resource: "test-resource",
          service: "cloud-object-storage",
          resource_instance_id: "fake-id-12345",
        },
      }}
      resourceGroups={["rg1", "rg2", "rg3"]}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      helperTextCallback={composedNameCallback}
    />
  );
};
