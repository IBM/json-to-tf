# JSON to TF

Convert CDKTF formatted JSON to Terraform. 

---

## Example Use

### Input

CDKTF formatting allows for multiple sub objects with the same key. In order to ensure this is possible within JavaScript, CDKTF JSON data must be stringified.

```js
const jsonToTf = require("json-to-tf");

jsonToTf(
  JSON.stringify({
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
    variable: {
      example: {
        default: "hello",
      },
    },
    output: {
      example: {
        value: "${aws_instance.example}",
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
          "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}",
        acls: true,
        consul_client_token_secret_arn:
          "${data.terraform_remote_state.tfc_outputs.outputs.consul_client_token_secret_arn}",
        consul_datacenter:
          "${data.terraform_remote_state.tfc_outputs.outputs.consul_dc_name}",
        consul_server_ca_cert_arn:
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
                  "http://${data.terraform_remote_state.tfc_outputs.outputs.database_private_ip}:27017",
              },
            ],
            essential: true,
            image: "nicholasjackson/fake-service:v0.23.1",
            logConfiguration: {
              logDriver: "awslogs",
              options: {
                "awslogs-group":
                  "${aws_cloudwatch_log_group.service_logs_30DB8EF6.name}",
                "awslogs-region":
                  "${data.terraform_remote_state.tfc_outputs.outputs.project_region}",
                "awslogs-stream-prefix":
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
          "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images",
        gossip_key_secret_arn:
          "${data.terraform_remote_state.tfc_outputs.outputs.consul_gossip_key_arn}",
        log_configuration: {
          logDriver: "awslogs",
          options: {
            "awslogs-group":
              "${aws_cloudwatch_log_group.service_sidecar_logs_F0723DAB.name}",
            "awslogs-region":
              "${data.terraform_remote_state.tfc_outputs.outputs.project_region}",
            "awslogs-stream-prefix":
              "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-",
          },
        },
        memory: 512,
        port: 9090,
        requires_compatibilities: ["FARGATE"],
        retry_join:
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
            "${data.terraform_remote_state.tfc_outputs.outputs.cluster_arn}",
          desired_count: 1,
          launch_type: "FARGATE",
          name: "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images",
          network_configuration: {
            assign_public_ip: false,
            security_groups: [
              "${data.terraform_remote_state.tfc_outputs.outputs.client_security_group_id}",
              "${data.terraform_remote_state.tfc_outputs.outputs.upstream_security_group_id}",
            ],
            subnets:
              "${data.terraform_remote_state.tfc_outputs.outputs.private_subnet_ids}",
          },
          propagate_tags: "TASK_DEFINITION",
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
  })
);
```

### Output

```terraform
terraform {
  backend "local" {
    path = "/Users/cole/Projects/cdktf-ecs-consul/terraform.cdktf-ecs-consul.tfstate"
  }
  required_providers {
    aws = {
      source  = "aws"
      version = "4.32.0"
    }
  }
}

variable "example" {
  default = "hello"
}

provider "aws" {
  region = "us-east-1"
}

module "images_module" {
  source                         = "hashicorp/consul-ecs/aws//modules/mesh-task"
  acl_secret_name_prefix         = data.terraform_remote_state.tfc_outputs.outputs.project_tag
  acls                           = true
  consul_client_token_secret_arn = data.terraform_remote_state.tfc_outputs.outputs.consul_client_token_secret_arn
  consul_datacenter              = data.terraform_remote_state.tfc_outputs.outputs.consul_dc_name
  consul_server_ca_cert_arn      = data.terraform_remote_state.tfc_outputs.outputs.consul_root_ca_cert_arn
  cpu                            = 256
  family                         = "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images"
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
          value = "http://${data.terraform_remote_state.tfc_outputs.outputs.database_private_ip}:27017"
        }
      ]
      essential        = true
      image            = "nicholasjackson/fake-service:v0.23.1"
      logConfiguration = {
        logDriver = "awslogs"
        options   = {
          awslogs-group         = aws_cloudwatch_log_group.service_logs_30DB8EF6.name
          awslogs-region        = data.terraform_remote_state.tfc_outputs.outputs.project_region
          awslogs-stream-prefix = "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
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
      awslogs-stream-prefix = "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-"
    }
  }
  requires_compatibilities = [
    "FARGATE"
  ]
  tags = {
    team = "dev"
  }
}

resource "aws_cloudwatch_log_group" "service_logs_30DB8EF6" {
  name_prefix = "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-"
}

resource "aws_cloudwatch_log_group" "service_sidecar_logs_F0723DAB" {
  name_prefix = "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images-sidcars-"
}

resource "aws_ecs_service" "images_serivce_71209E8F" {
  cluster         = data.terraform_remote_state.tfc_outputs.outputs.cluster_arn
  desired_count   = 1
  launch_type     = "FARGATE"
  name            = "${data.terraform_remote_state.tfc_outputs.outputs.project_tag}-images"
  propagate_tags  = "TASK_DEFINITION"
  task_definition = module.images_module.task_definition_arn
  network_configuration = {
    assign_public_ip = false
    subnets          = data.terraform_remote_state.tfc_outputs.outputs.private_subnet_ids
    security_groups = [
      data.terraform_remote_state.tfc_outputs.outputs.client_security_group_id,
      data.terraform_remote_state.tfc_outputs.outputs.upstream_security_group_id
    ]
  }
}

data "terraform_remote_state" "tfc_outputs" {
  backend = "remote"
  config = {
    organization = "jcolemorrison"
    workspaces = {
      name = "terraform-ecs-consul"
    }
  }
}

output example {
  value = aws_instance.example
}
```

---

## Using Within Compiled JavaScript

A browserified `Stream` and `Buffer` must be added to the window object in order for `json-to-tf` to work within a webpack compiled front-end library.