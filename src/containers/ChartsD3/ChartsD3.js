import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { firebase } from 'actions/firebase'
import { getChartData, updateChartData } from 'actions/charts';
import Map from 'components/charts/Map';
import styles from './ChartsD3.css';
import { BarChart, LineChart, PieChart } from 'react-d3';


class ChartsD3 extends Component {
  constructor(props) {
    super(props);
    this._updateData = this._updateData.bind(this);
   
    this._lineBoxContainer = {
      x: 0,
      y: 0,
      width: 500,
      height: 400
    }

    this.state = {
      lineData: []
    }
    this._lineData = [{name:'series1', values:[{x:1, y:20}]}];
  }

  componentDidMount() {
    this.props.dispatch(getChartData());
  }

  componentWillMount() {
    this.props.dispatch(firebase.registerListeners());
  }

  _updateData() {
    this.props.dispatch(updateChartData());
  }

  render() {
    const { documents } = this.props;
    if (documents.length) {
     let yearSnapshot = documents.reduce((previous,current) =>{
      if(!current.dateCreated){
        return previous;
      }
      if(previous[current.dateCreated.month]){
        previous[current.dateCreated.month]++;
      }else{
        previous[current.dateCreated.month] = 1;
      }
      return previous;
     }, {});
    let months = Object.keys(yearSnapshot);
    let values = months.map((month) => {
        return {x:Number(month), y:yearSnapshot[month]};
     });
    this._lineData = [{name:'series1', values: values}];
    }else{
      return null;
    }
    return (
      <div className={styles.chart}>
        <h1>ChartsD3</h1>
        <div className="sidebar">
          <LineChart
            data={this._lineData}
            width={300}
            height={300}
            viewBoxObject={this._lineBoxContainer}
            title="Test Title"
            yAxisLabel="Total Population"
            xAxisLabel="Months"
            gridHorizontal={true}
          />
        </div>
        <div className="chart"></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    documents: state.documents.list,
  };
}

export default connect(mapStateToProps)(ChartsD3);
