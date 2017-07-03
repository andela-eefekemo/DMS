import * as actionTypes from '../actions/actionTypes';

const documentReducer = (state = { documentList: [] }, action) => {
  let newState;
  switch (action) {
    case actionTypes.VIEW_DOCUMENT:
    case actionTypes.DOCUMENT_CREATED:
      newState = [
        Object.assign({}, action.document), ...state
      ];
      return newState;
    case actionTypes.DOCUMENT_UPDATED:
      return [Object.assign({}, action.document), ...state];
    case actionTypes.USER_DOCUMENTS:
    case actionTypes.DOCUMENTS_LIST:
    case actionTypes.SEARCH_DOCUMENTS:
      return Object.assign({}, state, { documentList: action.documentList });
    case actionTypes.DELETE_USER:
      return Object.assign({}, state, { document: {} });
    case actionTypes.DOCUMENT_ERROR:
    case actionTypes.DOCUMENT_EXISTS:
      return {
        message: action.message
      };
    default:
      return state;
  }
};

export default documentReducer;
