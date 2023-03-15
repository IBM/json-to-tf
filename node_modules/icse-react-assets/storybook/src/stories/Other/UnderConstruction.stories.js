import React from "react";
import { UnderConstruction } from "icse-react-assets";

export default {
  component: UnderConstruction,
  title: "Components/Other/UnderConstruction",
  parameters: {
    docs: {
      description: {
        component:
          "UnderConstruction is a component for the body of a page which is navigable but not implemented",
      },
    },
  },
};

const UnderConstructionExampleStory = () => {
  return <UnderConstruction />;
};

export const Default = UnderConstructionExampleStory.bind({});
