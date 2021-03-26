import React from "react";
import { Switch, Route } from "react-router-dom";
import { default as Home } from "./view/pages/Home";
import { default as NotFound } from "./view/pages/NotFound";
import { Provider as GridProvider } from "./context/grid/GridContext";

const App = () => {
  return (
    <GridProvider>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </GridProvider>
  );
};

export default App;
