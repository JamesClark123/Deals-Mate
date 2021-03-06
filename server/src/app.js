require("./db/mongoose");
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

// routes
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import listRouter from "./routes/list";
import itemRouter from "./routes/item";

import CronRunner from "./utils/scrapper/cron-runner";
import { sendUnhandledError } from "./services/sendgrid-email";
import AWSElasticIP from "./services/awsElasticIP";
import { statusCodes, clientErrors, serverErrors } from "js_common";

new CronRunner();
new AWSElasticIP();

var app = express();

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(join(__dirname, "../..", "client/build")));

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", listRouter);
app.use("/api", itemRouter);

app.get("*", (_req, res) => {
  res.sendFile(join(__dirname, "../..", "client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(clientErrors.NOT_FOUND_404);
});

// error handler
// TODO: handle 404 errors
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : "";

  if (err in clientErrors || err in serverErrors) {
    return res.status(statusCodes[err]).json(err);
  }

  if (process.env.NODE_ENV === "production") {
    sendUnhandledError(err);
  } else {
    console.log("Unhandled error in production: ", err);
  }

  return res
    .status(statusCodes[serverErrors.UNKNOWN_ERROR])
    .send(serverErrors.UNKNOWN_ERROR);
});

module.exports = app;
