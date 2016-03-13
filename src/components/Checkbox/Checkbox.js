import React, { PropTypes } from 'react';
import styles from './Checkbox.css';

const Checkbox = ({ id, text, className, name, value, checked, onChange }) => (
  <div className={styles.base}>
    <label htmlFor={name} >
        {text}
      </label>
    <input id={id}
      className={className}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  </div>
);

Checkbox.defaultProps = {
  checked: '',
};

Checkbox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
};

export default Checkbox;
