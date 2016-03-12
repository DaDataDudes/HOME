import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LoginForm = ({ handleSubmit }) => (
  <div className="login-form">
    <form method="POST" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="row">
        <div className="four columns">
          <label htmlFor="username">Username</label>
        </div>
        <div className="eight columns">
          <input name="username" type="username" id="username" className="u-full-width" required />
        </div>
      </div>
      <div className="row">
        <div className="four columns">
          <label htmlFor="password">Password</label>
        </div>
        <div className="eight columns">
          <input name="password" type="password" id="password" className="u-full-width" required />
        </div>
      </div>
      <hr />
      <p>If you forgot your password <Link to="/reset">reset it</Link>.</p>
      <button className="button button-primary" type="submit">Login</button>
    </form>
  </div>
);

export default LoginForm;
