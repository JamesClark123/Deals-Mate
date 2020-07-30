import Item from "../models/item";
import PriceScrapper from "../utils/scrapper/price-scraping";

// adding item
exports.addItem = async (req, res) => {
  try {
    const { url } = req.body;
    let item = await Item.findOne({ url: url }).exec();

    if (item && req.user.items.includes(item._id))
      return res.status(400).send({ error: "This item is already in a list!" });

    if (!item) {
      const scrapper = new PriceScrapper();
      let details = await scrapper.addToQueue(url);
      // convert string to price
      let price = details.price;
      item = new Item({
        url: url,
        lists: [],
        users: [],
        name: details.title,
        image: details.image,
      });

      if (details && details.salePriceOriginal) {
        item.data.push({
          price: originalPrice,
          availability: details.availability,
        });
      }

      item.data.push({
        price: price,
        availability: details.availability,
      });
      await item.save();
    }

    res.status(200).json(item);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
};
