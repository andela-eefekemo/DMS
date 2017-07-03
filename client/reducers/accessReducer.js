import * as actionTypes from '../actions/actionTypes';

const accessReducer = (
  state = { isAuthenticated: false, user: {}, error: null }, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_USER:
    case actionTypes.SIGN_IN_USER:
    case 'LOGGEDIN_USER':
      return {
        isAuthenticated: true,
        user: action.user,
        error: null
      };
    case actionTypes.USER_DOES_NOT_EXIST:
    case actionTypes.ACCESS_ERROR:
      return {
        isAuthenticated: false,
        message: action.message
      };
    case actionTypes.SIGN_OUT_USER:
      return Object.assign({},
        state, { isAuthenticated: false, user: {}, error: null });
    default:
      return state;
  }
};

export default accessReducer;
