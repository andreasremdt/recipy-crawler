function getURL(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

module.exports = {
  getURL
};
