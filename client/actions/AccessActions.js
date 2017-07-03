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
      return axios.post('/users', userDetails)
        .then((response) => {
          if (response.status === 200) {
            setAuthorizationToken(response.data.token);
            const token = response.data.token;
            localStorage.setItem('jwToken', token);
            dispatch({
              type: actionTypes.SIGN_UP_USER,
              user: response.data.userData
            });
          } else {
            dispatch({
              type: actionTypes.ACCESS_ERROR,
              error: 'There was an error, please try again'
            });
          }
        }).catch(() => {
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            error: 'There was an error, please try again'
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
      return axios.post('/users/login', userDetails)
        .then((response) => {
          if (response.data.message === 'login successful') {
            setAuthorizationToken(response.data.token);
            const token = response.data.token;
            localStorage.setItem('jwToken', token);
            return dispatch({
              type: actionTypes.SIGN_IN_USER,
              user: response.data.userData
            });
          }
          if (response.data.message === 'User does not exist') {
            return dispatch({
              type: actionTypes.USER_DOES_NOT_EXIST,
              message: 'User does not exist'
            });
          }
          return dispatch({
            type: actionTypes.ACCESS_ERROR,
            error: 'There was an error, please try again'
          });
        }).catch(() => {
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
      return axios.post('/users/logout')
        .then((response) => {
          localStorage.removeItem('jwToken');
          dispatch({
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
