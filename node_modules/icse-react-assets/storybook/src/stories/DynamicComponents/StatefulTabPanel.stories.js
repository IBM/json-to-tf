import React from "react";
import { AtrackerForm, StatefulTabPanel } from "icse-react-assets";

export default {
  component: StatefulTabPanel,
  title: "Components/Dynamic Components/StatefulTabPanel",
  args: {
    name: "Example Tab Panel",
    subHeading: false,
    hideFormTitleButton: false,
    hideAbout: false,
    hasBuiltInHeading: false,
  },
  argTypes: {
    name: {
      description: "A string that defines the name of the toggle form", // description
      type: { required: true }, // required prop or not
      control: "text",
    },
    subHeading: {
      description:
        "A boolean value for if the heading is a subheading (h5) or heading (h4)", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    tooltip: {
      summary: "An optional object describing the tooltip for a title",
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
    hideFormTitleButton: {
      description:
        "A boolean value that describes if the button in the form title should be hidden", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "none" } },
    },
    hideAbout: {
      description: 'A boolean value for if the "About" tab should be hidden', // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    hasBuiltInHeading: {
      description:
        "A boolean value for if the form has a heading built into it", // description
      type: { required: true }, // required prop or not
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onClick: {
      description:
        "A function that is called each time the  add button is clicked",
      type: { required: true },
      control: "none",
    },
    shouldDisableSave: {
      description:
        'A function that describes if the "save" button should be disabled on the page. Must return a boolean', // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    about: {
      description:
        "A React node to render within the about pane of the tab panel", // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    form: {
      description: "A React node to render in the `Create` tab", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "StatefulTabPanel allows for the dynamic creation of a tab panel with an inner form where the displayed index is stored.",
      },
    },
  },
  decorators: [
    (Story) => <div style={{ width: "80vw", height: "95vh" }}>{Story()}</div>,
  ],
};

const StatefulTabPanelComponentStory = () => {
  const ExampleAboutComponent = () => {
    return (
      <div style={{ textAlign: "left" }}>
        <p>This is an example about document</p>
      </div>
    );
  };
  return (
    <StatefulTabPanel
      name="Example Tab Panel"
      type="heading"
      about={<ExampleAboutComponent />}
      form={
        <AtrackerForm
          prefix="example"
          data={{ key_name: "test-key", keys: ["foo", "bar"] }}
          invalidCallback={() => {
            return false;
          }}
          invalidTextCallback={() => {
            return "invalid";
          }}
        />
      }
    />
  );
};

const StatefulTabPanelStory = ({ ...args }) => {
  const ExampleAboutComponent = () => {
    return (
      <div style={{ textAlign: "left" }}>
        <p>This is an example about document</p>
      </div>
    );
  };
  return (
    <StatefulTabPanel
      {...args}
      about={<ExampleAboutComponent />}
      form={
        <AtrackerForm
          prefix="example"
          data={{ key_name: "test-key", keys: ["foo", "bar"] }}
          invalidCallback={() => {
            return false;
          }}
          invalidTextCallback={() => {
            return "invalid";
          }}
        />
      }
    />
  );
};

export const Default = StatefulTabPanelStory.bind({});
export const ComponentExample = StatefulTabPanelComponentStory.bind({});
