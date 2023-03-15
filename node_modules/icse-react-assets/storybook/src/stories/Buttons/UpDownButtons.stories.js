import React from "react";
import { UpDownButtons } from "icse-react-assets";

export default {
  component: UpDownButtons,
  title: "Components/Buttons/UpDownButtons",
  args: {
    disableUp: false,
    disableDown: false,
    name: "up-and-down",
    handleUp: () => {},
    handleDown: () => {},
  },
  argTypes: {
    disableUp: {
      description:
        "A boolean value for if the UpDownButtons up button is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
    },
    disableDown: {
      description:
        "A boolean value for if the UpDownButtons up button is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
    },
    name: {
      description:
        "A string value used to ensure button uniqueness when rendered as part of a list", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
    },
    handleUp: {
      description:
        "A function that is called each time the up button is clicked",
      type: { required: true },
    },
    handleDown: {
      description:
        "A function that is called each time the up button is clicked",
      type: { required: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "UpDownButtons is a component that renders up and down buttons designed to allow for items in a list to be shifted up and down.",
      },
    },
  },
};

const UpDownButtonsInputStory = () => {
  let order = [1, 2, 3];
  return (
    <>
      {order.map((i) => (
        <div key={"example-" + i}>
          <span>{i}</span>
          <UpDownButtons
            name={i + "-buttons"}
            handleUp={() => {
              console.log("up");
            }}
            handleDown={() => {
              console.log("down");
            }}
            disableUp={i === 1}
            disableDown={i === 3}
          />
        </div>
      ))}
    </>
  );
};

export const Default = UpDownButtonsInputStory.bind({});
