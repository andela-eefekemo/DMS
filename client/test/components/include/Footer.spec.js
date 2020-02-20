/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../../components/include/Footer';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/include/Footer');

describe('Footer Component', () => {
  test('should match the footer snapshot', () => {
    const component = shallow(<Footer />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
