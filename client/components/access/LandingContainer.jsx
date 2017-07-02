import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../include/Header';
import SectionDisplay from './SectionDisplay';

/**
 * @class LandingContainer
 * @extends {Component}
 */
class LandingContainer extends Component {
  /**
   * Creates an instance of LandingContainer.
   * @param {any} props -
   * @memberof LandingContainer
   */
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
    if (this.props.access.isAuthenticated === true) {
      this.context.router.history.push('/dashboard');
    }
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

const mapPropsToState = (state) => {
  return {
    access: state.access
  };
};

LandingContainer.propTypes = {
  access: PropTypes.object.isRequired
};

LandingContainer.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(mapPropsToState)(LandingContainer);
