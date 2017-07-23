import React from 'react';
import PropTypes from 'prop-types';
/**
 * Input component that displays an Input Field.
 * @param {Object} props The props for the component.
 * @returns {String} The HTML markup for the Input component
 */
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
  value: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default InputField;

