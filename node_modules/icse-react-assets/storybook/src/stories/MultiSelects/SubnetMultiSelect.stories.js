import React from "react";
import { SubnetMultiSelect } from "icse-react-assets";

export default {
  component: SubnetMultiSelect,
  title: "Components/MultiSelects/SubnetMultiSelect",
  args: {
    onChange: () => {},
    disabled: false,
    label: "Select Security Groups",
    invalid: false,
    invalidText: "Select at least one security group.",
  },
  argTypes: {
    id: {
      description: "A string value representing the text input's id",
      type: { required: true },
      control: "none",
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    initialSelectedItems: {
      description: "An array of items that are initially selected", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    subnets: {
      description: "A array (string) of Subnets", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "[]" } },
    },
    onChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    disabled: {
      description: "A boolean value that will disable this component if true", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      description: "Generic label that will be used as the textual representation of what this field is for",
      type: { required: false }, // required prop or not
      control: "text",
    },
    vpc_name: {
      description: "A string for the VPC which the security groups belong to",
      type: { required: false }, // required prop or not
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SubnetMultiSelect is a multi select that handles the selection of Subnets within a form",
      },
    },
  },
};

const SubnetMultiSelectStory = ({ ...args }) => {
  return (
    <div>
      <SubnetMultiSelect
        {...args}
        id="test"
        initialSelectedItems={[]}
        vpc_name="test"
        onChange={(selectedItems) => {
          console.log(selectedItems);
        }}
        subnets={["a", "b", "c"]}
      />
    </div>
  );
};

export const Default = SubnetMultiSelectStory.bind({});
