import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChartData, updateChartData } from 'actions/charts';
import BarChart from 'components/charts/BarChart';
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
    const { chartData } = this.props;

    let Chart;
    if (chartData) {
      Chart = <BarChart data={chartData} width={500} height={300} />;
    }

    return (
      <div className={styles.chart}>
        <h1>Dashboard</h1>
        <div className="chart">
          {Chart}
          <button onClick={this._updateData}>Update Data</button>
        </div>
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
