import React from "react";
import { SubnetTierForm } from "icse-react-assets";
import { contains } from "lazy-z";

export default {
  component: SubnetTierForm,
  title: "Components/Forms/Subnets/SubnetTierForm",
  args: {
    isModal: false,
    readOnly: false,
  },
  argTypes: {
    isModal: {
      description:
        "A boolean value that specifies if the SubnetTierForm is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    readOnly: {
      description:
        "Boolean value. True if the form is being rendered as read only",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    noDeleteButton: {
      description: "Boolean value to hide delete button",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    onSave: {
      description:
        "Callback function to save subnet tier that accepts to parameters `stateData` and `componentProps`. `onSave` is used only when `isModal` is false",
      type: { required: true },
      control: "none",
    },
    onSubnetSave: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps` used to save subnets. `onSubnetSave` is used only when `isModal` is false",
      type: { required: false },
      control: "none",
    },
    shouldDisableSave: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps` and returns a boolean. Used to disable subnet tier save button. `shouldDisableSave` is used only when `isModal` is false.",
      type: { required: false },
      control: "none",
    },
    shouldDisableSubmit: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps` and returns a boolean. Used to disable submission of subnet tier when used in a modal. `shouldDisableSubmit` is used only when `isModal` is true.",
      type: { required: false },
      control: "none",
    },
    disableSubnetSaveCallback: {
      description:
        "Callback function that accepts to parameters `stateData` and `componentProps` and returns a boolean. Used to disable subnet save buttons. `disableSubnetSaveCallback` is used only when `isModal` is false.",
      type: { required: false },
      control: "none",
    },
    onDelete: {
      description:
        "Callback function to delete subnet tier that accepts to parameters `stateData` and `componentProps`. `onDelete` is used only when `isModal` is false",
      type: { required: true },
      control: "none",
    },
    enableModal: {
      description:
        "Function used to enable modal from parent component. Used only when `isModal` is true",
      type: { required: true },
      control: "none",
    },
    disableModal: {
      description:
        "Function used to disable modal from parent component. Used only when `isModal` is true",
      type: { required: true },
      control: "none",
    },
    vpc_name: {
      description:
        "String, name of the VPC where the subnet will be provisioned",
      type: { required: true }, // required prop or not
      control: "none",
    },
    data: {
      summary: "An array of subnet objects used to render subnets",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.hide"]: {
      description: "Boolean, form should be hidden",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.name"]: {
      description: "String, subnet tier name",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.zones"]: {
        description: "Number of zones, can be 1, 2, or 3",
        control: "none",
        type: { required: false }, // required prop or not
      },
    ["data.networkAcl"]: {
      description: "String, subnet tier network ACL",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.addPublicGateway"]: {
      description:
        "Boolean, true if a public gateway will be attached to each subnet in the tier",
      control: "none",
      type: { required: false }, // required prop or not
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
          "SubnetTierForm is a form component that provides functionality for editing subnets within a tier",
      },
    },
    source: {
      type: "code",
    },
  },
};

const SubnetTierFormStory = () => {
  function invalidCallback(stateData, componentProps) {
    return false;
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Subnet tier name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function shouldDisableSave(stateData, componentProps) {
    return true;
  }

  function disableSubnetSaveCallback(stateData, componentProps) {
    return true;
  }

  function subnetListCallback(stateData, componentProps) {
    let tierSubnets = [
      {
        name: stateData.name + "-subnet-zone-1",
        cidr: "10.10.10.10/24",
        public_gateway: stateData.addPublicGateway,
        acl_name: stateData.networkAcl,
      },
      {
        name: stateData.name + "-subnet-zone-2",
        cidr: "10.20.10.10/24",
        public_gateway: stateData.addPublicGateway,
        acl_name: stateData.networkAcl,
      },
      {
        name: stateData.name + "-subnet-zone-3",
        cidr: "10.30.10.10/24",
        public_gateway: stateData.addPublicGateway,
        acl_name: stateData.networkAcl,
      },
    ];
    while (tierSubnets.length > stateData.zones) {
      tierSubnets.pop();
    }
    return tierSubnets;
  }

  return (
    <SubnetTierForm
      vpc_name="example-vpc"
      data={{
        hide: false,
        name: "example-tier",
        zones: 3,
        networkAcl: "example-acl-1",
        addPublicGateway: false,
      }}
      shouldDisableSave={shouldDisableSave}
      disableSubnetSaveCallback={disableSubnetSaveCallback}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      networkAcls={["example-acl-1", "example-acl-2"]}
      enabledPublicGateways={[1, 2, 3]}
      subnetListCallback={subnetListCallback}
    />
  );
};

export const Default = SubnetTierFormStory.bind({});
