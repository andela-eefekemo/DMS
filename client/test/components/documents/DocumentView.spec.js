/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import DocumentView from '../../../components/documents/DocumentView';

configure({ adapter: new Adapter() });

jest.dontMock('../../../components/documents/DocumentView');

describe('DocumentView Component', () => {
  test('should match the document view snapshot', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const deleteDocument = jest.fn();
    const component = shallow(
      <DocumentView
        title={'Book'}
        id={3}
        content={'Awesome'}
        access={'public'}
        onChange={onChange}
        onSubmit={onSubmit}
        deleteDocument={deleteDocument}
        userId={3}
        authorId={3} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
