import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import DocumentDisplay from './DocumentDisplay.jsx';
import DocumentActions from '../../actions/DocumentActions';
import validate from '../../utilities/validate';

const createDocument = DocumentActions.createDocument;

/**
 * @class DocumentContainer
 * @extends {Component}
 */
export class DocumentContainer extends Component {
  /**
   * Creates an instance of DocumentContainer.
   * Binds the functions to the class
   * @param {Object} props -
   * @memberof DocumentContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  /**
  * Validates the DocumentDisplay input fields
  * Makes an action call to create a new document
  * Toasts the error/success message
  * @return {void}
  * @memberof DocumentContainer
  */
  onSubmit() {
    try {
      const { valid } = validate.validateSaveDocument(this.state);
      if (!valid) {
        throw new Error('No field should be left blank');
      }
      this.props.createDocument(this.state)
        .then(() => {
          if (this.props.document.message) {
            return Materialize.toast(
              this.props.document.message, 2000,
              'indigo darken-4 white-text rounded');
          }
          Materialize.toast(
            'Document Created', 2000, 'indigo darken-4 white-text rounded');
          this.props.history.push('/dashboard');
        });
    } catch (err) {
      Materialize.toast(err.message, 3000,
        'indigo darken-4 white-text rounded');
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
  * Get the content of the TinyMCE editor and sets it to the state
  *
  * @param {Object} event -
  * @returns {void}
  */
  getContent(event) {
    this.setState({ content: event.target.getContent() });
  }
  /**
  * Renders the DocumentContainer component
  * @returns {String} The HTML markup for the DocumentContainer
  * @memberof DocumentContainer
  */
  render() {
    return (
      <DocumentDisplay
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        document={this.state}
        getContent={this.getContent} />
    );
  }
}

const mapPropsToState = state => (
  {
    document: state.document
  }
);

DocumentContainer.propTypes = {
  createDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(
  mapPropsToState, { createDocument })(withRouter(DocumentContainer));
