import React from "react";
import { TeleportClaimToRoleForm } from "icse-react-assets";

export default {
  component: TeleportClaimToRoleForm,
  title: "Components/Forms/TeleportClaimToRoleForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false },
      control: "none",
    },
    ["data.email"]: {
      description: "A string value for the email of the Teleport Claim to Role instance",
      control: "none",
      type: { required: true },
    },
    ["data.roles"]: {
      description:
        "An array (string) of roles for the Teleport Claim to Role instance",
      control: "none",
      type: { required: true },
    },
    invalidRolesCallback: {
      description:
        "A function to determine if the roles supplied is invalid and returns a boolean",
      type: { required: true },
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "TeleportClaimToRoleForm is a form component that provides functionality for editing a Teleport Claim to Role instance",
      },
    },
  },
};

const TeleportClaimToRoleFormStory = () => {
  function validRoles(roles) {
    return roles.length === 0 || roles[0].length >= 6;
  }
  
  function invalidRolesCallback(stateData) {
    return !validRoles(stateData.roles);
  }

  return (
    <TeleportClaimToRoleForm
      data={{
        email: "icse@ibm.com",
        roles: ["writer"],
      }}
      invalidRolesCallback={invalidRolesCallback}
    />
  );
};

export const Default = TeleportClaimToRoleFormStory.bind({});
