# JSON to TF

NPM package with utility function to allow conversion of json to terraform.

---

## Example Use

### Input

```js
const jsonToTf = require("json-to-tf");

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
    timeouts: {
      create: "3h",
      delete: "2h",
      update: "3h",
    },
  },
  false
);
```

### Output

```terraform
resource "ibm_container_vpc_cluster" "test" {
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
}
```

---

## Formatting

---

### String Values

By using the `^` character in a string, quotes will be added around that value. This can be used to distinguid string values from reference values without needing to escape each quotation mark.

```js
name: "^slz-workload-cluster"
// converts to terraform:
// name = "slz-workload-cluster"

vpc_id: "ibm_is_vpc.workload_vpc.id"
// converts to terraform:
// vpc_id = ibm_is_vpc.workload_vpc.id
```

---

### Inline Values

Users can pass other inline values, such as numbers, booleans, and null and those values will be added to the terraform code.

```js
worker_count: 2
// converts to terraform:
// worker_count = 2

disable_public_service_endpoint: false
// converts to terraform:
// disable_public_service_endpoint = false
```

---

### Depends On

By using the reserved key `depends_on`, a list of comma separated list of dependencies will be created.

```js
depends_on: ["reference_1", "reference_2"]
```

Converts to Terraform:

```terraform
  depends_on = [
    reference_1,
    reference_2
  ]
```

---

### Timeouts

While other string values need to be escaped, the ones for the `timeouts` field do not. By using the reserved keyword `timeouts`, strings will automatically be surrounded by quotes without the use of the `^` operator. Other objects require the key to be prepended with a special character.

```js
timeouts: {
  create: "3h",
  delete: "2h",
  update: "3h"
}
```

Converts to Terraform:

```terraform
  timeouts {
    create =  "3h"
    delete =  "2h"
    update =  "3h"
  }
```

---

### Blocks Without Assignments

By prepending an underscore `_` to a key with an object value, a single object block will be created within the terraform resource.

```js
_kms_config: {
  crk_id: "ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id",
  instance_id: "ibm_resource_instance.slz_kms.guid",
  private_endpoint: false
}
```

Converts to Terraform:

```terraform
  kms_config {
    crk_id           = ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id
    instance_id      = ibm_resource_instance.slz_kms.guid
    private_endpoint = false
  }
```

---

### Blocks With Assignments

By prepending a carrot `^` to a key with an object value, a single object block will be created within the terraform resource assigned with the `=` operator.

```js
"^kms_config": {
  crk_id: "ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id",
  instance_id: "ibm_resource_instance.slz_kms.guid",
  private_endpoint: false
}
```

Converts to Terraform:

```terraform
  kms_config = {
    crk_id           = ibm_kms_key.slz_kms_slz_vsi_volume_key_key.key_id
    instance_id      = ibm_resource_instance.slz_kms.guid
    private_endpoint = false
  }
```

---

### Multiple Blocks with the Same Name

Prepending a hyphen `-` to a key with a value of an array of objects, multiple blocks will be created for that key.

```js
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
```

Converts to Terraform:

```terraform
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
```

---

### Multiline Arrays

To create an array where each entry has it's own line, prepend the object key with the `*` character.

```js
  "*items" : ["reference_1", "reference_2"]
```

Converts to Terraform:

```terraform
  items = [
    reference_1,
    reference_2
  ]
