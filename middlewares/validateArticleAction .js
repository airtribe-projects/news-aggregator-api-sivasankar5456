const validateArticleAction = (req, res, next) => {
  const article = req.body;
  if (!article || !article.title || !article.url) {
    return res.status(400).json({
      success: false,
      message: "Article object with at least 'title' and 'url' is required"
    });
  }

  next();
};

module.exports = validateArticleAction;