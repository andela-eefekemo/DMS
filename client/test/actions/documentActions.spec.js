/* global expect test */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actionType from '../../actions/actionTypes';
import DocumentActions from '../../actions/DocumentActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Document Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const offset = 0;
  const limit = 5;
  const id = 1;
  const searchTerm = 'e';
  describe('Create Documents', () => {
    it('Should make an AJAX call to create document', (done) => {
      moxios.stubRequest('/api/v1/documents', {
        status: 201,
        response: {
          newDocument: { title: 'Eguono' },
          message: 'Document successfully created'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.DOCUMENT_CREATED,
        document: { title: 'Eguono' },
        message: null
      }];
      store.dispatch(DocumentActions.createDocument({
        title: 'Eguono',
        content: 'eguono'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.createDocument({
          title: 'hello@hello.com',
          content: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'error'
        }];
        store.dispatch(DocumentActions.createDocument({
          title: 'hello@hello.com',
          content: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it('Should dispatch the appropraite action type if document does not exist',
      (done) => {
        moxios.stubRequest('/api/v1/documents', {
          status: 400,
          response: {
            message:
            "we're sorry, document title must be unique, please try again"
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_EXISTS,
          message: 'Document title already exists, please rename document'
        }];
        store.dispatch(DocumentActions.createDocument({
          title: 'hello@hello.com',
          content: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('List all Documents', () => {
    it('Should make an AJAX call to list all documents', (done) => {
      moxios.stubRequest(`/api/v1/documents?offset=${offset}&limit=${limit}`, {
        status: 200,
        response: {
          documentList: [{ title: 'Eguono' }, { title: 'esther' }],
          message: 'Documents found',
          metaData: []
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.DOCUMENTS_LIST,
        message: null,
        documentList: [{ title: 'Eguono' }, { title: 'esther' }],
        metaData: []
      }];
      store.dispatch(DocumentActions.getAllDocuments()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(`/api/v1/documents?offset=${offset}&limit=${limit}`, {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.getAllDocuments()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('View Document', () => {
    it('Should make an AJAX call to view a documents', (done) => {
      moxios.stubRequest('/api/v1/documents/1', {
        status: 200,
        response: {
          document: { title: 'Eguono' },
          message: 'Document found'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.VIEW_DOCUMENT,
        message: null,
        document: { title: 'Eguono' }
      }];
      store.dispatch(DocumentActions.viewDocument(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents/300000', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'error'
        }];
        store.dispatch(DocumentActions.viewDocument(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents/300000', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.viewDocument(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Get all users Documents', () => {
    it('Should make an AJAX call to list all documents', (done) => {
      moxios.stubRequest(
        `/api/v1/users/${id}/documents?offset=${offset}&limit=${limit}`, {
          status: 200,
          response: {
            documents: [{ title: 'Eguono' }, { title: 'esther' }],
            message: 'Documents found',
            metaData: []
          }
        });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.USER_DOCUMENTS,
        message: null,
        documentList: [{ title: 'Eguono' }, { title: 'esther' }],
        metaData: []
      }];
      store.dispatch(DocumentActions.getUserDocuments(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(
          `/api/v1/users/${id}/documents?offset=${offset}&limit=${limit}`, {
            status: 403,
            response: {
              message: 'error'
            }
          });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.getUserDocuments(1)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Update Document', () => {
    it('Should make an AJAX call to update a documents', (done) => {
      moxios.stubRequest('/api/v1/documents/1', {
        status: 200,
        response: {
          updatedDocument: { title: 'Eguono' },
          message: 'Document information has been updated'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.DOCUMENT_UPDATED,
        message: null,
        document: { title: 'Eguono' }
      }];
      store.dispatch(
        DocumentActions.updateDocument(1, { title: 'Eguono' })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
    it(
      'Should make an AJAX call to update a documents and fail if title exists',
      (done) => {
        moxios.stubRequest('/api/v1/documents/1', {
          status: 400,
          response: {
            updatedDocument: { title: 'Eguono' },
            message: 'Document already exists'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_EXISTS,
          message: 'Document title already exists, please rename document'
        }];
        store.dispatch(
          DocumentActions.updateDocument(1, { title: 'Eguono' })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents/300000', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.updateDocument(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents/300000', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'error'
        }];
        store.dispatch(DocumentActions.updateDocument(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Search Documents', () => {
    it('Should make an AJAX call to search documents', (done) => {
      moxios.stubRequest(`/api/v1/search/documents?q=${searchTerm}&offset=${offset}&limit=${limit}`, {
        status: 200,
        response: {
          documentList: [{ title: 'Eguono' }, { title: 'esther' }],
          message: 'Documents found',
          metaData: {}
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SEARCH_DOCUMENTS,
        message: null,
        documentList: [{ title: 'Eguono' }, { title: 'esther' }],
        metaData: {}
      }];
      store.dispatch(DocumentActions.searchDocuments('e', 0, 5)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(`/api/v1/search/documents?q=${searchTerm}&offset=${offset}&limit=${limit}`, {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.searchDocuments('e', 0, 5)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest(
          `/api/v1/search/documents?q=${searchTerm}&offset=${offset}&limit=${limit}`, {
            status: 400,
            response: {
              message: 'error'
            }
          });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'error'
        }];
        store.dispatch(DocumentActions.searchDocuments('e', 0, 5)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Delete Document', () => {
    it('Should make an AJAX call to view a documents', (done) => {
      moxios.stubRequest('/api/v1/documents/1', {
        status: 200,
        response: {
          message: 'Document has been deleted',
          documentId: 1
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.DELETE_DOCUMENT,
        message: null,
        documentId: 1
      }];
      store.dispatch(DocumentActions.deleteDocument(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/documents/300000', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.DOCUMENT_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(DocumentActions.deleteDocument(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
});
