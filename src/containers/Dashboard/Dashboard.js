import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Dashboard.css';

import { browserHistory } from 'react-router';
import { getChartData } from 'actions/charts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getChartData());
  }

  render() {
    const { children, chartData } = this.props;
    if (chartData) {
      const x = d3.scale.linear()
          .domain([0, d3.max(chartData)])
          .range([0, 320]);

      d3.select('.chart')
        .selectAll('div')
          .data(chartData)
        .enter().append('div')
          .style('width', function(d) { return x(d) + 'px'; })
          .style('height', 10 + 'px')
    }
    return (
      <div className={styles}>
        <h1>Dashboard</h1>
        <div className="sidebar">
          <Link to="/dashboard/humanList">Table</Link>
        </div>
        {children}
        <div className="chart"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.chartData.data,
  };
}

export default connect(mapStateToProps)(Dashboard);
