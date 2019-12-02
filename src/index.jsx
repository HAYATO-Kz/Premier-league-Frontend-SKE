import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

const AppWithRouter = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

ReactDOM.render(<AppWithRouter />, document.getElementById("root"));
