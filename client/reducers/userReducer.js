import * as actionTypes from '../actions/actionTypes';

const userReducer = (state = { userList: [], user: {} }, action) => {
  switch (action) {
    case actionTypes.VIEW_USER:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.SEARCH_USERS:
    case actionTypes.GET_USERS_LIST:
      return Object.assign({}, state, { userList: action.userList });
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
