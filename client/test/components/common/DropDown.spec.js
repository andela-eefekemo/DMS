/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DropDown from '../../../components/common/DropDown';

jest.dontMock('../../../components/common/DropDown');

describe('DropDown Component', () => {
  test('should match the dropdown snapshot', () => {
    const component = shallow(
      <DropDown selected={'active'} value={'Hi'} text={'Hi'} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
