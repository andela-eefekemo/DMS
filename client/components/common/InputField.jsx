import React from 'react';
import PropTypes from 'prop-types';

const InputField =
  ({ className, name, value, placeholder, type, onChange, label }) => (
    <div className="input-field">
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
      <label
        className="form-label"
        htmlFor="email" data-error="Invalid Input" data-success="">
        {label}
      </label>
    </div>
  );

// Set Input PropTypes
InputField.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default InputField;

