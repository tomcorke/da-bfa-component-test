import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./base.scss";
import BfaPlanner from "./components/bfa-planner";
import configureStore from "./redux/store/configure";
import "./reset.scss";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BfaPlanner />
  </Provider>,
  document.getElementById("app")
);
