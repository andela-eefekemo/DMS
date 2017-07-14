import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserActions from '../../actions/UserActions';
import UserCard from './UserCard';
import UserView from './UserView';

const getAllUsers = UserActions.getUsers;
const viewUser = UserActions.viewUser;
const deleteUser = UserActions.deleteUser;
const searchUsers = UserActions.searchUsers;

/**
 * @class UserList
 * @extends {Component}
 */
export class UserList extends Component {
  /**
   * Creates an instance of UserList.
   * @param {any} props -
   * @memberof UserList
   */
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      User: {},
      searchTerm: ''
    };
    this.onClick = this.onClick.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  /**
   * @return {void}
   * @memberof UserList
   */
  componentWillMount() {
    this.updateUserList();
  }

  /**
   * @return {void}
   * @memberof UserList
   */
  updateUserList() {
    this.props.getAllUsers()
      .then(() => {
        this.setState({
          Users: this.props.UserList
        });
      }).catch(() => {

      });
  }
  /**
   * @return {void}
   * @param {any} nextProps -
   * @memberof UserList
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.UserList !== nextProps.UserList) {
      this.setState({
        Users: nextProps.UserList
      });
    }
  }
  /**
   * @param {any} e -
   * @return {void}
   * @memberof UserList
   */
  onClick(e) {
    e.preventDefault();
    this.props.viewUser(e.target.name).then(() => {
      if (this.props.User.message) {
        return Materialize.toast(
          this.props.User.message, 2000,
          'indigo darken-4 white-text rounded');
      }
      this.setState({
        firstName: this.props.User.firstName,
        lastName: this.props.User.lastName,
        email: this.props.User.email,
        roleId: this.props.User.roleId
      });
      this.context.router.history.push(`${this.props.match.url}/viewUser`);
    }).catch(() => {
    });
  }

  /**
   * @param {any} e -
   * @return {void}
   * @memberof UserList
   */
  onSearch(e) {
    e.preventDefault();
    this.props.searchUsers(e.target.value)
      .then(() => {
      }).catch(() => {

      });
  }

  /**
   * @return {void}
   * @param {any} e -
   * @memberof UserList
   */
  deleteUser(e) {
    this.props.deleteUser(e.target.name).then(() => {
      this.updateUserList();
      this.context.router.history.push(`${this.props.match.url}/allusers`);
    }).catch(() => {

    });
  }

  /**
   * @returns {jsx} -
   * @memberof UserList
   */
  render() {
    const singleUser = this.state.Users.map(User => (
      <UserCard
        key={User.id} {...User}
        onClick={this.onClick} match={this.props.match} />
    ));
    return (
      <div className="document-list">
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <div className="col l5 m5 s12">
                <input
                  className="search"
                  type="text"
                  name="searchTerm"
                  placeholder="Search.."
                  onChange={this.onSearch} />
              </div>
            </div>
            <div className="document-list-view">
              <div className="col l5 m5 s12">
                <div className=" card-panel hoverable">
                  <h5>All Users</h5>
                  <div className="scrollable">
                    {singleUser}
                  </div>
                </div>
              </div>
            </div>
            <div className="col l6 m6 s12">
              <Switch>
                <Route
                  path={`${this.props.match.url}/viewUser`} render={() => (
                    <UserView
                      id={this.props.User.id}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      roleId={this.state.roleId}
                      deleteUser={this.deleteUser} />)} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserList.contextTypes = {
  router: PropTypes.object.isRequired
};

UserList.propTypes = {
  getAllUsers: PropTypes.func,
  viewUser: PropTypes.func,
  deleteUser: PropTypes.func,
  searchUsers: PropTypes.func,
  User: PropTypes.object,
  UserList: PropTypes.object,
  match: PropTypes.object
};

const mapPropsToState = (state) => {
  return {
    UserList: state.user.userList,
    User: state.user.user
  };
};

export default connect(
  mapPropsToState, {
    getAllUsers, viewUser, deleteUser, searchUsers
  })(UserList);
