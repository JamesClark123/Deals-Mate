import User from "../models/user";
import List from "../models/list";
import Item from "../models/item";

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// delete user
exports.deleteUser = async (req, res) => {
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
    res.status(200).json({ message: "Your account has been deleted!" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error while trying to remove your account" });
  }
};
