import User from "../models/user";
import List from "../models/list";
import Item from "../models/item";
import { serverErrors } from "js_common";

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// delete user
exports.deleteUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).exec();
    const userLists = await List.find({ user: userId }).exec();
    for (const list of userLists) {
      await list.remove();
    }
    const userItems = await Item.find({ _id: { $in: user.items } });
    for (const item of userItems) {
      await item.update({ $pull: { users: user._id } });
    }
    await user.remove();
    res.sendStatus(200);
  } catch (err) {
    next(serverErrors.DELETE_ACCOUNT_ERROR);
  }
};
