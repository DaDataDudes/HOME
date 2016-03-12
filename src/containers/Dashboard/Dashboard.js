import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChartData } from 'actions/charts';
import d3 from 'd3';
import styles from './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getChartData());
  }

  render() {
    const { chartData } = this.props;
    if (chartData) {
      const x = d3.scale.linear()
        .domain([0, d3.max(chartData)])
        .range([0, 320]);

      d3.select('.chart')
        .selectAll('div')
        .data(chartData)
        .enter()
        .append('div')
        .style('width', (d) => `${x(d)}px`)
        .style('height', 10);
    }
    return (
      <div className={styles}>
        <h1>Dashboard</h1>
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
