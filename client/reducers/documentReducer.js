import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const documentReducer =
  (state = initialState.document, action) => {
    switch (action.type) {
      case actionTypes.VIEW_DOCUMENT:
      case actionTypes.DOCUMENT_CREATED:
      case actionTypes.DOCUMENT_UPDATED:
        return { ...state, document: action.document, message: action.message };
      case actionTypes.USER_DOCUMENTS:
      case actionTypes.DOCUMENTS_LIST:
      case actionTypes.SEARCH_DOCUMENTS:
        return {
          ...state,
          documentList: action.documentList,
          pagination: action.metaData,
          message: action.message
        };
      case actionTypes.DELETE_DOCUMENT:
        return {
          ...state,
          message: action.message
        };
      case actionTypes.DOCUMENT_ERROR:
      case actionTypes.DOCUMENT_EXISTS:
        return {
          ...state,
          message: action.message
        };
      default:
        return state;
    }
  };

export default documentReducer;
