import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

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
   * Binds class methods
   * @param {Object} props -
   * @memberof UserList
   */
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      User: {},
      offset: 0,
      pageCount: 0,
      searchTerm: ''
    };
    this.onClick = this.onClick.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
  * Makes action call to retrieve list of users
  *
  * @return {void}
  * @memberof UserList
  */
  componentDidMount() {
    this.updateUserList();
  }
  /**
   * Update the state if the props are changed
   *
   * @return {void}
   * @param {Object} nextProps -
   * @memberof UserList
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      Users: nextProps.UserList,
      pageCount: nextProps.pagination.pageCount,
      count: nextProps.pagination.count
    });
  }
  /**
  * Makes an action call to get all users
  * Sets list of users to the state
  *
  * @return {void}
  * @memberof UserList
  */
  updateUserList() {
    this.props.getAllUsers()
      .then(() => {
        this.setState({
          Users: this.props.UserList,
          count: this.props.pagination.count
        });
      });
  }
  /**
  * Makes an action call to view a user
  * Toasts the error/success message
  * Sets user to the state
  *
   * @param {Object} event -
   * @return {void}
   * @memberof UserList
   */
  onClick(event) {
    this.props.viewUser(event.target.name).then(() => {
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
      this.props.history.push(`${this.props.match.url}/view-user`);
    });
  }

  /**
   * Sets the searchterm to the state
   * Makes an action call to the search for a user
   * @param {Object} event -
   * @return {void}
   * @memberof UserList
   */
  onSearch(event) {
    this.setState({ searchTerm: event.target.value });
    this.props.searchUsers(event.target.value)
      .then(() => {
      }).catch(() => {

      });
  }

  /**
  * Makes an action call to delete a user
  * Toasts the error/success message
  *
  * @return {void}
  * @param {Object} event -
  * @memberof UserList
  */
  deleteUser(event) {
    this.props.deleteUser(event.target.name).then(() => {
      this.updateUserList();
      this.props.history.push(`${this.props.match.url}/all-users`);
    }).catch(() => {

    });
  }
  /**
  * Pagination for the list of users
  *
  * @return {void}
  * @param {Object} data -
  * @memberof UserList
  */
  handlePageClick(data) {
    const selected = data.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.getAllUsers(offset, limit).then(() => {
      this.setState({
        Users: this.props.UserList
      });
    });
  }

  /**
  * Renders the User List component
  *
  * @returns {String} HTML markup for the UserList
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
                    {(this.state.count > 5) && <ReactPaginate
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />}
                  </div>
                </div>
              </div>
            </div>
            <div className="col l6 m6 s12">
              <Switch>
                <Route
                  // eslint-disable-next-line
                  path={`${this.props.match.url}/view-user`} render={() => {
                    if (!this.props.User.id) {
                      this.props.history.push(`${this.props.match.url}`);
                    }
                    return (
                      <UserView
                        id={this.props.User.id}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        roleId={this.state.roleId}
                        deleteUser={this.deleteUser} />);
                  }} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  getAllUsers: PropTypes.func,
  viewUser: PropTypes.func,
  deleteUser: PropTypes.func,
  searchUsers: PropTypes.func,
  User: PropTypes.object,
  UserList: PropTypes.array,
  match: PropTypes.object,
  pagination: PropTypes.object,
  history: PropTypes.object
};

const mapPropsToState = state => (
  {
    UserList: state.user.userList,
    pagination: state.user.pagination,
    User: state.user.user
  }
);

export default connect(
  mapPropsToState, {
    getAllUsers, viewUser, deleteUser, searchUsers
  })(withRouter(UserList));
