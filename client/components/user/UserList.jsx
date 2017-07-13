import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserActions from '../../actions/UserActions';
import RoleActions from '../../actions/RoleActions';
import UserCard from './UserCard';
import UserView from './UserView';

const getAllUsers = UserActions.getUsers;
const viewUser = UserActions.viewUser;
const updateUser = UserActions.updateUser;
const deleteUser = UserActions.deleteUser;
const searchUsers = UserActions.searchUsers;
const viewRoles = RoleActions.viewRole;

/**
 * @class UserList
 * @extends {Component}
 */
class UserList extends Component {
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
          this.props.user.message, 2000,
          'indigo darken-4 white-text rounded');
      } else {
        this.setState({
          firstName: this.props.User.firstName,
          lastName: this.props.User.lastName,
          email: this.props.User.email,
          roleId: this.props.User.roleId
        });
        this.context.router.history.push(`${this.props.match.url}/viewUser`);
      }
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
        console.log(this.state.searchTerm);
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

const mapPropsToState = (state) => {
  return {
    UserList: state.user.userList,
    User: state.user.user,
    roles: state.role.roleList,
    access: state.access
  };
};

export default connect(
  mapPropsToState, { getAllUsers, viewUser, updateUser, deleteUser, searchUsers, viewRoles })(UserList);
