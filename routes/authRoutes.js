const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const validateRegister = require("../middlewares/validateRegister")
const validateLogin = require("../middlewares/validateLogin")


router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;