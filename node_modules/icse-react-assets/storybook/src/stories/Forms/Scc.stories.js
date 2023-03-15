import React from "react";
import { SccForm } from "icse-react-assets";

export default {
  component: SccForm,
  title: "Components/Forms/SecurityComplianceForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.enable"]: {
      description: "A boolean of whether or not an SCC instance is created",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.collector_description"]: {
      description: "A string description of the SCC collector",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.is_public"]: {
      description:
        "A boolean determining if the collector endpoint is accessible on a public network",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.location"]: {
      description: "A string determining the location (`us`, `eu`, or `uk`)",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.scope_description"]: {
      description: "A string description of the scope",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.passphrase"]: {
      description: "A string passphrase for the collector",
      control: "none",
      type: { required: false }, // required prop or not
    },
    descriptionRegex: {
      description:
        "A regular expression to determine invalid status for descriptions",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SccForm is a form component that provides functionality for enabling/editing an Security Compliance Center instance.",
      },
    },
  },
};

const SccFormStory = () => {
  return (
    <SccForm
      data={{
        enable: true,
        collector_description: "test collector description",
        is_public: true,
        scope_description: "test scope description",
        passphrase: "test-passphrase",
        location: "us",
      }}
      descriptionRegex={/^[A-z][a-zA-Z0-9-\._,\s]*$/i}
    />
  );
};

export const Default = SccFormStory.bind({});
