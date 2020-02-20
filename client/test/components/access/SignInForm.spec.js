/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import SignInForm from '../../../components/access/SignInForm';

configure({ adapter: new Adapter() });

describe('SignInForm Component', () => {
  const logInUser = jest.fn();
  const component = shallow(<SignInForm logInUser={logInUser} />);
  test('should match the SignInForm snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(2);
    expect(tree).toMatchSnapshot();
  });
});
