import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getChartData, updateChartData } from 'actions/charts';
import Header from 'components/Header';
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
    const { children, auth: { username } } = this.props;

    return (
      <div className={styles.chart}>
        <Header branding="HOME" username={username} />
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
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Dashboard);
