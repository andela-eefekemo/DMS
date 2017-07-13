import axios from 'axios';
import * as actionTypes from './actionTypes';
import setAuthorizationToken from '../utilities/setAuthorizationToken';

/**
 * @class UserActions
 */
class UserActions {

  /**
   * @static
   * @returns {promise} -
   * @memberof UserActions
   */
  static getUsers() {
    return (dispatch) => {
      return axios.get('/users')
        .then((response) => {
          if (response.data.message === 'Users found') {
            return dispatch({
              type: actionTypes.GET_USERS_LIST,
              message: null,
              userList: response.data.userList
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} id -
   * @returns {promise} -
   * @memberof UserActions
   */
  static viewUser(id) {
    return (dispatch) => {
      return axios.get(`/users/${id}`)
        .then((response) => {
          if (response.data.message === 'User found') {
            return dispatch({
              type: actionTypes.VIEW_USER,
              message: null,
              user: response.data.user
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} searchTerm -
   * @param {any} offset -
   * @param {any} limit -
   * @returns {promise} -
   * @memberof UserActions
   */
  static searchUsers(searchTerm, offset = 0, limit = 20) {
    return (dispatch) => {
      return axios.get(
        `/search/users?q=${searchTerm}&offset=${offset}&limit=${limit}`)
        .then((response) => {
          if (response.data.message === 'Users found') {
            return dispatch({
              type: actionTypes.SEARCH_USERS,
              message: null,
              userList: response.data.userList
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} userDetails -
   * @param {any} id -
   * @returns {promise} -
   * @memberof UserActions
   */
  static updateUser(userDetails, id) {
    return (dispatch) => {
      return axios.put(`/users/${id}`, userDetails)
        .then((response) => {
          if (response.data.message === 'Email already exists') {
            return dispatch({
              type: actionTypes.UPDATE_EMAIL_EXISTS,
              message: 'User Email Already Exists'
            });
          }
          if (response.data.message === 'User information has been updated') {
            setAuthorizationToken(response.data.token);
            localStorage.setItem('jwToken', response.data.token);
            return dispatch({
              type: actionTypes.UPDATE_USER_SUCCESS,
              user: response.data.updatedUser,
              message: null
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} id -
   * @returns {promise} -
   * @memberof UserActions
   */
  static deleteUser(id) {
    return (dispatch) => {
      return axios.delete(`/users/${id}`)
        .then((response) => {
          if (response.data.message === 'User has been deleted') {
            return dispatch({
              type: actionTypes.DELETE_USER,
              message: 'User has been deleted'
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
}

export default UserActions;
