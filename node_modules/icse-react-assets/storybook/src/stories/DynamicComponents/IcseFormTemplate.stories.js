import React from "react";
import { IcseFormTemplate, SshKeyForm } from "icse-react-assets";

export default {
  component: IcseFormTemplate,
  title: "Components/Dynamic Components/IcseFormTemplate",
  args: {},
  argTypes: {
    name: {
      description:
        "The (string) name to be displayed at the top of the tab panel", // description
      type: { required: true }, // required prop or not
      control: "text",
    },
    addText: {
      description: "A (string) heading for the add modal",
      type: { required: true },
      control: "text",
    },
    hideFormTitleButton: {
      description:
        "A boolean that describes if the title has an add button or not",
      type: { required: true },
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    subHeading: {
      description: "A boolean defining if the heading is a subheading or not",
      type: { required: true },
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    arrayData: {
      description: "An array of objects containing the data for each form",
      type: { required: true }, // required prop or not
      control: "none",
    },
    parentToggle: {
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["parentToggle.callback"]: {
      description: "A callback function to be run when a child form is toggled",
      type: { required: false },
      control: "none",
    },
    ["parentToggle.shownChildren"]: {
      description: "A nested array of indexes of child forms that are shown",
      type: { required: true },
      control: "none",
    },
    onSubmit: {
      description:
        "A function that defines what occurs when a modal is submitted",
      type: { required: true },
    },
    onSave: {
      description: "A function that defines what occurs when the form is saved",
      type: { required: true },
    },
    onDelete: {
      description:
        "A function that defines what occurs when the resource is deleted",
      type: { required: true },
    },
    deleteDisabled: {
      description:
        "A function returns a boolean if the delete button should be disabled",
      type: { required: false },
      control: "none",
    },
    deleteDisabledMessage: {
      description:
        "A function that returns the message that should be displayed on a disabled delete button",
      type: { required: false },
      control: "none",
    },
    docs: {
      description:
        "A function that returns a docs component for the About tab, otherwise renders UnderConstruction component",
      type: { required: false },
      control: "none",
    },
    tooltip: {
      summary: "An optional object describing the tooltip for the input",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["tooltip.content"]: {
      description:
        "A string containing brief, supplemental information for the component it is tied to",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["tooltip.link"]: {
      description:
        "An optional string containing a custom hyperlink to be displayed with the content of the tooltip",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["tooltip.align"]: {
      description:
        'An optional string for tooltip alignment _(`align="top"` default value if no align prop is included)_. For all possible alignment directions refer to carbon components',
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["tooltip.alignModal"]: {
      description:
        "An optional string used to dynamically alternate direction for tooltip text when rendered in modals",
      control: "none",
      type: { required: false }, // required prop or not
    },
    arrayParentName: {
      description: "A string referencing the name of the parent component",
      type: { required: true },
      control: "none",
    },
    isMiddleForm: {
      description:
        "A boolean describing if the form is a middle form (has both parent and child)",
      type: { required: true },
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    propsMatchState: {
      description:
        "A function that returns a single boolean describing whether the form props and the form's state match",
      type: { required: true },
      control: "none",
    },
    disableSave: {
      description:
        "A function that returns a single boolean describing whether the save button should be disabled",
      type: { required: true },
      control: "none",
    },
    innerFormProps: {
      description:
        "An object containing props to be passed to the form being rendered. Must contain disableSave and any callback functions the form requires.",
      control: "none",
      type: { required: true },
    },
    toggleFormProps: {
      description:
        "An object containing props to be passed to the ToggleForm (refer to DynamicComponents/ToggleForm). Must contain disableSave function and propsMatchState function, and any other form props",
      type: { required: true },
      control: "none",
    },
    hideAbout: {
      description:
        "A boolean determining if the create and about buttons should be hidden",
      type: { required: true },
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    toggleFormFieldName: {
      description:
        "A string determining the dynamic value to render as the name for the toggle form for each array item",
      type: { required: true },
      control: "boolean",
      table: { defaultValue: { summary: "name" } },
    },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 250,
      description: {
        component:
          "IcseFormTemplate is a component that contains all of the functionality for a form with tabs, which is toggleable, and also has an optional modal for adding more instances.",
      },
    },
  },
  decorators: [
    (Story) => <div style={{ width: "80vw", height: "95vh" }}>{Story()}</div>,
  ],
};

const IcseFormTemplateStory = () => {
  return (
    <IcseFormTemplate
      name="SSH Keys"
      hideName={true}
      addText="Create an SSH Key"
      subHeading={false}
      hideFormTitleButton={false}
      hideAbout={false}
      arrayData={[
        {
          name: "ssh-key",
          resource_group: "rg1",
          public_key: "test-key",
        },
      ]}
      innerForm={SshKeyForm}
      innerFormProps={{
        resourceGroups: ["rg1", "rg2", "rg3"],
        invalidCallback: () => {
          return false;
        },
        invalidTextCallback: () => {},
        invalidKeyCallback: () => {
          return { invalid: false, invalidText: "" };
        },
      }}
      toggleFormProps={{
        hideName: true,
        name: "ssh-key",
        submissionFieldName: "ssh_keys",
      }}
      onSave={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
      disableSave={function (stateData, componentProps) {
        return false;
      }}
      propsMatchState={function (stateData, componentProps) {
        return false;
      }}
      deleteDisabledMessage={"Example delete message"}
      deleteDisabled={() => {
        return false;
      }}
    />
  );
};

export const Default = IcseFormTemplateStory.bind({});
