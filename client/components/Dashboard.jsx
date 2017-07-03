import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Header from './include/Header';
import SideBar from './include/sideBar';
import Footer from './include/Footer';
import UserContainer from './user/UserContainer';
import DocumentContainer from './documents/DocumentContainer';
import RoleContainer from './role/RoleContainer';

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
      <div className="dashboard">
        <SideBar match={this.props.match} />
        <div className="dashboard-margin">
          <Header match={this.props.match} />
          <h1>DashBoard</h1>
          <Switch>
            <Route
              path={`${this.props.match.url}/document`}
              component={DocumentContainer} />
            <Route
              path={`${this.props.match.url}/role`}
              component={RoleContainer} />
            <Route
              exact path={this.props.match.url} component={UserContainer} />
          </Switch>
          <Footer />
        </div>
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
