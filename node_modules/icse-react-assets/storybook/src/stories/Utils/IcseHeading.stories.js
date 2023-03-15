import React from "react";
import { IcseHeading, SaveAddButton } from "icse-react-assets";

export default {
  component: IcseHeading,
  title: "Components/Utils/IcseHeading",
  args: {
    name: "Example Heading",
    type: "heading",
  },
  argTypes: {
    type: {
      description:
        "The type of the heading, can be `heading` (h4), `subHeading` (h5), or `p`. Defaults to `heading`",
      type: { required: true }, // required prop or not
      control: "select",
      options: ["heading", "subHeading", "p"],
    },
    name: {
      description: "A string value which defines the text in the heading", // description
      type: { required: true }, // required prop or not
      control: "text",
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    buttons: {
      description:
        "A react node that contains any buttons that should be displayed in the heading",
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
          "IcseHeading is a component that houses a dynamic heading for a page and will align any buttons passed to it to the right side of the page",
      },
    },
  },
};

const IcseHeadingStory = ({ ...args }) => {
  return (
    <IcseHeading
      {...args}
      buttons={<SaveAddButton type="add" noDeleteButton />}
    />
  );
};

const IcseHeadingWithTooltipStory = ({ ...args }) => {
  return (
    <IcseHeading
      {...args}
      buttons={<SaveAddButton type="add" noDeleteButton />}
      tooltip={{
        content: "Example tooltip",
        align: "right"
      }}
    />
  );
};

export const Default = IcseHeadingStory.bind({});
export const HeadingWithTooltip = IcseHeadingWithTooltipStory.bind({});
