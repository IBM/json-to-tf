const RegexButWithWords = require("./lib/expressions");
const verbose = require("./lib/verbose").toString;
const sanityCheck = require("./lib/sanitize").isSane;

module.exports["RegexButWithWords"] = RegexButWithWords;
module.exports["RegexToWords"] = verbose;
module.exports["isSane"] = sanityCheck;
