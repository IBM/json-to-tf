const { assert } = require("chai");
const { jsonToTf } = require("../lib/json-to-tf");
const {
  stringifyTranspose,
  matchLength,
  stringifyValue,
  longestKeyLength,
  jsonToTfLegacy,
} = require("../lib/json-to-tf-legacy");

describe("jsonToTfLegacy", () => {
  describe("stringifyTranspose", () => {
    it("should transpose list of strings with quotes", () => {
      let expectedData = {
        frog: '"frog"',
        todd: '"todd"',
        number: 4,
      };
      let actualData = stringifyTranspose({
        frog: "frog",
        todd: "todd",
        obj: {
          hi: "mom",
        },
        number: 4,
      });
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return corrext data"
      );
    });
  });
  describe("matchLength", () => {
    it("should match length", () => {
      assert.deepEqual(
        matchLength("a", 10).length,
        10,
        "it should match length"
      );
    });
  });
  describe("strigifyValue", () => {
    it("should return value when not string", () => {
      assert.deepEqual(stringifyValue(4), 4, "it should not add quotes");
    });
    it("should return value when string without carrot", () => {
      assert.deepEqual(stringifyValue("4"), "4", "it should not add quotes");
    });
    it("should return value with quotes when string has carrot", () => {
      assert.deepEqual(stringifyValue("^4"), '"4"', "it should not add quotes");
    });
  });
  describe("longestKey", () => {
    it("should return the number of the longest key with depends_on", () => {
      assert.deepEqual(
        longestKeyLength({
          test: "hi",
          depends_on: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
    it("should return the number of the longest key ignoring fields that start with _", () => {
      assert.deepEqual(
        longestKeyLength({
          test: "hi",
          tes: "hi",
          _depends_on: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
    it("should return the number of the longest subtracting one from the length of fields that begin with *", () => {
      assert.deepEqual(
        longestKeyLength({
          "*test": "hi",
          tes: "hi",
          _depends_on: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
    it("should return the number of the longest subtracting one from the length of fields that begin with -", () => {
      assert.deepEqual(
        longestKeyLength({
          "-test": "hi",
          tes: "hi",
          timeouts: "frog",
        }),
        4,
        "it should return longest key"
      );
    });
  });
  describe("jsonToTfLegacy", () => {
    it("should return a data source", () => {
      let actualData = jsonToTfLegacy("test", "test", { name: "test" }, true);
      let expectedData = 'data "test" "test" {\n  name = test\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource", () => {
      let actualData = jsonToTfLegacy("test", "test", { name: "test" });
      let expectedData = 'resource "test" "test" {\n  name = test\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with timeouts and depends on", () => {
      let actualData = jsonToTfLegacy("test", "test", {
        name: "test",
        timeouts: { create: "1m" },
        depends_on: ["ref1"],
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  timeouts {\n    create = "1m"\n  }\n\n  depends_on = [\n    ref1\n  ]\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with multiblock", () => {
      let actualData = jsonToTfLegacy("test", "test", {
        name: "test",
        "-zone": [
          {
            name: "1",
            foo: "bar",
          },
          {
            name: "2",
            foo: "bar",
          },
        ],
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  zone {\n    name = 1\n    foo  = bar\n  }\n\n  zone {\n    name = 2\n    foo  = bar\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with multiline array", () => {
      let actualData = jsonToTfLegacy("test", "test", {
        name: "test",
        "*zone": ["zone-zone", "zone-zone-zone-zone"],
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  zone = [\n    zone-zone,\n    zone-zone-zone-zone\n  ]\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with a nest object with no assignment", () => {
      let actualData = jsonToTfLegacy("test", "test", {
        name: "test",
        _zone: {
          name: "^the-zone",
          type: "^pizza",
        },
      });
      let expectedData =
        'resource "test" "test" {\n  name = test\n\n  zone {\n    name = "the-zone"\n    type = "pizza"\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with a nest object with an assignment", () => {
      let actualData = jsonToTfLegacy("test", "test", {
        name: "test",
        "^zone": {
          name: "^the-zone",
          type: "^pizza",
        },
      });
      let expectedData =
        'resource "test" "test" {\n  name  = test\n\n  zone = {\n    name = "the-zone"\n    type = "pizza"\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
    it("should return a resource with a nest object with an assignment and a nested array", () => {
      let actualData = jsonToTfLegacy("test", "test", {
        name: "test",
        "^zone": {
          name: "^the-zone",
          type: "^pizza",
          "*toppings": ["^mushroom", "^feta"],
        },
      });
      let expectedData =
        'resource "test" "test" {\n  name  = test\n\n  zone = {\n    name     = "the-zone"\n    type     = "pizza"\n    toppings = [\n      "mushroom",\n      "feta"\n    ]\n  }\n}\n';
      assert.deepEqual(actualData, expectedData, "it should return data");
    });
  });
  describe("jsonToTf", () => {
    it("should return aws instance", () => {
      let actualData = jsonToTf(`{
        "resource": {
          "aws_instance": {
            "example": {
              "instance_type": "t2.micro",
              "ami": "ami-abc123"
            }
          }
        }
      }`);
      let expectedData = `resource "aws_instance" "example" {
  instance_type = "t2.micro"
  ami           = "ami-abc123"
}`;

      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return aws instance with provisioners", () => {
      let actualData = jsonToTf(`{
  "resource": {
    "aws_instance": {
      "example": {
        "provisioner": [
          {
            "local-exec": {
              "command": "echo 'Hello World' >example.txt"
            }
          },
          {
            "file": {
              "source": "example.txt",
              "destination": "/tmp/example.txt"
            }
          },
          {
            "remote-exec": {
              "inline": ["sudo install-something -f /tmp/example.txt"]
            }
          }
        ]
      }
    }
  }
}
`);
      let expectedData = `resource "aws_instance" "example" {
  provisioner "local-exec" {
    command = "echo 'Hello World' >example.txt"
  }
  provisioner "file" {
    source      = "example.txt"
    destination = "/tmp/example.txt"
  }
  provisioner "remote-exec" {
    inline = [
      "sudo install-something -f /tmp/example.txt"
    ]
  }
}`;

      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return aws log group", () => {
      let actualData = jsonToTf(`{
        "resource": {
           "aws_cloudwatch_log_group": {
             "service_logs_30DB8EF6": {
               "//": {
                 "metadata": {
                   "path": "cdktf-ecs-consul/service_logs/service_logs",
                   "uniqueId": "service_logs_30DB8EF6"
                 }
               },
               "name_prefix": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
             }
        }
      }`);
      let expectedData = `resource "aws_cloudwatch_log_group" "service_logs_30DB8EF6" {
  name_prefix = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });

    it("should create three different resources", () => {
      let exampleAwsResources = `{
          "resource": {
        "aws_cloudwatch_log_group": {
          "service_logs_30DB8EF6": {
            "//": {
              "metadata": {
                "path": "cdktf-ecs-consul/service_logs/service_logs",
                "uniqueId": "service_logs_30DB8EF6"
              }
            },
            "name_prefix": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
          },
          "service_sidecar_logs_F0723DAB": {
            "//": {
              "metadata": {
                "path": "cdktf-ecs-consul/service_sidecar_logs/service_sidecar_logs",
                "uniqueId": "service_sidecar_logs_F0723DAB"
              }
            },
            "name_prefix": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-"
          }
        },
        "aws_ecs_service": {
          "images_serivce_71209E8F": {
            "//": {
              "metadata": {
                "path": "cdktf-ecs-consul/images_serivce/images_serivce",
                "uniqueId": "images_serivce_71209E8F"
              }
            },
            "cluster": "\${data.terraform_remote_state.tfc_outputs.outputs.cluster_arn}",
            "desired_count": 1,
            "launch_type": "FARGATE",
            "name": "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images",
            "network_configuration": [{
              "assign_public_ip": false,
              "security_groups": [
                "\${data.terraform_remote_state.tfc_outputs.outputs.client_security_group_id}",
                "\${data.terraform_remote_state.tfc_outputs.outputs.upstream_security_group_id}"
              ],
              "subnets": "\${data.terraform_remote_state.tfc_outputs.outputs.private_subnet_ids}"
            }],
            "propagate_tags": "TASK_DEFINITION",
            "task_definition": "\${module.images_module.task_definition_arn}"
          }
        }
      }
    }`;
      let actualData = jsonToTf(exampleAwsResources);
      let expectedData = `resource "aws_cloudwatch_log_group" "service_logs_30DB8EF6" {
  name_prefix = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
}

resource "aws_cloudwatch_log_group" "service_sidecar_logs_F0723DAB" {
  name_prefix = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-"
}

resource "aws_ecs_service" "images_serivce_71209E8F" {
  cluster         = data.terraform_remote_state.tfc_outputs.outputs.cluster_arn
  desired_count   = 1
  launch_type     = "FARGATE"
  name            = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images"
  propagate_tags  = "TASK_DEFINITION"
  task_definition = module.images_module.task_definition_arn
  network_configuration {
    assign_public_ip = false
    subnets          = data.terraform_remote_state.tfc_outputs.outputs.private_subnet_ids
    security_groups = [
      data.terraform_remote_state.tfc_outputs.outputs.client_security_group_id,
      data.terraform_remote_state.tfc_outputs.outputs.upstream_security_group_id
    ]
  }
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return data source", () => {
      let actualData = jsonToTf(`{ "data": {
        "terraform_remote_state": {
          "tfc_outputs": {
            "backend": "remote",
            "config": {
              "organization": "jcolemorrison",
              "workspaces": {
                "name": "terraform-ecs-consul"
              }
            }
          }
        }
      }
    }`);
      let expectedData = `data "terraform_remote_state" "tfc_outputs" {
  backend = "remote"
  config = {
    organization = "jcolemorrison"
    workspaces = {
      name = "terraform-ecs-consul"
    }
  }
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return module", () => {
      let actualData = jsonToTf(`{
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
      let expectedData = `module "images_module" {
  source                         = "hashicorp/consul-ecs/aws//modules/mesh-task"
  acl_secret_name_prefix         = data.terraform_remote_state.tfc_outputs.outputs.project_tag
  acls                           = true
  consul_client_token_secret_arn = data.terraform_remote_state.tfc_outputs.outputs.consul_client_token_secret_arn
  consul_datacenter              = data.terraform_remote_state.tfc_outputs.outputs.consul_dc_name
  consul_server_ca_cert_arn      = data.terraform_remote_state.tfc_outputs.outputs.consul_root_ca_cert_arn
  cpu                            = 256
  family                         = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images"
  gossip_key_secret_arn          = data.terraform_remote_state.tfc_outputs.outputs.consul_gossip_key_arn
  memory                         = 512
  port                           = 9090
  retry_join                     = data.terraform_remote_state.tfc_outputs.outputs.consul_server_ips
  tls                            = true
  version                        = "0.4.2"
  container_definitions = [
    {
      cpu              = 0
      environment      = [
        {
          name  = "NAME"
          value = "Images"
        }
        {
          name  = "MESSAGE"
          value = "Hello from the CDKTF Image Service"
        }
        {
          name  = "UPSTREAM_URIS"
          value = "http://\${data.terraform_remote_state.tfc_outputs.outputs.database_private_ip}:27017"
        }
      ]
      essential        = true
      image            = "nicholasjackson/fake-service:v0.23.1"
      logConfiguration = {
        logDriver = "awslogs"
        options   = {
          awslogs-group         = aws_cloudwatch_log_group.service_logs_30DB8EF6.name
          awslogs-region        = data.terraform_remote_state.tfc_outputs.outputs.project_region
          awslogs-stream-prefix = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
        }
      }
      name             = "images"
      portMappings     = [
        {
          containerPort = 9090
          hostPort      = 9090
          protocol      = "tcp"
        }
      ]
    }
  ]
  log_configuration = {
    logDriver = "awslogs"
    options = {
      awslogs-group         = aws_cloudwatch_log_group.service_sidecar_logs_F0723DAB.name
      awslogs-region        = data.terraform_remote_state.tfc_outputs.outputs.project_region
      awslogs-stream-prefix = "\${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-"
    }
  }
  requires_compatibilities = [
    "FARGATE"
  ]
  tags = {
    team = "dev"
  }
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return provider block", () => {
      let actualData = jsonToTf(`{
        "provider": {
          "aws": [
            {
              "region": "us-east-1"
            }
          ]
        }
  }`);
      let expectedData = `provider "aws" {
  region = "us-east-1"
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return variable block", () => {
      let actualData = jsonToTf(`{
        "variable": {
          "example": {
            "default": "hello"
          }
        }
  }`);
      let expectedData = `variable "example" {
  default = "hello"
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return output block", () => {
      let actualData = jsonToTf(`{
        "output": {
          "example": {
            "value": "\${aws_instance.example}"
          }
        }
  }`);
      let expectedData = `output "example" {
  value = aws_instance.example
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
    it("should return terraform block", () => {
      let actualData = jsonToTf(`{
        "terraform": {
          "backend": {
            "local": {
              "path": "/Users/cole/Projects/cdktf-ecs-consul/terraform.cdktf-ecs-consul.tfstate"
            }
          },
          "required_providers": {
            "aws": {
              "source": "aws",
              "version": "4.32.0"
            }
          }
        }
  }`);
      let expectedData = `terraform {
  backend "local" {
    path = "/Users/cole/Projects/cdktf-ecs-consul/terraform.cdktf-ecs-consul.tfstate"
  }
  required_providers {
    aws = {
      source  = "aws"
      version = "4.32.0"
    }
  }
}`;
      assert.deepEqual(actualData, expectedData, "it should return terraform");
    });
  });
});
