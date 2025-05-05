const crypto = require("crypto");

module.exports = function hashKey(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
};
