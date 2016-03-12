import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    // const { chartData } = this.props;

    return (
      <div className={styles.chart}>
        <h1>Dashboard</h1>
        <div className="map">
          <Map data={[1, 2, 3]} />
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
