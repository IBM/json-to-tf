import React from "react";
import { SubnetTileForm } from "icse-react-assets";
import { deepEqual } from "lazy-z";

export default {
  component: SubnetTileForm,
  title: "Components/Forms/Subnets/SubnetTileForm",
  args: {
    isModal: false,
    readOnly: false,
  },
  argTypes: {
    isModal: {
      description:
        "A boolean value that specifies if the SubnetTileForm is a component within a modal",
      type: { required: false }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    readOnly: {
      description:
        "Boolean value. True if the form is being rendered as read only",
      type: { required: false }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onSave: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps`. `onSave` is used only when `isModal` is false",
      type: { required: true },
      control: "none",
    },
    vpc_name: {
      description:
        "String, name of the VPC where the subnet will be provisioned",
      type: { required: false }, // required prop or not
      control: "none",
    },
    tier: {
      description: "String, name of subnet tier",
      type: { required: false }, // required prop or not
      control: "none",
    },
    data: {
      summary: "An array of subnet objects used to render subnets",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "String, name of the subnet",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.cidr"]: {
      description: "String, subnet CIDR Block",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.acl_name"]: {
      description: "String, subnet network ACL",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.public_gateway"]: {
      description:
        "Boolean, true if a public gateway will be attached to the subnet",
      control: "none",
      type: { required: false }, // required prop or not
    },
    disableSaveCallback: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps`. `disableSaveCallback` is used only when `isModal` is false. Returns a boolean value, when true saving the subnet form will be disabled",
      type: { required: false }, // required prop or not
      control: "none",
    },
    enabledPublicGateways: {
      description:
        "Array of numbers. Each number corresponds to a zone where a public gateway is enabled",
      type: { required: true }, // required prop or not
      control: "none",
    },
    networkAcls: {
      description:
        "Array of string, list of network ACLs that can be attached to the subnet",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SubnetTileForm is a form component that provides functionality for editing subnets within a tier",
      },
    },
    source: {
      type: "code",
    },
  },
};

const SubnetTileFormStory = ({ ...args }) => {
  function disableSaveCallback(stateData, componentProps) {
    return (
      stateData.acl_name === "" || deepEqual(stateData, componentProps.data)
    );
  }
  return (
    <SubnetTileForm
      {...args}
      disableSaveCallback={disableSaveCallback}
      networkAcls={["example-acl", "example-acl-1"]}
      data={[
        {
          name: "example-subnet-zone-1",
          cidr: "10.10.10.10/24",
          public_gateway: false,
          acl_name: "example-acl",
        },
        {
          name: "example-subnet-zone-2",
          cidr: "10.20.10.10/24",
          public_gateway: false,
          acl_name: "example-acl",
        },
        {
          name: "example-subnet-zone-3",
          cidr: "10.30.10.10/24",
          public_gateway: false,
          acl_name: "example-acl",
        },
      ]}
      enabledPublicGateways={[1, 2]}
      onSave={()=>{}}
    />
  );
};

export const Default = SubnetTileFormStory.bind({});
