const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // 1 hour

module.exports.getCachedResponse = (key) => cache.get(key);
module.exports.setCachedResponse = (key, value) => cache.set(key, value);
