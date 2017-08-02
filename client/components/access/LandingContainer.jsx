import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedHeader from '../include/Header.jsx';
import SectionDisplay from './SectionDisplay.jsx';

/**
 * @class LandingContainer
 * @extends {Component}
 */
export class LandingContainer extends Component {

  /**
   * Initializes the carousel component
   * Redirects user to dashbaord page if authenticated
   * @return {void}
   * @memberof LandingContainer
   */
  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    setInterval(() => {
      $('.carousel').carousel('next');
    }, 7000);
    if (this.props.access.isAuthenticated === true) {
      this.props.history.push('/dashboard');
    }
  }

  /**
   * Renders a component
   * @returns {void}
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

const mapPropsToState = state => (
  {
    access: state.access
  }
);

LandingContainer.propTypes = {
  access: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object
};


export default connect(mapPropsToState)(withRouter(LandingContainer));
