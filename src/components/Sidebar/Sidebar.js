import React from 'react';
import { Link } from 'react-router';
import styles from './Sidebar.css';

const Sidebar = () => (
  <div className={styles.base}>
    <ul>
      <li className={styles.item}>
        <Link to="dashboard">Graphs</Link>
      </li>
      <li className={styles.item}>
        <Link to="dashboard/humanList">Table</Link>
      </li>
    </ul>
  </div>
);

Sidebar.defaultProps = {};

Sidebar.propTypes = {};

export default Sidebar;
