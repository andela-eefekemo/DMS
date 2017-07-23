import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LandingConnectedContainer from './access/LandingContainer';
import Dashboard from './Dashboard';
import AuthPage from './access/AuthPage';

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {

  /**
   * @returns {jsx} -
   * @memberof App
   */
  render() {
    return (
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
  }
}

export default App;
