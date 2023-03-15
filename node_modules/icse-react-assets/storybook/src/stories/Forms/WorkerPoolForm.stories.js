import React from "react";
import { contains } from "lazy-z";
import { WorkerPoolForm } from "icse-react-assets";

export default {
  component: WorkerPoolForm,
  title: "Components/Forms/WorkerPoolForm",
  argTypes: {
    data: {
      summary: "An optional object describing the tooltip for a title",
      type: { required: true }, // required prop or not
      control: "none",
    },
    "data.entitlement": {
      description:
        "A string value for selecting entitlements related to the IBM Cloud Pak for Data platform",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.flavor": {
      description: "A string for selecting the flavor of the worker nodes",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.name": {
      description: "Name of the worker pool",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.vpc_name": {
      description: "A string for the VPC where your cluster is provisioned",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.subnets": {
      description: "An array (string) of initially selected subnets",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.workers_per_subnet": {
      description: "The number of worker nodes per subnet",
      control: "none",
      type: { required: true }, // required prop or not
    },
    cluster: {
      summary: "An optional object describing the tooltip for a title",
      type: { required: true }, // required prop or not
      control: "none",
    },
    "cluster.entitlement": {
      description:
        "A string value for selecting entitlements related to the IBM Cloud Pak for Data platform",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "cluster.machine_type": {
      description:
        "A string for selecting the machine type (flavor) of the worker nodes",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "cluster.vpc_name": {
      description: "A string for the VPC where your cluster is provisioned",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "cluster.subnets": {
      description: "An array (string) of initially selected subnets",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "cluster.workers_per_subnet": {
      description: "The number of worker nodes per subnet",
      control: "none",
      type: { required: true }, // required prop or not
    },
    isModal: {
      description:
        "A boolean value that specifies if the IcseNumberSelect is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    subnetList: {
      description: "An array (string) of all subnets",
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
  },
  parameters: {
    docs: {
      description: {
        component:
          "WorkerPoolForm is a form component that provides functionality for editing Worker Pool instances of a cluster",
      },
    },
  },
};

const WorkerPoolFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.pool.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    return !validName(stateData.pool.name)
      ? `Name ${stateData.pool.name} is invalid.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  return (
    <WorkerPoolForm
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      subnetList={["a", "b", "c", "d", "e"]}
      cluster={{
        machine_type: "bx2.16x64",
        subnets: ["a", "b", "c"],
        vpc_name: "test",
        workers_per_subnet: 2,
        entitlement: "null",
      }}
      data={{
        entitlement: "null",
        name: "testWorkerPool",
        subnets: ["a", "b", "c"],
        vpc_name: "test",
        flavor: "bx2.16x64",
        workers_per_subnet: 2,
      }}
    />
  );
};

export const Default = WorkerPoolFormStory.bind({});
