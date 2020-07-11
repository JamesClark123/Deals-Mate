import "app-module-path/register";
// import "app-module-path/cwd";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// addPath("/Users/jamesclark/Code/Projects/Hatchways/Deals-Mate/client/");

console.log("dir_name", __dirname);

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
