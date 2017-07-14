import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
   * @param {any} e -
   * @memberof Header
   */
  logout(e) {
    e.preventDefault();
    this.props.signOutUser()
      .then(() => {
        this.context.router.history.push('/');
      }).catch(() => {

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
  match: PropTypes.object
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { signOutUser })(Header);
