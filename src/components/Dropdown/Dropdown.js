import React, { PropTypes } from 'react';

const Dropdown = ({
  id,
  name,
  items,
  className,
  value,
  onChange,
  onKeyDown
}) => (
  <select id={id} name={name}
    className={className}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  >
    {items.map(item => {
      return <option value={item.value}>{item.text}</option>;
    })}
  </select>
);

Dropdown.defaultProps = {
  items: []
};

Dropdown.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default Dropdown;
