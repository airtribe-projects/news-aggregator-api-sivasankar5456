const express = require("express");
const router = express.Router();
const {
    getNews,
    markRead,
    markFavorite,
    getReadArticles,
    getFavoriteArticles,
    searchArticles,
} = require("../controllers/newsController");

const authenticateUser = require("../middlewares/authMiddleware");
const { validateNewsRequest } = require("../middlewares/newsMiddleware");
const { cacheNewsMiddleware } = require("../middlewares/cacheNewsMiddleware");

const validateArticleAction = require("../middlewares/validateArticleAction ");

// router.get('/', authenticateUser, validateNewsRequest, getNews)
router.get("/", [
    authenticateUser,
    validateNewsRequest,
    cacheNewsMiddleware,
    getNews,
]);

/* ============================ */
// Mark articles
router.post("/:id/read", [authenticateUser, validateArticleAction, markRead]);
router.post("/:id/favorite", [
    authenticateUser,
    validateArticleAction,
    markFavorite,
]);

// Get lists
router.get("/read", [authenticateUser, getReadArticles]);
router.get("/favorites", [authenticateUser, getFavoriteArticles]);

// Search
router.get("/search/:keyword", [authenticateUser, searchArticles]);

module.exports = router;
