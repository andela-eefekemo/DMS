/* global expect test */
import access from '../../reducers/accessReducer';
import * as actionTypes from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

describe('Access Reducer', () => {
  it('should return user when SIGN_UP_USER is passed', () => {
    const user = { firstName: 'Eguono', lastName: 'Efe', id: 3 };
    const action = { type: actionTypes.SIGN_UP_USER, user };

    const expectedState = { isAuthenticated: true, user, message: null };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return user when SIGN_IN_USER is passed', () => {
    const user = { firstName: 'Eguono', lastName: 'Efe', id: 3 };
    const action = { type: actionTypes.SIGN_IN_USER, user };

    const expectedState = { isAuthenticated: true, user, message: null };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return user when LOGGEDIN_USER is passed', () => {
    const user = { firstName: 'Eguono', lastName: 'Efe', id: 3 };
    const action = { type: 'LOGGEDIN_USER', user };

    const expectedState = { isAuthenticated: true, user, message: null };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return message when USER_DOES_NOT_EXIST is passed', () => {
    const message = { message: 'User does not exist' };
    const action = { type: actionTypes.USER_DOES_NOT_EXIST, message };

    const expectedState = { isAuthenticated: false, message };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return message when USER_ALREADY_EXISTS is passed', () => {
    const message = { message: 'User already exists' };
    const action = { type: actionTypes.USER_ALREADY_EXISTS, message };

    const expectedState = { isAuthenticated: false, message };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return message when ACCESS_ERROR is passed', () => {
    const message = { message: 'There was an error' };
    const action = { type: actionTypes.ACCESS_ERROR, message };

    const expectedState = { isAuthenticated: false, message };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return empty user when SIGN_OUT_USER is passed', () => {
    const action = { type: actionTypes.SIGN_OUT_USER, message: null };

    const expectedState = { isAuthenticated: false, user: {}, message: null };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return default when unmatched action type is passed', () => {
    const action = { type: 'EFE', message: null };
    const newState = access(initialState.access, action);

    expect(newState).toEqual(initialState.access);
  });
});
