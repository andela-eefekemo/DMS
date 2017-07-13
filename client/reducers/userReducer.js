import * as actionTypes from '../actions/actionTypes';

const userReducer = (state = { userList: [], user: {} }, action) => {
  switch (action.type) {
    case actionTypes.VIEW_USER:
      return Object.assign(
        {}, state, { user: action.user, message: action.message });
    case actionTypes.UPDATE_USER_SUCCESS:
      return Object.assign(
        {}, state, { user: action.user, message: action.message });
    case actionTypes.SEARCH_USERS:
    case actionTypes.GET_USERS_LIST:
      return Object.assign(
        {}, state, { userList: action.userList, message: action.message });
    case actionTypes.DELETE_USER:
      return Object.assign({}, state, { user: {} });
    case actionTypes.UPDATE_EMAIL_EXISTS:
    case actionTypes.ERROR:
      return {
        message: action.message
      };
    default:
      return state;
  }
};

export default userReducer;
