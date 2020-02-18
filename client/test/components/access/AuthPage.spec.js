/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { AuthPage } from '../../../components/access/AuthPage';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/access/AuthPage');

describe('AuthPage Component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    match: {
      path: ''
    },
    access: {
      isAuthenticated: false
    },
    history: {
      push: spy
    },
    signInUser: jest.fn(() => Promise.resolve())
  };
  const component = shallow(<AuthPage {...props} />);
  test('should match the AuthPage snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
