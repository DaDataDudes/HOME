import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import styles from './Header.css';
import userIcon from 'assets/user-icon.svg';

const Header = ({ branding, username }) => (
  <header className={styles.base}>
    <Row>
      <Col xs={6} className={styles.logo}>
        {branding}
      </Col>
      <Col xs={6} className={styles.user}>
        <img className={styles.userImg} src={userIcon} />
        <p className={styles.username}>{username}</p>
      </Col>
    </Row>
  </header>
);

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
