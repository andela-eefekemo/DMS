/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import InputField from '../../../components/common/InputField';

jest.dontMock('../../../components/common/InputField');

describe('InputField Component', () => {
  test('should match the inputfield snapshot', () => {
    const onChange = jest.fn();
    const component = shallow(
      <InputField
        onChange={onChange}
        className={'awesome'}
        name={'input'}
        value={'efe'}
        placeholder={'inputfield'}
        type={'text'}
        label={'input'} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
