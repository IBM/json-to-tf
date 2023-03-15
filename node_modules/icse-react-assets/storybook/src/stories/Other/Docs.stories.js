import React from "react";
import { Docs } from "icse-react-assets";

export default {
  component: Docs,
  title: "Components/Other/Docs",
  argTypes: {
    content: {
      description:
        "An array of object to be rendered as content for dynamic documentation", // description
      type: { required: true }, // required prop or not
      control: "none",
    },
    "content[].className": {
      description: "A string for inputting CSS styling classes (optional)", // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    "content[].text": {
      description:
        "A string value to be displayed as a text section. Conflicts with `.table` and `.subHeading` fields", // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    "content[].table": {
      description:
        "An array containing an array of strings to be displayed as a table. Order is important. To add headers to the table, add `_headers` as the first element in the array. Conflicts with `.text` and `.subHeading` fields", // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    "content[].subHeading": {
      description:
        "AA string value to be displayed with subHeading styling. Conflicts with `.text` and `.table` fields", // description
      type: { required: false }, // required prop or not
      control: "none",
    },
    relatedLinks: {
      description:
        "An array of links to be added at the end of documentation. Each array item is an array with either one or two string elements, with the first string being the URL and the second being a title override. With only the URL passed, each item will be labelled `Docs` by default",
      type: { required: false },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Docs is component that allows the user to display vital information aesthetically",
      },
    },
  },
};

const DocsStory = () => {
  return (
    <Docs
      content={[
        {
          text: "IBM Cloud Object Storage (COS) is a highly available, durable, and secure platform for storing unstructured data. PDFs, media files, database backups, disk images, large structured datasets can be uploaded as objects and then organized into containers named Buckets.",
          className: "marginBottomSmall",
        },
        {
          subHeading: "Configuration",
        },
        {
          text: "The initial configuration includes two COS instances:",
          className: "marginBottomXs",
        },
        {
          table: [
            [
              // (optional) header
              "_headers",
              "Instance Name",
              "Description",
            ],
            [
              // row 1
              "cos", // instance name
              "A COS instance with two buckets, a management bucket and a workload bucket, where respective objects can be stored", // description
            ],
            [
              // row 2
              "atracker-cos", // instance name
              "A COS instance with a bucket where Activity Tracker logs will be stored", // description
            ],
          ],
        },
      ]}
      relatedLinks={[
        ["https://cloud.ibm.com/docs", "IBM Cloud Docs"], // link with override name
        ["https://cloud.ibm.com"], // link without override
      ]}
    />
  );
};
export const Default = DocsStory.bind({});
