import React from "react";
import { SecurityGroupMultiSelect } from "icse-react-assets";

export default {
  component: SecurityGroupMultiSelect,
  title: "Components/MultiSelects/SecurityGroupMultiSelect",
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
    securityGroups: {
      description: "A array (string) of Security Groups", // description
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
      description: "A string label value",
      type: { required: false }, // required prop or not
      control: "text",
    },
    vpc_name: {
      description: "A string for the VPC which the security groups belong to",
      type: { required: false }, // required prop or not
      control: "text",
    },
    invalid: {
      description:
        'A boolean value for checking if any input values are invalid. Any `null` or unselected value `""` will always be considered invalid unless invalid checking is disabled', // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    invalidText: {
      description: "A string value that displays if there is invalid input", // description
      type: { required: true }, // required prop or not
      control: "text",
      table: { defaultValue: { summary: "Invalid value" } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SecurityGroupMultiSelect is a multi select that handles the selection of Security Groups within a form",
      },
    },
  },
};

const SecurityGroupMultiSelectStory = ({ ...args }) => {
  return (
    <div>
      <SecurityGroupMultiSelect
        {...args}
        id="test"
        initialSelectedItems={[]}
        vpc_name="test"
        onChange={(selectedItems) => {
          console.log(selectedItems);
        }}
        securityGroups={["one", "two"]}
      />
    </div>
  );
};

export const Default = SecurityGroupMultiSelectStory.bind({});
