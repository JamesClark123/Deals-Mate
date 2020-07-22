const Item = require("../models/item");
const List = require("../models/list");
const User = require("../models/user");
const scrapper = require("../utils/scrapper/price-scraping");
const cron = require("node-cron");

// get item id
exports.itemById = (req, res, next, id) => {
  Item.findById(id)
    .populate("list", "_id name")
    .exec((err, item) => {
      if (err || !item) return res.status(400).json({ error: err });

      req.item = item;
      next();
    });
};

// adding item
exports.addItem = async (req, res) => {
  try {
    const { url } = req.body;
    let item = await Item.findOne({ url: url }).exec();
    // TODO: make scapper a global object so we don't have to initialize it everytime
    if (!item) {
      await scrapper.initialize();
      let details = await scrapper.getProductDetails(url);
      await scrapper.end();
      // convert string to price
      let price = null;
      if (details.price) price = parseFloat(details.price.replace("$", ""));
      item = new Item({
        url: url,
        lists: [],
        users: [],
        name: details.title,
        image: details.image,
      });
      item.data.push({
        price: price,
        availability: details.availability,
      });
    }

    await item.save();
    res.status(200).json(item);
  } catch (e) {
    await scrapper.end(); // quit browser
    console.log(e);
    res.status(400).send({ error: e.message });
  }
};

// getAllItems
exports.getAllItems = async (req, res) => {
  Item.find({ list: req.params.listId }).exec((err, items) => {
    if (err) return res.status(400).json({ error: err });

    return res.status(200).json(items);
  });
};

// get single item
exports.getSingleItem = async (req, res) => {
  return res.json(req.item);
};

// Delete Item
export async function deleteItem(req, res) {
  const _id = req.params.itemId;

  try {
    const item = await Item.findOne({ _id, user: req.user._id })
      .populate("lists")
      .populate("users")
      .exec();

    if (!item)
      res
        .status(400)
        .send({ error: "Tried deleting an item that doesn't exist!" });

    //   async (err, result) => {
    //   if (err) return res.status(400).json({ error: err });

    //   // upate List and User
    //   await List.findByIdAndUpdate(result.list._id, {
    //     $pull: { items: _id },
    //     $inc: { __v: -1 }
    //   }).exec(function(err, newList) {
    //     if (err) {
    //       return res.status(400).json({ error: err });
    //     }
    //   });
    //   ``;
    //   await User.findByIdAndUpdate(result.user._id, {
    //     $pull: { items: _id }
    //   }).exec(function(err, newUser) {
    //     if (err) {
    //       return res.status(400).json({ error: err });
    //     }
    //   });

    //   // remove item
    //   result.remove();
    //   res.status(200).send({ message: "Item is removed!" });
    // });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

// delete all items
exports.deleteAllItems = (req, res) => {
  try {
    Item.remove({ list: req.params.listId });
    res.status(200).json({ message: "All items are deleted" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

// setting cron-job to for scrapping automation
exports.testingPrice = (req, res) => {
  Item.find({}).exec((err, items) => {
    if (err) res.status(400).json({ error: err });

    items.forEach((item) => {
      console.log(item.url);
    });

    res.status(200).json({ message: "Look at console log" });
  });
};

// setting up cron job to schedule scarpping every 23 hours
// cron.schedule("* * 23 * * *", () => {
//   // 1. Find all item to track
//   Item.find({}).exec(async (err, items) => {
//     if (err) console.log(err); // print error

//     // loop to find item prices
//     items.forEach(async item => {
//       // 2. Scrap the price with each item's url
//       await scrapper.initialize();
//       let details = await scrapper.getProductDetails(item.url);
//       // convert string to price
//       const newItemPrice = parseFloat(details.price.replace("$", ""));
//       // add new price into our current prices
//       item.prices.push({ price: newItemPrice });
//       // stop scrapper after pushing newItemPrice
//       scrapper.end();

//       // compare our new price with our previous price
//       const pricesLength = item.prices.length;
//       const newPrice = item.prices[pricesLength - 1];
//       const oldPrice = item.prices[pricesLength - 2];

//       // see if new price is less than old price
//       if (newPrice < oldPrice) {
//         // send out email to notify user about price change;
//       }
//     });
//   });
// });
