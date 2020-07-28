import express from "express";
import {
  getAllLists,
  getAllItems,
  createList,
  deleteList,
  removeItem,
  addItem,
} from "../controllers/list";
import authMiddleWare from "../middleware/auth-middleware";

const router = express.Router();

// @route GET /items/:listId
router.get("/lists/:listId", authMiddleWare, getAllItems);

// @route POST /api/lists
router.post("/lists/new", authMiddleWare, createList);

// @route GET /api/lists
router.get("/lists", authMiddleWare, getAllLists);

// @route DELETE /api/lists:id
router.delete("/lists/:listId", authMiddleWare, deleteList);

// @route DELETE /api/lists/:listId/:itemId
router.delete("/lists/:listId/:itemId", authMiddleWare, removeItem);

// add an item to a list
router.post("/lists/:listId/:itemId", authMiddleWare, addItem);

export default router;
