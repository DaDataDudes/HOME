import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Login.css';

class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles}>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
