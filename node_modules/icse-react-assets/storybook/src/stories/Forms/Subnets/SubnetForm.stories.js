import React from "react";
import { SubnetForm } from "icse-react-assets";

export default {
  component: SubnetForm,
  title: "Components/Forms/Subnets/SubnetForm",
  argTypes: {
    isModal: {
      description:
        "A boolean value that specifies if the SubnetForm is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    onSave: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps`. `onSave` is used only when `isModal` is false",
      type: { required: true },
    },
    vpc_name: {
      description: "A string for the VPC which the subnet belong to",
      type: { required: false }, // required prop or not
      control: "text",
    },
    data: {
      summary: "An optional object used to render subnet",
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
    shouldDisableGatewayToggle: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps`. Used to determine if a provisioned public gateway is able to be attached to the subnet, public gateway toggle will be disabled when `true`",
      type: { required: true }, // required prop or not
      control: "none",
    },
    networkAcls: {
      description:
        "Array of string, list of network ACLs that can be attached to the subnet",
      type: { required: true }, // required prop or not
      control: "none",
    },
    componentDidUpdateCallback: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps`. This function is used to force a parent component to rerender when an individual subnet is changed",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SubnetForm is a form component that provides functionality for editing a subnet",
      },
    },
    source: {
      type: "code",
    },
  },
};

const SubnetFormStory = () => {
  function disableSaveCallback(stateData, componentProps) {
    return stateData.acl_name === "";
  }

  function shouldDisableGatewayToggle(stateData, componentProps) {
    return stateData.name.replace(/[^]*(?=\d$)/g, "") === 1;
  }

  function componentDidUpdateCallback(stateData, componentProps) {
    if (stateData.name !== componentProps.name) {
      // add logic here to force parent component to update state
      // when subnet form is a child component
    }
  }
  return (
    <SubnetForm
      vpc_name="example"
      data={{
        name: "example-subnet-zone-1",
        cidr: "10.10.10.10/24",
        public_gateway: false,
        acl_name: "example-acl",
      }}
      onSave={() => {}}
      disableSaveCallback={disableSaveCallback}
      networkAcls={["example-acl", "example-acl-2"]}
      shouldDisableGatewayToggle={shouldDisableGatewayToggle}
      componentDidUpdateCallback={componentDidUpdateCallback}
    />
  );
};

export const Default = SubnetFormStory.bind({});
