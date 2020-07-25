import mongoose from "mongoose";

const List = require("../models/list");
const Item = require("../models/item");

// create list
export async function createList(req, res) {
  const userId = req.user._id;
  const list = new List({
    ...req.body,
    user: userId,
  });

  try {
    await list.save();
    res.status(201).send(list);
  } catch (e) {
    res.status(400).send({ error: e });
  }
}

// getAllItems
export async function getAllItems(req, res) {
  Item.find({ list: req.params.listId }).exec((err, items) => {
    if (err) return res.status(400).json({ error: err });

    return res.status(200).json(items);
  });
}

// get users lists
export async function getAllLists(req, res) {
  const userId = req.user._id;
  try {
    const lists = await List.find({ user: userId })
      .populate({ path: "items.item", model: "Item" })
      .exec();
    return res.json(lists);
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
}

// remove item from list
export async function removeItem(req, res) {
  try {
    let list = await List.findOneAndUpdate(
      req.params.listId,
      {
        $pull: { items: { item: mongoose.Types.ObjectId(req.params.itemId) } },
      },
      { returnOriginal: false }
    )
      .populate({ path: "items.item", model: "Item" })
      .exec();
    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
}

export async function addItem(req, res) {
  try {
    await List.updateOne(
      { _id: req.params.listId },
      {
        $push: {
          items: { item: req.params.itemId, userAssignedName: "" },
        },
      }
    ).exec();
    let list = await List.findById(req.params.listId)
      .populate({ path: "items.item", model: "Item" })
      .exec();
    let item = await Item.findById(req.params.itemId)
      .populate("lists")
      .populate("users")
      .exec();
    item.users.push(req.user._id);
    item.lists.push(list._id);
    await item.save();
    return res.json(list);
  } catch (err) {
    return res.status(400);
  }
}

// delete list
export async function deleteList(req, res) {
  List.findById(req.params.listId).exec((err, list) => {
    if (err) return res.status(400).json({ error: err });
    // remove list
    list.remove();
    return res.status(200).json({ message: "List is deleted!~" });
  });
}
