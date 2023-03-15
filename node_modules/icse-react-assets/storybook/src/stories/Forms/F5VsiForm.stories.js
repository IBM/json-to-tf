import React from "react";
import { F5VsiForm } from "icse-react-assets";
import { azsort } from "lazy-z";

export default {
  component: F5VsiForm,
  title: "Components/Forms/F5VsiForm",
  argTypes: {
    data: {
      summary: "An object",
      type: { required: true }, // required prop or not
      control: "none",
    },
    ["data.zones"]: {
      description:
        "A number specifying the zones where the f5 instance is to be deployed",
      control: "none",
      table: { defaultValue: { summary: 0 } },
      type: { required: true }, // required prop or not
    },
    ["data.resource_group"]: {
      description: "A string value representing the resource group for the VSI",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.ssh_keys"]: {
      description: "An array of ssh key names (optional)",
      control: "none",
      type: { required: false }, // required prop or not
    },
    ["data.f5_image_name"]: {
      description:
        "A string value representing the virtual server image deployed on the VSI",
      control: "none",
      type: { required: true }, // required prop or not
    },
    ["data.machine_type"]: {
      description:
        "A string value representing the type of machine requested for the VSI",
      control: "none",
      type: { required: true }, // required prop or not
    },
    vsis: {
      description: "An array of vsis to be deployed",
      type: { required: true }, // required prop or not
      control: "none",
    },
    edge_pattern: {
      description: "An string representing the edge networking pattern",
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: "vpn-and-waf" } },
      control: "none",
    },
    f5_on_management: {
      description:
        "A boolean specifiying whether or not to deploy the f5 vsis to the management vpc",
      type: { required: true }, // required prop or not
      table: { defaultValue: { summary: true } },
      control: "none",
    },
    apiEndpointFlavors: {
      description:
        "A string representing the api endpoint to fetch valid VSI flavors to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    resourceGroupList: {
      description:
        "An array of strings containing the names of resource groups to select",
      type: { required: true }, // required prop or not
      control: "none",
    },
    sshKeyList: {
      description: "An array of ssh key names to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    encryptionKeyList: {
      description: "An array of available encryption key names to choose from",
      type: { required: true }, // required prop or not
      control: "none",
    },
    initVsiCallback: {
      description: "Function that returns initialized vsi",
      type: { required: true }, // required prop or not
      control: "none",
    },
    saveVsiCallback: {
      description: "Function to be called when save is clicked",
      type: { required: true }, // required prop or not
      control: "none",
    },
    hideSaveCallback: {
      description:
        "Function that determines whether the save button should be hidden",
      type: { required: true }, // required prop or not
      control: "none",
    },
    disableSaveCallback: {
      description:
        "Function that determines whether the save button should be disabled",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "F5VsiForm is a form component that provides functionality for adding or editing F5 Virtual Server Instances (VSIs).",
      },
    },
  },
};

const F5VsiFormStory = () => {
  // tiers by zone use function to prevent update in place
  const firewallTiers = {
    "full-tunnel": () => {
      return ["f5-bastion", "f5-external", "f5-management"];
    },
    waf: () => {
      return ["f5-external", "f5-management", "f5-workload"];
    },
    "vpn-and-waf": () => {
      return ["f5-bastion", "f5-external", "f5-management", "f5-workload"];
    },
  };

  /**
   * initialize a new f5 vsi
   * @param {string} pattern pattern name
   * @param {string} zone zone formatted zone-{zone}
   * @param {boolean=} useManagementVpc use management VPC
   * @param {*} params
   * @param {string} params.f5_image_name
   * @param {string} params.resource_group
   * @param {Array<string>} params.ssh_keys
   * @param {string} params.machine_type
   * @returns {Object} f5 vsi object
   */
  function initVsi(pattern, zone, useManagementVpc, params) {
    let vpcName = useManagementVpc ? "management" : "edge"; // get vpc
    let tiers = firewallTiers[pattern](); // get tiers
    let secondarySubnetNames = []; // secondary subnet names
    let secondarySecurityGroupNames = []; // secondary sg names

    // for each tier in alphabetical order
    tiers.sort(azsort).forEach((tier) => {
      // if a secondary tier
      if (tier !== "f5-management") {
        // add subnet and sg to secondary interface options
        secondarySubnetNames.push(tier + "-" + zone);
        secondarySecurityGroupNames.push({
          group_name: tier + "-sg",
          interface_name: `${vpcName}-${tier}-${zone}`,
        });
      }
    });

    // create new vsi
    let vsi = {
      boot_volume_encryption_key_name: "key",
      domain: "local",
      enable_external_floating_ip: true,
      enable_management_floating_ip: false,
      f5_image_name:
        params?.f5_image_name || "f5-bigip-16-1-2-2-0-0-28-all-1slot",
      hostname: "f5-ve-01",
      machine_type: params?.machine_type || "cx2-4x8",
      name: "f5-" + zone,
      primary_subnet_name: `f5-management-${zone}`,
      resource_group: params?.resource_group || `${vpcName}-rg`,
      secondary_subnet_names: secondarySubnetNames,
      secondary_subnet_security_group_names: secondarySecurityGroupNames,
      security_groups: ["f5-management-sg"],
      ssh_keys: params?.ssh_keys || ["slz-ssh-key"],
      vpc_name: vpcName,
    };

    return vsi;
  }

  function saveVsi(stateData) {
    console.log("save!", stateData);
  }

  function shouldHideSave(stateData, componentProps) {
    return false;
  }

  function shouldDisableSave(stateData, componentProps) {
    return false;
  }

  return (
    <div className="App">
      <F5VsiForm
        data={{
          zones: 0,
          resource_group: "rg2",
          ssh_keys: ["key1"],
          f5_image_name: "f5-bigip-15-1-5-1-0-0-14-all-1slot",
          machine_type: "type1",
        }}
        apiEndpointFlavors="/api/mock/flavors"
        resourceGroupList={["rg1", "rg2", "rg3"]}
        sshKeyList={["key1", "key2"]}
        encryptionKeyList={["ekey1", "ekey2"]}
        initVsiCallback={initVsi}
        saveVsiCallback={saveVsi}
        hideSaveCallback={shouldHideSave}
        disableSaveCallback={shouldDisableSave}
      />
    </div>
  );
};

export const Default = F5VsiFormStory.bind({});
