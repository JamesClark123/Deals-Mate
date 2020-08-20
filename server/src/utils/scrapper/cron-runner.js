import cron from "node-cron";

import singleton from "../../decorators/singleton";
import Item from "../../models/item";
import User from "../../models/user";
import PriceScrapper from "./price-scraping";
import {
  sendScrapping,
  sendUnhandledError,
  sendUpdateEmail,
} from "../../services/sendgrid-email";

@singleton
export default class CronRunner {
  cronTask = null;

  constructor() {
    console.log("Setting cron job");
    this.cronTask = cron.schedule(
      "0 21 * * *",
      () => {
        this.updateItems();
      },
      {
        timezone: "Etc/UTC",
        scheduled: true,
      }
    );
  }

  async updateItems() {
    console.log("Attempting to update items");
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
      const failedScrapes = [];
      for (const promise of results) {
        if (promise.status === "fulfilled") {
          const result = promise.value;
          if (!result.availability && !result.price) {
            failedScrapes.push(promise);
            continue;
          }
          try {
            let price = result.price;

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
              price &&
              item.data.length > 1 &&
              price < item.data[item.data.length - 2].price
            ) {
              newPrices.push(item);
            }
          } catch (err) {
            failedScrapes.push(promise);
            sendUnhandledError(
              err,
              "Error while trying to scrape a price during update items"
            );
          }
        } else {
          failedScrapes.push(promise);
        }
      }
      if (newPrices.length > 0) this.sendEmails(newPrices);
      this.sendUpdateEmails(failedScrapes, results);
    } catch (err) {
      console.log("Failed trying to update items: ", err);
      sendUnhandledError(err, "Error while updating items");
    }
  }

  async sendUpdateEmails(failedScrapes, results) {
    let str = "";
    for (const scrape of failedScrapes) {
      str += `<div>message: ${scrape.reason || "no reason"}</div>`;
    }
    const msg =
      `<div>There were ${failedScrapes.length} failed scrapes out of ${results.length} scrapes today.` +
      str +
      "</div>";
    sendUpdateEmail(msg);
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
