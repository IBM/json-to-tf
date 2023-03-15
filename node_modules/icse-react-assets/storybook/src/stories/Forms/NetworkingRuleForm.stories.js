import React from "react";
import { NetworkingRuleForm } from "icse-react-assets";
import { contains } from "lazy-z";

export default {
  component: NetworkingRuleForm,
  title: "Components/Forms/NetworkingRuleForm",
  argTypes: {
    disableUp: {
      description:
        "A boolean value for if the UpDownButtons up button is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "none",
    },
    disableDown: {
      description:
        "A boolean value for if the UpDownButtons up button is disabled", // description
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "false" } }, // default value
      control: "none",
    },
    handleUp: {
      description:
        "A function that is called each time the up button is clicked. Required when `isModal` is false",
      type: { required: false },
      control: "none",
    },
    handleDown: {
      description:
        "A function that is called each time the up button is clicked. Required when `isModal` is false",
      type: { required: false },
      control: "none",
    },
    invalidCallback: {
      description: "A function to determine if the rule name is invalid",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description:
        "A function to determine the invalid text to display when a rule name is invalid",
      type: { required: true }, // required prop or not
      control: "none",
    },
    isModal: {
      description: "Boolean value for if the form is a modal or not",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    onSave: {
      description:
        "A function that defines what occurs when the form is saved. Required when `isModal` is false",
      type: { required: false },
      control: "none",
    },
    onDelete: {
      description:
        "A function that defines what occurs when the resource is deleted. Required when `isModal` is false",
      type: { required: false },
      control: "none",
    },
    hide: {
      description:
        "Boolean value for if the toggle form should be hidden. Used only when not modal",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    isSecurityGroup: {
      description:
        "Boolean value for if the rule is a security group rule. When false, the form will render for Network ACL rule configuration.",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    disableSaveCallback: {
      description:
        "Callback function that accepts two parameters `stateData` and `componentProps`. `disableSaveCallback` is used only in non-modal rule forms. Returns a boolean",
      type: { required: false }, // required prop or not
      control: "none",
    },
    data: {
      summary: "An optional object",
      type: { required: false }, // required prop or not
      control: "none",
    },

    ["data.name"]: {
      description: "A string specifying the name of the networking rule",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.action"]: {
      description:
        "String used for action for Network ACL rules. Can be `allow` or `deny`",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.direction"]: {
      description:
        "A string value of traffic direction for rule, can be `inbound` or `outbound`",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.source"]: {
      description: "String value vor IPV4 CIDR block source",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.destination"]: {
      description:
        "String value vor IPV4 CIDR block source. Used only for Network ACL rules",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.ruleProtocol"]: {
      description:
        "String value for rule protocol. Can be `all`, `tcp`, `udp`, or `icmp`",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule"]: {
      description: "Object describing port configuration for rule",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule.port_max"]: {
      description: "Port Max for rule",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule.port_min"]: {
      description: "Port Min for rule",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule.source_port_max"]: {
      description: "Source Port Max for rule. Used only for ACL rules",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule.source_port_min"]: {
      description: "Source Port Min for rule. Used only for ACL rules",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule.type"]: {
      description: "Type for icmp rule",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.rule.code"]: {
      description: "Code for icmp rule",
      control: "none",
      type: { required: true }, // required prop or not
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "NetworkingRuleForm allows for the editing and creation of networking rules",
      },
    },
  },
};

const NetworkingRuleFormStory = () => {
  function handleCardUp() {
    // handle card up
  }
  function handleCardDown() {
    // handle card up
  }

  function onToggle() {
    // handle toggle for open closed
  }

  function invalidCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Rule name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function shouldDisableSave(stateData, componentProps) {
    return true;
  }
  return (
    <NetworkingRuleForm
      handleCardUp={handleCardUp}
      handleCardDown={handleCardDown}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      shouldDisableSave={shouldDisableSave}
      onToggle={onToggle}
      data={{
        name: "example-rule",
        destination: "1.2.3.4/5",
        source: "1.2.3.4/5",
        action: "allow",
        direction: "inbound",
        rule: {
          port_min: 8080,
          port_max: 8080,
          source_port_min: 8080,
          source_port_max: null,
          type: null,
          code: null,
        },
        ruleProtocol: "tcp",
      }}
    />
  );
};

const NetworkingRuleFormSgStory = () => {
  function handleCardUp() {
    // handle card up
  }
  function handleCardDown() {
    // handle card up
  }

  function onToggle() {
    // handle toggle for open closed
  }

  function invalidCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name);
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Rule name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  function shouldDisableSave(stateData, componentProps) {
    return true;
  }

  return (
    <NetworkingRuleForm
      handleCardUp={handleCardUp}
      handleCardDown={handleCardDown}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      shouldDisableSave={shouldDisableSave}
      onToggle={onToggle}
      data={{
        name: "example-rule",
        source: "1.2.3.4/5",
        direction: "inbound",
        rule: {
          port_min: 8080,
          port_max: 8080,
          type: null,
          code: null,
        },
        ruleProtocol: "tcp",
      }}
      isSecurityGroup
    />
  );
};

export const Default = NetworkingRuleFormStory.bind({});
export const SecurityGroup = NetworkingRuleFormSgStory.bind({});
