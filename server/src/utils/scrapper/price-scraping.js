import cheerio from "cheerio";
import axios from "axios";

import singleton from "../../decorators/singleton";
import { getBaseUrl } from "./url-validation";

@singleton
class PriceScrapper {
  queue = [];
  running = false;

  async processQueue() {
    if (this.running) {
      console.log(`Request to add to queue with ${this.queue.length} elements`);
      return;
    }
    this.running = true;

    while (this.queue.length > 0) {
      const next = this.queue.shift();
      try {
        const details = await this.getProductDetails(next.link);
        next.resolve(details);
      } catch (err) {
        next.reject(err);
      }
    }
    this.running = false;
  }

  async addToQueue(link) {
    const promise = new Promise((resolve, reject) => {
      this.queue.push({ link, resolve, reject });
    });
    this.processQueue();
    return promise;
  }

  tryToParseFloat(n) {
    try {
      return parseFloat(n.replace("$", ""));
    } catch {
      return null;
    }
  }

  async getProductDetails(link) {
    try {
      const url = getBaseUrl(link);
      const { data: html } = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36",
        },
      });
      const $ = cheerio.load(html, { normalizeWhitespace: true });

      const availability = $("span.a-size-medium", "#availability")
        .text()
        .trim();
      const title = $("#productTitle").text().trim();
      let price = $(
        "#priceblock_ourprice, #priceblock_dealprice, #priceblock_saleprice"
      )
        .text()
        .trim();
      price = this.tryToParseFloat(price);
      let salePriceOriginal = $("#priceBlockStrikePriceString").text().trim();
      salePriceOriginal = this.tryToParseFloat(salePriceOriginal);
      const image = $(".a-dynamic-image", "#imgTagWrapperId").attr(
        "data-old-hires"
      );
      return { availability, title, price, image, link, salePriceOriginal };
    } catch (err) {
      console.log(`Error trying to get product details from ${link}`);
      throw err;
    }
  }
}

export default PriceScrapper;
