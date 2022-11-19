const Filter = require("bad-words");

// Create a new Filter instance with a custom placeholder for bad words
const filter = new Filter({ placeHolder: "*" });

module.exports = filter;
