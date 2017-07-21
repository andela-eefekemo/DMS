import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const roleReducer = (state = initialState.role, action) => {
  switch (action.type) {
    case actionTypes.VIEW_ROLE:
    case actionTypes.NO_ROLES:
      return { ...state, roleList: action.roleList };
    case actionTypes.ROLE_UPDATED:
      return { ...state, role: action.role, message: action.message };
    case actionTypes.ROLE_CREATED:
      return { ...state, role: action.role, message: action.message };
    case actionTypes.ROLE_DELETED:
      return { ...state, message: action.message };
    case actionTypes.ROLE_UPDATE_ERROR:
    case actionTypes.ROLE_ERROR:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default roleReducer;
