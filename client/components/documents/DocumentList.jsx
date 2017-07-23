import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import DocumentActions from '../../actions/DocumentActions';
import DocumentCard from './DocumentCard';
import DocumentView from './DocumentView';
import Dropdown from '../common/Dropdown';

const getAllDocuments = DocumentActions.getAllDocuments;
const viewDocument = DocumentActions.viewDocument;
const updateDocument = DocumentActions.updateDocument;
const deleteDocument = DocumentActions.deleteDocument;
const searchDocuments = DocumentActions.searchDocuments;
const getUserDocuments = DocumentActions.getUserDocuments;

/**
 * @class DocumentList
 * @extends {Component}
 */
export class DocumentList extends Component {
  /**
   * Creates an instance of DocumentList.
   * Binds class methods
   * @param {Object} props
   * @memberof DocumentList
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      document: {},
      offset: 0,
      pageCount: 0,
      searchTerm: '',
      docquery: '',
      personal: false
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.changeDocument = this.changeDocument.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  /**
   * Makes action call to retrieve list of documents
   *
   * @return {void}
   * @memberof DocumentList
   */
  componentDidMount() {
    this.updateDocumentList();
  }
  /**
   * Update the state if the props are changed
   *
   * @return {void}
   * @param {Object} nextProps
   * @memberof DocumentList
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documentList,
      pageCount: nextProps.pagination.pageCount,
      count: nextProps.pagination.count
    });
  }
  /**
  * Makes an action call to get personal/all documents
  * Sets document list to the state
  *
  * @return {void}
  * @param {Object} event
  * @memberof DocumentList
  */
  changeDocument(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
    if (value === 'Personal') {
      this.props.getUserDocuments(this.props.access.user.id)
        .then(() => {
          this.setState({
            documents: this.props.documentList,
            personal: true
          });
        });
    }
    if (value === 'All') {
      this.updateDocumentList();
      this.setState({
        personal: false
      });
    }
  }
  /**
  * Sets the event value to the state
  * @return {void}
  * @param {Object} event The event of the HTML component
  * @memberof DocumentContainer
  */
  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }
  /**
  * Makes an action call to view a document
  * Toasts the error/success message
  * Sets document to the state
  *
  * @param {Object} event
  * @return {void}
  * @memberof DocumentList
  */
  onClick(event) {
    this.props.viewDocument(event.target.name).then(() => {
      if (this.props.document.message) {
        return Materialize.toast(
          this.props.document.message, 2000,
          'indigo darken-4 white-text rounded');
      }
      this.setState({
        title: this.props.document.title,
        content: this.props.document.content,
        access: this.props.document.access
      });
      this.props.history.push(`${this.props.match.url}/view-document`);
    });
  }

  /**
   * Sets the searchterm to the state
   * Makes an action call to the search for a document
   * @param {Object} event
   * @return {void}
   * @memberof DocumentList
   */
  onSearch(event) {
    this.setState({
      searchTerm: event.target.value
    });
    this.props.searchDocuments(event.target.value)
      .then(() => {
      });
  }

  /**
   * Makes an action call to get all documents
   * Sets list of documents to the state
   *
   * @return {void}
   * @memberof DocumentList
   */
  updateDocumentList() {
    this.props.getAllDocuments()
      .then(() => {
        this.setState({
          documents: this.props.documentList,
          count: this.props.pagination.count
        });
      });
  }
  /**
  * Get the content of the TinyMCE editor and sets it to the state
  *
  * @param {Object} event
  * @returns {void} nothing
  */
  getContent(event) {
    this.setState({ content: event.target.getContent() });
  }
  /**
  * Makes an action call to delete a document
  * Toasts the error/success message
  *
  * @return {void}
  * @param {Object} event
  * @memberof DocumentList
  */
  deleteDocument(event) {
    this.props.deleteDocument(event.target.name).then(() => {
      Materialize.toast(
        this.props.document.message, 2000,
        'indigo darken-4 white-text rounded');
      this.updateDocumentList();
      this.props.history.push(`${this.props.match.url}`);
    });
  }

  /**
  * Pagination for the list of documents
  *
  * @return {void}
  * @param {Object} data
  * @memberof DocumentList
  */
  handlePageClick(data) {
    const selected = data.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    if (this.state.personal) {
      this.props.getUserDocuments(
        this.props.access.user.id, offset, limit).then(() => {
          this.setState({
            documents: this.props.documentList,
            pageCount: this.props.pagination.pageCount,
            count: this.props.pagination.count
          });
        });
    } else {
      this.props.getAllDocuments(offset, limit).then(() => {
        this.setState({
          documents: this.props.documentList,
          pageCount: this.props.pagination.pageCount,
          count: this.props.pagination.count
        });
      });
    }
  }
  /**
  * Makes an action call to update a document
  * Toasts error/success message
  * Sets updated document to state
  *
  * @return {void}
  * @memberof DocumentList
  */
  onSubmit() {
    const updatedDocument = {
      title: this.state.title,
      content: this.state.content,
      access: this.state.access
    };
    this.props.updateDocument(this.props.document.id, updatedDocument)
      .then(() => {
        if (this.props.message) {
          return Materialize.toast(
            this.props.message, 2000,
            'indigo darken-4 white-text rounded');
        }
        Materialize.toast(
          'Document has been updated',
          2000, 'indigo darken-4 white-text rounded'
        );
        this.props.history.push('/dashboard');
        this.setState({
          title: this.props.document.title,
          content: this.props.document.content,
          access: this.props.document.access
        });
        this.updateDocumentList();
      });
  }

  /**
  * Renders the Document List component
  *
  * @returns {String} HTML markup for the DocumentList
  * @memberof DocumentList
  */
  render() {
    return (
      <div className="document-list">
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <div className="col l5 m5 s12">
                <input
                  className="search"
                  type="text"
                  name="searchTerm"
                  id="documentSearch"
                  placeholder="Search.."
                  onChange={this.onSearch} />
              </div>
              <div className="col l6 m6 s12 center">
                <select
                  name="docquery"
                  className="browser-default input-field select"
                  onChange={this.changeDocument}>
                  <Dropdown value="All" text="All Documents" />
                  <Dropdown value="Personal" text="Personal" />
                </select>
              </div>
            </div>
            <div className="document-list-view">
              <div className="col l5 m5 s12">
                <div className=" card-panel hoverable">
                  {(this.state.docquery === 'All' || this.state.docquery === '')
                    && <h5>All Documents</h5>}
                  {(this.state.docquery === 'Personal')
                    && <h5>Personal Documents</h5>}
                  <div className="scrollable">
                    {this.state.documents.map(document => (
                      <DocumentCard
                        key={document.id} {...document}
                        onClick={this.onClick} match={this.props.match}
                      />
                    ))}
                    {(this.state.count > 5) && <ReactPaginate
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={<a href="">...</a>}
                      breakClassName={'break-me'}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={1}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />}
                  </div>
                </div>
              </div>
            </div>
            <div className="col l6 m6 s12 text-scrollable">
              <Switch>
                <Route
                  path={`${this.props.match.url}/view-document`} render={() => {
                    if (!this.props.document.id) {
                      this.props.history.push(`${this.props.match.url}`);
                    }
                    return (
                      <DocumentView
                        id={this.props.document.id}
                        authorId={this.props.document.authorId}
                        title={this.state.title}
                        content={this.state.content}
                        access={this.state.access}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        getContent={this.getContent}
                        deleteDocument={this.deleteDocument}
                        userId={this.props.access.user.id} />);
                  }} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentList.propTypes = {
  access: PropTypes.object,
  document: PropTypes.object,
  documentList: PropTypes.array,
  getAllDocuments: PropTypes.func,
  getUserDocuments: PropTypes.func,
  viewDocument: PropTypes.func,
  match: PropTypes.object,
  searchDocuments: PropTypes.func,
  deleteDocument: PropTypes.func,
  updateDocument: PropTypes.func,
  pagination: PropTypes.object,
  message: PropTypes.string,
  history: PropTypes.object
};

const mapPropsToState = (state) => {
  return {
    documentList: state.document.documentList,
    document: state.document.document,
    message: state.document.message,
    pagination: state.document.pagination,
    access: state.access
  };
};

export default connect(
  mapPropsToState, {
    getAllDocuments,
    viewDocument,
    updateDocument,
    deleteDocument,
    searchDocuments,
    getUserDocuments
  })(withRouter(DocumentList));
