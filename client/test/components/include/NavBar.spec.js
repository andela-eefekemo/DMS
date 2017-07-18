/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from '../../../components/include/NavBar';

jest.dontMock('../../../components/include/NavBar');

describe('NavBar Component', () => {
  test('should match the navbar snapshot', () => {
    const match = {
      url: '/'
    };
    const onClick = jest.fn();
    const component = shallow(<NavBar match={match} onClick={onClick} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
