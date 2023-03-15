import React from "react";
import { IcseMultiSelect } from "icse-react-assets";

export default {
  component: IcseMultiSelect,
  title: "Components/MultiSelects/IcseMultiSelect",
  args: {
    titleText: "Example Mutliselect",
    disabled: false,
    invalid: false,
    invalidText: "Invalid value",
    useTitleInItem: false,
    onChange: () => {},
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
    titleText: {
      description: "String name for the title of the multiselect",
      type: { required: true },
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
    initialSelectedItems: {
      description: "An array of items that are initially selected", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    disabled: {
      description: "A boolean value that will disable this component if true", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    items: {
      description: "An array (string) of items to appear in the dropdown", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "[]" } },
    },
    useTitleInItem: {
      description:
        "A boolean value that will include the title in each item name if true", // description
      type: { required: false }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    label: {
      description: "A string label value",
      type: { required: false }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "IcseMultiSelect allows users to render MultiSelects",
      },
    },
  },
};

const IcseMultiSelectStory = ({ ...args }) => {
  return (
    <div>
      <IcseMultiSelect
        {...args}
        id="test-icse"
        initialSelectedItems={["1"]}
        onChange={(event) => {
          console.log(event);
        }}
        items={["1", "2", "3", "4"]}
      />
    </div>
  );
};

export const Default = IcseMultiSelectStory.bind({});
