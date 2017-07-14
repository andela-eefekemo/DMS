/* global expect test */
import userReducer from '../../reducers/userReducer';
import * as actionTypes from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

describe('User Reducer', () => {
  it('should return user when UPDATE_USER_SUCCESS is passed', () => {
    const user = {
      firstName: 'Efe',
      lastName: 'Eguono'
    };
    const action = {
      type: actionTypes.UPDATE_USER_SUCCESS, user, message: 'user updated'
    };
    const expected = {
      user, userList: [], message: 'user updated'
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return user when VIEW_USER is passed', () => {
    const user = {
      firstName: 'Efe',
      lastName: 'Eguono'
    };
    const action = {
      type: actionTypes.VIEW_USER, user, message: 'user found'
    };
    const expected = {
      user, userList: [], message: 'user found'
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return user when SEARCH_USERS is passed', () => {
    const userList = [{
      firstName: 'Efe',
      lastName: 'Eguono'
    }];
    const action = {
      type: actionTypes.SEARCH_USERS, userList, message: 'users found'
    };
    const expected = {
      user: {}, userList, message: 'users found'
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return user when GET_USERS_LIST is passed', () => {
    const userList = [{
      firstName: 'Efe',
      lastName: 'Eguono'
    }];
    const action = {
      type: actionTypes.GET_USERS_LIST, userList, message: 'users found'
    };
    const expected = {
      user: {}, userList, message: 'users found'
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return user when DELETE_USER is passed', () => {
    const action = {
      type: actionTypes.DELETE_USER, user: {}
    };
    const expected = {
      user: {}, userList: []
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return user when UPDATE_EMAIL_EXISTS is passed', () => {
    const action = {
      type: actionTypes.UPDATE_EMAIL_EXISTS, message: 'User already exists'
    };
    const expected = {
      message: 'User already exists'
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return user when ERROR is passed', () => {
    const action = {
      type: actionTypes.ERROR, message: 'There was an error'
    };
    const expected = {
      message: 'There was an error'
    };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(expected);
  });
  it('should return default when unmatched action type is passed', () => {
    const action = { type: 'EFE', message: null };
    const newState = userReducer(initialState.user, action);

    expect(newState).toEqual(initialState.user);
  });
});
