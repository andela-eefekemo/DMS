/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import SideBar from '../../../components/include/SideBar';

configure({ adapter: new Adapter() });

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
