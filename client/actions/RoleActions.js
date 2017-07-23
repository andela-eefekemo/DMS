import axios from 'axios';
import * as actionTypes from './actionTypes';

/**
 * @class RoleActions
 */
class RoleActions {
  /**
  * Requests the API to create a role
  *
  * @static
  * @param {Object} roleContent Role
  * @returns {Object} dispatches an object
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
  * Requests the API to get roles
  *
  * @static
  * @returns {Object} dispatch object
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
  * Requests the API to view role
  *
  * @static
  * @param {Object} roleContent role
  * @param {Integer} id The id of the role to be updated
  * @returns {Object} dispatch object
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
  * Requests the API to delete a role
  *
  * @static
  * @param {String} id The id of the role to be deleted
  * @returns {Object} dispatch object
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
