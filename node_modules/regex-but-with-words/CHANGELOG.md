# Changelog

## v 1.5.1

- Fixed an issue where using group with a quantifier of `*` for max parameter would cause the symbol to be returned instead of `""`

## v 1.4.0

- Now uses non-capturing group for lookbehind instead of actual lookbehind
- No longer uses any lookbehind functions in child methods for firefox and safari compatability
- when passing in a quantifier users can now add the string `*` as the max parameter. this allows users to create expressions with a minimum number and no fixed end

## v 1.1.1

- Fixed an issue where regexToWords added an invalid `.` to the beinning of a quantified group expression and also invalid spacing.

## v 1.1.0

- Fixed an issue causing ranges with numbers other than 0-9 to have an unintended escaped hyphen
- Users can now quanitfy groups by passing in `min` and/or `max` as additional parameters
- Removed unused utility functions

## 7/27/2022 v 1.0.5

- Fixed an issue causing sets containing only a single end brace to not be properly escaped

## 6/23/2022 v 1.0.3

- Fixed an issue causing verbose functionality to incorretly remove escaped backslashes.
- Added .backslash method to expressions

## 6/21/2022 v 1.0.1

- Fixed issue where some escaped characters were causing incorrect expressions.

All notable changes to this project will be documented in this file.
