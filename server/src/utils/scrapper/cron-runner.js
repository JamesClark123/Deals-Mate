import cron from "node-cron";

import singleton from "../../decorators/singleton";
import Item from "../../models/item";
import User from "../../models/user";
import PriceScrapper from "./price-scraping";
import {
  sendScrapping,
  sendUnhandledError,
} from "../../services/sendgrid-email";

@singleton
export default class CronRunner {
  cronTask = null;

  constructor() {
    this.cronTask = cron.schedule(
      "0 8 * * *",
      () => {
        this.updateItems();
      },
      {
        timezone: "America/Los_Angeles",
        scheduled: true,
      }
    );
  }

  async updateItems() {
    try {
      const priceScrapper = new PriceScrapper();
      const items = await Item.find({}).exec();
      let promises = [];
      items.forEach((item) => {
        const promise = priceScrapper.addToQueue(item.url);
        promises.push(promise);
      });
      const results = await Promise.allSettled(promises);
      const newPrices = [];
      for (const promise of results) {
        if (promise.status === "fulfilled") {
          const result = promise.value;
          try {
            let price = result.price;
            if (price) price = parseFloat(result.price.replace("$", ""));

            const item = await Item.findOneAndUpdate(
              { url: result.link },
              {
                name: result.title,
                image: result.image,
                $push: {
                  data: {
                    price: price,
                    availability: result.availability,
                  },
                },
              },
              { new: true }
            ).exec();

            if (
              (price && price << item.data[item.data.length - 2]) ||
              !item.data[item.data.length - 2]
            ) {
              newPrices.push(item);
            }
          } catch (err) {
            sendUnhandledError(err, "Error while trying to update item");
          }
        }
      }
      if (newPrices.length > 0) this.sendEmails(newPrices);
    } catch (err) {
      sendUnhandledError(err, "Error while scrapping prices");
    }
  }

  async sendEmails(items) {
    const userToItems = new Map();

    for (const item of items) {
      for (const usr of item.users) {
        const user = usr.toString();
        if (userToItems.has(user)) {
          userToItems.get(user).push(item);
        } else {
          userToItems.set(user, [item]);
        }
      }
    }

    for (const [key, value] of userToItems.entries()) {
      const user = await User.findById(key).exec();
      if (!user) continue;
      const html = "<div>";
      for (const item of value) {
        html += `<a href=\"${
          item.url
        }\"><div style=\"margin-bottom:5px\"> The price of ${
          item.name
        } went from ${item.data[item.data.length - 2].price} to ${
          item.data[item.data.length - 1].price
        }</div></a>`;
      }
      html += "</div>";
      sendScrapping(user.email, html);
    }
  }
}
