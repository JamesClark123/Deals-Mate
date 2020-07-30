const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(keys.SENDGRID_API_KEY);

async function sendMail(msgContents) {
  try {
    await sgMail.send(msgContents);
  } catch (err) {
    console.log("Error trying to send mail: ", msgContents, err);
  }
}

export const sendSignUpConfirmation = (to, link) => {
  const msgContents = {
    to: to,
    from: "dealsmatefinder@gmail.com",
    subject: "Confirm your email",
    text: "Confirm your email to login",
    html: `Click this link to confirm your email and login ${link}`,
  };
  sendMail(msgContents);
};

export const sendScrapping = (email, html) => {
  const msgContents = {
    to: email,
    from: "dealsmatefinder@gmail.com",
    subject: "New prices!",
    text: "We've found some new prices on your items",
    html,
  };
  sendMail(msgContents);
};

export const sendUnhandledError = (error, message) => {
  const msgContents = {
    to: "dealsmatefinder@gmail.com",
    from: "dealsmatefinder@gmail.com",
    subject: "UHANDLED ERROR",
    text: "error",
    html: `${message ? message + " " : ""}${error}`,
  };
  sendMail(msgContents);
};

export const sendUpdateEmail = (html) => {
  const msgContents = {
    to: "dealsmatefinder@gmail.com",
    from: "dealsmatefinder@gmail.com",
    subject: "Update",
    text: "update",
    html,
  };
  sendMail(msgContents);
};
