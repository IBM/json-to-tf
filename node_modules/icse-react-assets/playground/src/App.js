import React, { useState } from "react";
import { contains } from "lazy-z";
import { ClusterForm } from "icse-react-assets";
import "./App.css";

const ClusterFormStory = () => {
  function validName(str) {
    const regex = /^[A-z]([a-z0-9-]*[a-z0-9])?$/s;
    if (str) return str.match(regex) !== null;
    else return false;
  }

  function invalidCallback(stateData, componentProps) {
    return !validName(stateData.name);
  }

  function helperTextCallback(stateData, componentProps) {
    return "<prefix>-" + stateData.name;
  }

  function invalidTextCallback(stateData, componentProps) {
    return contains(["foo", "bar"], stateData.name)
      ? `Cluster name ${stateData.name} already in use.`
      : `Invalid Name. Must match the regular expression: /^[A-z]([a-z0-9-]*[a-z0-9])?$/i`;
  }

  return (
    <ClusterForm
      data={{
        name: "",
        resource_group: "",
        kube_type: "openshift",
        entitlement: "null",
        encryption_key: "",
        cos: "",
        vpc: "management",
        subnets: [],
        workers_per_subnet: 2,
        flavor: "bx2.16x64",
        kube_version: "4.10.52_openshift (Default)",
        update_all_workers: false,
        worker_pools: [
          {
            entitlement: "cloud_pak",
            cluster: "workload",
            flavor: "bx2.16x64",
            name: "logging-pool",
            resource_group: "workload-rg",
            subnets: ["vsi-zone-1", "vsi-zone-2", "vsi-zone-3"],
            vpc: "workload",
            workers_per_subnet: 2,
          },
        ],
        name: "atracker-cos",
        plan: "standard",
        resource_group: "slz-service-rg",
        use_data: false,
        use_random_suffix: false,
        kms: "slz-kms",
      }}
      invalidCallback={invalidCallback}
      invalidTextCallback={invalidTextCallback}
      helperTextCallback={helperTextCallback}
      resourceGroups={["service-rg", "management-rg", "workload-rg"]}
      encryptionKeys={["atracker-key", "key", "roks-key"]}
      cosNames={["atracker-cos", "cos"]}
      vpcList={["management", "workload"]}
      subnetList={[
        "vpe-zone-1",
        "vpe-zone-2",
        "vpe-zone-3",
        "vsi-zone-1",
        "vsi-zone-2",
        "vsi-zone-3",
      ]}
      kubeVersionApiEndpoint={"/mock/api/kubeVersions"}
      flavorApiEndpoint={"/mock/api/machineTypes"}
      propsMatchState={() => {}}
      workerPoolProps={{
        onSave: () => {},
        onDelete: () => {},
        onSubmit: () => {},
        disableSave: () => {},
      }}
      invalidPoolCallback={invalidCallback}
      invalidPoolTextCallback={invalidTextCallback}
    />
  );
};

function App() {
  return (
    <div className="App">
      <ClusterFormStory />
    </div>
  );
}

export default App;
