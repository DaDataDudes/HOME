import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Login.css';

import { login } from 'actions/auth';
import { browserHistory } from 'react-router';
import LoginForm from 'components/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;

    this.props.dispatch(login(username));
    this.context.router.push('/dashboard');
  }

  render() {
    return (
      <div className={styles.base}>
        <LoginForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
