/* global expect test */
import documentReducer from '../../reducers/documentReducer';
import * as actionTypes from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

describe('Document Reducer', () => {
  it('should return document when DOCUMENT_CREATED is passed', () => {
    const document = {
      title: 'The best book',
      content: 'is The Name of the wind'
    };
    const action = {
      type: actionTypes.DOCUMENT_CREATED, document, message: 'Document created'
    };
    const expected = {
      document, documentList: [], message: 'Document created'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return document when DOCUMENT_UPDATED is passed', () => {
    const document = {
      title: 'The best book',
      content: 'is The Name of the wind'
    };
    const action = {
      type: actionTypes.DOCUMENT_UPDATED, document, message: 'Document updated'
    };
    const expected = {
      document, documentList: [document], message: 'Document updated'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return document when VIEW_DOCUMENT is passed', () => {
    const document = {
      title: 'The best book',
      content: 'is The Name of the wind'
    };
    const action = {
      type: actionTypes.VIEW_DOCUMENT, document, message: 'Document found'
    };
    const expected = {
      document, documentList: [], message: 'Document found'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return documentList when USER_DOCUMENTS is passed', () => {
    const documentList = [{
      title: 'The best book',
      content: 'is The Name of the wind'
    }];
    const metaData = {};
    const action = {
      type: actionTypes.USER_DOCUMENTS,
      documentList,
      metaData,
      message: 'Documents found'
    };
    const expected = {
      document: {}, documentList, pagination: metaData, message: 'Documents found'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return documentList when DOCUMENTS_LIST is passed', () => {
    const documentList = [{
      title: 'The best book',
      content: 'is The Name of the wind'
    }];
    const metaData = {};
    const action = {
      type: actionTypes.DOCUMENTS_LIST,
      documentList,
      metaData,
      message: 'Documents found'
    };
    const expected = {
      document: {}, documentList, pagination: metaData, message: 'Documents found'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return documentList when SEARCH_DOCUMENTS is passed', () => {
    const documentList = [{
      title: 'The best book',
      content: 'is The Name of the wind'
    }];
    const metaData = {};
    const action = {
      type: actionTypes.SEARCH_DOCUMENTS,
      documentList,
      metaData,
      message: 'Documents found'
    };
    const expected = {
      document: {}, documentList, pagination: metaData, message: 'Documents found'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return documentList when DELETE_DOCUMENT is passed', () => {
    const action = {
      type: actionTypes.DELETE_DOCUMENT,
      message: 'Document deleted'
    };
    const expected = {
      document: {}, documentList: [], message: 'Document deleted'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return documentList when DOCUMENT_EXISTS is passed', () => {
    const action = {
      type: actionTypes.DOCUMENT_EXISTS,
      message: 'Document already exist'
    };
    const expected = {
      document: {}, documentList: [], message: 'Document already exist'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return documentList when DOCUMENT_ERROR is passed', () => {
    const action = {
      type: actionTypes.DOCUMENT_ERROR,
      message: 'Document error'
    };
    const expected = {
      document: {}, documentList: [], message: 'Document error'
    };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(expected);
  });
  it('should return default when unmatched action type is passed', () => {
    const action = { type: 'EFE', message: null };
    const newState = documentReducer(initialState.document, action);

    expect(newState).toEqual(initialState.document);
  });
});
