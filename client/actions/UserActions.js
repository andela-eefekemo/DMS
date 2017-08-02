import axios from 'axios';
import * as actionTypes from './actionTypes';
import setAuthorizationToken from '../utilities/setAuthorizationToken';

/**
 * @class UserActions
 */
class UserActions {


  /**
  * Requests for all accessible users (paginated) from the API
  *
  * @static
  * @param {number} [offset=0] The number of users to offset results by
  * @param {number} [limit=5] The number of users to return
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static getUsers(offset = 0, limit = 5) {
    return dispatch =>
      axios.get(`/api/v1/users?offset=${offset}&limit=${limit}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.GET_USERS_LIST,
              message: null,
              userList: response.data.userList,
              metaData: response.data.metaData
            });
          }
        }).catch(({ response }) => {
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error please try again'
          });
        });
  }

  /**
  * Requests for a particular user by ID from the API
  *
  * @static
  * @param {String} id The ID of the user to be retrieved
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static viewUser(id) {
    return dispatch => axios.get(`/api/v1/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return dispatch({
            type: actionTypes.VIEW_USER,
            message: null,
            user: response.data.user
          });
        }
      }).catch(({ response }) => {
        if (response.status === (404 || 400)) {
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }
        return dispatch({
          type: actionTypes.ERROR,
          message: 'There was an error please try again'
        });
      });
  }

  /**
  * Requests for users matching a query (paginated) from the API
  *
  * @static
  * @param {String} searchTerm The search terms to be matched
  * @param {number} [offset=0] The number of users to offset results by
  * @param {number} [limit=5] The number of users to return
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static searchUsers(searchTerm, offset = 0, limit = 5) {
    return dispatch => axios.get(
      `/api/v1/search/users?q=${searchTerm}&offset=${offset}&limit=${limit}`)
      .then((response) => {
        if (response.status === 200) {
          return dispatch({
            type: actionTypes.SEARCH_USERS,
            message: null,
            metaData: response.data.metaData,
            userList: response.data.userList
          });
        }
      }).catch(({ response }) => {
        if (response.status === 400) {
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }
        return dispatch({
          type: actionTypes.ERROR,
          message: 'There was an error please try again'
        });
      });
  }

  /**
  * Requests the API to update a user
  *
  * @static
  * @param {String} userDetails The details of the user to be updated
  * @param {String} id user id
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static updateUser(userDetails, id) {
    return dispatch => axios.put(`/api/v1/users/${id}`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          setAuthorizationToken(response.data.token);
          localStorage.setItem('jwToken', response.data.token);
          return dispatch({
            type: actionTypes.UPDATE_USER_SUCCESS,
            user: response.data.updatedUser,
            message: null
          });
        }
      }).catch(({ response }) => {
        if (response.status === 409) {
          return dispatch({
            type: actionTypes.UPDATE_EMAIL_EXISTS,
            message: 'User Email Already Exists'
          });
        }
        if (response.status === 400) {
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }
        return dispatch({
          type: actionTypes.ERROR,
          message: 'There was an error please try again'
        });
      });
  }

  /**
  * Requests the API to delete a user
  *
  * @static
  * @param {String} id user id
  * @returns {Object} dispatch object
  * @memberof UserActions
  */
  static deleteUser(id) {
    return dispatch => axios.delete(`/api/v1/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return dispatch({
            type: actionTypes.DELETE_USER,
            message: 'User has been deleted'
          });
        }
      }).catch(({ response }) => {
        if (response.status === 400 || 404) {
          return dispatch({
            type: actionTypes.ERROR,
            message: response.data.message
          });
        }
        return dispatch({
          type: actionTypes.ERROR,
          message: 'There was an error please try again'
        });
      });
  }
}

export default UserActions;
