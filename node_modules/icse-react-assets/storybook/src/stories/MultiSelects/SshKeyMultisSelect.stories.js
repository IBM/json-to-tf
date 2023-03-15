import React from "react";
import { SshKeyMultiSelect } from "icse-react-assets";

export default {
  component: SshKeyMultiSelect,
  title: "Components/MultiSelects/SshKeyMultiSelect",
  args: {
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
    initialSelectedItems: {
      description: "An array of items that are initially selected", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    sshKeys: {
      description: "A array (string) of SSH keys", // description
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
  },
  parameters: {
    docs: {
      description: {
        component:
          "SshKeyMultiSelect is a multi select that handles the selection of SSH Keys within a form",
      },
    },
  },
};

const SshKeyMultiSelectStory = ({ ...args }) => {
  return (
    <div>
      <SshKeyMultiSelect
        id="test"
        sshKeys={["a", "b", "c"]}
        onChange={(selectedItems) => {
          console.log(selectedItems);
        }}
        initialSelectedItems={["a"]}
      />
    </div>
  );
};

export const Default = SshKeyMultiSelectStory.bind({});
