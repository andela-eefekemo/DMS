import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import ConnectedHeader from './include/Header';
import SideBar from './include/sideBar';
import Footer from './include/Footer';
import UserConnectedContainer from './user/UserContainer';
import DocumentConnectedContainer from './documents/DocumentContainer';
import RoleConnectedContainer from './role/RoleContainer';
import DocumentConnectedList from './documents/DocumentList';
import UserConnectedList from './user/UserList';
import RoleConnectedList from './role/RoleList';

/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   *
   * @param {Object} props
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
   * Intialize materialize collapsible
   * Check if user is authenticated
   * Toast access message
   *
   * @return {void}
   * @memberof Dashboard
   */
  componentDidMount() {
    $('.collapsible').collapsible();
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
      return Materialize.toast('You do not have access to view this page', 3000,
        'indigo darken-4 white-text rounded');
    }
  }

  /**
   * Renders dashboard component
   *
   * @return {String} HTML markup for dashboard component
   * @memberof Dashboard
   */
  render() {
    return (
      <div className="dashboard">
        <SideBar match={this.props.match} user={this.state.user} />
        <div className="dashboard-margin">
          <ConnectedHeader match={this.props.match} />
          <Switch>
            <Route
              path={`${this.props.match.url}/document`}
              component={DocumentConnectedContainer} />
            <Route
              path={`${this.props.match.url}/role`}
              component={RoleConnectedContainer} />
            <Route
              exact path={`${this.props.match.url}`}
              render={() => (
                <Redirect to={`${this.props.match.url}/alldocuments`} />)} />
            <Route
              path={`${this.props.match.url}/profile`}
              component={UserConnectedContainer} />
            <Route
              path={`${this.props.match.url}/alldocuments`}
              component={DocumentConnectedList} />
            <Route
              path={`${this.props.match.url}/allusers`}
              component={UserConnectedList} />
            <Route
              path={`${this.props.match.url}/allroles`}
              component={RoleConnectedList} />
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
  access: PropTypes.object.isRequired,
  match: PropTypes.object,
  history: PropTypes.object
};

export default connect(mapPropsToState)(withRouter(Dashboard));
