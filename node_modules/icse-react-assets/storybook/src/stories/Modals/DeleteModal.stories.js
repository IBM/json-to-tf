import { DeleteModal } from "icse-react-assets";

export default {
  component: DeleteModal, // component name
  title: "Components/Modals/DeleteModal",
  args: {
    // add props in args to make them editable, or add controls in argTypes. These can supply example defaults
    name: "Example Name",
    modalOpen: true,
    onRequestSubmit: () => {}, // place empty functions so these show up as props
    onRequestClose: () => {}, // place empty functions so these show up as props,
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
  },
  parameters: {
    docs: {
      // need to render docs story in an iframe so that modal doesn't pop out
      inlineStories: false,
      iframeHeight: 250,
      description: {
        component:
          "DeleteModal is a customized IcseModal that displays a message to a user to confirm deletion of an object.",
      },
    },
  },
};

const DeleteModalStory = ({ ...args }) => {
  return <DeleteModal {...args} />;
};

export const Default = DeleteModalStory.bind({});
