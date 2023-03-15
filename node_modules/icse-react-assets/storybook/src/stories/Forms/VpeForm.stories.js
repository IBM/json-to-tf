import React from "react";
import { VpeForm } from "icse-react-assets";

export default {
  component: VpeForm,
  title: "Components/Forms/VpeForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.vpc"]: {
      description: "A string specifying the VPC name",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.security_groups"]: {
      description: "An array of security groups that are selected",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.subnets"]: {
      description: "An array of subnets that are selected",
      control: "none",
      type: { required: false }, // required prop or not
    },
    resourceGroups: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    subnetList: {
      description: "An array of strings containing the names of subnets",
      type: { required: true }, // required prop or not
      control: "none",
    },
    securityGroups: {
      description: "An array of all security groups",
      type: { required: true }, // required prop or not
      control: "none",
    },
    isModal: {
      description:
        "A boolean value that specifies if the SubnetForm is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "VpeForm is a component that allows the user to create and edit Virtual Private Endpoint instances",
      },
    },
  },
};

const VpeFormStory = () => {
  return (
    <VpeForm
      data={{
        vpc: "workload",
        service: "kms",
        resource_group: "test",
        security_groups: ["1", "2", "3"],
        subnets: ["a", "b", "c"],
      }}
      resourceGroups={["test", "foo", "bar"]}
      subnetList={["a", "b", "c", "d", "e"]}
      securityGroups={["1", "2", "3", "4", "5"]}
    />
  );
};

export const Default = VpeFormStory.bind({});
