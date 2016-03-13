import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './LoginForm.css';

const LoginForm = ({ handleSubmit }) => (
  <div className={styles.base}>
    <form method="POST" onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Login</h1>
      <div className="row">
        <input name="username" type="username" id="username" placeholder="Username" className={styles.textInput} required />
      </div>
      <div className="row">
        <input name="password" type="password" id="password" placeholder="Password" className={styles.textInput} required />
      </div>
      <p className={styles.forgot}>If you forgot your password <Link to="/reset">reset it</Link>.</p>
      <button className={styles.button} type="submit">Login</button>
    </form>
  </div>
);

export default LoginForm;
