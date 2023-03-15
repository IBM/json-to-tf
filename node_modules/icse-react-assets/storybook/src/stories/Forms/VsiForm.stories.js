import React from "react";
import { contains } from "lazy-z";
import { VsiForm } from "icse-react-assets";

export default {
  component: VsiForm,
  title: "Components/Forms/VsiForm",
  argTypes: {
    data: {
      summary: "An optional object describing the tooltip for a title",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string value of the name of the vsi",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.ssh_keys"]: {
      description: "An array of ssh key names (optional)",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.subnet"]: {
      description:
        "A string value representing the VSI subnet (required for Teleport VSIs)",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.enable_floating_ip"]: {
      description:
        "A boolean which specifying whether or not a floating IP is attached to the VSI",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.vpc"]: {
      description:
        "A string value representing the VPC where the VSI will be deployed to",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.image_name"]: {
      description:
        "A string value representing the virtual server image deployed on the VSI",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.profile"]: {
      description:
        "A string value representing the type of machine requested for the VSI",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string value representing the resource group for the VSI",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.encryption_key"]: {
      description:
        "A string value representing the boot volume encryption key name for the VSI",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.vsi_per_subnet"]: {
      description:
        "A number corresponding to the amount of VSIs to deploy in each subnet. Must be a number 1-10.",
      control: "none",
      type: { required: false }, // required prop or not
    },
    isModal: {
      description: "Boolean value determining if the form is a modal",
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: false } },
      control: "none",
    },
    isTeleport: {
      description:
        "A boolean specifying whether or not the form is for a Teleport VSI",
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
    resourceGroupList: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    vpcList: {
      description: "An array of strings containing the names of VPCs to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    subnetList: {
      description:
        "An array of strings containing the names of subnet names to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    sshKeyList: {
      description: "An array of ssh key names to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    encryptionKeyList: {
      description: "An array of available encryption key names to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    apiEndpointImages: {
      description:
        "A string representing the api endpoint to fetch valid VSI images to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    apiEndpointFlavors: {
      description:
        "A string representing the api endpoint to fetch valid VSI flavors to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "VsiForm is a form component that provides functionality for adding or editing a Virtual Server Instance (VSI).",
      },
    },
  },
};

const VsiFormStory = () => {
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
      ? `Name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }
  return (
    <VsiForm
      data={{
        name: "vsi",
      }}
      resourceGroupList={["rg1", "rg2", "rg3"]}
      vpcList={["vpc1", "vpc2"]}
      subnetList={["sub1", "sub2"]}
      sshKeyList={["key1", "key2", "key3"]}
      encryptionKeyList={["ekey1", "ekey2", "ekey3"]}
      apiEndpointImages={"/mock/api/images"}
      apiEndpointFlavors={"/mock/api/flavors"}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
    />
  );
};

export const Default = VsiFormStory.bind({});
