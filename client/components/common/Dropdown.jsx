import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {any} props
 * @returns
 */

const Dropdown = ({ value, text, selected }) => (
  <option selected={selected} value={value}>{text}</option>
);

Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.string
};

export default Dropdown;
