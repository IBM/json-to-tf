import React from "react";
import { IcseToggle } from "icse-react-assets";

export default {
  component: IcseToggle, // component name
  title: "Components/Inputs/IcseToggle", // in tabs under components > inputs > IcseTextInput > Default (bound story is default)
  args: {
    // add props in args to make them editable, or add controls in argTypes. These can supply example defaults
    id: "example-toggle",
    labelText: "Example labelText",
    onChange: () => {}, // place empty functions so these show up as props
  },
  argTypes: {
    disabled: {
      description: "A boolean value for if the Toggle is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "boolean", // what type of value we can set
    },
    useOnOff: {
      description:
        "A boolean value to replace the toggle labels with 'on/of' instead of true or false", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "boolean", // what type of value we can set
    },
    toggleFieldName: {
      description:
        "A string value representing the name of a state value that would be toggled, if different than the labelText",
      type: { required: true },
      control: "text", // what type of value we can set
    },
    defaultToggled: {
      description:
        "A boolean value which is which way the toggle is toggled by default",
      type: { required: false },
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    value: {
      description: "A string value of the data inside the text input",
      type: { required: true },
      control: "none",
    },
    onToggle: {
      description:
        "A function that is called each time the component is toggled",
      type: { required: true },
      control: "none",
    },
    className: {
      description: "A string of classNames that can be added to the toggle",
      type: { required: false },
      control: "text",
    },
    labelText: {
      description: "A string value labeling the toggle",
      type: { required: true },
    },
    id: {
      description: "A string representing the toggle's id",
      type: { required: true },
    },
    isModal: {
      description:
        "A boolean that describes if the component is within a modal",
      type: { required: true },
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    tooltip: {
      summary: "An optional object describing the tooltip for the input",
      type: { required: false }, // required prop or not
      control: "object",
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
          "IcseToggle is a toggle component that can be used to allow a user to toggle a true/false value.",
      },
    },
  },
};

const IcseToggleStory = ({ ...args }) => {
  return (
    <IcseToggle
      {...args}
      onToggle={(toggleName, value) => console.log(toggleName, value)}
    />
  );
};

export const Default = IcseToggleStory.bind({});
