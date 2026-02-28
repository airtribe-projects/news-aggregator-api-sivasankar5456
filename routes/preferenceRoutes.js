const express = require("express");
const router = express.Router();

const { getPreferences, updatePreferences } = require("../controllers/preferencesController");

const authenticateUser = require("../middlewares/authMiddleware")
const validatePreferences = require("../middlewares/validatePreferences")


router.get(
  "/",
  authenticateUser,
  getPreferences
);

router.put(
  "/",
  authenticateUser,
  validatePreferences,
  updatePreferences
);

module.exports = router