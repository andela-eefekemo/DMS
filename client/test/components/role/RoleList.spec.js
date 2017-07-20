/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RoleList } from '../../../components/role/RoleList';

describe('Role List', () => {
  const props = {
    access: {
      isAuthenticated: true,
      user: {
        id: 1, email: 'efeeguono@gmail.com', roleId: 1
      }
    },
    roleList: [{ title: 'Manny' },
    { title: 'John' }, { title: 'move' }],
    role: { title: 'Eguono', id: 3, description: 'john' },
    viewRole: jest.fn(() => {
      return Promise.resolve();
    }),
    updateRole: jest.fn(() => {
      return Promise.resolve();
    }),
    deleteRole: jest.fn(() => {
      return Promise.resolve();
    }),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<RoleList {...props} />);
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  describe('Container', () => {
    test('should match snapshot of document list', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
    test('onChange function should run when called', () => {
      component.instance().onChange(
        { target: { value: 'eguono', name: 'title' } });
      component.instance().onChange(
        { target: { value: 'efe', name: 'description' } });
      expect(component.state('title')).toEqual('eguono');
      expect(component.state('description')).toEqual('efe');
      const spy = jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onSubmit({
        target: { name: 2 }
      });
      expect(spy).toHaveBeenCalled();
    });
    test('deleteDocument function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'deleteRole');
      component.instance().deleteRole({ target: { value: 3, name: 'title' } });
      expect(spy).toHaveBeenCalled();
    });
    test('componentWillRecieveProps will run if new props are added', () => {
      const spy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
      const roleList = [{ title: 'john' }];
      component.setProps({ roleList });
      expect(spy).toHaveBeenCalled();
    });
  });
});
