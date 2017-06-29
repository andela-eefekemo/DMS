import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props -
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.access.user,
      isAuthenticated: this.props.access.isAuthenticated
    };
  }
  /**
   * @return {void}
   * @memberof Dashboard
   */
  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.context.router.history.push('/');
      return Materialize.toast('You do not have access to view this page', 3000,
        'indigo darken-4 white-text rounded');
    }
  }
  /**
   * @return {jsx} -
   * @memberof Dashboard
   */
  render() {
    return (
      <div>
        <h1>DashBoard</h1>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    access: state.access
  };
};

Dashboard.propTypes = {
  access: PropTypes.object.isRequired
};

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapPropsToState)(Dashboard);
