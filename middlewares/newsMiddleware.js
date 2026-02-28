// middleware/newsMiddleware.js
const newsCache = require("../utils/cache");

// middlewares/newsMiddleware.js
const validateNewsRequest = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const preferences = req.user.preferences || {};
    const { categories = [], languages = [] } = preferences;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No categories found in user preferences"
      });
    }

    req.newsQuery = {
      topic: categories.join(" OR ") || "",
      language: languages[0] || "en"
    };

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Validation failed",
      error: error.message
    });
  }
};

module.exports = { validateNewsRequest };


// // middlewares/newsMiddleware.js


// validateNewsRequest = (req, res, next) => {
//     console.log('called')
//   try {
//     // Ensure user exists (auth middleware must run before this)
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized"
//       });
//     }

//     const preferences = req.user.preferences || {};
//     const { categories = [], languages = [] } = preferences;

//     // Validate categories
//     if (!Array.isArray(categories) || categories.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No categories found in user preferences"
//       });
//     }

//     // // Validate API key
//     // if (!process.env.GNEWS_API_KEY) {
//     //   return res.status(500).json({
//     //     success: false,
//     //     message: "News API key not configured"
//     //   });
//     // }

//     // Attach cleaned data for controller
//     req.newsQuery = {
//       topic: categories.join(" OR ") || "",
//       language: languages[0] || "en"
//     };

//     next();

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Validation failed"
//     });
//   }
// };

// module.exports = validateNewsRequest;