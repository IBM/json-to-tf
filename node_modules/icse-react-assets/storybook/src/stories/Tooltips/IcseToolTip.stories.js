import React from "react";
import { IcseToolTip, TitleGroup } from "icse-react-assets";

export default {
  component: IcseToolTip,
  title: "Components/Tooltips/IcseToolTip",
  args: {
    align: "right",
    link: "https://savetheearth.org/",
    content: "The world says hello!",
  },
  argTypes: {
    content: {
      description:
        "A string containing brief, supplemental information for the component it is tied to",
      control: "text",
      type: { required: true }, // required prop or not
    },
    align: {
      description:
        "An optional string for tooltip alignment. Works with all possible carbon component alignments",
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
      ],
      table: { defaultValue: { summary: "top" } },
    },
    link: {
      description:
        "An optional string contaning a custom hyperlink to be displayed with the content of the tooltip", // description
      type: { required: false }, // required prop or not
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "IcseToolTip is a component that houses a dynamic heading for a page and will align any buttons passed to it to the right side of the page",
      },
    },
  },
};

const IcseToolTipStory = ({ ...args }) => {
  return (
    <TitleGroup>
      Hello World
      <IcseToolTip {...args} />
    </TitleGroup>
  );
};

export const Default = IcseToolTipStory.bind({});
