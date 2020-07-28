"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _user = _interopRequireDefault(require("./routes/user"));

var _list = _interopRequireDefault(require("./routes/list"));

var _item = _interopRequireDefault(require("./routes/item"));

var _cronRunner = _interopRequireDefault(require("./utils/scrapper/cron-runner"));

var _sendgridEmail = require("./services/sendgrid-email");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./db/mongoose");

new _cronRunner["default"]();
var app = (0, _express["default"])(); // middlewares

app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"]((0, _path.join)(__dirname, "..", "client/build"))); // app.use(express.static(join(__dirname, "..", "client", "public")));

app.use("/api", _auth["default"]);
app.use("/api", _user["default"]);
app.use("/api", _list["default"]);
app.use("/api", _item["default"]);
app.get("*", function (_req, res) {
  res.sendFile((0, _path.join)(__dirname, "..", "client/build/index.html"));
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : "";

  if (process.env.NODE_ENV === "production") {
    (0, _sendgridEmail.sendUnhandledError)(err);
  } // render the error page


  res.status(err.status || 500);
  res.json({
    error: err
  });
});
module.exports = app;
