import React from "react";
import { TitleGroup } from "icse-react-assets";

export default {
  component: TitleGroup,
  title: "Components/Utils/TitleGroup",
  args: {
    hide: false,
  },
  argTypes: {
    hide: {
      description: "A boolean value for if the title group should have a margin bottom added", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      description: "Child nodes to be displayed within the title group",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "TitleGroup is a component that creates a vertically aligned, full-width title.",
      },
    },
  },
};

const TitleGroupStory = ({ ...args }) => {
  return (
    <TitleGroup {...args}>
      <div>Example Title Here</div>
    </TitleGroup>
  );
};

export const Default = TitleGroupStory.bind({});
