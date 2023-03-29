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
const flute = require("little-flute");
const {
  eachKey,
  isString,
  contains,
  getType,
  isArrayOfObjects,
  hclEncode,
  keys,
  isArray,
} = require("lazy-z");

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
 * sort terraform keys
 * @param {*} data terraform data object
 * @returns {Array<string>}
 */
function sortKeys(data) {
  let keyList = keys(data);
  if (contains(keyList, "//")) {
    keyList.shift();
  }
  keyList = keyList.sort((a, b) => {
    let aIsObjOrArr = getType(data[a]) === "object" || isArray(data[a]);
    let bIsObjOrArr = getType(data[b]) === "object" || isArray(data[b]);
    if (aIsObjOrArr && bIsObjOrArr) return 0;
    if (aIsObjOrArr) return 1;
    if (bIsObjOrArr || a === "source") return -1;
    else return 0;
  });
  return keyList;
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
 * get longest key of a function with a value that is string, bool, number, or null
 * @param {*} obj object
 * @returns {number} length of longest key
 */
function getLongestInlineKey(obj) {
  let longest = 0;
  eachKey(obj, (key) => {
    if (
      !isArray(obj[key]) &&
      (getType(obj[key]) !== "object" || obj[key] === null) &&
      key.length > longest
    ) {
      longest = key.length;
    }
  });
  return longest;
}

/**
 * format a value that is not an object or array. will format strings to match
 * terraform interpolation syntax
 * @param {*} value
 * @returns {*} formatted value
 */
function formatDirectValue(value) {
  if (isString(value)) {
    if (value.match(/^\$\{[^}]+\}$/g) === null) {
      return `"${value}"`;
    } else {
      return value.replace(/(\$|\{|})/g, "");
    }
  } else return value;
}

/**
 * create terraform data for inside terraform block based on object
 * @param {*} data terraform values object
 * @param {number} offset number of spaces to indent on recursion
 * @param {boolean} isModule run special case if module
 * @returns {string} stringified terraform data
 */
function tfData(data, offset, isModule) {
  let str = ""; // return string
  let frontSpace = "\n" + matchLength("", (offset || 0) + 2); // leading space for each line
  let nextOffset = frontSpace.length - 1; // next offset for recursion
  let longestInlineKey = getLongestInlineKey(data); // match length target
  let sortedKeys = sortKeys(data); // get sorted keys

  /**
   * format blocks with name (provisioner, backend)
   * @param {string} kind name of block
   * @param {*} data data object
   */
  function blockWithName(kind, data) {
    let indexKey = keys(data)[0];
    str += `${frontSpace}${kind} "${indexKey}" {`;
    str += tfData(data[indexKey], nextOffset);
    str += frontSpace + "}";
  }

  // for each sorted key
  sortedKeys.forEach((key) => {
    let dataType = getType(data[key]);
    if (key === "provisioner") {
      // handle provisoner block
      data[key].forEach((provisioner) => {
        blockWithName("provisioner", provisioner);
      });
    } else if (key === "backend" && !isString(data[key])) {
      // handle backend block within terraform object
      blockWithName("backend", data[key]);
    } else if (
      contains(["string", "number", "boolean"], dataType) ||
      data[key] === null
    ) {
      // handle directly tranlated values
      str += `${frontSpace}${matchLength(
        key,
        longestInlineKey
      )} = ${formatDirectValue(data[key])}`;
    } else if (dataType === "object") {
      str += `${frontSpace}${key}${key === "required_providers" ? "" : " ="} {`;
      str += tfData(data[key], nextOffset) + frontSpace + "}"; // remove newline from length
    } else if (isArrayOfObjects(data[key]) && isModule) {
      // for module, encode arrays of objects using hcl
      let arrHcl = hclEncode({ [key]: data[key] }, false, nextOffset).split(
        "\n"
      );
      let formatedArrHcl = "\n";
      arrHcl.forEach((line) => {
        formatedArrHcl += line + "\n";
      });
      str += formatedArrHcl.replace(/\n$/, "");
    } else if (isArrayOfObjects(data[key])) {
      // handle touples
      data[key].forEach((item) => {
        str += frontSpace + key + " {";
        str += tfData(item, offset + 2);
        str += frontSpace + "}";
      });
    } else {
      // handle arrays
      str += `${frontSpace}${key} = [`;
      data[key].forEach((item) => {
        str +=
          frontSpace +
          matchLength("", offset === 0 ? 2 : offset) +
          formatDirectValue(item) +
          ",";
      });
      str = str.replace(lastCommaExp, "");
      str += `${frontSpace}]`;
    }
  });
  return str;
}

/**
 * format a terraform block
 * @param {string} style name of block (terraform, resource)
 * @param {string} name name of the resource
 * @param {*} data
 * @returns
 */
function formatTfBlock(style, name, data) {
  let tf = "";
  if (contains(["terraform", "provider", "module"], style)) {
    tf += `${style}${style === "terraform" ? "" : ` "${name}"`} {`;
    tf += tfData(data, 0, true);
    tf += `\n}`;
  } else {
    tf += `${style} ${name} {`;
    tf += tfData(data, 0);
    tf += `\n}`;
  }
  return tf;
}

/**
 * convert json to tf
 * @param {string} jsonStr  string
 * @returns {string} terraform string
 */
function jsonToTf(jsonStr) {
  let data = new flute(jsonStr).parse();
  let tf = "";
  function getResourceTf(resources, isData) {
    eachKey(resources, (instance) => {
      let type = instance;
      let data = resources[instance];
      eachKey(data, (name) => {
        let values = data[name];
        tf +=
          formatTfBlock(
            isData ? "data" : "resource",
            `"${type}" "${name}"`,
            values
          ) + "\n\n";
      });
    });
  }
  ["resource", "data"].forEach((key) => {
    if (data[key]) getResourceTf(data[key], key === "data");
  });

  if (data.module) {
    eachKey(data.module, (tfModule) => {
      tf += formatTfBlock(
        "module",
        data.module[tfModule]["//"].metadata.uniqueId,
        data.module[tfModule]
      );
    });
  }

  if (data.provider) {
    eachKey(data.provider, (provider) => {
      data.provider[provider].forEach((instance) => {
        tf += formatTfBlock("provider", provider, instance);
      });
    });
  }

  if (data.terraform) {
    tf += formatTfBlock("terraform", false, data.terraform);
  }

  return tf.replace(/\n\n*$/g, "");
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
          "//": {
            metadata: {
              backend: "local",
              stackName: "cdktf-ecs-consul",
              version: "0.12.2",
            },
            outputs: {},
          },
          data: {
            terraform_remote_state: {
              tfc_outputs: {
                backend: "remote",
                config: {
                  organization: "jcolemorrison",
                  workspaces: {
                    name: "terraform-ecs-consul",
                  },
                },
              },
            },
          },
          module: {
            images_module: {
              "//": {
                metadata: {
                  path: "cdktf-ecs-consul/images_module",
                  uniqueId: "images_module",
                },
              },
              acl_secret_name_prefix:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}",
              acls: true,
              consul_client_token_secret_arn:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.consul_client_token_secret_arn}",
              consul_datacenter:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.consul_dc_name}",
              consul_server_ca_cert_arn:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.consul_root_ca_cert_arn}",
              container_definitions: [
                {
                  cpu: 0,
                  environment: [
                    {
                      name: "NAME",
                      value: "Images",
                    },
                    {
                      name: "MESSAGE",
                      value: "Hello from the CDKTF Image Service",
                    },
                    {
                      name: "UPSTREAM_URIS",
                      value:
                        // eslint-disable-next-line
                        "http://${data.terraform_remote_state.tfc_outputs.outputs.database_private_ip}:27017",
                    },
                  ],
                  essential: true,
                  image: "nicholasjackson/fake-service:v0.23.1",
                  logConfiguration: {
                    logDriver: "awslogs",
                    options: {
                      "awslogs-group":
                        // eslint-disable-next-line
                        "${aws_cloudwatch_log_group.service_logs_30DB8EF6.name}",
                      "awslogs-region":
                        // eslint-disable-next-line
                        "${data.terraform_remote_state.tfc_outputs.outputs.project_region}",
                      "awslogs-stream-prefix":
                        // eslint-disable-next-line
                        "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-",
                    },
                  },
                  name: "images",
                  portMappings: [
                    {
                      containerPort: 9090,
                      hostPort: 9090,
                      protocol: "tcp",
                    },
                  ],
                },
              ],
              cpu: 256,
              family:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images",
              gossip_key_secret_arn:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.consul_gossip_key_arn}",
              log_configuration: {
                logDriver: "awslogs",
                options: {
                  "awslogs-group":
                    // eslint-disable-next-line
                    "${aws_cloudwatch_log_group.service_sidecar_logs_F0723DAB.name}",
                  "awslogs-region":
                    // eslint-disable-next-line
                    "${data.terraform_remote_state.tfc_outputs.outputs.project_region}",
                  "awslogs-stream-prefix":
                    // eslint-disable-next-line
                    "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-",
                },
              },
              memory: 512,
              port: 9090,
              requires_compatibilities: ["FARGATE"],
              retry_join:
                // eslint-disable-next-line
                "${data.terraform_remote_state.tfc_outputs.outputs.consul_server_ips}",
              source: "hashicorp/consul-ecs/aws//modules/mesh-task",
              tags: {
                team: "dev",
              },
              tls: true,
              version: "0.4.2",
            },
          },
          provider: {
            aws: [
              {
                region: "us-east-1",
              },
            ],
          },
          resource: {
            aws_cloudwatch_log_group: {
              service_logs_30DB8EF6: {
                "//": {
                  metadata: {
                    path: "cdktf-ecs-consul/service_logs/service_logs",
                    uniqueId: "service_logs_30DB8EF6",
                  },
                },

                name_prefix:
                  // eslint-disable-next-line
                  "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-",
              },
              service_sidecar_logs_F0723DAB: {
                "//": {
                  metadata: {
                    path: "cdktf-ecs-consul/service_sidecar_logs/service_sidecar_logs",
                    uniqueId: "service_sidecar_logs_F0723DAB",
                  },
                },
                name_prefix:
                  // eslint-disable-next-line
                  "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-",
              },
            },
            aws_ecs_service: {
              images_serivce_71209E8F: {
                "//": {
                  metadata: {
                    path: "cdktf-ecs-consul/images_serivce/images_serivce",
                    uniqueId: "images_serivce_71209E8F",
                  },
                },
                cluster:
                  // eslint-disable-next-line
                  "${data.terraform_remote_state.tfc_outputs.outputs.cluster_arn}",
                desired_count: 1,
                launch_type: "FARGATE",
                // eslint-disable-next-line
                name: "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images",
                network_configuration: {
                  assign_public_ip: false,
                  security_groups: [
                    // eslint-disable-next-line
                    "${data.terraform_remote_state.tfc_outputs.outputs.client_security_group_id}",
                    // eslint-disable-next-line
                    "${data.terraform_remote_state.tfc_outputs.outputs.upstream_security_group_id}",
                  ],
                  subnets:
                    // eslint-disable-next-line
                    "${data.terraform_remote_state.tfc_outputs.outputs.private_subnet_ids}",
                },
                propagate_tags: "TASK_DEFINITION",
                // eslint-disable-next-line
                task_definition: "${module.images_module.task_definition_arn}",
              },
            },
          },
          terraform: {
            backend: {
              local: {
                path: "/Users/cole/Projects/cdktf-ecs-consul/terraform.cdktf-ecs-consul.tfstate",
              },
            },
            required_providers: {
              aws: {
                source: "aws",
                version: "4.32.0",
              },
            },
          },
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
        <h1 style={{ marginTop: "1vh" }}>json-to-tf Playground</h1>
        {/* <div
          style={{
            borderBottom: "1px solid black",
            marginTop: "1vh",
            marginBottom: "2vh",
          }}
        /> */}
        <Tabs>
          <TabList aria-label="formTabs">
            <Tab>Playground</Tab>
            <Tab>Docs</Tab>
          </TabList>
          <TabPanels>
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
                        {<Code code={this.renderedCode()} readOnly />}
                      </TabPanel>
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
                    </TabPanels>
                  </Tabs>
                </div>
              </div>
            </TabPanel>
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
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
