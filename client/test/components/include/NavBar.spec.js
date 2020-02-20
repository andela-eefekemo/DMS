/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../../../components/include/NavBar';

configure({ adapter: new Adapter() });

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
