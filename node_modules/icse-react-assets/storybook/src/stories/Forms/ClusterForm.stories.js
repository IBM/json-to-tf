import React from "react";
import { contains } from "lazy-z";
import { ClusterForm, WorkerPoolForm } from "icse-react-assets";

export default {
  component: ClusterForm,
  title: "Components/Forms/ClusterForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: true }, // required prop or not
      control: "none",
    },
    "data.name": {
      description: "A string value for the name of the Cluster Instance",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.resource_group": {
      description: "A string value of the Resource Group selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.kube_type": {
      description:
        "A string value of the kubernetes type selected, (OpenShift or IBM Kubernetes Service)",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.entitlement": {
      description:
        "A string value for selecting entitlements related to the IBM Cloud Pak for Data platform",
      control: "none",
      type: { required: false }, // required prop or not
    },
    "data.encryption_key": {
      description: "A string value of the Encryption Key selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.cos": {
      description:
        "A string value of the Cloud Object Storage Instance selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.vpc": {
      description: "A string for the VPC where your cluster is provisioned",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.subnets": {
      description: "An array of subnets that are selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.workers_per_subnet": {
      description: "An integer for the number of worker nodes per subnet",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.flavor": {
      description:
        "A string for selecting the flavor (machine type) of the worker nodes",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.kube_version": {
      description: "A string for the Kubernetes version selected",
      control: "none",
      type: { required: true }, // required prop or not
    },
    "data.update_all_workers": {
      description:
        "A boolean specifying whether or not all workers should be updated",
      control: "none",
      type: { required: true }, // required prop or not
    },
    isModal: {
      description:
        "A boolean value that specifies if the Worker Pools form is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: false },
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
    helperTextCallback: {
      description:
        "A function to display helperText for the specified Cluster name",
      type: { required: true }, // required prop or not
      control: "none",
    },
    kubeVersionApiEndpoint: {
      description:
        "A string representing the api endpoint to fetch valid Kubernetes versions to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    flavorApiEndpoint: {
      description:
        "A string representing the api endpoint to fetch valid Machine Instance types (flavors) to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    workerPoolForms: {
      description: "A React Node to render the cluster's worker pools",
      type: { required: true }, // required prop or not
      control: "none",
    },
    workerPoolProps: {
      description: "Pass through props for encryption key forms",
      type: { required: true },
      control: "none",
    },
    "workerPoolProps.onSubmit": {
      description:
        "A function that defines what occurs when a modal is submitted",
      type: { required: true },
    },
    "workerPoolProps.onSave": {
      description: "A function that defines what occurs when the form is saved",
      type: { required: true },
    },
    "workerPoolProps.onDelete": {
      description:
        "A function that defines what occurs when the resource is deleted",
      type: { required: true },
    },
    "workerPoolProps.disableSave": {
      description:
        "A function that returns a single boolean describing whether the save button should be disabled",
      type: { required: true },
      control: "none",
    },
    invalidPoolCallback: {
      description:
        "A function to determine if the value supplied is invalid and returns a single boolean",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidPoolTextCallback: {
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
          "ClusterForm is a form component that provides functionality for creating highly available, containerized apps on Red Hat OpenShift clusters and Kubernetes clusters.",
      },
    },
  },
};

const ClusterFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/s;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.name);
  }

  function helperTextCallback(stateData, componentProps) {
    return "<prefix>-" + stateData.name;
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Cluster name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  return (
    <ClusterForm
      data={{
        name: "",
        resource_group: "",
        kube_type: "openshift",
        entitlement: "null",
        encryption_key: "",
        cos: "",
        vpc: "management",
        subnets: [],
        workers_per_subnet: 2,
        flavor: "bx2.16x64",
        kube_version: "4.10.52_openshift (Default)",
        update_all_workers: false,
        worker_pools: [
          {
            entitlement: "cloud_pak",
            cluster: "workload",
            flavor: "bx2.16x64",
            name: "logging-pool",
            resource_group: "workload-rg",
            subnets: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
            vpc: "workload",
            workers_per_subnet: 2,
          },
        ],
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      helperTextCallback={helperTextCallback}
      resourceGroups={["service-rg", "management-rg", "workload-rg"]}
      encryptionKeys={["atracker-key", "key", "roks-key"]}
      cosNames={["atracker-cos", "cos"]}
      vpcList={["management", "workload"]}
      subnetList={[
        "vpe-zone-1",
        "vpe-zone-2",
        "vpe-zone-3",
        "vsi-zone-1",
        "vsi-zone-2",
        "vsi-zone-3",
      ]}
      kubeVersionApiEndpoint={"/mock/api/kubeVersions"}
      flavorApiEndpoint={"/mock/api/machineTypes"}
      propsMatchState={() => {}}
      workerPoolProps={{
        onSave: () => {},
        onDelete: () => {},
        onSubmit: () => {},
        disableSave: () => {},
      }}
      invalidPoolCallback={invalidCallback}
      invalidPoolTextCallback={invalidTextCallback}
    />
  );
};

export const Default = ClusterFormStory.bind({});
