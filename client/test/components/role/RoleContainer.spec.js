/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
  RoleContainer
} from '../../../components/role/RoleContainer';

describe('Role Container', () => {
  const props = {
    role: { title: 'Eguono', id: 3, content: 'john', access: 'role' },
    createRole: jest.fn(() => {
      return Promise.resolve();
    }),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<RoleContainer {...props} />);
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
  });
});
