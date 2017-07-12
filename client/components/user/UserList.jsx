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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  /**
   * @return {void}
   * @memberof UserList
   */
  componentWillMount() {
    this.props.getAllUsers()
      .then(() => {
        this.setState({
          Users: this.props.UserList
        });
        this.props.viewRoles()
          .then(() => {
            console.log('hi');
          }).catch(() => {

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
   * @return {void}
   * @param {any} e -
   * @memberof UserContainer
   */
  onChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }
  /**
   * @param {any} e -
   * @return {void}
   * @memberof UserList
   */
  onClick(e) {
    this.props.viewUser(e.target.value).then(() => {
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
   * @return {void}
   * @memberof UserList
   */
  onSearch() {
    this.props.searchUsers(this.state.searchTerm)
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
    this.props.deleteUser(e.target.value).then(() => {
      console.log('User has been deleted');
      this.context.router.history.push(`${this.props.match.url}`);
    }).catch(() => {

    });
  }

  /**
   * @return {void}
   * @memberof UserList
   */
  onSubmit() {
    const updatedUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      roleId: this.state.roleId
    };
    this.props.updateUser(updatedUser, this.props.User.id)
      .then(() => {
        this.setState({
          firstName: this.props.User.firstName,
          lastName: this.props.User.lastName,
          email: this.props.User.email,
          roleId: this.props.User.roleId
        });
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
      <div className="container">
        <div className="row">
          <div className="searchDiv">
            <input
              className="search"
              type="text"
              name="searchTerm"
              placeholder="Search.."
              value={this.state.searchTerm}
              onChange={this.onChange} />
            <button onClick={this.onSearch}>Search</button>
          </div>
          <div className="col l4 m4 s12">
            {singleUser}
          </div>
          <div className="col l8 m8 s12">
            <Switch>
              <Route
                path={`${this.props.match.url}/viewUser`} render={() => (
                  <UserView
                    id={this.props.User.id}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    roleId={this.state.roleId}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    roles={this.props.roles}
                    deleteUser={this.deleteUser} />)} />
            </Switch>
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
