/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthPage from '../../../components/access/AuthPage';

jest.dontMock('../../../components/access/AuthPage');

describe('AuthPage Component', () => {
  test('should match the AuthPage snapshot', () => {
    const match = {
      path: ''
    };
    const component = shallow(<AuthPage match={match} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
