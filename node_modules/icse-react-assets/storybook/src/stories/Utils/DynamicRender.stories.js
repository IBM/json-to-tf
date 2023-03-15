import React from "react";
import { DynamicRender } from "icse-react-assets";

export default {
  component: DynamicRender,
  title: "Components/Utils/DynamicRender",
  args: {
    hide: false,
  },
  argTypes: {
    hide: {
      description: "A boolean value, when true the component will be hidden", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    show: {
      description: "React Elements to be shown when `hide` is false",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "DynamicRender allows users to dynamically show or hide an element.",
      },
    },
  },
};

const DynamicRenderStory = ({ ...args }) => {
  return (
    <DynamicRender
      {...args}
      show={<div>If you see this, element is not hidden</div>}
    />
  );
};

export const Default = DynamicRenderStory.bind({});
