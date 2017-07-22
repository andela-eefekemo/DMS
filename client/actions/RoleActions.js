import axios from 'axios';
import * as actionTypes from './actionTypes';

/**
 * @class RoleActions
 */
class RoleActions {
  /**
   * @static
   * @param {any} roleContent -
   * @returns {promise} -
   * @memberof RoleActions
   */
  static createRole(roleContent) {
    return (dispatch) => {
      return axios.post('/api/v1/roles', roleContent)
        .then((response) => {
          if (response.status === 201) {
            return dispatch({
              type: actionTypes.ROLE_CREATED,
              message: null,
              role: response.data.savedRole
            });
          }
        }).catch(({ response }) => {
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.ROLE_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @returns {promise} -
   * @memberof RoleActions
   */
  static viewRole() {
    return (dispatch) => {
      return axios.get('/api/v1/roles')
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.VIEW_ROLE,
              message: null,
              roleList: response.data.roles
            });
          }
        }).catch(({ response }) => {
          if (response.status === 404) {
            return dispatch({
              type: actionTypes.NO_ROLES,
              roleList: []
            });
          }
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.ROLE_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} roleContent -
   * @param {any} id -
   * @returns {promise} -
   * @memberof RoleActions
   */
  static updateRole(roleContent, id) {
    return (dispatch) => {
      return axios.put(`/api/v1/roles/${id}`, roleContent)
        .then((response) => {
          if (response.data.message === 'Role has been updated') {
            return dispatch({
              type: actionTypes.ROLE_UPDATED,
              message: null,
              role: response.data.updatedRole
            });
          }
        }).catch(({ response }) => {
          if (response.data.message ===
            "we're sorry, role title must be unique") {
            return dispatch({
              type: actionTypes.ROLE_UPDATE_ERROR,
              message: 'Role title must be unique, please rename role'
            });
          }
          if (response.status === (400 || 404)) {
            return dispatch({
              type: actionTypes.ROLE_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} id -
   * @returns {promise} -
   * @memberof RoleActions
   */
  static deleteRole(id) {
    return (dispatch) => {
      return axios.delete(`/api/v1/roles/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.ROLE_DELETED,
              message: 'Role has been deleted'
            });
          }
        }).catch(({ response }) => {
          if (response.status === 404) {
            return dispatch({
              type: actionTypes.ROLE_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
}

export default RoleActions;
