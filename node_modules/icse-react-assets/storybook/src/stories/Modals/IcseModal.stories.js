import { IcseModal } from "icse-react-assets";

export default {
  component: IcseModal, // component name
  title: "Components/Modals/IcseModal",
  args: {
    // add props in args to make them editable, or add controls in argTypes. These can supply example defaults
    heading: "Example Modal",
    primaryButtonText: "Submit",
    open: true,
    onRequestSubmit: () => {}, // place empty functions so these show up as props
    onRequestClose: () => {}, // place empty functions so these show up as props,
  },
  argTypes: {
    primaryButtonText: {
      description:
        "A string to override the text on the primary button of the modal", // description
      type: { required: true }, // required prop or not
      control: "text", // what type of value we can set
    },
    secondaryButtonText: {
      description:
        "A string to override the text on the secondary button of the modal",
      type: { required: false },
      table: { defaultValue: { summary: "Cancel" } },
      control: "text",
    },
    primaryButtonDisabled: {
      description:
        "A boolean value for if the primary button should be disabled",
      type: { required: true },
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    danger: {
      description:
        "A boolean value for if the primary button should be the type `danger`",
      type: { required: true },
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    alert: {
      description: "A boolean value for if the modal is displaying an alert",
      type: { required: true },
      control: "boolean",
    },
    heading: {
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
    id: {
      description: "A string value of the modal's id",
      type: { required: false },
      control: "text",
    },
    open: {
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
      iframeHeight: 250,
      description: {
        component:
          "IcseModal is a component that allows the developer to create a fully customizable modal.",
      },
    },
  },
};

const IcseModalStory = ({ ...args }) => {
  return (
    <IcseModal {...args}>
      <div>ICSE Modal Content</div>
    </IcseModal>
  );
};

export const Default = IcseModalStory.bind({});
