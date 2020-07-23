const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(keys.SENDGRID_API_KEY);

// import sgMail from "@sendgrid/mail";
// import keys from "./config/keys";
// // const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(keys.SENDGRID_API_KEY);
// const msg = {
//   to: "jamesloganclark@gmail.com",
//   from: "dealsmate@gmail.com",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail.send(msg);

const sendSignUpConfirmation = (to, link) => {
  const msgContents = {
    to: to,
    from: "dealsmatefinder@gmail.com",
    subject: "Confirm your email",
    text: "Confirm your email to login",
    html: `Click this link to confirm your email and login ${link}`,
  };
  sgMail.send(msgContents);
};

const sendScrapping = (email, item, price) => {
  const msgContents = {
    to: email,
    from: "test@test.com",
    templateId: "d-1b13f858b1d545a29894dc00b83af967",
    dynamic_template_data: {
      item: item,
      price: price,
    },
  };
  sgMail.send(msgContents);
};

module.exports = { sendSignUpConfirmation, sendScrapping };
