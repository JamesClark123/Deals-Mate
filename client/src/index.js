import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

console.log("dir_name", __dirname);

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
