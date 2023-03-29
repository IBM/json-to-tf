const { assert } = require("chai");
const { sortKeys } = require("../lib/utils");

describe("sortKeys", () => {
  it("should sort json keys alphabetically with values that are arrays or objects at the bottom", () => {
    let actualData = JSON.parse(`{
    "module": {
      "images_module": {
        "//": {
          "metadata": {
            "path": "cdktf-ecs-consul/images_module",
            "uniqueId": "images_module"
          }
        },
        "acl_secret_name_prefix": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}",
        "acls": true,
        "consul_client_token_secret_arn": "\${data.terraform_remote_state.tfc_outputs.outputs.consul_client_token_secret_arn}",
        "consul_datacenter": "\${data.terraform_remote_state.tfc_outputs.outputs.consul_dc_name}",
        "consul_server_ca_cert_arn": "\${data.terraform_remote_state.tfc_outputs.outputs.consul_root_ca_cert_arn}",
        "container_definitions": [
          {
            "cpu": 0,
            "environment": [
              {
                "name": "NAME",
                "value": "Images"
              },
              {
                "name": "MESSAGE",
                "value": "Hello from the CDKTF Image Service"
              },
              {
                "name": "UPSTREAM_URIS",
                "value": "http://\${data.terraform_remote_state.tfc_outputs.outputs.database_private_ip}:27017"
              }
            ],
            "essential": true,
            "image": "nicholasjackson/fake-service:v0.23.1",
            "logConfiguration": {
              "logDriver": "awslogs",
              "options": {
                "awslogs-group": "\${aws_cloudwatch_log_group.service_logs_30DB8EF6.name}",
                "awslogs-region": "\${data.terraform_remote_state.tfc_outputs.outputs.project_region}",
                "awslogs-stream-prefix": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
              }
            },
            "name": "images",
            "portMappings": [
              {
                "containerPort": 9090,
                "hostPort": 9090,
                "protocol": "tcp"
              }
            ]
          }
        ],
        "cpu": 256,
        "family": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images",
        "gossip_key_secret_arn": "\${data.terraform_remote_state.tfc_outputs.outputs.consul_gossip_key_arn}",
        "log_configuration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "\${aws_cloudwatch_log_group.service_sidecar_logs_F0723DAB.name}",
            "awslogs-region": "\${data.terraform_remote_state.tfc_outputs.outputs.project_region}",
            "awslogs-stream-prefix": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-"
          }
        },
        "memory": 512,
        "port": 9090,
        "requires_compatibilities": [
          "FARGATE"
        ],
        "retry_join": "\${data.terraform_remote_state.tfc_outputs.outputs.consul_server_ips}",
        "source": "hashicorp/consul-ecs/aws//modules/mesh-task",
        "tags": {
          "team": "dev"
        },
        "tls": true,
        "version": "0.4.2"
      }
    }
  }`);
    let expectedData = [
      "source",
      "acl_secret_name_prefix",
      "acls",
      "consul_client_token_secret_arn",
      "consul_datacenter",
      "consul_server_ca_cert_arn",
      "cpu",
      "family",
      "gossip_key_secret_arn",
      "memory",
      "port",
      "retry_join",
      "tls",
      "version",
      "container_definitions",
      "log_configuration",
      "requires_compatibilities",
      "tags",
    ];
    assert.deepEqual(
      sortKeys(actualData.module.images_module),
      expectedData,
      "it should return data"
    );
  });
});
