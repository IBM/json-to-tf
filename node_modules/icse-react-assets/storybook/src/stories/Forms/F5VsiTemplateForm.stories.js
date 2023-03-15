/* eslint-disable no-useless-computed-key */
import { F5VsiTemplateForm } from "icse-react-assets";

export default {
  component: F5VsiTemplateForm,
  title: "Components/Forms/F5VsiTemplateForm",
  argTypes: {
    data: {
      summary: "An optional object",
      type: { required: false },
      control: "none",
    },
    "data.license_type": {
      description:
        'A string value of the type of license. Can be "none", "byol", "regkeypool" or "utilitypool".',
      control: "none",
      type: { required: true },
      table: { defaultValue: { summary: "none" } },
    },
    "data.tmos_admin_password": {
      description:
        "A string value of the admin account password for the F5 BIG-IP instance. Password must be at least 15 characters, contain one numeric, one uppercase, and one lowercase character.",
      control: "none",
      type: { required: true },
    },
    "data.byol_license_basekey": {
      description:
        "A string value of the Bring Your Own License registration key for the F5 BIG-IP instance.",
      control: "none",
      type: { required: true },
    },
    "data.license_username": {
      description:
        "A string value of the BIGIQ username to use for the pool based licensing of the F5 BIG-IP instance.",
      control: "none",
      type: { required: true },
    },
    "data.license_password": {
      description:
        "A string value of the BIGIQ password to use for the pool based licensing of the F5 BIG-IP instance.",
      control: "none",
      type: { required: true },
    },
    "data.license_host": {
      description:
        "A string value of the BIGIQ IP or hostname to use for pool based licensing of the F5 BIG-IP instance.",
      control: "none",
      type: { required: true },
    },
    "data.license_pool": {
      description:
        "A string value of the BIGIQ license pool name of the pool-based licensing of the F5 BIG-IP instance.",
      control: "none",
      type: { required: true },
    },
    "data.license_unit_of_measure": {
      description:
        "A number or string of the BIGIQ utility pool unit of measurement.",
      control: "none",
      type: { required: true },
    },
    "data.license_sku_keyword_1": {
      description:
        "A string value of the BIGIQ primary SKU for ELA utility licensing of the F5 BIG-IP instance.",
      control: "none",
      type: { required: true },
    },
    "data.license_sku_keyword_2": {
      description:
        "A string value of the BIGIQ secondary SKU for ELA utility licensing of the F5 BIG-IP instance",
      control: "none",
      type: { required: true },
    },
    "data.template_version": {
      description:
        "A number or string of the terraform template version for phone_home_url_metadata.",
      control: "none",
      type: { required: true },
    },
    "data.template_source": {
      description:
        "A string value of the terraform template source for phone_home_url_metadata.",
      control: "none",
      type: { required: true },
    },
    "data.app_id": {
      description:
        "A string value of the terraform application id for phone_home_url_metadata.",
      control: "none",
      type: { required: true },
    },
    "data.phone_home_url": {
      description:
        "A string value of the URL to POST status when BIG-IP is finished onboarding.",
      control: "none",
      type: { required: true },
    },
    "data.do_declaration_url": {
      description:
        "A string value of the URL to retrieve the f5-declarative-onboarding JSON declaration.",
      control: "none",
      type: { required: true },
    },
    "data.as3_declaration_url": {
      description:
        "A string value of the URL to retrieve the f5-appsvcs-extension JSON declaration.",
      control: "none",
      type: { required: true },
    },
    "data.ts_declaration_url": {
      description:
        "A string value of the URL to retrieve the f5-telemetry-streaming JSON declaration.",
      control: "none",
      type: { required: true },
    },
    "data.tgstandby_url": {
      description:
        "A string value of the URL to POST L3 addresses when tgstandby is triggered.",
      control: "none",
      type: { required: true },
    },
    "data.tgrefresh_url": {
      description:
        "A string value of the URL to POST L3 addresses when tgrefresh is triggered.",
      control: "none",
      type: { required: true },
    },
    "data.tgactive_url": {
      description:
        "A string value of the URL to POST L3 addresses when tgactive is triggered.",
      control: "none",
      type: { required: true },
    },
    invalidCallback: {
      description:
        "A function that determines if a field is invalid given the field name, state data, and component props. Returns a boolean.",
      type: { required: true }, // required prop or not
      control: "none",
    },
    invalidTextCallback: {
      description:
        "A function to determine the invalid text displayed to the user given the field name, state data, and component props. Returns the string to display.",
      type: { required: true }, // required prop or not
      control: "none",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "F5VsiTemplateForm is a form component that provides functionality for editing an F5 VSI service instance.",
      },
    },
  },
};

const F5VsiTemplateFormStory = () => {
  function invalidCallback(field, stateData, componentProps) {
    // e.g. set BYOL license basekey to minimum 5 characters
    if (field === "byol_license_basekey") {
      if (stateData.byol_license_basekey.length < 5) return true;
    } else return false;
  }
  let invalidTextCallback = (field) => {
    return `Invalid ${field} value`;
  };
  return (
    <F5VsiTemplateForm
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      data={{
        license_type: "none",
        tmos_admin_password: "",
        byol_license_basekey: "",
        license_username: "",
        license_password: "",
        license_host: "",
        license_pool: "",
        license_unit_of_measure: "",
        license_sku_keyword_1: "",
        license_sku_keyword_2: "",
        template_version: 20210201,
        template_source:
          "f5devcentral/ibmcloud_schematics_bigip_multinic_declared",
        app_id: "a044b708-66c4-4f50-a5c8-2b54eff5f9b5",
        phone_home_url: "",
        do_declaration_url:
          "https://declarations.s3.us-east.cloud-object-storage.appdomain.cloud/do_declaration.json",
        as3_declaration_url:
          "https://declarations.s3.us-east.cloud-object-storage.appdomain.cloud/as3_declaration.json",
        ts_declaration_url:
          "https://declarations.s3.us-east.cloud-object-storage.appdomain.cloud/ts_declaration.json",
        tgstandby_url: "",
        tgrefresh_url: "",
        tgactive_url: "",
      }}
    />
  );
};

export const Default = F5VsiTemplateFormStory.bind({});
