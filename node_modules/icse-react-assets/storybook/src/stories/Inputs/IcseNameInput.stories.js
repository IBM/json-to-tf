import React from "react";
import { IcseNameInput } from "icse-react-assets";
import { useState } from "react";

export default {
  component: IcseNameInput, // component name
  title: "Components/Inputs/IcseNameInput", // in tabs under components > inputs > IcseTextInput > Default (bound story is default)
  args: {
    // add props in args to make them editable, or add controls in argTypes. These can supply example defaults
    componentName: "name-input",
    id: "example-name-input",
    value: "",
    helperText: "Example Helper Text",
    labelText: "Example labelText",
    invalidText: "NameInput cannot be empty",
    onChange: () => {}, // place empty functions so these show up as props
    invalidCallback: () => {}, // place empty functions so these show up as props,
    helperTextCallback: () => {},
  },
  argTypes: {
    disabled: {
      description: "A boolean value for if the TextInput is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "boolean", // what type of value we can set
    },
    componentName: {
      description: "A string name of the component",
      type: { required: true },
    },
    value: {
      description: "A string value of the data inside the text input",
      type: { required: true },
      control: "none",
    },
    onChange: {
      description:
        "A function that is called each time the text input is updated",
      type: { required: true },
    },
    helperText: {
      description: "A string value for helper text underneath the text input",
      type: { required: false },
    },
    tooltip: {
      summary: "An optional object describing the tooltip for the input",
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
    className: {
      description: "A string of classNames that can be added to the text input",
      type: { required: false },
      control: "text",
    },
    labelText: {
      description: "A string value labeling the text input",
      type: { required: true },
    },
    invalidCallback: {
      description:
        "A function that will check if the text input is invalid and return a single boolean",
      type: { required: true },
    },
    invalidText: {
      description: "A string describing an error if text is invalid",
      type: { required: true },
    },
    id: {
      description: "A string value representing the text input's id",
      type: { required: true },
    },
    useData: {
      description:
        "A boolean describing if only the name existing should be checked",
      type: { required: true },
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    helperTextCallback: {
      description:
        "A function which returns helper text to display beneath the name input",
      type: { required: false },
    },
    hideHelperText: {
      description: "A boolean to hide the helper text on the input",
      type: { required: true },
      table: { defaultValue: { summary: "false" } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "IcseNameInput is an extension of IcseTextInput that adds additional functionality to handle resource names as an input. ",
      },
    },
  },
};

const IcseNameInputStory = ({ ...args }) => {
  const [value, setValue] = useState("");
  const invalidCallback = function () {
    return value === "";
  };
  const helperTextCallback = function () {
    return `Composed Name: prefix-${value}`;
  };
  return (
    <IcseNameInput
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      helperTextCallback={helperTextCallback}
      invalidCallback={invalidCallback}
    />
  );
};

const IcseNameInputWithTooltipStory = ({ ...args }) => {
  const [value, setValue] = useState("");
  const invalidCallback = function () {
    return value === "";
  };
  const helperTextCallback = function () {
    return `Composed Name: prefix-${value}`;
  };
  return (
    <IcseNameInput
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      helperTextCallback={helperTextCallback}
      invalidCallback={invalidCallback}
      tooltip={{ content: "Optional tooltip example", align: "top" }}
    />
  );
};

export const Default = IcseNameInputStory.bind({});
export const WithTooltip = IcseNameInputWithTooltipStory.bind({});
