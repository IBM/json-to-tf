import React from "react";
import { contains } from "lazy-z";
import { VpcForm } from "icse-react-assets";

export default {
  component: VpcForm,
  title: "Components/Forms/VpcForm",
  argTypes: {
    data: {
      summary: "An optional object describing the tooltip for a title",
      type: { required: false }, // required prop or not
      control: "none",
    },
    ["data.name"]: {
      description: "A string specifying the name of the VPC",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.resource_group"]: {
      description:
        "A string specifying the name of the VPC resource group selected",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.flow_logs_bucket_name"]: {
      description:
        "A string specifying the name of the COS bucket where a flow logs collector for the VPC will be attached",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.classic_access"]: {
      description:
        "A boolean toggle for giving the VPC classic infrastructure access",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.default_network_acl_name"]: {
      description: "A string specifying the default network ACL's name",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.default_routing_table_name"]: {
      description: "A string specifying the default routing table's name",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.default_security_group_name"]: {
      description: "A string specifying the default security group's name",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.use_public_gateways"]: {
      description:
        'An object which maps each zone to a boolean value specifying if a public gateway should be created in that zone. ex: `{"zone-1": false,"zone-2": false,"zone-3": false}`',
      control: "none",
      type: { required: false }, // required prop or not
    },
    resourceGroups: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    cosBuckets: {
      description:
        "An array of strings containing the names of COS buckets to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidFieldCallback: {
      description:
        "A function to determine if the value supplied is invalid and returns a single boolean",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidFieldTextCallback: {
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
          "VpcForm is a component that houses a dynamic heading for a page and will align any buttons passed to it to the right side of the page",
      },
    },
  },
};

const VpcFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/i;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  /** check if input is null or empty string
   * @param {string} input
   * @returns {boolean} true if str null or ""
   */
  function checkNullorEmptyString(input) {
    if (input === null || input === "") return true;
    else return false;
  }

  /**
   * check to see if a component has a duplicate name
   * @param {string} value name value. ex: management-rg
   * @param {Array} existingValues custom array of existing values
   * @returns {Object} boolean invalid and text invalidText
   */
  function hasDuplicateName(value, existingValues) {
    let returnData = {
      invalid: false,
      invalidText: `Invalid Name. Must match the regular expression: /[A-z][a-z0-9-]*[a-z0-9]/`,
    };
    if (contains(existingValues, value)) {
      returnData = {
        invalid: true,
        invalidText: `Name ${value} already in use.`,
      };
    }
    return returnData;
  }

  /**
   * check vpc name fields valid
   * @param {string} field name to check
   * @param {Object} stateData component state
   * @param {Object} componentProps component props
   * @returns {Object} invalid boolean invalidText string
   */
  function vpcFieldCheck(field, stateData, componentProps) {
    let secondaryInvalidNames = {
      invalid: false,
      invalidText: `Invalid Name. Must match the regular expression: /[A-z][a-z0-9-]*[a-z0-9]/`,
    };
    if (!checkNullorEmptyString(stateData[field])) {
      if (field === "default_network_acl_name") {
        secondaryInvalidNames = hasDuplicateName(stateData[field], [
          "network_acl_test",
          "network_acl_test_2",
        ]);
      } else if (field === "default_routing_table_name") {
        secondaryInvalidNames = hasDuplicateName(stateData[field], [
          "routing_table_test",
          "routing_table_test_2",
        ]);
      } else {
        secondaryInvalidNames = hasDuplicateName(stateData[field], [
          "security_group_test",
          "security_group_test_2",
        ]);
      }
    }
    return secondaryInvalidNames;
  }

  /**
   * check to see if a vpc has an invalid field
   * @param {string} field name of the field
   * @param {*} stateData state data
   * @param {*} componentProps props of component
   * @returns {boolean} true if invalid
   */
  function invalidFieldCallback(field, stateData, componentProps) {
    let invalidCheck = false;
    if (!validName(stateData[field])) invalidCheck = true;
    else if (field === "name") {
      invalidCheck = contains(
        ["foo", "bar"],
        stateData.name || componentProps.data.name === stateData.name
      );
    } else
      invalidCheck = vpcFieldCheck(field, stateData, componentProps).invalid;

    return invalidCheck;
  }

  /**
   * render text for invalid vpc field
   * @param {string} field name of the field
   * @param {*} stateData state data
   * @param {*} componentProps props of component
   * @returns {string} text to display when invalid
   */
  function invalidFieldTextCallback(field, stateData, componentProps) {
    let invalidText = ``;
    if (field === "name") {
      contains(["foo", "bar"], stateData.name) ||
      (!checkNullorEmptyString(stateData.name) &&
        componentProps.data.name === stateData.name)
        ? (invalidText = `VPC name ${stateData.name} already in use.`)
        : (invalidText = `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`);
    } else
      invalidText = vpcFieldCheck(field, stateData, componentProps).invalidText;
    return invalidText;
  }

  return (
    <VpcForm
      data={{
        name: "",
        resource_group: "",
        flow_logs_bucket_name: "",
        default_network_acl_name: "",
        default_routing_table_name: "",
        default_security_group_name: "",
        classic_access: false,
        use_manual_address_prefixes: false,
        use_public_gateways: {
          "zone-1": false,
          "zone-2": false,
          "zone-3": false,
        },
      }}
      resourceGroups={["service-rg", "management-rg", "workload-rg"]}
      cosBuckets={["atracker-bucket", "management-bucket", "workload-bucket"]}
      invalidCallback={invalidFieldCallback}
      invalidTextCallback={invalidFieldTextCallback}
    />
  );
};

export const Default = VpcFormStory.bind({});
