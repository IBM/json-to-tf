import React from "react";
import { PopoverWrapper } from "icse-react-assets";

export default {
  component: PopoverWrapper,
  title: "Components/Other/PopoverWrapper",
  args: {
    align: "bottom",
    hoverText: "Example Hover Text",
  },
  argTypes: {
    noPopover: {
      description: "A boolean used to not render a popover", // description
      type: { required: true }, // required prop or not
      control: "boolean",
    },
    hoverText: {
      description: "A string of text to displayed on hover", // description
      type: { required: true }, // required prop or not
      control: "text",
    },
    className: {
      description:
        "String of space separated class names to add to the PopoverWrapper",
      type: { required: false }, // required prop or not
      control: "none",
    },
    contentClassName: {
      description:
        "String of space separated class names to add to content within the popover",
      type: { required: false }, // required prop or not
      control: "none",
    },
    align: {
      description:
        "A string describing how the popover should be aligned to its parent element",
      type: { required: false }, // required prop or not
      control: "select",
      options: [
        "bottom",
        "bottom-left",
        "left",
        "top-left",
        "top-right",
        "bottom-right",
        "right",
        "top",
        "left-bottom",
        "left-top",
        "right-bottom",
        "right-top",
      ],
    },
    children: {
      description:
        "Child react node that the PopoverWrapper is rendered around",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "PopoverWrapper is a component that renders a popover around its child elements, showing text on hover.",
      },
    },
  },
};

const PopoverWrapperStory = ({ ...args }) => {
  return (
    <PopoverWrapper {...args}>
      <div>Hover over me to see hovertext!</div>
    </PopoverWrapper>
  );
};

export const Default = PopoverWrapperStory.bind({});
