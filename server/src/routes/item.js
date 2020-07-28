const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const ItemControllers = require("../controllers/item");

// @route POST /items/:listId
router.post("/items/new/", authMiddleware, ItemControllers.addItem);

module.exports = router;
