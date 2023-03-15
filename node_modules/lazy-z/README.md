# lazy-z utils

lazy-z is a light-weight NodeJS library for assorted shortcuts and utilities

## Table of Contents

1. [Installation](#installation)
2. [Revision Constructor](#revision-constructor)
   - [Revision Methods](#revision-methods)
     - [child](#revisionchild)
     - [deleteArrChild](#revisiondeletearrchild)
     - [duplicateIndexCheck](#revisionduplicateindexcheck)
     - [push](#revisionpush)
     - [set](#revisionset)
     - [setDoneCallback](#revisionsetDoneCallback)
     - [then](#revisionthen)
     - [update](#revisionupdate)
     - [updateEachChild](#revisionupdateeachchild)
     - [updateEachNestedChild](#revisionupdateEachNestedChild)
3. [Shortcut Methods](#shorcut-methods)
   - [azsort](#azsort)
   - [buildNumberDropdownList](#buildNumberDropdownList)
   - [contains](#contains)
   - [containsKeys](#containskeys)
   - [deepEqual](#deepequal)
   - [distinct](#distinct)
   - [eachKey](#eachkey)
   - [eachZone](#eachZone)
   - [isBoolean](#isBoolean)
   - [isEmpty](#isempty)
   - [isFunction](#isfunction)
   - [isIpv4CidrOrAddress](#isIpv4CidrOrAddress)
   - [isNullOrEmptyString](#isNullOrEmptyString)
   - [isString](#isString)
   - [isWholeNumber](#isWholeNumber)
   - [keys](#keys)
   - [keyValueType](#keyValueType)
   - [numberToZoneList](#numberToZoneList)
   - [objectAtFirstKey](#objectAtFirstKey)
   - [prettyJSON](#prettyjson)
   - [validIpv4Test](#validIpv4Test)
4. [Value Test Methods](#value-test-methods)
   - [arrTypeCheck](#arrtypecheck)
   - [containsAny](#containsany)
   - [containsCheck](#containscheck)
   - [emptyCheck](#emptycheck)
   - [getType](#getType)
   - [keyCheck](#keyCheck)
   - [keyTest](#keytest)
   - [typeCheck](#typecheck)
   - [zoneTest](#zonetest)
5. [String Methods](#string-methods)
   - [camelCase](#camelcase)
   - [capitalize](#capitalize)
   - [getLongestKey](#getlongestkey)
   - [kebabCase](#kebabcase)
   - [matchLength](#matchlength)
   - [removeTrailingSpaces](#removetrailingspaces)
   - [stringify](#stringify)
   - [titleCase](#titlecase)
6. [Number Methods](#number-methods)
   - [isInRange](#isinrange)
   - [validPortRange](#validPortRange)
7. [Object Methods](#object-methods)
   - [allFieldsNull](#allFieldsNull)
   - [arraySplatIndex](#arraySplatIndex)
   - [carve](#carve)
   - [duplicateKeyTest](#duplicateKeyTest)
   - [getObjectFromArray](#getObjectFromArray)
   - [hasDuplicateKeys](#hasDuplicateKeys)
   - [splat](#splat)
   - [splatContains](#splatContains)
   - [spreadKeyValues](#spreadKeyValues)
   - [transpose](#transpose)
8. [Encoding Methods](#encoding-methods)
   - [hclEncode](#hclEncode)
9. [CLI Utility Methods](#cli-utility-methods)
   - [flagTest](#flagtest)
   - [getVerbActions](#getVerbActions)
   - [replaceOptionalFlags](#replaceoptionalflags)
10. [Array Methods](#array-methods)
    - [numberStringList](#numberStringList)
    - [flatten](#flatten)
11. [lazyZstate](#lazyZstate)
12. [axios mocks](#axios-mocks)
13. [Networking Utilities](#networking-utilities)
  - [buildNetworkingRule](#buildnetworkingrule)
  - [formatCidrBlock](#formatCidrBlock)
13. [Contributing](#contributing)
14. [Code Test Coverage](#code-test-coverage)

---

## Installation

```shell
npm i lazy-z
```

---

## Revision Constructor

The revision constructor allows for users to update complex JSON objects in place with easy to read chaining syntax.

```js
let testData = {
  data : [
    {
      name: "test"
      value: false
    }
  ]
}

new revision(testData).child("data", "test").update({value: true});

// updates testData to
{
  data : [
    {
      name: "test"
      value: true
    }
  ]
}
```

## Revision Methods

### revision.child

Get data from an object. If getting data from an array of objects, users can specify a search value and index. The default index is `name`.

```js
const { revision } = require("lazy-z");

let testData = {
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};

let obj = new revision(testData).child("sons", "myson").data;
// gets the value
{
  name: "myson",
  value: "yes",
}

let obj = new revision(testData).child("sons", "also yes", "value").data;
// gets the value
{
  name: "myotherson",
  value: "also yes"
}

let obj = new revision(testData).child("sons", "also yes", "value").child("name").data;
// gets the value
"myotherson"
```

### revision.deleteArrChild

Delete an object from an array of objects using a value, and optionally an index (defaults to `name`).

```js
const { revision } = require("lazy-z");
let testData = {
  enemies: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};

new revision(testData)
  .child("enemies")
  .deleteArrChild("myson")
  .deleteArrChild("also yes", "value");

// deletes entries from array `enemies` testData value is now
{
  enemies: [];
}
```

### revision.duplicateIndexCheck

check an array of objects has a duplicate field value.

```js
const { revision } = require("lazy-z");

let testData = {
  friends: [
    {
      name: "gary",
      test: "test",
    },
  ],
};

// throws an error, an object with name gary already exists in `friends` array
new revision(testData).duplicateIndexCheck("friends", { name: "gary" });

// throws an error, an object with the test value `"test"`  already exists in `friends` array
new revision(testData).duplicateIndexCheck(
  "friends",
  {
    name: "todd",
    test: "test",
  },
  {
    oldValue: "frog",
    index: "test",
  }
);

// does not throw
new revision(testData).duplicateIndexCheck("friends", { name: "kyle" });
```

### revision.push

Push a value to a nested child array. Users specify a template and parameters for an object, or only parameters.

#### No Template

```js
const { revision } = require("lazy-z");

let testData = {
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};

// adds the object to the sons array
new revision(testData).child("sons").push({
  name: "todd",
});
```

#### With Template

```js
const { revision } = require("lazy-z");

let testData = {
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};
let template = { _no_default: ["foo", "name", "value"], _defaults: { bar: true } };

new revision(testData).child("sons").push(template, {
  name: "todd",
});

// adds the object to the sons array
{
  name: "todd",
  foo: null,
  value: null,
  bar: true
}

```

### revision.set

Set the value of an object key. Users specify a template and parameters for an object, or only parameters.

```js
const { revision } = require("lazy-z");

let testData = {
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};
const template = { _no_default: ["foo", "bar", "name", "value"] };
new revision(testData).set("todds_place", template, {
  name: "todd",
});

// sets test_data.todds_place to value
{
  foo: null,
  bar: null,
  name: "todd",
  value: null
}
```

### revision.setDoneCallback

Set a callback function for the revision constructor. Trigger the function by calling `.done()` when terminating the chain.

```js
const { revision } = require("lazy-z");

let testData = {
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};
const template = { _no_default: ["foo", "bar", "name", "value"] };
new revision(testData)
    .setDoneCallback(data => { console.log(data) })
    .set("todds_place", template, {
      name: "todd",
    })
    .done();

// logs when done:
{
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
  todds_place: {
    foo: null,
    bar: null,
    name: "todd",
    value: null
  }
}

```

### revision.then

Perform arbitrary code in the chain using the current data without exiting.

```js
const { revision } = require("lazy-z");

let testData;
new revision({ hi: "mom" }).then((data) => {
  testValue = data;
});

// sets testValue to
{
  hi: "mom";
}
```

### revision.update

Update an object from a complex object in place.

```js
const { revision } = require("lazy-z");

let testData = {
  sons: [
    {
      name: "myson",
      value: "yes",
    },
    {
      name: "myotherson",
      value: "also yes",
    },
  ],
};

new revision(testData)
  .child("sons", "myotherson")
  .update({ value: "awww yeah" });

// sets the value of testData.sons[1] in place to
{
  name: "myotherson",
  value: "awww yeah",
}
```

### revision.updateChild

Update a child array without changing the data in the revision store chain.

```js
const { revision } = require("lazy-z");

let testData = {
  friends: [{ name: "bear", test: "value" }],
};

let updateData = new revision(testData).updateChild("friends", "bear", {
  test: "thumbsup",
}).data;

// value for testData and update data
{
  friends: [{ name: "bear", test: "thumbsup" }],
}
```

### revision.updateEachChild

Update each child of an array with a callback function.

```js
const { revision } = require("lazy-z");

let testData = {
  friends: [
    {
      name: "kyle",
      high_score: 12,
    },
    {
      name: "kevin",
      high_score: 100,
    },
  ],
};

// change each value for high_score to 0 in place
new revision(testData).updateEachChild("friends", (friend) => {
  friend.high_score = 0;
});
```

### revision.updateEachNestedChild

Update each nested child within any depth of arrays.

```js
const { revision } = require("lazy-z");
let testData = {
  a: [
    {
      b: [
        {
          c: [{ test: "true" }],
        },
      ],
    },
    {
      b: [
        {
          c: [{ test: "true" }],
        },
        {
          c: [{ test: "true" }],
        },
      ],
    },
  ],
};

new revision(testData).updateEachNestedChild(["a", "b", "c"], (entry) => {
  entry.test = false;
});

// updates test data value to
{
  a: [
    {
      b: [
        {
          c: [{ test: false }],
        },
      ],
    },
    {
      b: [
        {
          c: [{ test: false }],
        },
        {
          c: [{ test: false }],
        },
      ],
    },
  ];
}
```

---

## Shorcut Methods

### azsort

Callback function for the `sort` command to order strings from a to z

```js
const { azsort } = require("lazy-z");

["frog", "egg", "todd", "help"].sort(azsort);

// returns
["egg", "frog", "help", "todd"];
```

### buildNumberDropdownList

Creates a list of numbers as a string

```js
const { buildNumberDropdownList } = require("lazy-z");

buildNumberDropdownList(5)

// returns
["0", "1", "2", "3", "4"];
```

### contains

Shortcut to check if string or array contains a value

```js
const { contains } = require("lazy-z");

contains("egg nog", "egg");

// returns
true;

contains(["egg", "nog"], "egg");
// returns
true;
```

### containsKeys

Check to see if an object contains a key

```js
const { containsKeys } = require("lazy-z");

containsKeys({ one: 1, two: 2 }, "one");
// returns
true;
```

### deepEqual

Check to see if two values have all fields equal.

```js
const { deepEqual } = require("lazy-z");

deepEqual({ foo: "bar" }, { foo: "baz" }); // returns false
deepEqual({ foo: "bar" }, { foo: "bar" }); // returns true
```

### distinct

Returns all distinct entries in an array

```js
const { disctinct } = require("lazy-z");

distinct(["c", "a", "b", "b", "a", "g", "e"])[
  // returns
  ("c", "a", "b", "g", "e")
];
```

### eachKey

Shortcut for `Object.keys(object).forEach(i => {})`

```js
const { eachKey } = require("lazy-z");

eachKey({ one: 1, two: 2 }, (key, index) => {
  console.log(key + " " + index);
});
```

### eachZone

Shortcut for `["zone-1", "zone-2", "zone-3"].forEach(...)`

```js
const { eachZone } = require("lazy-z")

eachZone(3, zone => {
  console.log(zone);
})
```

### isBoolean

Test if a value is boolean

```js
const { isBoolean } = require("lazy-z");

isBoolean(true); // returns true
isBoolean(["item"]); // returns false
```

### isEmpty

Test if an array has no entries

```js
const { isEmpty } = require("lazy-z");

let emptyArray = [];

isEmpty(emptyArray); // returns true
isEmpty(["item"]); // returns false
```

### isFunction

Returns true if a value is a function

```js
const { isFunction } = require("lazy-z");

isFunction("string"); // returns false
isFunction(isFunction); // returns true
```

### isIpv4CidrOrAddress

Test if a value is a valid IPV4 CIDR block or address.

```js
const { isIpv4CidrOrAddress } = require("lazy-z");

isIpv4CidrOrAddress("8.8.8.8"); // returns true
isIpv4CidrOrAddress("8.8.8.8/8"); // returns true
isIpv4CidrOrAddress("item"); // returns false
```

### isNullOrEmptyString

Test if a value is `null` or an empty string

```js
const { isNullOrEmptyString } = require("lazy-z");

isNullOrEmptyString(null); // returns true
isNullOrEmptyString(""); // returns true
isNullOrEmptyString("item"); // returns false
```

### isString

Test if a value is a string

```js
const { isString } = require("lazy-z");

isString("string"); // returns true
isString(["item"]); // returns false
```

### isWholeNumber

Shortcut for `<number> % 1 === 0`;

```js
const { isWholeNumber } = require("lazy-z");

isWholeNumber(1000); // returns true
isWholeNumber(1.234); // returns false
```

### keys

Get the keys of an object

```js
const { keys } = require("lazy-z");
keys({ one: 1, two: 2 })[
  // returns
  ("one", "two")
];
```

### keyValueType

Get the type of an object property by key name

```js
const { keyValueType } = require("lazy-z");

keyValueType({ one: 1 }, "one");
// returns
("number");
```

### numberToZoneList

Get a list of zones from a number to string
```js
const { numberToZoneList } = require("lazy-z");

numberToZoneList(3);
// returns
["zone-1", "zone-2", "zone-3"]
```

### objectAtFirstKey

Shortcut to get the nested object from the first key of the parent

```js
const { objectAtFirstKey } = require("lazy-z");

let obj = {
  sub_obj: {
    one: "one",
  },
};

objectAtFirstKey(obj);
// returns
{
  one: "one";
}
```

### prettyJSON

Shortcut for JSON.stringify(obj, null, 2)

```js
const { prettyJSON } = require("lazy-z");

prettyJSON({ one: 1, two: 2 });

// returns string
`{
    "one" : 1,
    "two" : 2,
}`;
```

### validIpv4Test

Test if a value is a valid IPV4 CIDR block or IP address. Throw an error if it is not.

```js
const { validIpv4Test } = require("lazy-z");

validIpv4Test("test", "honk");

// throws
("test expected valid ipv4 address or CIDR block, got honk");
```

---

## Value Test Methods

The following methods evaluate values

### arrTypeCheck

Check all items in an array for a specific type. Will throw an error if types do not match

```js

const { arrTypeCheck } = require("lazy-z");

arrTypeCheck("array expected all elements to be", "string", ["one", 2])

// throws
`array expected all elements to be type string got ["string", "number"]

```

### containsAny

Checks to see if any instances of string from one array are found in another array of string

```js
const { containsAny } = require("lazy-z");

containsAny(["a"], ["b"]);
// returns
false;

containsAny(["b", "c", "d", "e"], ["b"]);
// returns
true;
```

### containsCheck

Test to see if an array contains a value. Throw an error if not in the array

```js
const { containsCheck } = require("lazy-z");

containsCheck(
  "should contain the number 4",
  ["frog", "string", "egg"],
  "4"
) // throws
`should contain the number 4 got ["frog", "string", "egg"]`;
```

### emptyCheck

Test to see if an array is empty. Throw an error if it is.

```js
const { emptyCheck } = require("lazy-z");

emptyCheck(
  "array should not be empty",
  []
) // throws
`array should not be empty`;
```

### getType

Get the type of a value, evaluates to `string`, `number`, `object`, `boolean`, `Array`, or `Function`

```js
const { getType } = require("lazy-z");

getType(getType);
// returns
("Function");

getType([]);
// returns
("Array");

getType({});
// returns
("object");
```

### keyCheck

Throw an error when an object does not have needed keys

```js
/**
 * Check an object for correct keys
 * @param {string} message Display message
 * @param {Object} value Value to check
 * @param {Array<string>} keys Keys to check for
 * @param {boolean?} strict Check to ensure only keys are present, otherwise non-present keys are ok
 * @throws if keys do not match
 */
function keyCheck(message, value, checkKeys, strict)


const { keyCheck } = require("lazy-z");

keyCheck("test expects to have the correct params", { foo: "baz" }, ["frog"]);
// throws
'test expects to have the correct params ["frog"] got ["foo"]'
```

### keyTest

Test to see if an object has needed keys

```js
/**
 * Test to see if an object has needed keys
 * @param {Object} value Value to check
 * @param {Array<string>} keys Keys to check for
 * @param {boolean?} strict Check to ensure only keys are present, otherwise non-present keys are ok
 * @returns {boolean} True if all params match
 */
function keyTest(value, checkKeys, strict)

const { keyTest } = require("lazy-z");

keyTest({foo: "baz"}, ["foo"]); // returns true
keyTest({foo: "baz", bar: "bar"}, ["foo"], true); // returns false
keyTest({foo: "baz", bar: "bar"}, ["foo", bar], true); // returns true
```

### typeCheck

Checks a value type and throws an error if the type does not match. Acceptect types are `string`, `number`, `object`, `boolean`, `Array`, and `Function`.

```js
const { typeCheck } = require("lazy-z");

typeCheck(
  "expects value to be type",
  "string",
  1
) // throws an error
`expects value to be type string got number`;
```

### zoneTest

Checks to see if a zone number is 1, 2, or 3. Throws an error if it is not.

```js
const { zoneTest } = require("lazy-z");

zoneTest(4)
// throws an error
"Zone must be 1, 2, or 3."
```

---

## String Methods

Methods for dealing with strings

### camelCase

Format a string from from `All Caps With Spaces` to `allCapsWithSpaces`

```js
const { camelCase } = require("lazy-z");

camelCase(`All Caps With Spaces`);
camelCase(`All_Caps with-Spaces`);
camelCase(`all_caps_with_spaces`);
// all return
`allCapsWithSpaces`;
```

### capitalize

Capitalize the first character of a string

```js
const { capitalize } = require("lazy-z");

capitalize("help");
// returns
("Help");
```

### getLongestKey

Get the length of the longest key from an object

```js
const { getLongestKey } = require("lazy-z");

getLongestKey({ a: true, bb: false, ccc: true });
// returns
3;
```

### kebabCase

Format a string from from `All Caps With Spaces` to `all-caps-with-spaces`

```js
const { kebabCase } = require("lazy-z");

kebabCase(`All Caps With Spaces`);
kebabCase(`All_Caps with-Spaces`);
kebabCase(`all_caps_with_spaces`);
// all return
`all-caps-with-spaces`;
```

### matchLength

Match the length of a string to a number by appending spaces

```js
const { matchLength } = require("lazy-z");

matchLength("help", 12);
// returns
("help        ");
```

### removeTrailingSpaces

```js
const { removeTrailingSpaces } = require("lazy-z");

removeTrailingSpaces("help        ");
// returns
("help");
```

### stringify

Create a string from any data type

```js
const { stringify } = require("lazy-z");

stringify(
  stringify
) // returns
`function stringify(data) {
  let dataType = getType(data);
  if (dataType === "Function") return data.toString();
  if (dataType === "Array" || dataType === "object") return prettyJSON(data);
  else return \`\${data}\`;
}`;
```

### titleCase

Format a string from from `all-caps-with-spaces` to `All Caps With Spaces`

```js
const { titleCase } = require("lazy-z");

titleCase(`allCapsWithSpaces`);
titleCase(`All_Caps with-Spaces`);
titleCase(`all_caps_with_spaces`);
// all return
`All Caps With Spaces`;
```

---

## Number Methods

Methods for numbers

### isInRange

Return `true` if a number is contained in a range

```js
const { isInRange } = require("lazy-z");

isInRange(1.5, 1, 2); // value, min, max
// returns
true;
```

### validPortRange

Check if a port range is valid.

```js
const { validPortRange } = require("lazy-z");

validPortRange(
  // can be one of ["type","code","port_min","port_max","source_port_min","source_port_max"]
  "port_min",
  8080
);
// returns
true;

validPortRange(
  // can be one of ["type","code","port_min","port_max","source_port_min","source_port_max"]
  "type",
  257
);
// returns
false;
```

---

## Object Methods

Methods for manipulating objects and arrays of objects

### allFieldsNull

Check an object to see if all fields returned are null.

```js
const { allFieldsNull } = require("./lazy-z");

// returns true
allFieldsNull({ test: null });
// returns false
allFieldsNull({ test: null, foo: "bar" });
```

### arraySplatIndex

Get the index of an object from an array of objects with a specified key value.

```js
const { arraySplatIndex } = require("lazy-z");

let arr = [
  {
    name: "todd",
  },
  {
    name: "egg",
  },
  {
    name: "frog",
  },
];

arraySplatIndex(arr, "name", "todd");
// returns
0;
```

### carve

Remove an object from an array of objects with a specific key value.

```js
const { carve } = require("lazy-z");

let arr = [
  {
    name: "todd",
  },
  {
    name: "egg",
  },
  {
    name: "frog",
  },
];

carve(arr, "name", "todd")[
  // returns
  {
    name: "todd",
  }
][
  // array value is now
  ({
    name: "egg",
  },
  {
    name: "frog",
  })
];
```

### duplicateKeyTest

Test to see if an array of objects has any values with a duplicate key.

```js
const { duplicateKeyTest } = require("lazy-z");

let arr = [
  {
    name: "todd",
  },
  {
    name: "egg",
  },
  {
    name: "frog",
  },
];

duplicateKeyTest("test", arr, "name", "todd");
// throws
("test expected no duplicate keys for name. Duplicate value: todd");
```

### getObjectFromArray

Get an object from an array of objects with a specific key value

```js
const { getObjectFromArray } = require("lazy-z");

let arr = [
  {
    name: "todd",
  },
  {
    name: "egg",
  },
  {
    name: "frog",
  },
];

getObjectFromArray(arr, "name", "todd");
// returns
{
  name: "todd";
}
```

### hasDuplicateKeys

Check to see if an object with a key value exists in an array of objects

```js
const { hasDuplicateKeys } = require("lazy-z");

let arr = [
  {
    name: "todd",
  },
  {
    name: "egg",
  },
  {
    name: "frog",
  },
];

hasDuplicateKeys(arr, "name", "todd"); // returns true
hasDuplicateKeys(arr, "name", "ham"); // returns false
```

### splat

Get all values from a specified object key in an array of objects.

```js
const { splat } = require("lazy-z");

let arr = [
  {
    name: "todd",
  },
  {
    name: "egg",
  },
  {
    name: "frog",
  },
];

splat(arr, "name")[
  // returns
  ("todd", "egg", "frog")
];
```

### splatContains

Get all values for a field in an array of objects and return true if a specified value is found.

```js
const { splatContains } = require("lazy-z");

// returns true
splatContains(
  [
    {
      name: "todd",
    },
    {
      name: "egg",
    },
    {
      name: "frog",
    },
  ],
  "name",
  "egg"
);
```

### spreadKeyValues

Transform all key values from an object into an array.

```js
const { spreadKeyValues } = require("lazy-z");

spreadKeyValues({
  one: 1,
  two: 2,
  three: 3,
})[
  // returns
  (1, 2, 3)
];
```

### transpose

Set keys from one object to another in place

```js
const { transpose } = require("lazy-z")

let destination = { one: 1 };
let source = { two: 2 };
transpose(source, destination);

// all keys from the source object are added to the destination
// new value for destination object
{
  one: 1,
  two: 2
}

```

---

## Encoding Methods

Methods that transform data

### hclEncode

Create HCL from JSON data

```js
/**
 * Create HCL from JSON data as a .tfvars file
 * @param {Object} jsonObject object data to transpose
 * @param {boolean} objectMode Return formatted as a single hcl object instead of as tfvars
 * @returns {string} HCL encoded data
 */
function hclEncode(jsonObject, objectMode)
```

Example:

```js
const { hclEncode } = require("lazy-z");

hclEncode(
  {
    virtual_private_endpoints: [
      {
        service_name: "cos",
        service_type: "cloud-object-storage",
        resource_group: "slz-service-rg",
        vpcs: [
          {
            name: "management",
            subnets: ["vpe-zone-1", "vpe-zone-2", "vpe-zone-3"],
          },
          {
            name: "workload",
            subnets: ["vpe-zone-1", "vpe-zone-2", "vpe-zone-3"],
          },
        ],
      },
    ],
  },
  true
);

// returns
`{
  virtual_private_endpoints = [
    {
      service_name   = "cos"
      service_type   = "cloud-object-storage"
      resource_group = "slz-service-rg"
      vpcs           = [
        {
          name    = "management"
          subnets = ["vpe-zone-1","vpe-zone-2","vpe-zone-3"]
        }
        {
          name    = "workload"
          subnets = ["vpe-zone-1","vpe-zone-2","vpe-zone-3"]
        }
      ]
    }
  ]
}`;
```

## CLI Utility Methods

Utilities for CLI tools. `flagValues` is the main method, each other CLI Utility Method is used by `flagValues`.

---

### flagValues

Create key value pairs from list of command arguments

```js
/**
 * Create key value pairs from list of command arguments
 * @param {string} command name of command
 * @param {Object} action action
 * @param {Array} action.requiredFlags Flags required by the action
 * @param {?Array} action.optionalFlags Optional flags
 * @param {Object} tags key value pair of tags
 * @param  {...any} commandArgs command line arguments
 * @returns {Object} object containing key value pairs of params from tags
 */
function flagValues(command, action, tags, ...commandArgs)
```

Example use:

```js
// command name
let command = "plan";

// parameters needed for plan
let planParameters = {
  requiredFlags: ["in", "out", "type"],
  optionalFlags: [
    {
      name: "tfvars",
      allowMultiple: true,
    },
  ],
};

// map of valid tags with aliases
let tags = {
  help: ["-h", "--help"],
  in: ["-i", "--in"],
  out: ["-o", "--out"],
  type: ["-t", "--type"],
  tfvars: ["-v", "--tf-var"],
}

flagValues(
  command,
  planParameters,
  tags,
  "--in",
  "./in-file-path/",
  "--out",
  "./out-file.test.js",
  "--tf-var",
  "tfx",
  "--tf-var",
  "testVar1=true",
  "--tf-var",
  'testVar2="true"'
)

// returns
 {
  in: "./in-file-path/",
  out: "./out-file.test.js",
  type: "tfx",
  tfvars: ["testVar1=true", 'testVar2="true"']
}

```

---

### flagTest

Test for invalid or duplicate required flags

```js
/**
 * Test for invalid or duplicate required flags
 * @param {string} command name of the command
 * @param {Object} aliases key map of key with allowed synonyms
 * @param  {...any} commandArgs List of arguments
 * @throws if any values are duplicates. strings are thrown to allow custom user error handling
 */
function flagTest(command, aliases, ...commandArgs)
```

Example use:

```js

const { flagTest } = require("lazy-z");

flagTest(
  "help"
  {
    "-h": "--help",
    "--help": "-h",
  },
  "-h",
  "-h"
)

// throws
"Invalid duplicate flag -h"

```

---

### getVerbActions

Create a list of all available flags and aliases for a command

```js
/**
 * Get actions from a verb object
 * @param {Object} action action
 * @param {Array} action.requiredFlags Flags required by the action
 * @param {Array} action.optionalFlags Optional flags
 * @param {Object} tags tags object
 * @returns {Object} Aliases for the verb
 */
function getVerbActions(action, tags)
```

Example use:

```js
let plan = {
  requiredFlags: ["in", "out", "type"],
  optionalFlags: [
    {
      name: "tfvar",
      allowMultiple: true,
    },
    {
      name: "shallow"
    }
  ],
};
let tags = {
  help: ["-h", "--help"],
  in: ["-i", "--in"],
  out: ["-o", "--out"],
  type: ["-t", "--type"],
  tfvar: ["-v", "--tf-var"],
  shallow: ["-s", "--shallow"]
};

getVerbActions(plan, tags)

// returns
{
  "-i": "--in",
  "--in": "-i",
  "-o": "--out",
  "--out": "-o",
  "-t": "--type",
  "--type": "-t",
  "?*-v": "?*--tf-var",
  "?*--tf-var": "?*-v",
  "?-s" | "?--shallow",
  "?--shallow" | "?-s"
};
```

---

### replaceOptionalFlags

Replace literal optional arguments by prepending `?*` for multiple optional arguments and `?` for optional arguments.

```js
/**
 * Replace optional flags from command args to denote multiple and optional flags
 * @param {Object} action action
 * @param {Array} action.requiredFlags Flags required by the action
 * @param {?Array} action.optionalFlags Optional flags
 * @param {Object} tags tags object
 * @param  {...any} commandArgs List of arguments
 * @returns {Array<string} Modified list of commang args
 */
function replaceOptionalFlags(action, tags, ...commandArgs)
```

Example use:

```js
let commandFlags = {
  requiredFlags: ["in", "out", "type"],
  optionalFlags: [
    {
      name: "tfvar",
      allowMultiple: true,
    },
    {
      name: "shallow",
    },
  ],
};

let tags = {
  help: ["-h", "--help"],
  in: ["-i", "--in"],
  out: ["-o", "--out"],
  type: ["-t", "--type"],
  tfvar: ["-v", "--tf-var"],
  shallow: ["-s", "--shallow"],
};

replaceOptionalFlags(commandFlags, tags, "--in", "file_path", "--shallow")[
  // returns
  ("--in", "file_path", "?--shallow")
];
```

---

## Array Methods

### numberStringList

Create a list of stringified numbers within a range

```js
const { numberStringList } = require("lazy-z");

numberStringList(5);
// returns
["0", "1", "2", "3", "4"];

numberStringList(5, 1);
// returns
["1", "2", "3", "4", "5"];
```

### flatten

Create a single tiered array from a multi-tiered array.

```js
const { flatten } = require("lazy-z");

let testData = [
  "one",
  ["two"],
  [["three", "four"]],
  [[["five", "six", [["seven"]]]]],
];

flatten(testData)[
  // returns
  ("one", "two", "three", "four", "five", "six", "seven")
];
```

---

## lazyZstate

Lazy Z state is a state store constructor used for maniuplating complex objects.

### lazyZstate initialization

```js
/**
 * state constructor object
 * @param {object=} defaults defaults for store data
 * @param {object=} defaults._defaults key value pairs of default values for store
 * @param {Array<string>=} defaults._no_default list of values in store to set to `null`
 * @param {object=} store arbitrary key value pairs to add to store object. values are added after defaults
 */

let state = new lazyZstate(defaults, store);
```

#### Example Usage

```js
const = { lazyZstate } = require("lazy-z");


// with no store
let state = new lazyZstate({
  _defaults: {
    frog: true,
    numbers: [1, 2, 3, 4],
    data: {
      foo: "baz",
    },
  },
  _no_default: ["todd"],
})

// state.store value
{
  frog: true,
  numbers: [1, 2, 3, 4],
  data: {
    foo: "baz",
  },
  todd: null,
}

// with store

let stateWithStore = new lazyZstate(
  {
    _defaults: {
      frog: true,
      numbers: [1, 2, 3, 4],
      data: {
        foo: "baz",
      },
    },
    _no_default: ["todd"],
  },
  {
    frog: "yes",
    hi: "mom",
  }
)

// stateWithStore.store value
{
  frog: "yes",
  numbers: [1, 2, 3, 4],
  data: {
    foo: "baz",
  },
  todd: null,
  hi: "mom",
}
```

### lazyZstate Store Template

lazyZstate uses a template to create functions to initialize and update store fields and state methods. To create a field, use the `lazyZstate.newField` constructor function.

### lazyZstate.setUpdateCallback

Set an update callback function to run when state data is changed

```js
/**
 * Set update callback. This function will be run when components update
 * @param {Function} callback callback function
 */
lazyZstate.setUpdateCallback = function (callback) {
  paramTest(`state.setUpdateCallback`, "callback", "Function", callback);
  this.updateCallback = callback;
};
```

#### Example Usage

```js
const = { lazyZstate } = require("lazy-z");

let state = new lazyZstate();
let callback = () => {
  console.log("hi");
};
state.setUpdateCallback(callback);
state.update();

// on update logs
`hi`
```

### lazyZstate.sendError

Logs errors to the console, if an error callback is set, runs it, otherwise throws the error as well

```js
/**
 * send an error
 * @param {Error} err error
 * @throws when message provided
 */
this.sendError = function (err) {
  console.error(err);
  if (this.sendErrorCallback) this.sendErrorCallback(err);
  else throw new Error(err);
};
```

#### Example Usage

```js
const = { lazyZstate } = require("lazy-z");

let state = new lazyZstate();
state.sendError("error");

// errors
`error`
// throws
`Error: error`
```

### lazyZstate.setErrorCallback

Set an error callback function to run when an error is sent

```js
/**
 * set callback for error handling
 * @param {setErrorCallback} callback callback function
 */
this.setErrorCallback = function (callback) {
  paramTest(`lazyZstate.setErrorCallback`, "callback", "Function", callback);
  this.sendErrorCallback = callback;
};
```

#### Example Usage

```js
const = { lazyZstate } = require("lazy-z");

let state = new lazyZstate();
let callback = () => {
  console.log("hi from callback");
};
state.setErrorCallback(callback);
state.sendError();

// errors
`hi`
// logs
`hi from callback`
```

---

## Axios Mocks

`lazy-z` provides a test framework for creating mock [axios](https://www.npmjs.com/package/axios) calls.

### Initializing the Constructor

The mock axios constructor can be initialized with two parameters:

- `data` - an arbitrary object of data to be returned when the promise resolves
- `err` - an optional boolean. By setting this value to true, the data passed in as `data` will be sent on rejection instead of resolve.

### Example Usage

```js
const { initMockAxios } = require("lazy-z");

describe("axios", () => {
  it("should return a promise when called with params on resolve", () => {
    let { axios } = initMockAxios({ data: true }); // successful promise
    // axios method
    return axios({ params: "yes" }).then((data) => {
      assert.isTrue(data.data.data, "it should be true");
    });
    // axios.get method
    return axios.get({ params: "yes" }).then((data) => {
      assert.isTrue(data.data.data, "it should be true");
    });
    // axios.post method
    return axios.post({ params: "yes" }).then((data) => {
      assert.isTrue(data.data.data, "it should be true");
    });
    // axios.put method
    return axios.put({ params: "yes" }).then((data) => {
      assert.isTrue(data.data.data, "it should be true");
    });
    // axios.patch method
    return axios.patch({ params: "yes" }).then((data) => {
      assert.isTrue(data.data.data, "it should be true");
    });
    // axios.delete method
    return axios.delete({ params: "yes" }).then((data) => {
      assert.isTrue(data.data.data, "it should be true");
    });
  });
  it("should reject when error is true", () => {
    let { axios } = initMockAxios({ data: true }, true); // unsuccessful promise
    return axios({ params: "yes" }).catch((data) => {
      assert.isTrue(data.data, "it should be true");
    });
  });
});
```

---

## Networking Utilities

Network utilities are designed to make the automated creation of virtual networks easier.

### buildNetworkingRule

Create a networking rule. These networking rules are configured for use on IBM Cloud but could easily be adapted for other providers. `buildNetworkingRule` will also check to ensure that rules have valid type, code, or port ranges.

```js
/**
 * Build a networking rule
 * @param {Object} params networking rule params
 * @param {string} params.name name of acl rule
 * @param {boolean} params.allow true to allow, false to deny
 * @param {boolean} params.inbound true for inbound, false for outbound
 * @param {string} params.source cidr block or ip
 * @param {string} params.destination cidr block or ip. if creating a security group rule, use `null`
 * @param {string=} params.ruleProtocol optional. can be one of `icmp`, `tcp`, or `udp`
 * @param {Object=} params.rule object describing traffic rule if using rule type
 * @param {number} params.rule.code code for icmp rules
 * @param {number} params.rule.type code for icmp rules
 * @param {number} params.rule.port_min port_min for tcp and udp rules
 * @param {number} params.rule.port_max port_max for tcp and udp rules
 * @param {number} params.rule.source_port_min source_port_min for tcp and udp rules
 * @param {number} params.rule.source_port_max source_port_max for tcp and udp rules
 * @param {boolean=} isAcl is acl rule, false if is security group
 * @returns {Object} network acl object
 */
function buildNetworkingRule(params, isAcl)
```

#### Example Usage

```js

// security group rule
buildNetworkingRule({
  name: "allow-ibm-inbound",
  allow: true,
  inbound: true,
  source: "161.26.0.0/16",
  destination: "10.0.0.0/8",
  ruleProtocol: "tcp",
  rule: {
    port_max: 443,
    port_min: 443,
  }
});

// returns
{
  direction: "inbound",
  name: "allow-ibm-inbound",
  source: "161.26.0.0/16",
  icmp: {
    type: null,
    code: null,
  },
  tcp: {
    port_min: 443,
    port_max: 443,
  },
  udp: {
    port_min: null,
    port_max: null,
  },
}

// acl rule
buildNetworkingRule({
  name: "allow-ibm-inbound",
  allow: true,
  inbound: true,
  source: "161.26.0.0/16",
  destination: "10.0.0.0/8",
},true);

// returns
{
  action: "allow",
  destination: "10.0.0.0/8",
  direction: "inbound",
  name: "allow-ibm-inbound",
  source: "161.26.0.0/16",
  icmp: {
    type: null,
    code: null,
  },
  tcp: {
    port_min: null,
    port_max: null,
    source_port_min: null,
    source_port_max: null,
  },
  udp: {
    port_min: null,
    port_max: null,
    source_port_min: null,
    source_port_max: null,
  }
}
```

### formatCidrBlock

Create a dynamic CIDR block

```js
/**
 * format a cidr block with 256 ips to be calculated programatticaly
 * @param {number} vpc index of vpc within architecture
 * @param {number} zone zone, can be 1, 2, or 3
 * @param {number} tier index of subnet tier
 * @param {boolean=} isEdge is edge network
 * @returns {string} network cidr
 */
function formatCidrBlock(vpc, zone, tier, isEdge)
```

#### Example Usage

```js
formatCidrBlock(0, 1, 0)
// returns
"10.10.10.0/24"

formatCidrBlock(0, 1, 0, true)
// returns
"10.5.10.0/24"
```

---

## Contributing

If you have any questions or issues you can create a new [issue here][issues]. See the full contribution guidelines [here](./CONTRIBUTING.md).

This repo uses [Prettier JS](https://prettier.io/) for formatting. We recommend using the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Pull requests are very welcome! Make sure your patches are well tested.
Ideally create a topic branch for every separate change you make. For
example:

1. Fork the repo
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

---

## Code Test Coverage

| File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ---------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files        | 100     | 100      | 100     | 100     | 🏆                |
| arrays.js        | 100     | 100      | 100     | 100     | 🏆                |
| axios-mocks.js   | 100     | 100      | 100     | 100     | 🏆                |
| cli-utils.js     | 100     | 100      | 100     | 100     | 🏆                |
| encode.js        | 100     | 100      | 100     | 100     | 🏆                |
| networking.js.js | 100     | 100      | 100     | 100     | 🏆                |
| numbers.js       | 100     | 100      | 100     | 100     | 🏆                |
| objects.js       | 100     | 100      | 100     | 100     | 🏆                |
| revision.js      | 100     | 100      | 100     | 100     | 🏆                |
| shortcuts.js     | 100     | 100      | 100     | 100     | 🏆                |
| strings.js       | 100     | 100      | 100     | 100     | 🏆                |
| values.js        | 100     | 100      | 100     | 100     | 🏆                |
