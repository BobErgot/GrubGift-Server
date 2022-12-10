/**
 * A utility module for filtering bad words from strings.
 *
 * This module utilizes the `bad-words` package to create a filter instance
 * with customized settings. The default placeholder for any bad word detected
 * is set to "X". This filter can be applied to any string to censor bad words.
 *
 * @module filter
 */

const Filter = require("bad-words");

// Create a new Filter instance with a custom placeholder for bad words
const filter = new Filter({ placeHolder: "*" });

module.exports = filter;
