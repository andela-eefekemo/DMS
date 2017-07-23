/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RoleDisplay from '../../../components/role/RoleDisplay';

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
