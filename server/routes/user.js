const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const authMiddleware = require("../middleware/auth-middleware");

// @route GET user/:id
router.get("/user", authMiddleware, UserController.getUser);

// @route DELETE api/user
router.delete("/user", authMiddleware, UserController.deleteUser);

module.exports = router;
