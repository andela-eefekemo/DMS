import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../common/InputField';

const RoleDisplay = ({ onChange, onSubmit, role }) => {
  return (
    <div>
      <form onSubmit={onSubmit} >
        <h5>Create Role</h5>
        <InputField
          name="title"
          value={role.title}
          placeholder="role Title"
          className="validate form-design"
          type="text" onChange={onChange} />
        <InputField
          name="description"
          value={role.descripition}
          placeholder="role Content"
          className="validate form-design"
          type="text" onChange={onChange} />
        <button className="waves-effect btn button-design" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

RoleDisplay.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired
};

export default RoleDisplay;
