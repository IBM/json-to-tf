import React, { useState } from "react";
import { StatelessToggleForm, SaveAddButton } from "icse-react-assets";
import { TextInput } from "@carbon/react";

export default {
  component: StatelessToggleForm,
  title: "Components/Utils/StatelessToggleForm",
  args: {
    subHeading: false,
    hide: false,
    iconType: "edit",
    onIconClick: () => {},
    name: "Example Toggle Form",
    toggleFormTitle: false,
    alwaysShowButtons: false,
    hideTitle: false,
  },
  argTypes: {
    name: {
      description: "A string value which defines the text in the heading", // description
      type: { required: true }, // required prop or not
      control: "text",
    },
    subHeading: {
      description:
        "A boolean defining if the heading is a subHeading or not (defaults to `false`)", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    hide: {
      description: "A boolean value defining if the children are hidden", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      description: "Child nodes to be displayed within the title group",
      type: { required: true }, // required prop or not
      control: "none",
    },
    buttons: {
      description:
        "A react node that contains the buttons to be shown in the heading",
      type: { required: true }, // required prop or not
      control: "none",
    },
    iconType: {
      description:
        "A string value defining the type of the icon, options are `add` and `edit`. Defaults to `edit`",
      type: { required: true }, // required prop or not
      control: "select",
      options: ["edit", "add"],
    },
    onIconClick: {
      description:
        "A function that defines what happens when the icon is clicked",
      type: { required: true }, // required prop or not
      control: "none",
    },
    toggleFormTitle: {
      description:
        "A boolean value defining if this is a title of a toggleForm", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    alwaysShowButtons: {
      description:
        "A boolean value defining if the buttons should always be shown or only shown if the form is opened ", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    hideTitle: {
      description: "Hide the surrounding toggle form and render only children", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "StatelessToggleForm is a component that creates a row of evenly spaced child components.",
      },
    },
  },
};

const StatelessToggleFormStory = ({ ...args }) => {
  const [open, setOpen] = useState(false);
  return (
    <StatelessToggleForm
      {...args}
      onIconClick={() => setOpen(!open)} // toggle open or closed
      hide={!open} // hidden if not open
      buttons={<SaveAddButton type="save" noDeleteButton />}
    >
      <TextInput id="example" labelText="Example Form" />
    </StatelessToggleForm>
  );
};

export const Default = StatelessToggleFormStory.bind({});
