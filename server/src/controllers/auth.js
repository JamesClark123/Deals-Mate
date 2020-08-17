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

  // genrate token
  const token = user.generateToken();
  const { _id, name, lists } = user;
  res
    .json({
      user: { _id, name, email, lists },
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
