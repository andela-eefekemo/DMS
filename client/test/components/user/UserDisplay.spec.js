/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserDisplay from '../../../components/user/UserDisplay';

jest.dontMock('../../../components/user/UserDisplay');

describe('UserDisplay Component', () => {
  test('should match the user Display snapshot', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const component = shallow(
      <UserDisplay
        firstName={'Efe'}
        lastName={'Eguono'}
        email={'email'}
        onChange={onChange}
        onSubmit={onSubmit} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
