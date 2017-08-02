import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';

import InputField from '../common/InputField.jsx';
import Dropdown from '../common/Dropdown.jsx';
/**
 * Document Display component for creating a document
 *
 * @param {Object} props { onChange, onSubmit, document, getContent }
 * @returns {String} HTML markup for the Document Display
 */
const DocumentDisplay = ({ onChange, onSubmit, document, getContent }) => (
  <div className="document-form">
    <div className="center hover">
      <h5>Create Document</h5>
      <InputField
        name="title"
        value={document.title}
        placeholder="Document Title"
        className="validate div-design"
        type="text" onChange={onChange} />
      <select
        name="access"
        className="browser-default input-field select" onChange={onChange}>
        <Dropdown value="" text="Select access type" />
        <Dropdown value="public" text="Public" />
        <Dropdown value="private" text="Private" />
        <Dropdown value="role" text="Role" />
      </select>
      <TinyMCE
        content={document.content}
        config={{
          plugins: 'link image code',
          height: 200,
          toolbar:
          'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onChange={getContent}
      />
      <div className="input-field center">
        <button
          className="waves-effect btn button-design" onClick={onSubmit}
          id="save-document">
          Create
          </button>
      </div>
    </div>
  </div>
);

DocumentDisplay.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

export default DocumentDisplay;
