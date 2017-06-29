import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './include/Header';
import Footer from './include/Footer';
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
        <Header />
        <Switch>
          <Route path="/" exact component={LandingContainer} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
