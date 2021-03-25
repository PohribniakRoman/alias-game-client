import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/main.scss";
import Routes from "./components/Routes";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
