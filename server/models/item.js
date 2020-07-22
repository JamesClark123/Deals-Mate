const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  data: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      price: Number | null,
      availability: String | null,
      _id: false
    }
  ],
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  image: {
    type: String
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ]
});

module.exports = mongoose.model("Item", itemSchema);
