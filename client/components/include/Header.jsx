import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavBar from './NavBar';
import accessActions from '../../actions/AccessActions';

const signOutUser = accessActions.signOutUser;

/**
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
  /**
   * Creates an instance of Header.
   * @param {any} props -
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * Lifecycle function
   * @return {void}
   * @memberof Header
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * @return {void}
   * @memberof Header
   */
  logout() {
    this.props.signOutUser()
      .then(() => {
        this.props.history.push('/');
      });
  }

  /**
   * @returns {jsx} -
   * @memberof Header
   */
  render() {
    return (
      <NavBar onClick={this.logout} match={this.props.match} />
    );
  }
}
Header.propTypes = {
  signOutUser: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object
};
export default connect(null, { signOutUser })(withRouter(Header));
