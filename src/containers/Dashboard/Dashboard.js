import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getChartData, updateChartData } from 'actions/charts';
import Map from 'components/charts/Map';
import styles from './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this._updateData = this._updateData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getChartData());
  }

  _updateData() {
    this.props.dispatch(updateChartData());
  }

  render() {
    const { children, chartData } = this.props;
    if (chartData) {
      const x = d3.scale.linear()
          .domain([0, d3.max(chartData)])
          .range([0, 320]);

    return (
      <div className={styles.chart}>
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
