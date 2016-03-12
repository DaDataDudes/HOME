import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Dashboard.css';

import { browserHistory } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
