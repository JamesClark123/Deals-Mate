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
      "0 15 * * *",
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
    const priceScrapper = new PriceScrapper();
    const items = await Item.find({}).exec();
    const newPrices = [];
    const failedScrapes = [];
    console.log(`${items.length} items to look through`);

    async function updateItem(item, attempts = 0, backoff = 120000) {
      await new Promise((res) => setTimeout(res, backoff));
      try {
        const result = await priceScrapper.addToQueue(item.url);
        if (!result.availability && !result.price) {
          throw result;
        }
        let price = result.price;

        const updatedItem = await Item.findOneAndUpdate(
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
          updatedItem.data.length > 1 &&
          price < updatedItem.data[updatedItem.data.length - 2].price
        ) {
          newPrices.push(item);
        }
        console.log(`succeded with ${item.url}`);
      } catch (result) {
        if (attempts >= 2) {
          failedScrapes.push(result);
          console.log(`failed with ${item.url}`);
        } else {
          await updateItem(item, attempts + 1, backoff * 2);
        }
      }
    }

    for (const item of items) {
      await updateItem(item);
    }
    if (newPrices.length > 0) this.sendEmails(newPrices);
    this.sendUpdateEmails(failedScrapes, items);
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
