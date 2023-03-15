import React from "react";
import { VpcListMultiSelect } from "icse-react-assets";

export default {
  component: VpcListMultiSelect,
  title: "Components/MultiSelects/VpcListMultiSelect",
  args: {
    onChange: () => {},
    invalid: false,
    titleText: "VPCs",
  },
  argTypes: {
    id: {
      description: "A string value representing the text input's id",
      type: { required: true },
      control: "none",
    },
    initialSelectedItems: {
      description: "An array of items that are initially selected", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    vpcList: {
      description: "A array (string) of VPCs", // description
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
    label: {
      description: "A string label value",
      type: { required: false }, // required prop or not
      control: "text",
    },
    titleText: {
      description: "String name for the title of the multiselect",
      type: { required: true },
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "VpcListMultiSelect is a multi select that handles the selection of VPCs within a form",
      },
    },
  },
};

const VpcListMultiSelectStory = ({ ...args }) => {
  return (
    <div>
      <VpcListMultiSelect
        {...args}
        id="test"
        initialSelectedItems={[]}
        onChange={(selectedItems) => {
          console.log(selectedItems);
        }}
        vpcList={["a", "b"]}
      />
    </div>
  );
};

export const Default = VpcListMultiSelectStory.bind({});
