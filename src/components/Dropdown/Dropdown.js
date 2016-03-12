import React, { PropTypes } from 'react';

const Dropdown = ({
  id,
  name,
  items,
  className,
  placeholder,
  value,
  onChange,
  onKeyDown
}) => (
  <div>
    <label
      htmlFor={name}
    > {name}
    </label>
    <select id={id} name={name}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    >
      {items.map(item => {
        return <option value={item.value}>{item.text}</option>;
      })}
    </select>
  </div>
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
