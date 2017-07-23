/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserView from '../../../components/user/UserView';

jest.dontMock('../../../components/user/UserView');

describe('UserView Component', () => {
  test('should match the user view snapshot', () => {
    const deleteUser = jest.fn();
    const component = shallow(
      <UserView
        id={3}
        firstName={'Eguono'}
        lastName={'Efe'}
        email={'efe@gmail.com'}
        deleteUser={deleteUser} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
