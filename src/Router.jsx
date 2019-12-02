import React from "react";
import { Route, Switch } from "react-router-dom";
import Premier from "./Premier";
import Team from "./Team";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Premier} />
        <Route exact path="/team/:teamId" component={Team} />
      </Switch>
    </div>
  );
};

export default Router;
