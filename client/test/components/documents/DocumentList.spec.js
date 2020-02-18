/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { DocumentList } from '../../../components/documents/DocumentList';

configure({ adapter: new Adapter() });

describe('Document List', () => {
  const props = {
    access: {
      isAuthenticated: true,
      user: {
        id: 1, email: 'efeeguono@gmail.com'
      }
    },
    documentList: [{ title: 'Manny' },
    { title: 'John' }, { title: 'move' }],
    document: { title: 'Eguono', id: 3, content: 'john', access: 'role' },
    getAllDocuments: jest.fn(() => {
      return Promise.resolve();
    }),
    viewDocument: jest.fn(() => {
      return Promise.resolve();
    }),
    updateDocument: jest.fn(() => {
      return Promise.resolve();
    }),
    searchDocuments: jest.fn(() => {
      return Promise.resolve();
    }),
    getUserDocuments: jest.fn(() => {
      return Promise.resolve();
    }),
    deleteDocument: jest.fn(() => {
      return Promise.resolve();
    }),
    history: {
      push: jest.fn()
    },
    match: {
      url: ''
    },
  };
  const component = shallow(<DocumentList {...props} />);
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  describe('Container', () => {
    test('should match snapshot of document list', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
    test('onSearch function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'componentDidMount');
      component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
      component.instance().onSearch(
        { target: { value: 'Manny', name: 'searchTerm' } });
      expect(component.state('searchTerm')).toEqual('Manny');
    });
    test('onChange function should run when called', () => {
      component.instance().onChange(
        { target: { value: 'eguono', name: 'title' } });
      component.instance().onChange(
        { target: { value: 'efe', name: 'content' } });
      component.instance().onChange(
        { target: { value: 'public', name: 'access' } });
      expect(component.state('title')).toEqual('eguono');
      expect(component.state('content')).toEqual('efe');
      expect(component.state('access')).toEqual('public');
      const spy = jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onSubmit();
      expect(spy).toHaveBeenCalled();
    });
    test('deleteDocument function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'deleteDocument');
      component.instance().deleteDocument(
        { target: { value: 3, name: 'title' } });
      expect(spy).toHaveBeenCalled();
    });
    test('componentWillRecieveProps will run if new props are added', () => {
      const spy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
      const documentList = [{ title: 'john' }];
      const pagination = { pageCount: '' };
      component.setProps({ documentList, pagination });
      expect(spy).toHaveBeenCalled();
    });
    test('changeDocument function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'changeDocument');
      const select = component.find('select');
      expect(select.length).toEqual(1);
      component.instance().changeDocument({
        target: { value: 'Personal', name: 'docquery' }
      });
      expect(component.state('docquery')).toEqual('Personal');
      expect(spy).toHaveBeenCalled();
      component.instance().changeDocument({
        target: { value: 'All', name: 'docquery' }
      });
      expect(component.state('docquery')).toEqual('All');
    });
    test('onClick function should run when called', () => {
      const spy = jest.spyOn(component.instance(), 'onClick');
      component.instance().onClick({
        target: { name: 1 }
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});
