require("./db/mongoose");
import createError from "http-errors";
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
app.get("/api/cronstatus", async (req, res) => {
  const cr = new CronRunner();
  res.send(cr.cronTask.getStatus());
});

app.get("*", (_req, res) => {
  res.sendFile(join(__dirname, "../..", "client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : "";

  if (process.env.NODE_ENV === "production") {
    console.log("Error in production: ", err);
    sendUnhandledError(err);
  }

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
