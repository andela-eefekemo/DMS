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
   * @param {any} props -
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
   * @return {void}
   * @memberof DocumentList
   */
  componentDidMount() {
    this.updateDocumentList();
  }
  /**
   * @return {void}
   * @param {any} nextProps -
   * @memberof DocumentList
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documentList,
      pageCount: nextProps.pagination.pageCount
    });
  }
  /**
   * @return {void}
   * @param {any} e -
   * @memberof DocumentList
   */
  changeDocument(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
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
   * @return {void}
   * @param {any} e -
   * @memberof DocumentContainer
   */
  onChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }
  /**
   * @param {any} e -
   * @return {void}
   * @memberof DocumentList
   */
  onClick(e) {
    this.props.viewDocument(e.target.name).then(() => {
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
      this.props.history.push(`${this.props.match.url}/viewDocument`);
    });
  }

  /**
   * @param {event} e
   * @return {void}
   * @memberof DocumentList
   */
  onSearch(e) {
    this.setState({
      searchTerm: e.target.value
    });
    this.props.searchDocuments(e.target.value)
      .then(() => {
      });
  }

  /**
   * @return {void}
   * @memberof DocumentList
   */
  updateDocumentList() {
    this.props.getAllDocuments()
      .then(() => {
        this.setState({
          documents: this.props.documentList
        });
      });
  }
  /**
  * Get the content of the TinyMCE editor
  *
  * @param {Object} event
  * @returns {void} nothing
  */
  getContent(event) {
    this.setState({ content: event.target.getContent() });
  }
  /**
   * @return {void}
   * @param {any} e -
   * @memberof DocumentList
   */
  deleteDocument(e) {
    this.props.deleteDocument(e.target.name).then(() => {
      Materialize.toast(
        this.props.document.message, 2000,
        'indigo darken-4 white-text rounded');
      this.updateDocumentList();
      this.props.history.push(`${this.props.match.url}`);
    });
  }

  /**
   * @return {void}
   * @param {any} data -
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
            pageCount: this.props.pagination.pageCount
          });
        });
    } else {
      this.props.getAllDocuments(offset, limit).then(() => {
        this.setState({
          documents: this.props.documentList,
          pageCount: this.props.pagination.pageCount
        });
      });
    }
  }
  /**
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
   * @returns {jsx} -
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
                    <ReactPaginate
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col l6 m6 s12">
              <Switch>
                <Route
                  path={`${this.props.match.url}/viewDocument`} render={() => {
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
