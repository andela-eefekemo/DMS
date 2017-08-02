import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LandingConnectedContainer from './access/LandingContainer.jsx';
import Dashboard from './Dashboard.jsx';
import AuthPage from './access/AuthPage.jsx';

/**
 * @class App
 * @extends {Component}
 */
const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={LandingConnectedContainer} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect from="/signout" to="/" />
      <Redirect from="*" to="/" />
    </Switch>
  </div>
);

export default App;
