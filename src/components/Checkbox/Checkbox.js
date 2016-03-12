import React, { PropTypes } from 'react';

const Checkbox = ({ id, className, name, value, checked, onChange}) => (
  <input id={id}
    className={className}
    type='checkbox'
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.defaultProps = {
  checked: ''
};

Checkbox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string
};

export default Checkbox;
