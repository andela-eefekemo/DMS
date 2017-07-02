import React, { Component } from 'react';
import Header from '../include/Header';

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
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;
