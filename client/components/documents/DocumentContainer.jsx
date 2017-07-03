import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DocumentDisplay from './DocumentDisplay';
import DocumentActions from '../../actions/DocumentActions';
import validate from '../../utilities/validate';

const createDocument = DocumentActions.createDocument;

/**
 * @class DocumentContainer
 * @extends {Component}
 */
class DocumentContainer extends Component {
  /**
   * Creates an instance of DocumentContainer.
   * @param {any} props -
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
  }

  /**
   * @return {void}
   * @param {any} e -
   * @memberof DocumentContainer
   */
  onSubmit(e) {
    e.preventDefault();
    try {
      if (!validate(this.state)) {
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
            'Success!', 2000, 'indigo darken-4 white-text rounded');
          this.context.router.history.push('/dashboard');
        });
    } catch (err) {
      Materialize.toast(err.message, 3000,
        'indigo darken-4 white-text rounded');
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
   * @returns {jsx} -
   * @memberof DocumentContainer
   */
  render() {
    return (
      <DocumentDisplay
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        document={this.state} />
    );
  }
}

const mapPropsToState = (state) => {
  return {
    document: state.document
  };
};

DocumentContainer.propTypes = {
  createDocument: PropTypes.func.isRequired
};

export default connect(mapPropsToState, { createDocument })(DocumentContainer);
