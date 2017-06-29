import React, { Component } from 'react';

import LandingDisplay from './LandingDisplay';

/**
 * @class LandingContainer
 * @extends {Component}
 */
class LandingContainer extends Component {

  /**
   * @return {void}
   * @memberof LandingContainer
   */
  componentDidMount() {
    $('.tabs').tabs();
  }
  /**
   * @returns {jsx} -
   * @memberof LandingContainer
   */
  render() {
    return (
      <div>
        <LandingDisplay />
      </div>
    );
  }
}

export default LandingContainer;
