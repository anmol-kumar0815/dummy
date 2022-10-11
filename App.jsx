import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// eslint-disable-next-line import/order
import "lib/dayjs";

import Articles from "./components/Articles";
import Create from "./components/Articles/Create";
import Navbar from "./components/common/Navbar";
import Categories from "./components/Settings/Categories";
import General from "./components/Settings/General";
import Redirections from "./components/Settings/Redirections";

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact component={Articles} path="/" />
      <Route exact component={Create} path="/create" />
      <Route exact component={General} path="/settings" />
      <Route exact component={Categories} path="/settings/categories" />
      <Route exact component={Redirections} path="/settings/redirections" />
    </Switch>
  </Router>
);

export default App;
