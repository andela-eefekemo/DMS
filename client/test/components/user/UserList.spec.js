/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { UserList } from '../../../components/user/UserList';

describe('Document List', () => {
  const props = {
    UserList: [{ email: 'Manny' },
    { email: 'John' }, { email: 'move' }],
    user: {
      firstName: 'Eguono',
      id: 3,
      lastName: 'john',
      email: 'role',
      password: 'hello',
      confirmPassword: 'hello'
    },
    getAllUsers: jest.fn(() => {
      return Promise.resolve();
    }),
    viewUser: jest.fn(() => {
      return Promise.resolve();
    }),
    searchUsers: jest.fn(() => {
      return Promise.resolve();
    }),
    deleteUser: jest.fn(() => {
      return Promise.resolve();
    }),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<UserList {...props} />);
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  describe('Container', () => {
    test('should match snapshot of user list', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
    test('onSearch function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'componentDidMount');
      component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
      component.instance().onSearch(
        { target: { value: 'Manny', name: 'searchTerm' } });
      expect(component.state('searchTerm')).toEqual('Manny');
    });
    test('deleteDocument function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'deleteUser');
      component.instance().deleteUser({ target: { value: 3, name: 'name' } });
      expect(spy).toHaveBeenCalled();
    });
    test('componentWillRecieveProps will run if new props are added', () => {
      const spy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
      const userList = [{ firstName: 'john' }];
      const pagination = { pageCount: '' };
      component.setProps({ userList, pagination });
      expect(spy).toHaveBeenCalled();
    });
    test('changeDocument function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'onClick');
      component.instance().onClick({
        target: { name: 1 }
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});
