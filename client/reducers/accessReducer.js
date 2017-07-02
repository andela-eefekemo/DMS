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
    case actionTypes.SIGN_OUT_USER:
    case actionTypes.ERROR:
      return {
        isAuthenticated: false,
        user: {},
        error: action.error
      };
    default:
      return state;
  }
};

export default accessReducer;
