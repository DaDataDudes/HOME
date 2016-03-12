import React, { PropTypes } from 'react';

const Input = ({ id, className, type, placeholder, name, value, onChange, onKeyDown }) => (
  <input id={id}
    className={className}
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
);

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default Input;
