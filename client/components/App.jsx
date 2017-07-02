import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SignInForm from './access/SignInForm';
import SignUpForm from './access/SignUpForm';

import LandingContainer from './access/LandingContainer';
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
          <Route path="/" component={LandingContainer} />
          <Route component={AuthPage}>
            <Switch>
              <Route exact path="/signin" component={SignInForm} />
              <Route exact path="/signup" component={SignUpForm} />
            </Switch>
          </Route>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
