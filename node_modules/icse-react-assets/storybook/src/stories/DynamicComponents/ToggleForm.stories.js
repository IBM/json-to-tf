import React from "react";
import { AtrackerForm, ToggleForm } from "icse-react-assets";
import { deepEqual } from "lazy-z";

export default {
  component: ToggleForm,
  title: "Components/Dynamic Components/ToggleForm",
  args: {
    type: "subForm",
    useAddButton: false,
  },
  argTypes: {
    name: {
      description: "A string that defines the name of the toggle form", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    hideName: {
      description:
        "A boolean that defines if a heading of the name above the toggle form should be hidden", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    onDelete: {
      description:
        "A function that defines what occurs on clicking the delete button", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    onSave: {
      description:
        "A function that defines what occurs on clicking the save button", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    onShowToggle: {
      description: "A function that defines what happens when a form is shown", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    index: {
      description: "Index of the form (a number), defaults to 0", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "0" } },
    },
    hide: {
      description: "A boolean that determines if the form is hidden or not", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "true" } },
    },
    submissionFieldName: {
      description:
        "A string value of the field to save, should be similar to the form name", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    propsMatchState: {
      description:
        "A function that returns true if props match component's state", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    disableSave: {
      description: "A function that returns true if save should be disabled", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    forceOpen: {
      description:
        "A function that returns true if the form should be forced open", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "() => { return false; }" } },
    },
    deleteDisabled: {
      description:
        "A function that returns true if the delete button should be disabled", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "() => { return false; }" } },
    },
    deleteDisabledMessage: {
      description:
        "A string message that should be shown when hovering over a disabled delete button", // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    innerFormProps: {
      description: "Props object to add to the innerForm", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    type: {
      description: "The type of form",
      type: { required: true }, // required prop or not
      control: "select",
      options: ["subForm", "formInSubForm"],
      table: { defaultValue: { summary: "subForm" } },
    },
    nullRef: {
      description: "A boolean that defines if there should be no form ref", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    noDeleteButton: {
      description: "A boolean value for if there is no delete button", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    noSaveButton: {
      description: "A boolean value for if there is no save button", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    useAddButton: {
      description:
        "A boolean value for if the add button should be used instead of the edit button", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    tabPanel: {
      description: "Tab panel parameters to display around the form", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    "tabPanel.name": {
      description:
        "String name of the tab panel that should be displayed in the heading", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    "tabPanel.hideFormTitleButton": {
      description:
        "A boolean value that hides the button in the tab panel title if true", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "ToggleForm allows for dynamic rendering of a React element with variable props.",
      },
    },
  },
  decorators: [
    (Story) => <div style={{ width: "80vw", height: "95vh" }}>{Story()}</div>,
  ],
};

const ToggleFormStory = () => {
  function onSave(stateData, componentProps) {
    console.log(stateData, componentProps);
  }

  function propsMatchState(stateData, componentProps) {
    return deepEqual(stateData, componentProps?.data); // dummy example, will not work as stateData is not saved
  }

  function disableSave(stateData, componentProps) {
    return propsMatchState(stateData, componentProps); // dummy example: disable save if no changes - returns false in this example
  }

  return (
    <ToggleForm
      name={"icse-atracker"}
      hideName
      submissionFieldName="atracker"
      innerForm={AtrackerForm}
      innerFormProps={{
        prefix: "icse",
        data: {
          resource_group: "default",
          bucket: "default_bucket",
          cos_key: "default_key",
          add_route: false,
        },
        resourceGroups: ["default", "foo", "bar"],
        cosKeys: ["default_key", "foo", "bar"],
        cosBuckets: ["default_bucket", "foo", "bar"],
      }}
      onSave={onSave}
      propsMatchState={propsMatchState}
      disableSave={disableSave}
      noDeleteButton
      tabPanel={{
        name: "Activity Tracker",
      }}
    />
  );
};

export const Default = ToggleFormStory.bind({});
