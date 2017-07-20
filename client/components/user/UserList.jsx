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
   * @param {any} props -
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
   * @return {void}
   * @memberof UserList
   */
  componentDidMount() {
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
    this.setState({
      Users: nextProps.UserList,
      pageCount: nextProps.pagination.pageCount
    });
  }
  /**
   * @param {any} e -
   * @return {void}
   * @memberof UserList
   */
  onClick(e) {
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
      this.props.history.push(`${this.props.match.url}/viewUser`);
    }).catch(() => {
    });
  }

  /**
   * @param {any} e -
   * @return {void}
   * @memberof UserList
   */
  onSearch(e) {
    this.setState({ searchTerm: e.target.value });
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
      this.props.history.push(`${this.props.match.url}/allusers`);
    }).catch(() => {

    });
  }
  /**
   * @return {void}
   * @param {any} data
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
                    <ReactPaginate
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={<a href="">...</a>}
                      breakClassName={'break-me'}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={1}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />
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

const mapPropsToState = (state) => {
  return {
    UserList: state.user.userList,
    pagination: state.user.pagination,
    User: state.user.user
  };
};

export default connect(
  mapPropsToState, {
    getAllUsers, viewUser, deleteUser, searchUsers
  })(withRouter(UserList));
