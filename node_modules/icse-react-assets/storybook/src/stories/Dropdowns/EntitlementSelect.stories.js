import React, { useState } from "react";
import { EntitlementSelect } from "icse-react-assets";

export default {
  component: EntitlementSelect,
  title: "Components/Dropdowns/EntitlementSelect",
  args: {},
  argTypes: {
    value: {
      description:
        "The current value that is saved by the Select (can be null)", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    formName: {
      description: "String for the form which the EntitlementSelect belongs to", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    handleInputChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    name: {
      description: "A string for the name of the component",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'EntitlementSelect is a customized IcseSelect for selecting entitlements related to the IBM Cloud Pak for Data platform. The selectable values of EntitlementSelect are `["cloud_pak", "null"]`',
      },
    },
  },
};

const EntitlementSelectStory = () => {
  const [value, setValue] = useState("");
  return (
    <EntitlementSelect
      component="icseEntitlementSelect"
      handleInputChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
      name="Entitlement"
      formName="playground"
    />
  );
};

export const Default = EntitlementSelectStory.bind({});
