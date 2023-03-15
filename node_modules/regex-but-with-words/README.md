# RegEx But With Words

`regex-but-with-words` is a lightweight package with no user dependecies that allows users to chain a verbose function to create a Regular Expression. It can also be used to create a verbose version of an existing regular expression for reference.

## Example Usage

### Regex But With Words

```js
const { RegexButWithWords } = require("regex-but-with-words");

let exp = new RegexButWithWords();

let phoneNumberExpression = exp
  .group(exp => exp.digit().literal("-"))
  .lazy()
  .digit(3)
  .literal("-")
  .digit(3)
  .literal("-")
  .digit(4)
  .done("g")
```

Returns the composed regular expression:
```js
/(\d-)?\d{3}-\d{3}-\d{4}/g
```

###  Regex To Words

```js
const { RegexToWords } = require("regex-but-with-words")
let wordifedEmailRegex = RegexToWords(/[A-z0-9][A-z0-9\-.]+[A-z0-9]@[\w\-]+\.\w+/g);

// Returns the following as a string

exp
  .set("A-z0-9")
  .set("A-z0-9-.")
  .oneOrMore()
  .set("A-z0-9")
  .literal("@")
  .set((exp) => {
    exp
      .word()
      .literal("-")
  })
  .oneOrMore()
  .literal(".")
  .word()
  .oneOrMore()
  .done("g")
```

---

## Table of Contents

1. [Installation](#Installation)
2. [Expressions](#expressions)
    - [Groups](#groups)
    - [Other Regex But With Words Methods](#other-regex-but-with-words-methods)
3. [RegexToWords](#RegexToWords)
4. [Developer Dependencies](#developer-dependencies)
5. [Code Test Coverage](#code-test-coverage)
6. [Contributing](#contributing)

---

## Installation

```shell
npm install regex-but-with-words
```

---

## Expressions

### Character and Quantifier Methods

The following methods can be used with the `RegexButWithWords` constructor. Each method can be chained with any method other than `done()`

Name                 | Matches                                                                                                                | Regex 
---------------------|------------------------------------------------------------------------------------------------------------------------|-------
`.word()`*           | Any letter A-z, digits 0-9, and underscores                                                                            | `\w` 
`.notWord()`*        | Any character other than A-z, digits 0-9, and underscores                                                              | `\W` 
`.digit()`*          | digits 0-9                                                                                                             | `\d` 
`.notWord()`*        | Any character other digits 0-9                                                                                         | `\D` 
`.any()`*            | Any character                                                                                                          | `.`
`.whitespace()`*     | Any whitespace character (spaces, tabs, newlines)                                                                      | `\s`
`.notWhitespace()`*  | Any non-whitespace character (spaces, tabs, newlines)                                                                  | `\S`
`.wordBoundary()`    | Position between word character and a non-word character                                                               | `\b`
`.notWordBoundary()` | Any character not between a word and a non-word character                                                              | `\b`
`.tab()` *           | Tab character                                                                                                          | `\t`
`.newline()` *       | Newline character                                                                                                      | `\n`
`.literal()` +       | A string literal of the composed characters                                                                            | native characters
`.stringBegin()`     | The beginning of a string or line                                                                                      | `^`
`.stringEnd()`       | The end of a string or line                                                                                            | `$`
`.oneOrMore()`       | Matches one or more of the preceding function call (ex. `.digit().oneOrMore()` will match one or more digits)          | `+`
`.anyNumber()`       | Matches any number of the preceding function call including 0 (ex. `.digit().anyNumber()` will match 0 or more digits) | `*`
`.lazy()`            | Matches 0 or one of the preceding function (ex. `.word().lazy()` will match 0 or 1 word character)                     | `?`
`.or()`              | Logical or between two values (ex. `.word().or().digit()` will match one word or digit character)                      | `|`
`.backslash()` *     | Matches a literal backslash, this function is here due to inconsitancies in string literal `\` requiring an escape sequence | `\\`

**Methods marked with a `*` can accept up to two parameters `min`, and `max`.**
- If only `min` is provided, it will match exactly that number of the preceding call
    - (*ex. `.word(4)` will match exactly 4 word characters. Regex equivilant is `\w{4}`*)
- If `min` and `max` are provided it will match any number of tokens within a range
    - (*ex. `.word(4,6)` will match four, five, or 6 word characters. Regex equivilant is `\w{4,6}`*)
- the string `"*"` can be passed as `max` to match any number of the preceding token after the minimum is met
    - (*ex. `.word(4, "*"` will match four or more word characters. Regex equivilant is `\w{4,}`*)
- Methods marked with a `+` can accept the above parameters, but only if a single character is provided

---

### Groups

Capturing groups. Each method can be chained with any method other than `done()`

Name                             | Matches                                                                                                                        | Regex
---------------------------------|--------------------------------------------------------------------------------------------------------------------------------|-------
`.group(regexGroup)`             | A group of characters. `.group("abc")` will match `abc` anywhere in a string                                                   | `()`
`.nonCapturingGroup(regexGroup)` | Match a group of characters without capturing `.nonCapturingGroup("abc").word()` will match a word character preceded by `abc` | `(?:)`
`.set(regexGroup)`               | Match any one character from a set. `[abc]` will match `a` `b` or `c`                                                          | `[]`
`.negatedSet(regexGroup)`        | Match any one character not in a set. `[^abc]` will match any character that is not `a` `b` or `c`                             | `[^]`

**Groups now support `min` and `max` quantifiers.**

#### Group Callback Functions

Groups can accept two types of arguments: `string` and `subExpressionCallback`. `subExpressionCallback` returns a RegexButWithWords object to allow for chaining inside a group:

```js
exp
  .group(exp => {
    exp.whitespace().or().literal("space")
  })
  .done("g")

// Matches

/(\s|space)/g

exp.group("\sfrog\s").done("g")

// Matches
/(\sfrog\s)/g
```

Groups can also be quantified by passing in a `min` value or a `min` and `max` value:

```js
exp
  .group(exp => {
    exp.whitespace().or().literal("space")
  }, 2)
  .done("g")

// Matches

/(\s|space){2}/g

exp.group("\sfrog\s", 2, 3).done("g")

// Matches
/(\sfrog\s){2,3}/g
```

---

### Look Around

Non-capturing lookaround groups. Each method can be chained with any method other than `done()`

Name                              | Matches                                                    | Regex
----------------------------------|------------------------------------------------------------|-------
`look.ahead(regexGroup)`          | A group after the expression without including the result  | `(?=)`
`look.behind(regexGroup)`         | A group before the expression without including the result | `(?:)`
`negativeLook.ahead(regexGroup)`  | A group that cannot match after the main expression        | `(?!=)`

#### Non-capturing Group Callback Functions

Look around can accept two types of arguments: `string` and `subExpressionCallback`. `subExpressionCallback` returns a RegexButWithWords object to allow for chaining inside a group:


```js
exp
  .look
  .behind(exp => {
    exp.stringBegin().group("behind")
  })
  .literal("matching")
  .look
  .ahead(exp => {
    exp.group("ahead").stringEnd()
  })
  .done("g")

// Matches

/(?:^behind)matching(?=ahead$)/g

exp
  .look
  .behind("egg")
  .literal("plant")
  .done("g")

// Matches

/(?:egg)plant/g

```

Lookaround groups can also be quantified by passing in a `min` value or a `min` and `max` value:

```js
exp
  .litral("hello")
  .look
  .ahead(exp => {
    exp.literal("frog")
  }, 2, 3)
  .done("g)

// matches

/(hello(?=frog){2,3})/g
```


---

### Other Regex But With Words Methods

Name           | Usage
---------------|--------
`.done(flags)` | Terminates a regex but with words chain and returns the resulting regex with flags. ("g" is used for global and "i" for ignore case)

---

## RegexToWords

This module also includes a function that allows the creation of valid `RegexButWithWords` function chain from existing Regular Expressions as a string. This allows for experienced users to store regular expressions in a readable format.

### Example Usage

```js
const { RegexToWords } = require("regex-but-with-words")

let wordifedRegex = RegexToWords(/^--?[a-z-]+\s\S+(\s--?[a-z-]+\s\S+)*$/g);

// Returns the following as a string

exp
  .stringBegin()
  .literal("-")
  .literal("-")
  .lazy()
  .set("a-z-")
  .oneOrMore()
  .whitespace()
  .notWhitespace()
  .oneOrMore()
  .group((exp) => { 
    exp
      .whitespace()
      .literal("-")
      .literal("-")
      .lazy()
      .set("a-z-")
      .oneOrMore()
      .whitespace()
      .notWhitespace()
      .oneOrMore() 
  })
  .anyNumber()
  .stringEnd()
  .done("g")

```

---

## Developer Dependencies

- [nyc](https://www.npmjs.com/package/nyc)
- [mocha](https://mochajs.org/)
- [chai](https://www.chaijs.com/)

---

## Code Test Coverage

This module uses [nyc](https://www.npmjs.com/package/nyc) for unit test coverage.

To get test coverage, run the command 
```shell
npm run coverage
```

### Current Test Coverage

File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 | 🏆
 expressions.js |     100 |      100 |     100 |     100 | 🏆
 utils.js       |     100 |      100 |     100 |     100 | 🏆
 verbose.js     |     100 |      100 |     100 |     100 | 🏆

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
