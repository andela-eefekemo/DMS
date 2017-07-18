import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedHeader from '../include/Header';
import SectionDisplay from './SectionDisplay';

/**
 * @class LandingContainer
 * @extends {Component}
 */
export class LandingContainer extends Component {

  /**
   * @return {void}
   * @memberof LandingContainer
   */
  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    if (this.props.access.isAuthenticated === true) {
      this.props.history.push('/dashboard');
    }
  }

  /**
   * @returns {jsx} -
   * @memberof LandingContainer
   */
  render() {
    return (
      <div className="landing-page">
        <ConnectedHeader match={this.props.match} />
        <SectionDisplay />
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    access: state.access
  };
};

LandingContainer.propTypes = {
  access: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object
};


export default connect(mapPropsToState)(withRouter(LandingContainer));
