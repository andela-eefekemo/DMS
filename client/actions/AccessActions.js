import axios from 'axios';

import * as actionTypes from './actionTypes';
import setAuthorizationToken from '../utilities/setAuthorizationToken';

/**
 * @class AccessActions
 */
class AccessActions {
  /**
   * @static
   * @param {any} userDetails -
   * @return {object} dispatch object
   * @memberof AccessActions
   */
  static signUpUser(userDetails) {
    return (dispatch) => {
      return axios.post('/api/v1/users', userDetails)
        .then((response) => {
          if (response.status === 201) {
            setAuthorizationToken(response.data.token);
            const token = response.data.token;
            localStorage.setItem('jwToken', token);
            return dispatch({
              type: actionTypes.SIGN_UP_USER,
              message: null,
              user: response.data.userData
            });
          }
        }).catch(({ response }) => {
          if (response.data.message === 'Email already exists') {
            return dispatch({
              type: actionTypes.USER_ALREADY_EXISTS,
              message: response.data.message
            });
          }
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.ACCESS_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            message: 'There was an error, please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} userDetails -
   * @returns {object} dispatch object
   * @memberof AccessActions
   */
  static signInUser(userDetails) {
    return (dispatch) => {
      return axios.post('/api/v1/users/login', userDetails)
        .then((response) => {
          if (
            response.status === 200) {
            setAuthorizationToken(response.data.token);
            const token = response.data.token;
            localStorage.setItem('jwToken', token);
            return dispatch({
              type: actionTypes.SIGN_IN_USER,
              message: null,
              user: response.data.userData
            });
          }
        }).catch(({ response }) => {
          if (
            response.data.message ===
            'User does not exist') {
            return dispatch({
              type: actionTypes.USER_DOES_NOT_EXIST,
              message: 'User does not exist'
            });
          }
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.ACCESS_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            message: 'There was an error, please try again'
          });
        });
    };
  }

  /**
   * @static
   * @returns {object} dispatch object
   * @memberof AccessActions
   */
  static signOutUser() {
    return (dispatch) => {
      return axios.post('/api/v1/users/logout')
        .then((response) => {
          localStorage.removeItem('jwToken');
          return dispatch({
            type: actionTypes.SIGN_OUT_USER,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            error: 'There was an error, please try again'
          });
        });
    };
  }
}

export default AccessActions;
