const accessReducer = (
  state = { isAuthenticated: false, user: {}, error: null }, action) => {
  switch (action.type) {
    case 'SIGNUP_USER':
    case 'SIGNIN_USER':
    case 'LOGGEDIN_USER':
      return {
        isAuthenticated: true,
        user: action.user,
        error: null
      };
    case 'SIGNUP_ERROR':
    case 'SIGNIN_ERROR':
    case 'SIGNOUT_USER':
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
