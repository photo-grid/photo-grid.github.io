import React from "react";
import { Switch, Route } from "react-router-dom";
import { default as Home } from "./view/pages/Home";
import { default as Selector } from "./view/pages/Selector";
import { default as NotFound } from "./view/pages/NotFound";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/selector">
        <Selector />
      </Route>
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
