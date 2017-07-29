/* global expect test */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actionType from '../../actions/actionTypes';
import UserActions from '../../actions/UserActions';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const token =
  'token';

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const offset = 0;
  const limit = 5;
  const searchTerm = '';
  const id = 1;
  describe('List all Users', () => {
    it('Should make an AJAX call to list all users', (done) => {
      moxios.stubRequest(`/api/v1/users?offset=${offset}&limit=${limit}`, {
        status: 200,
        response: {
          userList: [{ firstName: 'Eguono' }, { firstName: 'esther' }],
          message: 'Users found',
          metaData: []
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.GET_USERS_LIST,
        message: null,
        userList: [{ firstName: 'Eguono' }, { firstName: 'esther' }],
        metaData: []
      }];
      store.dispatch(UserActions.getUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(`/api/v1/users?offset=${offset}&limit=${limit}`, {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'error'
        }];
        store.dispatch(UserActions.getUsers()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(`/api/v1/users?offset=${offset}&limit=${limit}`, {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(UserActions.getUsers()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Search all Users', () => {
    it('Should make an AJAX call to search users', (done) => {
      moxios.stubRequest(
        `/api/v1/search/users?q=${searchTerm}&offset=${offset}&limit=${limit}`,
        {
          status: 200,
          response: {
            userList: [{ firstName: 'Eguono' }, { firstName: 'esther' }],
            message: 'Users found',
            metaData: {}
          }
        });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SEARCH_USERS,
        message: null,
        userList: [{ firstName: 'Eguono' }, { firstName: 'esther' }],
        metaData: {}
      }];
      store.dispatch(UserActions.searchUsers('')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(
          `/api/v1/search/users?q=${searchTerm}&offset=${offset}&limit=${limit}`
          , {
            status: 400,
            response: {
              message: 'error'
            }
          });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'error'
        }];
        store.dispatch(UserActions.searchUsers('')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(
          `/api/v1/search/users?q=${searchTerm}&offset=${offset}&limit=${limit}`
          , {
            status: 403,
            response: {
              message: 'error'
            }
          });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(UserActions.searchUsers('e')).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('View User', () => {
    it('Should make an AJAX call to view a users', (done) => {
      moxios.stubRequest(`/api/v1/users/${id}`, {
        status: 200,
        response: {
          user: { firstName: 'Eguono' },
          message: 'User found'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.VIEW_USER,
        message: null,
        user: { firstName: 'Eguono' }
      }];
      store.dispatch(UserActions.viewUser(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(`/api/v1/users/${3000}`, {
          status: 404,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'error'
        }];
        store.dispatch(UserActions.viewUser(3000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(`/api/v1/users/${3000}`, {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(UserActions.viewUser(3000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Delete User', () => {
    it('Should make an AJAX call to view a users', (done) => {
      moxios.stubRequest('/api/v1/users/1', {
        status: 200,
        response: {
          message: 'User has been deleted'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.DELETE_USER,
        message: 'User has been deleted'
      }];
      store.dispatch(UserActions.deleteUser(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/users/300000', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'error'
        }];
        store.dispatch(UserActions.deleteUser(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Update user', () => {
    it('Should make an AJAX call to update a users', (done) => {
      moxios.stubRequest('/api/v1/users/1', {
        status: 200,
        response: {
          updatedUser: { firstName: 'Eguono' },
          message: 'User information has been updated',
          token
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.UPDATE_USER_SUCCESS,
        message: null,
        user: { firstName: 'Eguono' }
      }];
      store.dispatch(
        UserActions.updateUser({ firstName: 'Eguono' }, 1)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
    it(
      'Should make an AJAX call to update a users and fail if firstName exists',
      (done) => {
        moxios.stubRequest('/api/v1/users/1', {
          status: 400,
          response: {
            updatedUser: { firstName: 'Eguono' },
            message: 'Email already exists'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.UPDATE_EMAIL_EXISTS,
          message: 'User Email Already Exists'
        }];
        store.dispatch(
          UserActions.updateUser({ firstName: 'Eguono' }, 1)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/users/300000', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(
          UserActions.updateUser({ firstName: 'eguono' }, 300000)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
        done();
      });
  });
});
