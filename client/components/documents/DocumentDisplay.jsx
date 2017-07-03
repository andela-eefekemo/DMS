import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../common/InputField';
import Dropdown from '../common/Dropdown';

const DocumentDisplay = ({ onChange, onSubmit, document }) => {
  return (
    <div>
      <form onSubmit={onSubmit} >
        <h5>Create Document</h5>
        <InputField
          name="title"
          value={document.title}
          placeholder="Document Title"
          className="validate form-design"
          type="text" onChange={onChange} />
        <InputField
          name="content"
          value={document.content}
          placeholder="Document Content"
          className="validate form-design"
          type="text" onChange={onChange} />
        <select
          name="access"
          className="browser-default input-field select" onChange={onChange}>
          <Dropdown value="" text="Select access type" />
          <Dropdown value="public" text="Public" />
          <Dropdown value="private" text="Private" />
          <Dropdown value="role" text="Role" />
        </select>
        <div className="input-field center">
          <button className="waves-effect btn button-design" type="submit">
            Sign Up
          </button>
        </div>

      </form>
    </div>
  );
};

DocumentDisplay.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

export default DocumentDisplay;
