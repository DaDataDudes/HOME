import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getChoroInfo, updateChoroInfo } from 'actions/charts';
import tooltipData from 'seed/counties';
import Map from 'components/charts/Map';
import styles from './Choropleth.css';

class Choropleth extends Component {
  constructor(props) {
    super(props);
    this._updateInfo = this._updateInfo.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getChoroInfo());
  }

  _updateInfo(e) {
    const county = e.target.getAttribute('name');
    let tool = tooltipData.find(name => name.id === county);
    this.props.dispatch(updateChoroInfo(tool));
  }

  render() {
    return (
      <div className={styles.chart}>
        <h1>Choropleth</h1>
        <Map {...this.props} updateInfo={this._updateInfo} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    info: state.chartData.info,
  };
}

export default connect(mapStateToProps)(Choropleth);
