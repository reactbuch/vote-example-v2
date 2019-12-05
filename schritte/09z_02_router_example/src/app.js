import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home, About } from "./components";

export default function App() {
  return (
    <div>
      <h1>Router Example</h1>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}
