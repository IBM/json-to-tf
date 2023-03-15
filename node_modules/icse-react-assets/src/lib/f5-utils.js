const { RegexButWithWords } = require("regex-but-with-words");
const { isNullOrEmptyString } = require("lazy-z");

const urlValidationExp = new RegexButWithWords()
  .group((exp) => {
    exp.literal("ftp").or().literal("http").literal("s").lazy();
  })
  .literal("://")
  .group("www.")
  .lazy()
  .group((exp) => {
    exp.negatedSet('"\\/').oneOrMore().literal(".");
  })
  .group((exp) => {
    exp.negatedSet('"\\/').oneOrMore().literal(".");
  })
  .oneOrMore()
  .negatedSet('"\\/.')
  .oneOrMore()
  .literal("/")
  .negatedSet(' "')
  .anyNumber()
  .stringEnd()
  .done("g");

const tmosAdminPasswordValidationExp = new RegexButWithWords()
  .stringBegin()
  .look.ahead((exp) => {
    exp.any().anyNumber().set("a-z");
  })
  .look.ahead((exp) => {
    exp.any().anyNumber().set("A-Z");
  })
  .look.ahead((exp) => {
    exp.any().anyNumber().set("0-9");
  })
  .any(15, "*")
  .stringEnd()
  .done("");

/**
 * url value is valid and not empty
 * @param {str} url
 * @returns {boolean} true when url is valid and not empty, false when invalid
 */
function isValidUrl(url) {
  if (isNullOrEmptyString(url)) return false;
  return url.match(urlValidationExp) !== null;
}

/**
 * verifies tmos admin password
 * @param {str} password
 * @returns {boolean} true when password is valid
 */
function isValidTmosAdminPassword(password) {
  if (isNullOrEmptyString(password)) return true;
  else return password.match(tmosAdminPasswordValidationExp) !== null;
}

/**
 * securely generates a random byte to be transformed into a character
 * @returns {byte} random byte
 */
function getRandomByte() {
  var result = new Uint8Array(1);
  result = window.crypto.getRandomValues(result); // cryptographically secure random number generation
  return result[0];
}

/**
 * Checks if the random byte character generated is a valid character in the charset
 * if it is, return the char, add it to the password String
 * @param {int} length
 * @returns {char} a valid char to go into the password
 */
function generatePassword(length) {
  const charset = /[a-zA-Z0-9_\-+!$%^&*#]/; // valid chars for the password string
  return Array.apply(null, { length: length }) // create an array of null of length specified
    .map(function () {
      // on each element
      var result;
      while (true) {
        result = String.fromCharCode(getRandomByte()); // generate a char until it is a valid char in the charset
        if (charset.test(result)) {
          return result; // char is in the charset
        }
      }
    }, this)
    .join(""); // join all array elements into a single string
}

/**
 * generates the password until it fits the validation expression
 * @param {int} length
 * @returns {string} password that fits the requirements of the validation expression
 */
function getValidAdminPassword(length) {
  let invalid = true;
  let count = 0;
  let result;
  do {
    result = generatePassword(length); // generate a password until it is valid
    if (tmosAdminPasswordValidationExp.test(result)) {
      // we are valid if this test passes
      invalid = false;
    } else {
      result = ""; // reset result
      count++;
    }
  } while (invalid && count <= 5); // only be more than 5 times if you specified an invalid length. dummy counter for unit
  return result;
}
module.exports = {
  getValidAdminPassword,
  isNullOrEmptyString,
  isValidTmosAdminPassword,
  isValidUrl,
};
