import React from "react";
import { IcseSubForm, IcseFormGroup } from "icse-react-assets";
import { TextInput } from "@carbon/react";

export default {
  component: IcseSubForm,
  title: "Components/Utils/IcseSubForm",
  args: {
    formInSubForm: false,
    id: "my-component-id",
  },
  argTypes: {
    id: {
      description: "A string that represents a unique id for the subForm",
      type: { required: true }, // required prop or not
      control: "none",
    },
    formInSubForm: {
      description:
        "A boolean that represents if this subform is within another subform, which changes the background to white", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: {defaultValue: {summary: "false"}}
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
          "IcseSubForm is a component that houses a form and applies a background and padding to surround the form elements",
      },
    },
  },
};

const IcseSubFormStory = ({ ...args }) => {
  return (
    <IcseSubForm {...args}>
      <IcseFormGroup {...args}>
        <TextInput labelText="Example 1" id="example-1"></TextInput>
        <TextInput labelText="Example 2" id="example-2"></TextInput>
      </IcseFormGroup>
    </IcseSubForm>
  );
};

export const Default = IcseSubFormStory.bind({});
