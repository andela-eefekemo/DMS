import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown component that displays options for a select field.
 * @param {Object} props The props for the component.
 * @returns {String} The HTML markup for the Dropdown component
 */
const Dropdown = ({ value, text, selected }) => (
  <option selected={selected} value={value}>{text}</option>
);

Dropdown.propTypes = {
  value: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.string
};

export default Dropdown;
