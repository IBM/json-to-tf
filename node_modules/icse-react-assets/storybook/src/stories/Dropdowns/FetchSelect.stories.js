import React, { useState } from "react";
import { FetchSelect } from "icse-react-assets";

export default {
  component: FetchSelect,
  title: "Components/Dropdowns/FetchSelect",
  args: {},
  argTypes: {
    value: {
      description:
        "The current value that is saved by the Select (can be null)", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    formName: {
      description: "String for the form which the FetchSelect belongs to", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    className: {
      description: "String of space separated class names to add to the group",
      type: { required: false }, // required prop or not
      control: "none",
    },
    groups: {
      description: "An array of objects to select from", // description
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "[]" } },
    },
    handleInputChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    name: {
      description: "A string for the name of the component",
      type: { required: true }, // required prop or not
      control: "none",
    },
    url: {
      description: "String value for the endpoint of the fetch call",
      type: { required: true }, // required prop or not
      control: "none",
    },
    onReturnFunction: {
      description:
        "Function which accepts one parameter (data) and is called before data is set to the state",
      type: { required: false },
      control: "none",
    },
    filter: {
      description:
        "Function which accepts one parameter (array) and can be used to filter the groups within the dropdown",
      type: { required: false },
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "FetchSelect is a customized IcseSelect component which allows users to create a dropdown with the results of a fetch API call",
      },
    },
  },
};

const FetchSelectStory = () => {
  const [value, setValue] = useState("");
  function onReturnFunction(data) {
    // to manipulate the data on return, add code here
  }
  function filter(item) {
    // when items are rendered as part of a select this function
    // will be called as part of Array.prototype.filter:
    // this.state.data.filter(this.props.filter)
  }
  return (
    <div>
      <FetchSelect
        labelText="Fetch"
        name="Fetch Select"
        apiEndpoint="/my/api/endpoint"
        handleInputChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
        formName="playground"
        onReturnFunction={onReturnFunction}
        filter={filter}
      />
    </div>
  );
};

export const Default = FetchSelectStory.bind({});
