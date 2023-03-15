import React from "react";
import { IamAccountSettingsForm } from "icse-react-assets";

export default {
  component: IamAccountSettingsForm,
  title: "Components/Forms/IamAccountSettingsForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.if_match"]: {
      description: "A number or string of the version",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.mfa"]: {
      description:
        "A string value representing the type of MFA. Can be `NONE`, `TOTP`, `TOTP4ALL`, `Email-Based MFA`, `TOTP MFA`, or `U2F MFA`",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.include_history"]: {
      description:
        "A boolean value to define if the entity history is included in response",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.restrict_create_service_id"]: {
      description:
        "A string value to restrict creation of service ids. Can be `Yes`, `No`, or `Unset`",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.restrict_create_platform_apikey"]: {
      description:
        "A string value to restrict creation of platform API keys. Can be `Yes`, `No`, or `Unset`",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.max_sessions_per_identity"]: {
      description:
        "A number or string value of the maximum value of sessions per identity",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.allowed_ip_addresses"]: {
      description:
        "A comma separated list (string) of the allowed IP addresses",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.session_expiration_in_seconds"]: {
      description:
        "A number or string value for the session expiration in seconds within the range [900, 86400]",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.session_invalidation_in_seconds"]: {
      description:
        "A number or string value for the session invalidation in seconds within the range [900, 7200]",
      control: "none",
      type: { required: false }, // required prop or not
    },
    isModal: {
      description:
        "A boolean value that specifies if the form is a component within a modal",
      type: { required: false }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } },
    },
    invalidCallback: {
      description:
        "A function to determine if the value supplied is invalid and returns a single boolean",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description:
        "A function to determine the invalid text displayed to the user and returns the string to display",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "IamAccountSettingsForm is a form component that provides functionality for editing IAM Account settings",
      },
    },
  },
};

const IamAccountSettingsFormStory = () => {
  function invalidCallback(field, stateData) {
    return (
      field === "max_sessions_per_identity" &&
      (stateData.max_sessions_per_identity < 1 ||
        stateData.max_sessions_per_identity > 10)
    );
  }

  function invalidTextCallback(field) {
    return field === "max_sessions_per_identity"
      ? "Value must be in range [1-10]"
      : "Invalid";
  }

  return (
    <IamAccountSettingsForm
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      data={{
        include_history: true,
        if_match: 2,
        mfa: "NONE",
        restrict_create_service_id: "Yes",
        restrict_create_platform_apikey: "Yes",
        max_sessions_per_identity: 1,
        session_expiration_in_seconds: 1000,
        session_invalidation_in_seconds: 1000,
        allowed_ip_addresses: "",
      }}
    />
  );
};

export const Default = IamAccountSettingsFormStory.bind({});
