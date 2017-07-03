import * as actionTypes from '../actions/actionTypes';

const roleReducer = (state = { roleList: [], role: {} }, action) => {
  let newState;

  switch (action) {
    case actionTypes.VIEW_ROLE:
      return { roleList: action.roleList };
    case actionTypes.ROLE_UPDATED:
      return Object.assign({}, state, { role: action.role });
    case actionTypes.ROLE_CREATED:
      return Object.assign({}, state, { role: action.role });
    case actionTypes.ROLE_DELETED:
      return Object.assign({}, state, { role: {} });
    case actionTypes.ROLE_UPDATE_ERROR:
    case actionTypes.ROLE_ERROR:
      return {
        message: action.message
      };
    default:
      return state;
  }
};

export default roleReducer;
