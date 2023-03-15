import React from "react";
import { ToolTipWrapper } from "icse-react-assets";
import { TextInput, TextArea } from "@carbon/react";

export default {
  component: ToolTipWrapper,
  title: "Components/Tooltips/ToolTipWrapper",
  argTypes: {
    id: {
      description:
        "A string value representing the id of the tooltip to be rendered within the component",
      type: { required: true },
      control: "none",
    },
    innerForm: {
      description: "A React component to render within the tooltip", // description
      type: { required: false }, // required prop or not
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
    noLabelText: {
      description:
        "A boolean value, if true, hides label text for headers with tooltips. This is usually a title", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    isModal: {
      description:
        "A boolean value, if true when rendered the tooltip will use `alignModal` rather than `align`", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    labelText: {
      description: "A string that defines the name of the wrapped component",
      type: { required: false }, // required prop or not
      control: "none",
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    children: {
      description: "Child nodes to be displayed within the tooltip",
      type: { required: false }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "ToolTipWrapper is a dynamic wrapper that allows users to dynamically wrap any components with a tooltip.",
      },
    },
  },
};

const ToolTipWrapperStory = ({ ...args }) => {
  return (
    <ToolTipWrapper
      tooltip={{
        content:
          "Password must be at least 15 characters, contain one numeric, one uppercase, and one lowercase character.",
        align: "bottom-left",
      }}
      innerForm={TextInput.PasswordInput}
      // each other param will be inherited by the child component
      id="password"
      labelText="Password"
    />
  );
};

const ToolTipWrapperWithChildrenStory = ({ ...args }) => {
  return (
    <ToolTipWrapper
      tooltip={{
        content: "Write your message for the day here.",
        align: "bottom-left",
      }}
      id="messageOfTheDay"
      labelText="Message of the Day"
    >
      <TextArea
        id="messageOfTheDay"
        labelText="Message of the Day"
        helperText="Enter your desired message here."
      />
    </ToolTipWrapper>
  );
};

export const Default = ToolTipWrapperStory.bind({});
export const ToolTipWrapperWithChildren = ToolTipWrapperWithChildrenStory.bind(
  {}
);
