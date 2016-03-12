import React, { PropTypes } from 'react';
import styles from './List.css';

const List = ({ items }) => {
  const ListItems = items.map((item) => <li className={styles.item} key={item.id}>{item.item}</li>);

  return (
    <ul className={styles.list}>
      {ListItems}
    </ul>
  );
};

List.defaultProps = {
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default List;
