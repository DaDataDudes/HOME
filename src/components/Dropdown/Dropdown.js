import React, { PropTypes } from 'react';
import styles from './Dropdown.css';

const Dropdown = ({
  id,
  name,
  items,
  text,
  className,
  placeholder,
  value,
  onChange,
  onKeyDown
}) => (
  <div className={styles.base}>
    <label
      htmlFor={name}
    > {text}
    </label>
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
