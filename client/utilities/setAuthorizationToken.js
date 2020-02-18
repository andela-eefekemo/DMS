import axios from 'axios';

/**
* Function that sets the access token for API requests
* @param {String} token The token to be set (optional)
* @returns {void}
*/
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
