import React from "react";
import { NetworkingRulesOrderCard } from "icse-react-assets";
import { contains } from "lazy-z";

export default {
  component: NetworkingRulesOrderCard,
  title: "Components/Forms/NetworkingRulesOrderCard",
  argTypes: {
    isSecurityGroup: {
      description:
        "Boolean value for if the rule is a security group rule. When false, the form will render for Network ACL rule configuration.",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    rules: {
      description: "An array of objects describing the networking rules",
      type: { required: true },
      control: "none",
      table: { defaultValue: { summary: "[]" } }, // default value
    },
    hideCreate: {
      description: "Boolean value, when true disable creation of new rules",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    expandAll: {
      description:
        "Boolean value, when true all rule forms will be expanded on render",
      type: { required: true }, // required prop or not
      control: "none",
      table: { defaultValue: { summary: "false" } }, // default value
    },
    disableSaveCallback: {
      description:
        "Callback function that accepts two parameters `stateData` and `componentProps`. `disableSaveCallback` is used only in non-modal rule forms. Returns a boolean, disabled when true",
      type: { required: false }, // required prop or not
      control: "none",
    },
    disableModalSubmitCallback: {
      description:
        "Callback function that accepts two parameters `stateData` and `componentProps`. `disableSaveCallback` is used only in modal rule forms. Returns a boolean, disabled when true",
      type: { required: false }, // required prop or not
      control: "none",
    },
    invalidCallback: {
      description:
        "A function to determine a rule name is invalid that accepts two parameters `stateData` and `componentProps`. When true, the name for a rule will be invalid",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description:
        "A function to determine the invalid text to display when a rule name is invalid that accepts two parameters `stateData` and `componentProps`",
      type: { required: true }, // required prop or not
      control: "none",
    },
    vpc_name: {
      description:
        "Name of the VPC where the networking component is created. This is used to generate unique ids for each rule",
      type: { required: true },
      control: "none",
    },
    parent_name: {
      description:
        "Name of the parent component where the networking component is created. This is used to pass through to callback save, delete, and submit functions",
      type: { required: true },
      control: "none",
    },
    networkRuleOrderDidChange: {
      description:
        "A function that accepts one parameter `networkingRules` to run when the order of rules within the list has been changed",
      type: { required: true },
      control: "none",
    },
    onSubmitCallback: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` that handles the submission of a new rule using a modal",
      type: { required: true },
      control: "none",
    },
    onRuleSave: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` that handles saving an existing rule",
      type: { required: true },
      control: "none",
    },
    onRuleDelete: {
      description:
        "A function that accepts two parameters `stateData` and `componentProps` that handles deleting an existing rule",
      type: { required: true },
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "NetworkingRuleOrderCard allows for the creation, deletiong, and reordering of networking rules within an ACL or Security Group Form",
      },
    },
  },
};

const NetworkingRulesOrderCardStory = () => {
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

  function disableModalSubmit(stateData, componentProps) {
    return true;
  }

  function networkRuleOrderDidChange(newRulesOrder) {
    // add logic here to save reordered network rules
  }

  function onSubmitCallback(newRulesOrder) {
    // add logic here to create new rule
  }

  function onRuleSave(stateData, componentProp) {
    // add logic here to save rule
  }

  function onRuleDelete(stateData, componentProp) {
    // add logic here to delete rule
  }

  return (
    <NetworkingRulesOrderCard
      vpc_name="example-vpc"
      parent_name="example-acl"
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      networkRuleOrderDidChange={networkRuleOrderDidChange}
      rules={[
        {
          action: "allow",
          destination: "10.0.0.0/8",
          direction: "inbound",
          name: "allow-ibm-inbound",
          source: "161.26.0.0/16",
          icmp: {
            type: null,
            code: null,
          },
          tcp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
          udp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
        },
        {
          action: "allow",
          destination: "10.0.0.0/8",
          direction: "inbound",
          name: "allow-all-network-inbound",
          source: "10.0.0.0/8",
          icmp: {
            type: null,
            code: null,
          },
          tcp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
          udp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
        },
        {
          action: "allow",
          destination: "0.0.0.0/0",
          direction: "outbound",
          name: "allow-all-outbound",
          source: "0.0.0.0/0",
          icmp: {
            type: null,
            code: null,
          },
          tcp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
          udp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
        },
      ]}
      disableSaveCallback={shouldDisableSave}
      disableModalSubmit={disableModalSubmit}
      onSubmitCallback={onSubmitCallback}
      onRuleSave={onRuleSave}
      onRuleDelete={onRuleDelete}
    />
  );
};

const NetworkingRulesOrderCardSgStory = () => {
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

  function disableModalSubmit(stateData, componentProps) {
    return true;
  }

  function networkRuleOrderDidChange(newRulesOrder) {
    // add logic here to save reordered network rules
  }

  function onSubmitCallback(newRulesOrder) {
    // add logic here to create new rule
  }

  function onRuleSave(stateData, componentProp) {
    // add logic here to save rule
  }

  function onRuleDelete(stateData, componentProp) {
    // add logic here to delete rule
  }

  return (
    <NetworkingRulesOrderCard
      vpc_name="example-vpc"
      parent_name="example-security-group"
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      networkRuleOrderDidChange={networkRuleOrderDidChange}
      isSecurityGroup
      rules={[
        {
          direction: "inbound",
          name: "allow-ibm-inbound",
          source: "161.26.0.0/16",
          icmp: {
            type: null,
            code: null,
          },
          tcp: {
            port_min: null,
            port_max: null,
          },
          udp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
        },
        {
          direction: "inbound",
          name: "allow-all-network-inbound",
          source: "10.0.0.0/8",
          icmp: {
            type: null,
            code: null,
          },
          tcp: {
            port_min: null,
            port_max: null,
          },
          udp: {
            port_min: null,
            port_max: null,
          },
        },
        {
          direction: "outbound",
          name: "allow-all-outbound",
          source: "0.0.0.0/0",
          icmp: {
            type: null,
            code: null,
          },
          tcp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
          udp: {
            port_min: null,
            port_max: null,
            source_port_min: null,
            source_port_max: null,
          },
        },
      ]}
      disableSaveCallback={shouldDisableSave}
      disableModalSubmitCallback={disableModalSubmit}
      onSubmitCallback={onSubmitCallback}
      onRuleSave={onRuleSave}
      onRuleDelete={onRuleDelete}
    />
  );
};

export const Default = NetworkingRulesOrderCardStory.bind({});
export const SecurityGroup = NetworkingRulesOrderCardSgStory.bind({});
