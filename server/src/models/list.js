const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./item");

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        userAssignedName: String,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

listSchema.pre("remove", async function (next) {
  const list = this;

  await Item.findOneAndUpdate(
    {
      list: list._id,
    },
    {
      $pull: {
        list: list._id,
      },
    }
  );

  next();
});

const List = mongoose.model("List", listSchema);
module.exports = List;
