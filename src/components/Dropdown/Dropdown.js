import React, { PropTypes } from 'react';
import styles from './Dropdown.css';

const Dropdown = ({
  id,
  name,
  items,
  text,
  className,
  value,
  onChange,
  onKeyDown,
  ...props,
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
      {...props}
    >
      {items.map((item, i) =>
        <option key={i} value={item.value}>{item.text}</option>
      )}
    </select>
  </div>
);

Dropdown.defaultProps = {
  items: [],
};

Dropdown.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default Dropdown;
