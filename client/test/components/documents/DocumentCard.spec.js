/* global expect jest test */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DocumentCard from '../../../components/documents/DocumentCard';

jest.dontMock('../../../components/documents/DocumentCard');

describe('DocumentCard Component', () => {
  test('should match the document card snapshot', () => {
    const onClick = jest.fn();
    const User = {
      firstName: '',
      lastName: ''
    };
    const component = shallow(
      <DocumentCard
        title={'Book'}
        id={3}
        access={'public'}
        updatedAt={'today'}
        onClick={onClick}
        User={User} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
