/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SideBar from '../../../components/include/SideBar';

jest.dontMock('../../../components/include/SideBar');

describe('SideBar Component', () => {
  test('should match the sidebar snapshot', () => {
    const match = {
      url: '/'
    };
    const user = {
      roleId: 1
    };
    const component = shallow(<SideBar match={match} user={user} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
