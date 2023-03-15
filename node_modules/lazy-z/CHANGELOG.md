# Changelog

All notable changes to this project will be documented in this file.

## 1.8.3
- `titleCase` now formats numbers correctly

## 1.7

- sendError in `lazyZstate` now throws an error and sends an error to the console.
- setErrorCallback now runs in sendError and does not override sendError

## 1.6.4

- fix camelCase so that it is compatable with safari

## 1.6.0

- Added mock axios constructor

## 1.5.0

- Added Methods
  - `kebabCase`
  - `snakeCase`
  - `camelCase`
  - `titleCase`
  - `numberStringList`
  - `isInRange`
  - `validPortRange`
  - `lazyZstore`
- Added methods to revision
  - `setDoneCallback`
  - `done`

## [1.3.0] - 2022 - 9 - 22

- Added Methods:
  - `flatten`
  - `splatContains`
  - `isArray`
  - `revision`

## [1.2.0] - 2022 - 9 - 10

- Added parameter tests back to functions
- Removed `getFunctionNames`
- Changed files to have function in alphabetical order to closer line up with the README
- Added functionality to `carve` to prevent the accidental deletion of items when searching for an unfound object.

## [1.1.0] - 2022-8-21

- Added methods:
  - `objectAtFirstKey`
  - `isBoolean`
  - `isString`
  - `isIpv4CidrOrAddress`
  - `keyValueType`
  - `validIpv4Test`
  - `splat`
  - `spreadKeyValues`
  - `hasDuplicateKeys`
  - `duplicateKeyTest`
  - `arraySplatIndex`
  - `getObjectFromArray`
  - `carve`

## [1.0.4] - 2022-8-18

- Added methods:
  - `transpose`
  - `isEmpty`
  - `emptyCheck`
