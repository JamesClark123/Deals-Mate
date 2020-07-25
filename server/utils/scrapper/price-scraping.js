import cheerio from "cheerio";
import axios from "axios";

import singleton from "../../decorators/singleton";
import { sendUnhandledError } from "../../services/sendgrid-email";

@singleton
class PriceScrapper {
  queue = [];
  running = false;

  async processQueue() {
    if (this.running) {
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
  }

  async addToQueue(link) {
    const promise = new Promise((resolve, reject) => {
      this.queue.push({ link, resolve, reject });
    });
    this.processQueue();
    return promise;
  }

  async getProductDetails(link) {
    try {
      const { data: html } = await axios.get(link, {
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
      const price = $("#priceblock_ourprice, #priceblock_dealprice")
        .text()
        .trim();
      const image = $(".a-dynamic-image", "#imgTagWrapperId").attr(
        "data-old-hires"
      );
      return { availability, title, price, image, link };
    } catch (err) {
      sendUnhandledError(err, "Thrown from price scrapper");
    }
  }
}

export default PriceScrapper;
