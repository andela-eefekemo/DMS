/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import RoleDisplay from '../../../components/role/RoleDisplay';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/role/RoleDisplay');

describe('RoleDisplay Component', () => {
  test('should match the role Display snapshot', () => {
    const role = {
      title: '',
      description: ''
    };
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const component = shallow(
      <RoleDisplay
        role={role}
        onChange={onChange}
        onSubmit={onSubmit} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
