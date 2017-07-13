import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../include/Header';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


/**
 * @class LandingContainer
 * @extends {Component}
 */
class AuthPage extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * @returns {jsx} -
   * @memberof LandingContainer
   */
  render() {
    return (
      <div>
        <Header match={this.props.match} />
        <div className="container authpage">
          <div className="row auth-card">
            <Switch>
              <Route exact path={`${this.props.match.path}/signin`} component={SignInForm} />
              <Route exact path={`${this.props.match.path}/signup`} component={SignUpForm} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;
