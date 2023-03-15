import React, { useState } from "react";
import { EndpointSelect } from "icse-react-assets";

export default {
  component: EndpointSelect,
  title: "Components/Dropdowns/EndpointSelect",
  args: {},
  argTypes: {
    value: {
      description:
        "The current value that is saved by the Select (can be null)", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    formName: {
      description: "String for the form which the EndpointSelect belongs to", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    handleInputChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    groups: {
      description: "A list of strings containing endpoint types",
      type: { required: true }, // required prop or not
      control: "none",
      table: {
        defaultValue: {
          summary: '["private", "public", "public-and-private"]',
        },
      }, // default value
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "EndpointSelect is a customized IcseSelect for selecting endpoints for IBM Cloud Services",
      },
    },
  },
};

const EndpointSelectStory = () => {
  const [value, setValue] = useState("public-and-private");
  return (
    <EndpointSelect
      component="icseEndpointSelect"
      handleInputChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
      formName="playground"
    />
  );
};

export const Default = EndpointSelectStory.bind({});
