/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import {
  Header
} from '../../../components/include/Header';

configure({ adapter: new Adapter() });

global.$ = () => ({
  sideNav: () => null
});
describe('Header Container', () => {
  const props = {
    user: {
      firstName: 'Eguono', lastName: 'Efe', email: 'john@gmail.com', id: 1
    },
    signOutUser: jest.fn(() => {
      return Promise.resolve();
    }),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<Header {...props} />);
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  describe('Container', () => {
    test('should match snapshot of document Container', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
    test('componentDidMount function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'componentDidMount');
      component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });
    test('componentDidMount function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'logout');
      component.instance().logout();
      expect(spy).toHaveBeenCalled();
    });
  });
});
