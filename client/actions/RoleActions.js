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
      return axios.post('/roles', roleContent)
        .then((response) => {
          if (response.data.message === 'Role created') {
            return dispatch({
              type: actionTypes.ROLE_CREATED,
              message: null,
              role: response.data.savedRole
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: response.data.message
          });
        }).catch(() => {
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
      return axios.get('/roles')
        .then((response) => {
          if (response.data.message === 'Roles found') {
            return dispatch({
              type: actionTypes.VIEW_ROLE,
              message: null,
              roleList: response.data.roles
            });
          }
          if (response.data.message === 'There are no roles currently') {
            return dispatch({
              type: actionTypes.NO_ROLES,
              roleList: []
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: response.data.message
          });
        }).catch(() => {
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
      return axios.put(`/roles/${id}`, roleContent)
        .then((response) => {
          if (response.data.message === 'Role has been updated') {
            return dispatch({
              type: actionTypes.ROLE_UPDATED,
              message: null,
              role: response.data.updatedRole
            });
          }
          if (response.data.message ===
            "we're sorry, role title must be unique") {
            return dispatch({
              type: actionTypes.ROLE_UPDATE_ERROR,
              message: 'Role title must be unique, please rename role'
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: response.data.message
          });
        }).catch(() => {
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
      return axios.delete(`/roles/${id}`)
        .then((response) => {
          if (response.data.message === 'Role has been deleted') {
            return dispatch({
              type: actionTypes.ROLE_DELETED,
              message: 'Role has been deleted'
            });
          }
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: response.data.message
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.ROLE_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
}

export default RoleActions;
