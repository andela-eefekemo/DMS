/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import SectionDisplay from '../../../components/access/SectionDisplay';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/access/SectionDisplay');

describe('SectionDisplay Component', () => {
  test('should match the sectiondisplay snapshot', () => {
    const component = shallow(<SectionDisplay />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
