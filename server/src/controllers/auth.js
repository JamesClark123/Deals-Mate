import jwt from "jsonwebtoken";
import keys from "../config/keys";

const User = require("../models/user");
const { sendSignUpConfirmation } = require("../services/sendgrid-email");
import AWSElasticIP from "../services/awsElasticIP";
import List from "../models/list";
import { clientErrors } from "js_common";

// registering user
exports.register = async (req, res, next) => {
  // check if user exists or not
  const userExisted = await User.findOne({ email: req.body.email });
  // check user
  if (userExisted) {
    return next(clientErrors.EMAIL_ALREADY_REGISTERED);
  }

  // create new user
  const user = new User(req.body);
  await user.save();

  const list = new List({ title: "Shopping List", items: [], user: user._id });
  await list.save();

  user.lists.push(list._id);
  await user.save();

  const emailToken = jwt.sign({ user: user._id }, keys.EMAIL_SECRET, {
    expiresIn: "1d",
  });
  const ip = await new AWSElasticIP().getURL();
  const url = `${ip}api/confirmation/${emailToken}`;

  sendSignUpConfirmation(req.body.email, url);
  res.status(201).json({
    message: "Account is created. Please confirm your email to sign in!",
  });
};

// create demo account and login
// TODO: make sure cron job checks for null emails
exports.demoLogin = async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let demoUser = await User.findOne({ ipAddress: ip });

    if (!demoUser) {
      demoUser = new User({
        name: "Demo User",
        ipAddress: ip,
        confirmed: true,
        password: "demouser",
        maxItems: 10,
      });
      await demoUser.save();

      const list = new List({
        title: "Shopping List",
        items: [],
        user: demoUser._id,
      });
      await list.save();

      demoUser.lists.push(list._id);
      await demoUser.save();
    }

    const token = demoUser.generateToken();
    const { name, maxItems } = demoUser;
    res
      .json({
        user: { name, maxItems, demo: true },
        token,
      })
      .send();
  } catch {
    next(serverErrors.DEMO_ACCOUNT_CREATION_ERROR);
  }
};

// logging in user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(clientErrors.NO_EMAIL_PASSWORD);

  const user = await User.findOne({ email });
  if (!user) return next(clientErrors.EMAIL_NOT_REGISTERED);

  if (!user.confirmed) {
    return next(clientErrors.EMAIL_NOT_CONFIRMED);
  }

  if (!user.authenticate(password)) {
    return next(clientErrors.WRONG_EMAIL_OR_PASSWORD);
  }

  if (!user.maxItems) {
    user.maxItems = 100;
    await user.save();
  }

  // genrate token
  const token = user.generateToken();
  const { name, maxItems } = user;
  res
    .json({
      user: { name, email, maxItems },
      token,
    })
    .send();
};

exports.confirm = async (req, res) => {
  try {
    const { user: _id } = jwt.verify(req.params.token, keys.EMAIL_SECRET);
    await User.findByIdAndUpdate(_id, { confirmed: true }).exec();
    res.redirect("../../login");
  } catch (e) {
    // TODO: redirect with querey string indicating failure
    res.send("error");
  }
};
