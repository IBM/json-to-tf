import React from "react";
import { DynamicToolTipWrapper } from "icse-react-assets";
import { TextInput, TextArea } from "@carbon/react";

export default {
  component: DynamicToolTipWrapper,
  title: "Components/Tooltips/DynamicToolTipWrapper",
  argTypes: {
    innerForm: {
      description:
        "React node for which the tooltip is rendered. `innerForm` will not be rendered if `children` are passed to the component", // description
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
          "DynamicToolTipWrapper is a variation of ToolTipWrapper, that makes the tooltip object optional, but still allows you to pass props through to custom components and forms",
      },
    },
  },
};

const DynamicToolTipWrapperStory = () => {
  let ExampleComponent = () => {
    return <h4>Hello World</h4>;
  };
  return (
    <DynamicToolTipWrapper
      tooltip={{
        content: "The world says hello!",
        link: "https://savetheearth.org/",
        align: "right",
      }}
      id="helloWorld"
      innerForm={ExampleComponent}
      noLabelText
    />
  );
};

const DynamicToolTipWrapperWithChildrenStory = () => {
  return (
    <DynamicToolTipWrapper
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
    </DynamicToolTipWrapper>
  );
};

const DynamicToolTipWrapperWithoutToolTipStory = () => {
  return (
    <DynamicToolTipWrapper
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
    </DynamicToolTipWrapper>
  );
};

export const Default = DynamicToolTipWrapperStory.bind({});
export const DynamicToolTipWrapperWithChildren =
  DynamicToolTipWrapperWithChildrenStory.bind({});
export const DynamicToolTipWrapperWithoutToolTip =
  DynamicToolTipWrapperWithoutToolTipStory.bind({});
