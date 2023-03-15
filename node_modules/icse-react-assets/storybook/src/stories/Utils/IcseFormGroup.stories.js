import React from "react";
import { IcseFormGroup } from "icse-react-assets";
import { TextInput } from "@carbon/react";

export default {
  component: IcseFormGroup,
  title: "Components/Utils/IcseFormGroup",
  args: {
    noMarginBottom: false,
  },
  argTypes: {
    noMarginBottom: {
      description:
        "A boolean value for if the form group should have a margin applied on the bottom", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
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
          "IcseFormGroup is a component that creates a row of evenly spaced child components.",
      },
    },
  },
};

const IcseFormGroupStory = ({ ...args }) => {
  return (
    <IcseFormGroup {...args}>
      <TextInput labelText="Example 1" id="example-1"></TextInput>
      <TextInput labelText="Example 2" id="example-2"></TextInput>
    </IcseFormGroup>
  );
};

export const Default = IcseFormGroupStory.bind({});
