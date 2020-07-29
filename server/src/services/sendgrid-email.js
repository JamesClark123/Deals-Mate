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

export const sendSignUpConfirmation = (to, link) => {
  const msgContents = {
    to: to,
    from: "dealsmatefinder@gmail.com",
    subject: "Confirm your email",
    text: "Confirm your email to login",
    html: `Click this link to confirm your email and login ${link}`,
  };
  sgMail.send(msgContents);
};

export const sendScrapping = (email, html) => {
  const msgContents = {
    to: email,
    from: "dealsmatefinder@gmail.com",
    subject: "New prices!",
    text: "We've found some new prices on your items",
    html,
  };
  sgMail.send(msgContents);
};

export const sendUnhandledError = (error, message) => {
  const msgContents = {
    to: "dealsmatefinder@gmail.com",
    from: "error handler",
    subject: "UHANDLED ERROR",
    html: `${message ? message + " " : ""}${error}`,
  };
  sgMail.send(msgContents);
};

export const sendUpdateEmail = (html) => {
  const msgContents = {
    to: "dealsmatefinder@gmail.com",
    from: "error handler",
    subject: "Update",
    html,
  };
  sgMail.send(msgContents);
};
