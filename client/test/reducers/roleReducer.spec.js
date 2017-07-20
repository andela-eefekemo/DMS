/* global expect test */
import roleReducer from '../../reducers/roleReducer';
import * as actionTypes from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

describe('Document Reducer', () => {
  it('should return role when ROLE_CREATED is passed', () => {
    const role = {
      title: 'king',
      description: 'has ultimate access'
    };
    const action = {
      type: actionTypes.ROLE_CREATED, role, message: 'Role created'
    };
    const expected = {
      role, roleList: [], message: 'Role created'
    };
    const newState = roleReducer(initialState.role, action);

    expect(newState).toEqual(expected);
  });
  it('should return role when ROLE_UPDATED is passed', () => {
    const role = {
      title: 'king',
      description: 'has ultimate access'
    };
    const action = {
      type: actionTypes.ROLE_UPDATED, role, message: 'Role updated'
    };
    const expected = {
      role, roleList: [], message: 'Role updated'
    };
    const newState = roleReducer(initialState.role, action);

    expect(newState).toEqual(expected);
  });
  it('should return empty role when ROLE_DELETED is passed', () => {
    const action = {
      type: actionTypes.ROLE_DELETED, message: 'Role deleted'
    };
    const expected = {
      role: {}, roleList: []
    };
    const newState = roleReducer(initialState.role, action);

    expect(newState).toEqual(expected);
  });
  it('should return empty role when ROLE_UPDATE_ERROR is passed', () => {
    const action = {
      type: actionTypes.ROLE_UPDATE_ERROR, message: 'Role update error'
    };
    const expected = { message: 'Role update error', role: {}, roleList: [] };
    const newState = roleReducer(initialState.role, action);

    expect(newState).toEqual(expected);
  });
  it('should return empty role when ROLE_ERROR is passed', () => {
    const action = {
      type: actionTypes.ROLE_ERROR, message: 'Role error'
    };
    const expected = { message: 'Role error', role: {}, roleList: [] };
    const newState = roleReducer(initialState.role, action);

    expect(newState).toEqual(expected);
  });
  it('should return default when unmatched action type is passed', () => {
    const action = { type: 'EFE', message: null };
    const newState = roleReducer(initialState.document, action);

    expect(newState).toEqual(initialState.document);
  });
  it('should return roleList when VIEW_ROLE is passed', () => {
    const roleList = [{
      title: 'The best book',
      descrition: 'is The Name of the wind'
    }];
    const action = {
      type: actionTypes.VIEW_ROLE,
      roleList
    };
    const expected = {
      role: {}, roleList
    };
    const newState = roleReducer(initialState.role, action);

    expect(newState).toEqual(expected);
  });
});
