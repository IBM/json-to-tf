import React from "react";
import { LocationsMultiSelect } from "icse-react-assets";

export default {
  component: LocationsMultiSelect,
  title: "Components/MultiSelects/LocationsMultiSelect",
  args: {
    onChange: () => {},
    invalid: false,
  },
  argTypes: {
    id: {
      description: "A string value representing the text input's id",
      type: { required: true },
      control: "none",
    },
    initialSelectedItems: {
      description: "An array of items that are initially selected", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    region: {
      description: "A string name of a region", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    onChange: {
      description:
        "A function which determines what happens when the selected input is changed", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "LocationsMultiSelect is a multiselect that handles the selection of locations from `global` and the region provided within a form",
      },
    },
  },
};

const LocationsMultiSelectStory = () => {
  return (
    <LocationsMultiSelect
      id="example-id"
      onChange={(selectedItems) => {
        console.log(selectedItems);
      }}
      region="us-south"
    />
  );
};

export const Default = LocationsMultiSelectStory.bind({});
