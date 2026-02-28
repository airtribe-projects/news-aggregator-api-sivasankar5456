// utils/cache.js
const NodeCache = require("node-cache");
const newsCache = new NodeCache({ stdTTL: 300 }); // 5 min TTL

module.exports = newsCache;