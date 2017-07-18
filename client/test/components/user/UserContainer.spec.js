/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
  UserContainer
} from '../../../components/user/UserContainer';

global.$ = () => ({
  modal: () => null
});
describe('User Container', () => {
  const props = {
    user: {
      firstName: 'Eguono', lastName: 'Efe', email: 'john@gmail.com', id: 1
    },
    updateUser: jest.fn(() => {
      return Promise.resolve();
    }),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<UserContainer {...props} />);
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  describe('Container', () => {
    test('should match snapshot of document Container', () => {
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
      component.instance().onSubmit();
      expect(spy).toHaveBeenCalled();
    });
    test('componentDidMount function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'componentDidMount');
      component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });
  });
});