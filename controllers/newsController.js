// controllers/newsController.js
const axios = require("axios");
const { newsCache } = require("../middlewares/cacheNewsMiddleware");

getNews = async (req, res) => {
    try {
        const { topic, language, cacheKey } = req.newsQuery;

        const response = await axios.get(
            "https://gnews.io/api/v4/top-headlines",
            {
                params: {
                    country: "in",
                    lang: language,
                    topic,
                    apikey: process.env.GNEWS_API_KEY
                },
                timeout: 5000
            }
        );

        const articles = response.data.articles;

        // Save in cache for next requests
        newsCache.set(cacheKey, articles);

        return res.status(200).json({
            success: true,
            totalArticles: articles.length,
            articles,
            cached: false
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                message: "News API error",
                error: error.response.data
            });
        }

        if (error.request) {
            return res.status(503).json({
                success: false,
                message: "News service unavailable"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to fetch news",
            error: error.message
        });
    }
};

const User = require("../models/userModel");

// Mark as read
const markRead = async (req, res) => {
  try {
    const article = req.article;
    const user = req.user;

    // Avoid duplicates
    const exists = user.readArticles.find(a => a.id === article.id);
    if (!exists) user.readArticles.push(article);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Article marked as read",
      readArticles: user.readArticles,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Mark as favorite
const markFavorite = async (req, res) => {
  try {
    const article = req.article;
    const user = req.user;

    const exists = user.favoriteArticles.find(a => a.id === article.id);
    if (!exists) user.favoriteArticles.push(article);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Article marked as favorite",
      favoriteArticles: user.favoriteArticles,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  markRead,
  markFavorite,
};

// Get read articles
const getReadArticles = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      readArticles: req.user.readArticles
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get favorite articles
const getFavoriteArticles = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      favoriteArticles: req.user.favoriteArticles
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Search articles by keyword
const searchArticles = async (req, res) => {
  try {
    const keyword = req.params.keyword.toLowerCase();
    const allArticles = [...req.user.readArticles, ...req.user.favoriteArticles];

    const results = allArticles.filter(a =>
      (a.title && a.title.toLowerCase().includes(keyword)) ||
      (a.description && a.description.toLowerCase().includes(keyword))
    );

    return res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// module.exports = {
//   markRead,
//   markFavorite,
//   getReadArticles,
//   getFavoriteArticles,
//   searchArticles
// };
module.exports = { getNews, markRead, markFavorite, getReadArticles, getFavoriteArticles, searchArticles }


// // controllers/newsController.js
// const axios = require("axios");


// exports.getNews = async (req, res) => {
//   try {
//     console.log('req.newsQuery', req.newsQuery)
//     const { topic, language } = req.newsQuery;

//     const response = await axios.get(
//       "https://gnews.io/api/v4/top-headlines",
//       {
//         params: {
//           country: "in",
//           lang: language,
//           topic,
//           apikey: process.env.GNEWS_API_KEY
//         },
//         timeout: 5000
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       totalArticles: response.data.totalArticles,
//       articles: response.data.articles
//     });

//   } catch (error) {

//     if (error.response) {
//       return res.status(error.response.status).json({
//         success: false,
//         message: "News API error",
//         error: error.response.data
//       });
//     }

//     if (error.request) {
//       return res.status(503).json({
//         success: false,
//         message: "News service unavailable"
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch news",
//       error: error.message
//     });
//   }
// };
