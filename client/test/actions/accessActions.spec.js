/* global expect test */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actionType from '../../actions/actionTypes';
import AccessAction from '../../actions/AccessActions';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token =
  'token';

describe('Access Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Sign In User', () => {
    it('Should make an AJAX call to sign in users', (done) => {
      moxios.stubRequest('/api/v1/users/login', {
        status: 200,
        response: {
          token,
          userData: { firstName: 'Eguono' },
          message: 'login successful'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SIGN_IN_USER,
        user: { firstName: 'Eguono' },
        message: null
      }];
      store.dispatch(AccessAction.signInUser({
        email: 'hello@hello.com',
        password: 'eguono'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/users/login', {
          status: 400,
          response: {
            message: 'login failed'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ACCESS_ERROR,
          message: 'login failed'
        }];
        store.dispatch(AccessAction.signInUser({
          email: 'hello@hello.com',
          password: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('Should dispatch the appropraite action type if user does not exist',
      (done) => {
        moxios.stubRequest('/api/v1/users/login', {
          status: 400,
          response: {
            message: 'User does not exist'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.USER_DOES_NOT_EXIST,
          message: 'User does not exist'
        }];
        store.dispatch(AccessAction.signInUser({
          email: 'hello@hello.com',
          password: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Sign Up User', () => {
    it('Should make an AJAX call to sign up users', (done) => {
      moxios.stubRequest('/api/v1/users', {
        status: 201,
        response: {
          token,
          userData: { firstName: 'Eguono' },
          message: 'Signup successful'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SIGN_UP_USER,
        user: { firstName: 'Eguono' },
        message: null
      }];
      store.dispatch(AccessAction.signUpUser({
        email: 'hello@hello.com',
        password: 'eguono'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/users', {
          status: 400,
          response: {
            message: 'signup failed'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ACCESS_ERROR,
          message: 'signup failed'
        }];
        store.dispatch(AccessAction.signUpUser({
          email: 'hello@hello.com',
          password: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('Should dispatch the appropraite action type if email already exists',
      (done) => {
        moxios.stubRequest('/api/v1/users', {
          status: 400,
          response: {
            message: 'Email already exists'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.USER_ALREADY_EXISTS,
          message: 'Email already exists'
        }];
        store.dispatch(AccessAction.signUpUser({
          email: 'hello@hello.com',
          password: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Sign Out User', () => {
    it('Should make an AJAX call to sign out users', (done) => {
      moxios.stubRequest('/api/v1/users/logout', {
        status: 200,
        response: {
          message: 'Signout successful'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SIGN_OUT_USER,
        message: 'Signout successful'
      }];
      store.dispatch(AccessAction.signOutUser()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/users', {
          status: 400,
          response: {
            message: 'signup failed'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ACCESS_ERROR,
          message: 'There was an error, please try again'
        }];
        store.dispatch(AccessAction.signOutUser()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
});
