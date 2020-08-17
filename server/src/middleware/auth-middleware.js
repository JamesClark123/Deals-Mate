const User = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

import { clientErrors, serverErrors } from "js_common";

const auth = async (req, res, next) => {
  const token =
    req.header("Authorization").replace("Bearer ", "") ||
    req.headers.authorization;

  if (!token) return next(clientErrors.INVALID_AUTH_TOKEN);

  try {
    const decodedToken = jwt.verify(token, keys.TOKEN_SECRET); // decoding input token
    const user = await User.findOne({ _id: decodedToken._id }); // find user with same token

    if (!user) {
      return next(clientErrors.INVALID_AUTH_TOKEN);
    }
    req.user = user;
    next();
  } catch (e) {
    next(serverErrors.AUTHORIZATION_ERROR);
  }
};

module.exports = auth;
