import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Login.css';
import LoginForm from 'components/LoginForm';
import List from 'components/List';

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('hello tony');
  }

  render() {
    return (
      <div className={styles}>
        <LoginForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
