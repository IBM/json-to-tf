import React, { useState } from "react";
import { IcseNumberSelect } from "icse-react-assets";

export default {
  component: IcseNumberSelect,
  title: "Components/Dropdowns/IcseNumberSelect",
  args: {
    min: 1,
    max: 20,
    invalid: false,
    invalidText: "Invalid selection",
    labelText: "Example Number Select",
    isModal: false,
  },
  argTypes: {
    min: {
      description: "A number value for the minimum selectable value", // description
      type: { required: true }, // required prop or not
      control: "number",
      table: { defaultValue: { summary: "1" } },
    },
    max: {
      description: "A number value for the maximum selectable value", // description
      type: { required: true }, // required prop or not
      control: "number",
      table: { defaultValue: { summary: "10" } },
    },
    formName: {
      description: "String for the form which the IcseNumberSelect belongs to", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    isModal: {
      description:
        "A boolean value that specifies if the IcseNumberSelect is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    invalid: {
      description:
        'A boolean value for checking if any input values are invalid. Any `null` or unselected value `""` will always be considered invalid unless invalid checking is disabled', // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    invalidText: {
      description: "A string value that displays if there is invalid input", // description
      type: { required: true }, // required prop or not
      control: "text",
      table: { defaultValue: { summary: "Invalid Selection" } },
    },
    groups: {
      description: "An array of objects to select from", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "[]" } },
    },
    handleInputChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    name: {
      summary: "A string for the name of the component",
      type: { required: true }, // required prop or not
      control: "none",
    },
    tooltip: {
      summary: "An optional object describing the tooltip for a title",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["tooltip.content"]: {
      description:
        "A string containing brief, supplemental information for the component it is tied to",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["tooltip.link"]: {
      description:
        "An optional string containing a custom hyperlink to be displayed with the content of the tooltip",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["tooltip.align"]: {
      description:
        'An optional string for tooltip alignment _(`align="top"` default value if no align prop is included)_. For all possible alignment directions refer to carbon components',
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["tooltip.alignModal"]: {
      description:
        "An optional string used to dynamically alternate direction for tooltip text when rendered in modals",
      control: "none",
      type: { required: false }, // required prop or not
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "IcseNumberSelect is a customized IcseSelect component for selecting number values",
      },
    },
  },
};

const IcseNumberSelectStory = ({ ...args }) => {
  const [value, setValue] = useState("");
  return (
    <IcseNumberSelect
      {...args}
      handleInputChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
      tooltip={{
        content: "Test",
        link: "www.test.test",
        align: "top",
      }}
    />
  );
};

export const Default = IcseNumberSelectStory.bind({});
