import axios from 'axios';

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
              type: 'SIGNUP_USER',
              user: response.data.userData
            });
          } else {
            dispatch({
              type: 'SIGNUP_ERROR',
              error: response.data.message
            });
          }
        }).catch((error) => {
          throw error;
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
          if (!response.data.error) {
            setAuthorizationToken(response.data.token);
            const token = response.data.token;
            localStorage.setItem('jwToken', token);
            dispatch({
              type: 'SIGNIN_USER',
              user: response.data.userData
            });
          } else {
            dispatch({
              type: 'SIGNIN_ERROR',
              error: response.data.error
            });
          }
        }).catch((error) => {
          throw error;
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
            type: 'SIGNOUT_USER',
            message: response.data.message
          });
        }).catch((error) => {
          throw error;
        });
    };
  }
}

export default AccessActions;
