import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';

import InputField from '../common/InputField';
import Dropdown from '../common/Dropdown';

const DocumentDisplay = ({ onChange, onSubmit, document, getContent }) => {
  return (
    <div className="center document-div hover">
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
        <button className="waves-effect btn button-design" onClick={onSubmit}>
          Create
          </button>
      </div>
    </div>
  );
};

DocumentDisplay.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

export default DocumentDisplay;
