import React from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer theme="colored" />
  </React.StrictMode>,
  document.getElementById("root")
);
