import React from "react";
import { EditCloseIcon } from "icse-react-assets";
import { useState } from "react";

export default {
  component: EditCloseIcon,
  title: "Components/Buttons/EditCloseIcon",
  args: {
    disabled: false,
    hoverText: "EditCloseIcon",
    open: false,
    onClick: () => {},
    type: "edit",
  },
  argTypes: {
    disabled: {
      description: "A boolean value for if the EditCloseIcon is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "boolean", // what type of value we can set
    },
    open: {
      description:
        "A boolean value for if the EditCloseIcon is opened. Defaults to false", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "boolean", // what type of value we can set
    },
    hoverText: {
      description:
        "An optional string that is displayed when the cursor is hovering over the button", // description
      type: { required: false }, // required prop or not
      control: "text", // what type of value we can set
    },
    onClick: {
      description: "A function that is called each time the button is clicked",
      type: { required: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "EditCloseIcon is a dynamic toggle to handle the toggling of an open form between `edit` and `close`.",
      },
    },
  },
};

const EditCloseIconInputStory = ({ ...args }) => {
  const [value, setValue] = useState(false);
  return (
    <EditCloseIcon
      {...args}
      open={value}
      onClick={() => setValue(!value)}
    />
  );
};

const AddCloseIconInputStory = ({ ...args }) => {
  const [value, setValue] = useState(false);
  return (
    <EditCloseIcon
      {...args}
      type="add"
      open={value}
      onClick={() => setValue(!value)}
    />
  );
};

export const Default = EditCloseIconInputStory.bind({});
export const Add = AddCloseIconInputStory.bind({});
