import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingContainer from './access/LandingContainer';
import Dashboard from './Dashboard';

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
          <Route path="/" exact component={LandingContainer} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
