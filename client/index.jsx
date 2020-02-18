import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './utilities/setAuthorizationToken';
import configureStore from './store/configureStore';
import App from './components/App';
import './sass/style.scss';


const store = configureStore();
const token = localStorage.getItem('jwToken');
if (token) {
  setAuthorizationToken(token);
  const decoded = jwt.decode(token);
  const user = {
    id: decoded.id,
    roleId: decoded.roleId,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    email: decoded.email
  };
  store.dispatch(
    { type: 'LOGGEDIN_USER', user }
  );
}

const app = document.getElementById('app');


render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), app);

