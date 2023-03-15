import React, { useState } from "react";
import { IcseSelect } from "icse-react-assets";

export default {
  component: IcseSelect,
  title: "Components/Dropdowns/IcseSelect",
  args: {
    disabled: false,
    invalid: false,
    invalidText: "Invalid Selection",
    disableInvalid: false,
    readOnly: false,
    debug: false,
    labelText: "Example Select",
    handleInputChange: () => {},
  },
  argTypes: {
    value: {
      description:
        "The current value that is saved by the Select (can be null)", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    formName: {
      description: "String for the form which the IcseSelect belongs to", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    disabled: {
      description: "A boolean value that will disable this component if true", // description
      type: { required: true }, // required prop or not
      control: "boolean",
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
    disableInvalid: {
      description: "A boolean value that will disable invalid checking if true", // description
      type: { required: false }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    groups: {
      description: "An array of objects to select from", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "[]" } },
    },
    readOnly: {
      description:
        'A boolean value that will set the component to "read-only" if true', // description
      type: { required: false }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    debug: {
      description: "An boolean value for setting to debug mode", // description
      type: { required: false }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
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
          "IcseSelect allows for dynamic rendering of a React element with variable props.",
      },
    },
  },
};

const IcseSelectStory = ({ ...args }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <IcseSelect
        {...args}
        formName="playground"
        name="icseSelect"
        groups={["test", "hello", "1"]}
        handleInputChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export const Default = IcseSelectStory.bind({});
