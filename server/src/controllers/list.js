import mongoose from "mongoose";

const List = require("../models/list");
const Item = require("../models/item");
import { serverErrors, clientErrors } from "js_common";

// create list
export async function createList(req, res, next) {
  const user = req.user;
  const list = new List({
    ...req.body,
    user: user._id,
  });
  user.lists.push(list._id);

  try {
    await list.save();
    await user.save();
    res.status(201).send(list);
  } catch (e) {
    next(serverErrors.LIST_CREATION_ERROR);
  }
}

// getAllItems
export async function getAllItems(req, res, next) {
  Item.find({ list: req.params.listId }).exec((err, items) => {
    if (err) return next(serverErrors.UNKNOWN_ERROR);

    return res.status(200).json(items);
  });
}

// get users lists
export async function getAllLists(req, res, next) {
  const userId = req.user._id;
  try {
    const lists = await List.find({ user: userId })
      .populate({ path: "items.item", model: "Item" })
      .exec();
    return res.json(lists);
  } catch (err) {
    return next(serverErrors.UNKNOWN_ERROR);
  }
}

// remove item from list
export async function removeItem(req, res, next) {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      {
        $pull: { items: { item: mongoose.Types.ObjectId(req.params.itemId) } },
      },
      { returnOriginal: false }
    )
      .populate({ path: "items.item", model: "Item" })
      .exec();
    const item = await Item.findByIdAndUpdate(req.params.itemId, {
      $pull: { lists: list._id },
    }).exec();
    await req.user.update({ $pull: { items: item._id } }).exec();
    return res.json(list);
  } catch (err) {
    return next(serverErrors.UNKNOWN_ERROR);
  }
}

export async function addItem(req, res, next) {
  try {
    const user = req.user;

    if (user.items.length >= user.maxItems) {
      return next(clientErrors.MAX_ITEMS_REACHED);
    }

    const list = await List.findOneAndUpdate(
      { _id: req.params.listId },
      {
        $push: {
          items: { item: req.params.itemId, userAssignedName: "" },
        },
      },
      { new: true }
    )
      .populate({ path: "items.item", model: "Item" })
      .exec();
    const item = await Item.findById(req.params.itemId)
      .populate("lists")
      .populate("users")
      .exec();
    item.users.push(user._id);
    item.lists.push(list._id);
    await item.save();
    user.items.push(item._id);
    await user.save();
    return res.json(list);
  } catch (err) {
    return next(serverErrors.UNKNOWN_ERROR);
  }
}

// delete list
export async function deleteList(req, res, next) {
  try {
    const listId = req.params.listId;
    const user = req.user;
    await user.update({ $pull: { lists: mongoose.Types.ObjectId(listId) } });
    const list = await List.findById(listId).exec();
    const itemIds = list.items.map((item) => item.item);
    await Item.updateMany(
      { _id: { $in: itemIds } },
      { $pull: { lists: mongoose.Types.ObjectId(listId) } }
    ).exec();
    await list.remove();
    return res.status(200).json({ message: "List is deleted!~" });
  } catch {
    return next(serverErrors.UNKNOWN_ERROR);
  }
}
