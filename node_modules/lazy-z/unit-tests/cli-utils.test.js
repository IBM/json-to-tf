const { assert } = require("chai");
const utils = require("../lib/cli-utils");
const overrideJson = require("./data-files/override.json");

describe("cli utils", () => {
  describe("flagTest", () => {
    it("should throw an error if duplicate flags are found", () => {
      let task = () => {
        utils.flagTest(
          "help",
          {
            "-h": "--help",
            "--help": "-h",
          },
          "-h",
          "-h"
        );
      };
      assert.throws(task, "Invalid duplicate flag -h");
    });
    it("should throw an error if a flag is used with a synonym multiple times", () => {
      let task = () => {
        utils.flagTest(
          "help",
          {
            "-h": "--help",
            "--help": "-h",
          },
          "-h",
          "--help"
        );
      };
      assert.throws(task, "Invalid duplicate flag --help.");
    });
    it("should throw an error if a flag is not found in aliases", () => {
      let task = () => {
        utils.flagTest(
          "help",
          {
            "-h": "--help",
            "--help": "-h",
          },
          "-h",
          "-f"
        );
      };
      assert.throws(task, "Invalid flag -f");
    });
    it("should not throw an error if reading an argument that does not have at least one hyphen", () => {
      let task = () => {
        utils.flagTest(
          "help",
          {
            "--in": "-i",
            "-i": "--in",
          },
          "--in",
          "filePath"
        );
      };
      assert.doesNotThrow(task);
    });
    it("should throw an error if all needed flags are not provided", () => {
      let task = () => {
        utils.flagTest(
          "help",
          { "--in": "-i", "-i": "--in", "-o": "--out", "--out": "-o" },
          "--in",
          "./filePath"
        );
      };
      assert.throws(task, "Missing flags from command 'help': --in --out");
    });
    it("should not throw an error if an optional flag is passed", () => {
      let task = () => {
        utils.flagTest(
          "plan",
          utils.getVerbActions(
            {
              requiredFlags: ["in", "out", "type"],
              optionalFlags: [
                {
                  name: "tfvar",
                  allowMultiple: true,
                },
              ],
            },
            {
              help: ["-h", "--help"],
              in: ["-i", "--in"],
              out: ["-o", "--out"],
              type: ["-t", "--type"],
              tfvar: ["-v", "--tf-var"],
            }
          ),
          "-i",
          "./in-file-path/",
          "-o",
          "./out-file.test.js",
          "-t",
          "tfx",
          "-v",
          "testVar1=true",
          "-v",
          'testVar2="true"'
        );
        assert.doesNotThrow(task);
      };
    });
  });
  describe("getVerbActions", () => {
    it("should return correct alias map for a verb", () => {
      let plan = {
        requiredFlags: ["in", "out", "type"],
      };
      let tags = {
        help: ["-h", "--help"],
        in: ["-i", "--in"],
        out: ["-o", "--out"],
        type: ["-t", "--type"],
      };
      let expectedData = {
        "-i": "--in",
        "--in": "-i",
        "-o": "--out",
        "--out": "-o",
        "-t": "--type",
        "--type": "-t",
      };
      let actualData = utils.getVerbActions(plan, tags);
      assert.deepEqual(expectedData, actualData, "should return correct data");
    });
    it("should remove optional flags with no needed key values", () => {
      let tags = {
        help: ["-h", "--help"],
        in: ["-i", "--in"],
        out: ["-o", "--out"],
        type: ["-t", "--type"],
        shallow: ["-s", "--shallow"],
        // extract -in path -out path -type tfx | yaml
      };
    });
    it("should return correct alias map for a verb with optional multiple tags", () => {
      let plan = {
        requiredFlags: ["in", "out", "type"],
        optionalFlags: [
          {
            name: "tfvar",
            allowMultiple: true,
          },
        ],
      };
      let tags = {
        help: ["-h", "--help"],
        in: ["-i", "--in"],
        out: ["-o", "--out"],
        type: ["-t", "--type"],
        tfvar: ["-v", "--tf-var"],
        // extract -in path -out path -type tfx | yaml
      };
      let expectedData = {
        "-i": "--in",
        "--in": "-i",
        "-o": "--out",
        "--out": "-o",
        "-t": "--type",
        "--type": "-t",
        "?*-v": "?*--tf-var",
        "?*--tf-var": "?*-v",
      };
      let actualData = utils.getVerbActions(plan, tags);
      assert.deepEqual(expectedData, actualData, "should return correct data");
    });
    it("should return correct alias map for a verb with optional tags", () => {
      let plan = {
        requiredFlags: ["in", "out", "type"],
        optionalFlags: [
          {
            name: "tfvar",
          },
        ],
      };
      let tags = {
        help: ["-h", "--help"],
        in: ["-i", "--in"],
        out: ["-o", "--out"],
        type: ["-t", "--type"],
        tfvar: ["-v", "--tf-var"],
        // extract -in path -out path -type tfx | yaml
      };
      let expectedData = {
        "-i": "--in",
        "--in": "-i",
        "-o": "--out",
        "--out": "-o",
        "-t": "--type",
        "--type": "-t",
        "?-v": "?--tf-var",
        "?--tf-var": "?-v",
      };
      let actualData = utils.getVerbActions(plan, tags);
      assert.deepEqual(expectedData, actualData, "should return correct data");
    });
  });
  describe("replaceOptionalFlags", () => {
    it("should return command if none optional flags", () => {
      let actualData = utils.replaceOptionalFlags(
        { requiredFlags: ["one"] },
        {},
        "hi"
      );
      assert.deepEqual(actualData, ["hi"], "it should return commands");
    });
    it("should replace optional flags that do not accept multiple arguments", () => {
      let actualData = utils.replaceOptionalFlags(
        {
          optionalFlags: [
            {
              name: "optional",
            },
          ],
        },
        {
          optional: ["-o", "--ooo"],
        },
        "-o",
        "frog"
      );
      let expectedData = ["?-o", "frog"];
      assert.deepEqual(
        actualData,
        expectedData,
        "it should return correct data"
      );
    });
  });
  describe("flagValues", () => {
    it("should return key value pair of flag values", () => {
      let actualData = utils.flagValues(
        "plan",
        {
          requiredFlags: ["in", "out", "type"],
          optionalFlags: [
            {
              name: "tfvars",
              allowMultiple: true,
            },
          ],
        },
        {
          help: ["-h", "--help"],
          in: ["-i", "--in"],
          out: ["-o", "--out"],
          type: ["-t", "--type"],
          tfvars: ["-v", "--tf-var"],
        },
        "-i",
        "./in-file-path/",
        "-o",
        "./out-file.test.js",
        "-t",
        "tfx",
        "-v",
        "testVar1=true",
        "-v",
        'testVar2="true"'
      );
      let expectedData = {
        in: "./in-file-path/",
        out: "./out-file.test.js",
        type: "tfx",
        tfvars: ["testVar1=true", 'testVar2="true"'],
      };
      assert.deepEqual(actualData, expectedData, "should return correct data");
    });
    it("should not assign a value to optional flags with no matching key = true", () => {
      let expectedData = {
        in: "./in-file-path/",
        out: "./out-file.test.js",
        type: "tfx",
        tfvars: ["testVar1=true", 'testVar2="true"'],
        shallow: true,
      };
      let actualData = utils.flagValues(
        "plan",
        {
          requiredFlags: ["in", "out", "type"],
          optionalFlags: [
            {
              name: "tfvars",
              allowMultiple: true,
            },
            {
              name: "shallow",
              noMatchingValue: true,
            },
          ],
        },
        {
          help: ["-h", "--help"],
          in: ["-i", "--in"],
          out: ["-o", "--out"],
          type: ["-t", "--type"],
          tfvars: ["-v", "--tf-var"],
          shallow: ["-s", "--shallow"],
        },
        "-i",
        "./in-file-path/",
        "-o",
        "./out-file.test.js",
        "-s",
        "-t",
        "tfx",
        "-v",
        "testVar1=true",
        "-v",
        'testVar2="true"'
      );
      assert.deepEqual(actualData, expectedData, "should return correct data");
    });
    it("should run correctly with the icse cli data", () => {
      let tags = {
        time: ["-t", "--time"],
        api_key: ["-a", "--apikey"],
        justification: ["-j", "--justification"],
      };
      // flags for break glass
      let action = {
        requiredFlags: ["api_key", "justification"],
        optionalFlags: [
          {
            name: "time",
            noMatchingValue: false
          },
        ],
      };
      let actualData = utils.flagValues("breakglass", action, tags, ...[
        `-t`,
        `8`,
        `-a`,
        `API_KEY`,
        `-j`,
        "justification value trails at the end of the line still subject to 30 character minimum",
      ]);
      assert.deepEqual(
        actualData,
        {
          api_key: "API_KEY",
          time: "8",
          justification:
            "justification value trails at the end of the line still subject to 30 character minimum",
        },
        "it should"
      );
    });
    it("should run correctly with the icse cli checkglass data", () => {
      let tags = {
        time: ["-t", "--time"],
        api_key: ["-a", "--apikey"],
        justification: ["-j", "--justification"],
      };
      // flags for break glass
      let action = {
        requiredFlags: ["api_key", "justification"],
        optionalFlags: [
          {
            name: "time",
            noMatchingValue: false
          },
        ],
      };
      let actualData = utils.flagValues("breakglass", action, tags, ...[
        `-t`,
        `8`,
        `-a`,
        `API_KEY`,
        `-j`,
        "justification value trails at the end of the line still subject to 30 character minimum",
      ]);
      assert.deepEqual(
        actualData,
        {
          api_key: "API_KEY",
          time: "8",
          justification:
            "justification value trails at the end of the line still subject to 30 character minimum",
        },
        "it should"
      );
    });
  });
});
