const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
// const { userSignupValidator } = require('../validator');

// @route POST user/register
router.post("/user/register", AuthController.register);

// @route POST user/signin
router.post("/user/login", AuthController.login);

// @route POST user/signin/demo
router.post("/user/login/demo", AuthController.demoLogin);

// @route POST user/logout
// router.post('/logout', authMiddleware, AuthController.logout);

router.get("/confirmation/:token", AuthController.confirm);

module.exports = router;
