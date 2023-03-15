import "./index.scss";
import "./App.css";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import { IcseFormGroup } from "icse-react-assets";
import {
  Toggle,
  TextInput,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@carbon/react";

const { snakeCase, eachKey, isString, contains } = require("lazy-z");

const carbonDesignCodemirrorTheme = createTheme({
  theme: "light",
  settings: {
    background: "#F4F4F4",
    foreground: "#161616",
    caret: "#161616",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#F4F4F4",
    gutterForeground: "#161616",
  },
  styles: [
    { tag: t.comment, color: "#161616" },
    { tag: t.variableName, color: "#161616" },
    { tag: [t.string, t.special(t.brace)], color: "#161616" },
    { tag: t.number, color: "#161616" },
    { tag: t.bool, color: "#161616" },
    { tag: t.null, color: "#161616" },
    { tag: t.keyword, color: "#161616" },
    { tag: t.operator, color: "#161616" },
    { tag: t.className, color: "#161616" },
    { tag: t.definition(t.typeName), color: "#161616" },
    { tag: t.typeName, color: "#161616" },
    { tag: t.angleBracket, color: "#161616" },
    { tag: t.tagName, color: "#161616" },
    { tag: t.attributeName, color: "#161616" },
  ],
});

let lastCommaExp = /,(?=$)/g;

/**
 * transpose an object where each string value has quotes around it
 * @param {Object} source
 * @returns {Object}
 */
function stringifyTranspose(source) {
  let newObj = {};
  eachKey(source, (key) => {
    if (isString(source[key])) newObj[key] = `"${source[key]}"`;
    else if (typeof source[key] !== "object") newObj[key] = source[key];
  });
  return newObj;
}

/**
 * get the longest key from an object
 * @param {Object} obj
 * @returns {number} length of longest key
 */
function longestKeyLength(obj) {
  let longestKey = 0;
  eachKey(obj, (key) => {
    if (
      key.length > longestKey && // if key is longer
      key.indexOf("_") !== 0 && // is not decorated with _
      !contains(["depends_on", "timeouts"], key) // and isn't reserved
    ) {
      longestKey =
        key.indexOf("*") === 0 || key.indexOf("-") === 0
          ? key.length - 1
          : key.length;
    }
  });
  return longestKey;
}

/**
 * match length with spaces
 * @param {string} str
 * @param {number} length
 * @returns {string} string with additional spaces
 */
function matchLength(str, length) {
  while (str.length < length) {
    str += " ";
  }
  return str;
}

/**
 * stringify value
 * @param {*} value
 * @returns {*} value escaped by quotes if string that starts with ^
 */
function stringifyValue(value) {
  if (isString(value)) {
    if (value.indexOf("^") === 0) return `"${value.replace(/^\^/g, "")}"`;
  }
  return value;
}

/**
 * json to tf
 * @param {string} type resource type
 * @param {string} name resource name
 * @param {Object} values arbitrary key value pairs
 * @param {Object} config config
 * @param {boolean} useData use data
 * @returns {string} terraform formatted code
 */

function jsonToTf(type, name, values, useData) {
  let tf = `${useData ? "data" : "resource"} "${type}" "${snakeCase(name)}" {`;
  let longest = longestKeyLength(values);
  /**
   * run function for each key and
   * @param {Object} obj
   */
  function eachTfKey(obj, offset) {
    if (offset) longest = longestKeyLength(obj); // longest key
    let offsetSpace = matchLength("", offset || 0); // offset for recursion
    // for each field in the terraform object
    eachKey(obj, (key) => {
      let keyName = key.replace(/^(-|_|\*|\^)/g, ""); // key with indicator chars removed
      let nextOffset = offset || 0;
      let valueIsObject =
        key.indexOf("_") === 0 || key.indexOf("^") === 0 || key === "timeouts";
      let objectIndent = `\n\n  ${offsetSpace}${keyName}`; // indent for objects
      let arrClose = `\n  ${offsetSpace}]`; // close for arrays
      // keys that start with * are used for multiline arrays
      if (key.indexOf("*") === 0) {
        tf += `\n${offsetSpace.length === 0 ? "\n" : ""}  ${
          offsetSpace + keyName
        } = [`;
        obj[key].forEach((item) => {
          tf += `\n    ${offsetSpace + stringifyValue(item)},`;
        });
        tf = tf.replace(lastCommaExp, "");
        tf += arrClose;
      } else if (key.indexOf("-") === 0) {
        // keys that start with - are used to indicate multiple blocks of the same kind
        // ex. `network_interfaces` for vsi
        obj[key].forEach((item) => {
          tf += `\n\n  ${keyName} {`;
          eachTfKey(item, 2 + nextOffset);
          tf += `\n  }`;
        });
      } else if (key === "depends_on") {
        // handle depends on arg
        tf += `${objectIndent} = [`;
        obj[key].forEach((dependency) => {
          tf += `\n ${matchLength(offsetSpace, 2)} ${dependency},`;
        });
        tf = tf.replace(lastCommaExp, "");
        tf += arrClose;
      } else if (valueIsObject) {
        // for keys that aren't new create a sub block
        tf += `${objectIndent} ${
          key.indexOf("^") === 0 ? "= " : "" // keys with ^ use an = for block assignment
        }{`;
        if (key === "timeouts") {
          obj[key] = stringifyTranspose(obj[key]);
        }
        eachTfKey(obj[key], 2 + nextOffset);
        tf += `\n  ${offsetSpace}}`;
      } else {
        // all other keys formatted here
        let keyValue = obj[key];
        tf += `\n  ${
          offsetSpace + matchLength(key, longest)
        } = ${stringifyValue(keyValue)}`;
      }
    });
  }
  eachTfKey(values);
  tf += "\n}\n";
  return tf;
}

export const Code = (props) => {
  return (
    props.hideCodeMirror !== true && (
      <CodeMirror
        className="label"
        readOnly={props.readOnly || false}
        value={props.code || ""}
        extensions={[javascript({ jsx: true })]}
        theme={carbonDesignCodemirrorTheme}
        onChange={props.onChange}
      />
    )
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "ibm_container_vpc_cluster",
      name: "test",
      use_data: false,
      code: JSON.stringify(
        {
          name: "^slz-workload-cluster",
          vpc_id: "ibm_is_vpc.workload_vpc.id",
          resource_group_id: "ibm_resource_group.slz_workload_rg.id",
          flavor: "^bx2.16x64",
          worker_count: 2,
          kube_version: "^default",
          update_all_workers: null,
          tags: '["hello", "world"]',
          wait_till: "^IngressReady",
          disable_public_service_endpoint: false,
          entitlement: "^cloud_pak",
          cos_instance_crn: "ibm_resource_instance.cos_object_storage.crn",
          "-zones": [
            {
              name: "^us-south-1",
              subnet_id: "ibm_is_subnet.workload_vsi_zone_1.id",
            },
            {
              name: "^us-south-2",
              subnet_id: "ibm_is_subnet.workload_vsi_zone_2.id",
            },
            {
              name: "^us-south-3",
              subnet_id: "ibm_is_subnet.workload_vsi_zone_3.id",
            },
          ],
          _kms_config: {
            crk_id: "ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id",
            instance_id: "ibm_resource_instance.slz_kms.guid",
            private_endpoint: false,
          },
          timeouts: { create: "3h", delete: "2h", update: "3h" },
          depends_on: ["frog"],
        },
        null,
        2
      ),
    };
    this.onChange = this.onChange.bind(this);
    this.renderedCode = this.renderedCode.bind(this);
    this.renderedJson = this.renderedJson.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onChange(data) {
    this.setState({ code: data });
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderedJson() {
    try {
      JSON.parse(this.state.code);
      let str = "";
      this.state.code.split(/\n/g).forEach((item) => {
        str += `  ${item}\n`;
      });
      return str
        .replace(/}(?=\s*$)/g, "},")
        .replace(/"(?=\w+":)/g, "")
        .replace(/"(?=:\s\[\n|")/g, "")
        .replace(/"(?=:(?!\s\[))/g, "");
    } catch (err) {
      return err.message;
    }
  }

  renderedCode() {
    try {
      return jsonToTf(
        this.state.type,
        this.state.name,
        JSON.parse(this.state.code),
        this.state.use_data
      );
    } catch (err) {
      return err.message;
    }
  }

  render() {
    return (
      <div className="center">
        <h1>jsonToTf</h1>
        {/* <div
          style={{
            borderBottom: "1px solid black",
            marginTop: "1vh",
            marginBottom: "2vh",
          }}
        /> */}
        <Tabs>
          <TabList aria-label="formTabs">
            <Tab>Docs</Tab>
            <Tab>Playground</Tab>
          </TabList>
          <TabPanels>
            <TabPanel style={{ textAlign: "left" }}>
              <h3>jsonToTf</h3>
              <br />
              <div>
                <code>jsonToTf</code> is a function that allows users to easily
                convert JSON data into a Terraform block.
                <br />
                <br />
                <h4>Example Usage</h4>
                <br />
                <h5>Input</h5>
                <br />
                <Code
                  code={`const jsonToTf = require("json-to-tf")

jsonToTf(
  "ibm_container_vpc_cluster",
  "test",
  {
    name: "^slz-workload-cluster",
    vpc_id: "ibm_is_vpc.workload_vpc.id",
    resource_group_id: "ibm_resource_group.slz_workload_rg.id",
    flavor: "^bx2.16x64",
    worker_count: 2,
    kube_version: "^default",
    update_all_workers: null,
    tags: true,
    wait_till: "^IngressReady",
    disable_public_service_endpoint: false,
    entitlement: "^cloud_pak",
    cos_instance_crn: "ibm_resource_instance.cos_object_storage.crn",
    "-zones": [
      {
        name: "^us-south-1",
        subnet_id: "ibm_is_subnet.workload_vsi_zone_1.id"
      },
      {
        name: "^us-south-2",
        subnet_id: "ibm_is_subnet.workload_vsi_zone_2.id"
      },
      {
        name: "^us-south-3",
        subnet_id: "ibm_is_subnet.workload_vsi_zone_3.id"
      }
    ],
    _kms_config: {
      crk_id: "ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id",
      instance_id: "ibm_resource_instance.slz_kms.guid",
      private_endpoint: false
    },
    timeouts: {
      create: "3h",
      delete: "2h",
      update: "3h"
    }
  },
  false
)`}
                  readOnly
                />
                <br />
                <h5>Returned Value</h5>
                <br />
                <Code
                  readOnly
                  code={`resource "ibm_container_vpc_cluster" "test" {
  name                            = "slz-workload-cluster"
  vpc_id                          = ibm_is_vpc.workload_vpc.id
  resource_group_id               = ibm_resource_group.slz_workload_rg.id
  flavor                          = "bx2.16x64"
  worker_count                    = 2
  kube_version                    = "default"
  update_all_workers              = null
  tags                            = true
  wait_till                       = "IngressReady"
  disable_public_service_endpoint = false
  entitlement                     = "cloud_pak"
  cos_instance_crn                = ibm_resource_instance.cos_object_storage.crn

  zones {
    name      = "us-south-1"
    subnet_id = ibm_is_subnet.workload_vsi_zone_1.id
  }

  zones {
    name      = "us-south-2"
    subnet_id = ibm_is_subnet.workload_vsi_zone_2.id
  }

  zones {
    name      = "us-south-3"
    subnet_id = ibm_is_subnet.workload_vsi_zone_3.id
  }

  kms_config {
    crk_id           = ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id
    instance_id      = ibm_resource_instance.slz_kms.guid
    private_endpoint = false
  }

  timeouts {
    create = "3h"
    delete = "2h"
    update = "3h"
  }
}`}
                />
                <br />
                <h4>Formatting</h4>
                <br />
                <h5>String Values</h5>
                <br />
                By using the <code>^</code> character in a string, quotes will
                be added around that value. This can be used to distinguid
                string values from reference values without needing to escape
                each quotation mark.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\nname: "^slz-workload-cluster"\n` +
                    `\n// converts to terraform:\n` +
                    `//name = "slz-workload-cluster"\n\n` +
                    `vpc_id: "ibm_is_vpc.workload_vpc.id"\n` +
                    `\n// converts to terraform:\n` +
                    `//vpc_id = ibm_is_vpc.workload_vpc.id\n`
                  }
                />
                <br />
                <h5>Inline Values</h5>
                <br />
                Users can pass other inline values, such as numbers, booleans,
                and null and those values will be added to the terraform code.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\nworker_count: 2\n` +
                    `\n// converts to terraform:\n` +
                    `worker_count = 2\n\n` +
                    `disable_public_service_endpoint: false\n` +
                    `\n// converts to terraform:\n` +
                    `disable_public_service_endpoint = false\n`
                  }
                />
                <br />
                <h5>Depends On</h5>
                <br />
                By using the reserved key <strong>depends_on</strong>, a list of
                comma separated list of dependencies will be created.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\ndepends_on: ["reference_1", "reference_2"]\n` +
                    `\n// converts to terraform:\n` +
                    `depends_on = [\n  reference_1,\n  reference_2\n]`
                  }
                />
                <br />
                <h5>Timeouts</h5>
                <br />
                While other string values need to be escaped, the ones for the{" "}
                <strong>timeouts</strong> field do not. By using the reserved
                keyword <strong>timeouts</strong>, strings will automatically be
                surrounded by quotes without the use of the <code>^</code>{" "}
                operator.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\ntimeouts: {\n  create: "3h",\n  delete: "2h",\n  update: "3h"\n}\n` +
                    `\n// converts to terraform:\n` +
                    `timeouts {\n  create = "3h"\n  delete = "2h"\n  update = "3h"\n}`
                  }
                />
                <br />
                <h5>Blocks With Assignments</h5>
                <br />
                By prepending a carrot <strong>^</strong> to a key with an
                object value, a single object block will be created within the
                terraform resource.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\n^kms_config: {\n  crk_id: "ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id",\n` +
                    `  instance_id: "ibm_resource_instance.slz_kms.guid",\n  private_endpoint: false\n}\n` +
                    `\n// converts to terraform:\n` +
                    `kms_config = {\n  crk_id           = ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id\n  instance_id      = ibm_resource_instance.slz_kms.guid\n  private_endpoint = false\n}`
                  }
                />
                <br />
                <h5>Blocks Without Assignments</h5>
                <br />
                By prepending an underscore <strong>_</strong> to a key with an
                object value, a single object block will be created within the
                terraform resource.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\n _kms_config: {\n  crk_id: "ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id",\n` +
                    `  instance_id: "ibm_resource_instance.slz_kms.guid",\n  private_endpoint: false\n}\n` +
                    `\n// converts to terraform:\n` +
                    `kms_config {\n  crk_id           = ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id\n  instance_id      = ibm_resource_instance.slz_kms.guid\n  private_endpoint = false\n}`
                  }
                />
                <br />
                <h5>Multiple Blocks With the Same Name</h5>
                <br />
                By prepending a hyphen <strong>-</strong> to a key with a value
                of an array of objects, mutiple blocks will be created for that
                key.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `"-zones": [\n  {\n    name: "^us-south-1",\n    subnet_id: "ibm_is_subnet.workload_vsi_zone_1.id"\n  },\n  {\n    name: "^us-south-2",\n    subnet_id: "ibm_is_subnet.workload_vsi_zone_2.id"\n  },\n  {\n    name: "^us-south-3",\n    subnet_id: "ibm_is_subnet.workload_vsi_zone_3.id"\n  }\n]\n` +
                    `\n// converts to terraform:\n` +
                    `zones {\n  name      = "us-south-1"\n  subnet_id = ibm_is_subnet.workload_vsi_zone_1.id\n}\n` +
                    `\nzones {\n  name      = "us-south-2"\n  subnet_id = ibm_is_subnet.workload_vsi_zone_2.id\n}\n` +
                    `\nzones {\n  name      = "us-south-3"\n  subnet_id = ibm_is_subnet.workload_vsi_zone_3.id\n}`
                  }
                />
                <br />
                <h5>Arrays Over Multiple Lines</h5>
                <br />
                To create an array where each entry has multiple lines, the{" "}
                <strong>*</strong> character can be added to the beginning of an
                object key.
                <br />
                <br />
                <Code
                  readOnly
                  code={
                    `\n"*items": ["reference_1", "reference_2"]\n` +
                    `\n// converts to terraform:\n` +
                    `items = [\n  reference_1,\n  reference_2\n]`
                  }
                />
                <br />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="alignButtons">
                <div
                  id="form"
                  className="leftText"
                  style={{ marginRight: "1vw" }}
                >
                  <IcseFormGroup className="pad" noMarginBottom>
                    <TextInput
                      id="type"
                      name="type"
                      labelText="Terraform Resource Type"
                      value={this.state.type}
                      className="fill"
                      onChange={this.handleInputChange}
                    />
                  </IcseFormGroup>
                  <IcseFormGroup className="pad" noMarginBottom>
                    <TextInput
                      id="name"
                      name="name"
                      labelText="Terraform Resource Name"
                      value={this.state.name}
                      className="fill"
                      onChange={this.handleInputChange}
                    />
                  </IcseFormGroup>
                  <IcseFormGroup className="pad">
                    <Toggle
                      id="use_data"
                      name="use_data"
                      labelText="Data Resource"
                      value={this.state.use_data}
                      onToggle={() =>
                        this.setState({ use_data: !this.state.use_data })
                      }
                    />
                  </IcseFormGroup>
                  <div>
                    <Code code={this.state.code} onChange={this.onChange} />
                  </div>
                </div>
                <div id="render" className="leftText">
                  <Tabs>
                    <TabList aria-label="formTabs">
                      <Tab>Terraform</Tab>
                      <Tab>JavaScript</Tab>
                    </TabList>
                    <TabPanels className="leftText">
                      <TabPanel className="doc">
                        {
                          <Code
                            code={
                              `const jsonToTf = require("package-name")\n\n` +
                              `jsonToTf(\n` +
                              `  "${this.state.type}",\n` +
                              `  "${this.state.name}",\n` +
                              this.renderedJson() +
                              `  ${this.state.use_data}\n);`
                            }
                            readOnly
                          />
                        }
                      </TabPanel>
                      <TabPanel className="doc">
                        {<Code code={this.renderedCode()} readOnly />}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
