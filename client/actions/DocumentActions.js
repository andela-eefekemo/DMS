import axios from 'axios';
import * as actionTypes from './actionTypes';
/**
 * @class DocumentActions
 */
class DocumentActions {
  /**
   * @static
   * @param {number} [offset=0]
   * @param {number} [limit=5]
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static getAllDocuments(offset = 0, limit = 5) {
    return (dispatch) => {
      return axios.get(`/api/v1/documents?offset=${offset}&limit=${limit}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.DOCUMENTS_LIST,
              documentList: response.data.documentList,
              message: null,
              metaData: response.data.metaData
            });
          }
        }).catch(() => {
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} documentContent -
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static createDocument(documentContent) {
    return (dispatch) => {
      return axios.post('/api/v1/documents', documentContent)
        .then((response) => {
          if (response.status === 201) {
            return dispatch({
              type: actionTypes.DOCUMENT_CREATED,
              message: null,
              document: response.data.newDocument
            });
          }
        }).catch(({ response }) => {
          if (response.data.message ===
            "we're sorry, document title must be unique, please try again") {
            return dispatch({
              type: actionTypes.DOCUMENT_EXISTS,
              message: 'Document title already exists, please rename document'
            });
          }
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.DOCUMENT_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} id -
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static viewDocument(id) {
    return (dispatch) => {
      return axios.get(`/api/v1/documents/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.VIEW_DOCUMENT,
              message: null,
              document: response.data.document
            });
          }
        }).catch(({ response }) => {
          if (response.status === (400 || 401 || 404)) {
            return dispatch({
              type: actionTypes.DOCUMENT_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
 * @static
 * @param {any} id -
 * @returns {promise} -
 * @memberof UserActions
 */
  static getUserDocuments(id, offset = 0, limit = 5) {
    return (dispatch) => {
      return axios.get(`/api/v1/users/${id}/documents?offset=${offset}&limit=${limit}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.USER_DOCUMENTS,
              documentList: response.data.documents,
              metaData: response.data.metaData,
              message: null
            });
          }
        }).catch(() => {
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
  /**
   * @static
   * @param {any} id -
   * @param {any} documentContent -
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static updateDocument(id, documentContent) {
    return (dispatch) => {
      return axios.put(`/api/v1/documents/${id}`, documentContent)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.DOCUMENT_UPDATED,
              message: null,
              document: response.data.updatedDocument
            });
          }
        }).catch(({ response }) => {
          if (
            response.data.message === 'Document already exists') {
            return dispatch({
              type: actionTypes.DOCUMENT_EXISTS,
              message: 'Document title already exists, please rename document'
            });
          }
          if (response.status === (400 || 401 || 404)) {
            return dispatch({
              type: actionTypes.DOCUMENT_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }

  /**
   * @static
   * @param {any} searchTerm -
   * @param {any} offset -
   * @param {any} limit -
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static searchDocuments(searchTerm, offset = 0, limit = 5) {
    return (dispatch) => {
      return axios.get(
        `/api/v1/search/documents?q=${searchTerm}&offset=${offset}&limit=${limit}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.SEARCH_DOCUMENTS,
              documentList: response.data.documentList,
              message: null,
              metaData: response.data.metaData
            });
          }
        }).catch(({ response }) => {
          if (response.status === 400) {
            return dispatch({
              type: actionTypes.DOCUMENT_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
  /**
   * @static
   * @param {any} id -
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static deleteDocument(id) {
    return (dispatch) => {
      return axios.delete(`/api/v1/documents/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return dispatch({
              type: actionTypes.DELETE_DOCUMENT,
              message: null,
              documentId: id
            });
          }
        }).catch(({ response }) => {
          if (response.status === 401) {
            return dispatch({
              type: actionTypes.DOCUMENT_ERROR,
              message: response.data.message
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
}

export default DocumentActions;
