import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConnectedHeader from '../include/Header';

import SignInConnectedForm from './SignInForm';
import SignUpConnectedForm from './SignUpForm';


/**
 * @class LandingContainer
 * @extends {Component}
 */
class AuthPage extends Component {
  /**
   * Renders a component
   * @returns {void}
   * @memberof LandingContainer
   */
  render() {
    return (
      <div>
        <ConnectedHeader match={this.props.match} />
        <div className="container authpage">
          <div className="row auth-card">
            <Switch>
              <Route
                exact path={`${this.props.match.path}/signin`}
                component={SignInConnectedForm} />
              <Route
                exact path={`${this.props.match.path}/signup`}
                component={SignUpConnectedForm} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default AuthPage;
