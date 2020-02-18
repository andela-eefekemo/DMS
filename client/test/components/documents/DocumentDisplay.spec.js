/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import DocumentDisplay from '../../../components/documents/DocumentDisplay';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/documents/DocumentDisplay');

describe('DocumentDisplay Component', () => {
  test('should match the document Display snapshot', () => {
    const document = {
      title: '',
      content: '',
      access: ''
    };
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const getContent = jest.fn();
    const component = shallow(
      <DocumentDisplay
        document={document}
        onChange={onChange}
        onSubmit={onSubmit}
        getContent={getContent} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
