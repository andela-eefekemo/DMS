import React, { Component } from 'react';

import Header from '../include/Header';
import SectionDisplay from './SectionDisplay';

/**
 * @class LandingContainer
 * @extends {Component}
 */
class LandingContainer extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * @return {void}
   * @memberof LandingContainer
   */
  componentDidMount() {
    $('.tabs').tabs();
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }

  /**
   * @returns {jsx} -
   * @memberof LandingContainer
   */
  render() {
    return (
      <div className="landing-page">
        <Header match={this.props.match} />
        <SectionDisplay />
      </div>
    );
  }
}

export default LandingContainer;
