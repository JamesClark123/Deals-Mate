import jwt from "jsonwebtoken";
import keys from "../config/keys";

const User = require("../models/user");
const { sendSignUpConfirmation } = require("../services/sendgrid-email");
import AWSElasticIP from "../services/awsElasticIP";
import List from "../models/list";

// registering user
exports.register = async (req, res) => {
  // check if user exists or not
  const userExisted = await User.findOne({ email: req.body.email });
  // check user
  if (userExisted)
    return res.status(403).json({ error: "Email is already registered." });

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

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "No email or password entered" })
      .send();

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({
        error: "Email is not registered!",
      })
      .send();

  if (!user.confirmed) {
    return res
      .status(400)
      .json({ error: "Please confirm your email address before signing in" })
      .send();
  }

  if (!user.authenticate(password)) {
    return res
      .status(401)
      .json({
        error: "Email or Password is not matching",
      })
      .send();
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
    res.send("error");
  }
};
