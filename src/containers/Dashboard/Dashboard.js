import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Dashboard.css';

import { browserHistory } from 'react-router';
const data = [1,3,4,6,3];

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  const x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 320]);

  d3.select('.chart')
    .selectAll('div')
      .data(data)
    .enter().append('div')
      .style('width', function(d) { return x(d) + 'px'; })
      .style('height', 10 + 'px')
  }

  render() {
    return (
      <div className={styles}>
        <h1>Dashboard</h1>
        <div className="chart"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Dashboard);
