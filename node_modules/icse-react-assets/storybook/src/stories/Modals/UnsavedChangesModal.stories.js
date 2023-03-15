import { UnsavedChangesModal } from "icse-react-assets";

export default {
  component: UnsavedChangesModal, // component name
  title: "Components/Modals/UnsavedChangesModal",
  args: {
    // add props in args to make them editable, or add controls in argTypes. These can supply example defaults
    name: "Example Name",
    modalOpen: true,
    onRequestSubmit: () => {}, // place empty functions so these show up as props
    onRequestClose: () => {}, // place empty functions so these show up as props,
    useDefaultUnsavedMessage: true,
  },
  argTypes: {
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
    name: {
      description: "A string value for the name of the resource/form",
      type: { required: true },
      control: "text",
    },
    modalOpen: {
      description: "A boolean value of whether or not the modal is open",
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    useDefaultUnsavedMessage: {
      description:
        "A boolean value, if true, says a form is missing required values. Otherwise displays a message saying there are unsaved changes to a form",
      table: { defaultValue: { summary: "true" } },
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      // need to render docs story in an iframe so that modal doesn't pop out
      inlineStories: false,
      iframeHeight: 250,
      description: {
        component:
          "UnsavedChangesModal is a customized IcseModal that displays a message to a user that there are changes within a form that are unsaved.",
      },
    },
  },
};

const UnsavedChangesModalStory = ({ ...args }) => {
  return <UnsavedChangesModal {...args} />;
};

export const Default = UnsavedChangesModalStory.bind({});
