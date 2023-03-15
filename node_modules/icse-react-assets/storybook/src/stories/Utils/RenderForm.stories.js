import React from "react";
import { RenderForm } from "icse-react-assets";

export default {
  component: RenderForm,
  title: "Components/Utils/RenderForm",
  args: {},
  argTypes: {
    form: {
      description: "A React Node to render with props", // description
      type: { required: true }, // required prop or not
    },
    formProps: {
      description: "Arbitrary props with which to render the form",
      type: { required: false }, // required prop or not
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "RenderForm allows for dynamic rendering of a React element with variable props.",
      },
    },
  },
};

const RenderFormStory = () => {
  let TestForm = (props) => {
    return <h3>hello {props.name}</h3>;
  };
  return RenderForm(TestForm, { name: "world" });
};

export const Default = RenderFormStory.bind({});
