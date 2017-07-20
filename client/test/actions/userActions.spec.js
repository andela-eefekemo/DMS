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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImZpcnN0TmFtZSI6ImhlbGxvIiwibGFzdE5hbWUiOiJoZWxsbyIsImVtYWlsIjoiaGVsbG9AaGVsbG8uY29tIiwicm9sZUlkIjoyLCJpYXQiOjE0OTk0OTE5NTAsImV4cCI6MTUwMDA5Njc1MH0.5UsgY1xeV05dVCrXDLe-yPB8KmfVcB9_8YOu-SXpCy8';

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('List all Users', () => {
    it('Should make an AJAX call to list all users', (done) => {
      moxios.stubRequest('/users', {
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
        expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
        expect(store.getActions()[0].message).toEqual(null);
        expect(
          store.getActions()[0].userList).toEqual(expectedAction[0].userList);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/users', {
          status: 400,
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
          expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
          expect(
            store.getActions()[0].message).toEqual(expectedAction[0].message);
        });
        done();
      });
  });
  describe('Search all Users', () => {
    it('Should make an AJAX call to search users', (done) => {
      moxios.stubRequest('/search/users?q=e&offset=0&limit=20', {
        status: 200,
        response: {
          userList: [{ firstName: 'Eguono' }, { firstName: 'esther' }],
          message: 'Users found',
          metaData: []
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SEARCH_USERS,
        message: null,
        userList: [{ firstName: 'Eguono' }, { firstName: 'esther' }],
        metaData: []
      }];
      store.dispatch(UserActions.searchUsers('e')).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
        expect(store.getActions()[0].message).toEqual(null);
        expect(
          store.getActions()[0].userList).toEqual(expectedAction[0].userList);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/search/users?q=e&offset=0&limit=20', {
          status: 400,
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
          expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
          expect(
            store.getActions()[0].message).toEqual(expectedAction[0].message);
        });
        done();
      });
  });
  describe('View User', () => {
    it('Should make an AJAX call to view a users', (done) => {
      moxios.stubRequest('/users/1', {
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
        expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
        expect(store.getActions()[0].message).toEqual(null);
        expect(store.getActions()[0].user).toEqual(expectedAction[0].user);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/users/300000', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(UserActions.viewUser(300000)).then(() => {
          expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
          expect(
            store.getActions()[0].message).toEqual(expectedAction[0].message);
        });
        done();
      });
  });
  describe('Delete User', () => {
    it('Should make an AJAX call to view a users', (done) => {
      moxios.stubRequest('/users/1', {
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
        expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
        expect(
          store.getActions()[0].message).toEqual(expectedAction[0].message);
        expect(store.getActions()[0].user).toEqual(expectedAction[0].user);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/users/300000', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(UserActions.deleteUser(300000)).then(() => {
          expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
          expect(
            store.getActions()[0].message).toEqual(expectedAction[0].message);
        });
        done();
      });
  });
  describe('Update user', () => {
    it('Should make an AJAX call to update a users', (done) => {
      moxios.stubRequest('/users/1', {
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
          expect(
            store.getActions()[0].type).toEqual(expectedAction[0].type);
          expect(store.getActions()[0].message).toEqual(null);
          expect(store.getActions()[0].user).toEqual(expectedAction[0].user);
        });
      done();
    });
    it(
      'Should make an AJAX call to update a users and fail if firstName exists',
      (done) => {
        moxios.stubRequest('/users/1', {
          status: 200,
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
            expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
            expect(
              store.getActions()[0].message).toEqual(expectedAction[0].message);
          });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/users/300000', {
          status: 400,
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
            expect(store.getActions()[0].type).toEqual(expectedAction[0].type);
            expect(
              store.getActions()[0].message).toEqual(expectedAction[0].message);
          });
        done();
      });
  });
});
