var HelloFreshProvider = require("./providers/hellofresh");
var TastyProvider = require("./providers/tasty");

function getURL(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

function getProvider(url) {
  if (url.includes("www.hellofresh.")) {
    return HelloFreshProvider;
  } else if (url.includes("tasty.co")) {
    return TastyProvider;
  }

  return null;
}

module.exports = { getURL, getProvider };
