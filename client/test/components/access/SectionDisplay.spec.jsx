/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SectionDisplay from '../../../components/access/SectionDisplay';

jest.dontMock('../../../components/access/SectionDisplay');

describe('SectionDisplay Component', () => {
  test('should match the sectiondisplay snapshot', () => {
    const component = shallow(<SectionDisplay />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
