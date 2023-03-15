import { FormModal, UnderConstruction } from "icse-react-assets";
import React from "react";

export default {
  component: FormModal, // component name
  title: "Components/Modals/FormModal",
  args: {
    // add props in args to make them editable, or add controls in argTypes. These can supply example defaults
    name: "Example FormModal",
    show: true,
    onRequestSubmit: () => {}, // place empty functions so these show up as props
    onRequestClose: () => {}, // place empty functions so these show up as props,
  },
  argTypes: {
    name: {
      description: "A string value for the heading of the modal",
      type: { required: true },
      control: "text",
    },
    onRequestSubmit: {
      description:
        "A function that defines what should occur when the modal is submitted",
      type: { required: false },
      control: "none",
    },
    onRequestClose: {
      description:
        "A function that defines what should occur when the modal is closed",
      type: { required: false },
      control: "none",
    },
    show: {
      description: "A boolean value of whether or not the modal is open",
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    children: {
      description: "Child nodes for displaying within the modal",
      type: { required: true },
      control: "none",
    },
  },
  parameters: {
    docs: {
      // need to render docs story in an iframe so that modal doesn't pop out
      inlineStories: false,
      iframeHeight: 375,
      description: {
        component:
          "FormModal is a modal component that wraps a form and performs an action on submit. It expects a stateful child component (such as a form).",
      },
      source: {
        type: "code",
      },
    },
  },
};

const FormModalExample = ({ ...args }) => {
  class ExampleStatefulComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return <UnderConstruction />;
    }
  }
  return (
    <FormModal {...args}>
      <ExampleStatefulComponent />
    </FormModal>
  );
};

export const Default = FormModalExample.bind({});
