// middlewares/cacheNewsMiddleware.js
const NodeCache = require("node-cache");
const newsCache = new NodeCache({ stdTTL: 3600, checkperiod: 60 }); // 1 hour TTL

const cacheNewsMiddleware = (req, res, next) => {
  try {
    const { topic, language } = req.newsQuery;

    // Cache key per user + day + preferences
    const today = new Date().toISOString().split("T")[0];
    const cacheKey = `${req.user._id}_${today}_${topic}_${language}`;

    req.newsQuery.cacheKey = cacheKey; // attach for controller

    const cachedArticles = newsCache.get(cacheKey);
    if (cachedArticles) {
      return res.status(200).json({
        success: true,
        articles: cachedArticles,
        cached: true
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to check cache",
      error: err.message
    });
  }
};

module.exports = { cacheNewsMiddleware, newsCache };