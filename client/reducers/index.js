import { combineReducers } from 'redux';
import access from './accessReducer';
import document from './documentReducer';
import user from './userReducer';
import role from './roleReducer';

const rootReducer = combineReducers({
  access,
  document,
  role,
  user
});

export default rootReducer;
