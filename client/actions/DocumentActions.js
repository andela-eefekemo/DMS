import axios from 'axios';
import * as actionTypes from './actionTypes';
/**
 * @class DocumentActions
 */
class DocumentActions {
  /**
   * @static
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static getAllDocuments() {
    return (dispatch) => {
      return axios.get('/documents')
        .then((response) => {
          if (response.data.message === 'Documents found') {
            return dispatch({
              type: actionTypes.DOCUMENTS_LIST,
              documentList: response.data.documentList
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
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
      console.log(documentContent);
      return axios.post('/documents', documentContent)
        .then((response) => {
          if (response.data.message ===
              "we're sorry, document title must be unique, please try again") {
            return dispatch({
              type: actionTypes.DOCUMENT_EXISTS,
              message: 'Document title already exists, please rename document'
            });
          }
          if (response.data.message === 'Document successfully created') {
            return dispatch({
              type: actionTypes.DOCUMENT_CREATED,
              document: response.data.newDocument
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error, please try again'
          });
        }).catch((error) => {
          console.log(error);
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
      return axios.get(`/documents/${id}`)
        .then((response) => {
          if (response.data.message === 'Document found') {
            return dispatch({
              type: actionTypes.VIEW_DOCUMENT,
              document: response.data.document
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error, please try again'
          });
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
   * @returns {promise} -
   * @memberof UserActions
   */
  static getUserDocuments(id) {
    return (dispatch) => {
      return axios.get(`/users/${id}/documents`)
        .then((response) => {
          if (response.data.message === 'Documents found') {
            return dispatch({
              type: actionTypes.USER_DOCUMENTS,
              documentList: response.data.documnents
            });
          }
          return dispatch({
            type: actionTypes.ERROR,
            message: 'There was an error, please try again'
          });
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
      return axios.put(`/documents/${id}`, documentContent)
        .then((response) => {
          if (
            response.data.message === 'Document already exists') {
            return dispatch({
              type: actionTypes.DOCUMENT_EXISTS,
              message: 'Document title already exists, please rename document'
            });
          }
          if (response.data.message ===
              'Document information has been updated') {
            return dispatch({
              type: actionTypes.DOCUMENT_UPDATED,
              document: response.data.updatedDocument
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error, please try again'
          });
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
   * @param {any} searchTerm -
   * @param {any} offset -
   * @param {any} limit -
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static searchDocuments(searchTerm, offset, limit) {
    return (dispatch) => {
      return axios.get(
        `/documents?q=${searchTerm}&offset=${offset}&limit=${limit}`)
        .then((response) => {
          if (response.data.message === 'Documents found') {
            return dispatch({
              type: actionTypes.SEARCH_DOCUMENTS,
              documentList: response.data.documentList
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error, please try again'
          });
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
   * @returns {promise} -
   * @memberof DocumentActions
   */
  static deleteDocument(id) {
    return (dispatch) => {
      return axios.delete(`/documents/${id}`)
        .then((response) => {
          if (response.data.message === 'Document has been deleted') {
            return dispatch({
              type: actionTypes.DELETE_DOCUMENT,
              message: 'Document has been deleted'
            });
          }
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error, please try again'
          });
        }).catch(() => {
          return dispatch({
            type: actionTypes.DOCUMENT_ERROR,
            message: 'There was an error please try again'
          });
        });
    };
  }
}

export default DocumentActions;
