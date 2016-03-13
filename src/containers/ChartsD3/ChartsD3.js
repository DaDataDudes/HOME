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
    var pieData = [
      {label: 'Margarita', value: 20.0},
      {label: 'John', value: 55.0},
      {label: 'Tim', value: 25.0 }
    ];

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
      this._lineDataPopulation = [{name:'series1', values: values}];
    }else{
      return null;
    }

    //gather monthly average income
    if (documents.length) {
      let monthlyAverageIncome = {};

      for(var monthIndex = 1; monthIndex < 12; monthIndex++){
        const currentMonthDocs = documents
        .filter(item =>{
          const created = item.dateCreated;
          return created ? (created.month === monthIndex) && (item.employmentStatus === 'yes') : false;
        });
        monthlyAverageIncome[monthIndex] = currentMonthDocs.reduce((prev, curr) => {
          return prev + curr.employmentCurPay;
        }, 0) / 2;
      };
      let months = Object.keys(monthlyAverageIncome);
      let values = months.map((month) =>{
        return {x:Number(month), y:monthlyAverageIncome[month]}
      });
      let averageIncome = [{name: 'Average Income', values: values}];
      this._lineDataMonthlyIncome = averageIncome;
    }else{
      return null;
    }

    //gather 2 deep bar graph for non-shelter vs shelter homeless
    if (documents.length) {
      let yearSnapshot = documents.reduce((previous,current) =>{
      if(!current.dateCreated){
        return previous;
      }
      if(current.shelterStatus == 'no' && undefined) {
        return previous;
      }
      if(previous[current.dateCreated.month]){
        previous[current.dateCreated.month]++;
      }else{
        previous[current.dateCreated.month] = 1;
      }
      return previous;
     }, {});

      let yearSnapshot2 = documents.reduce((previous, current) =>{
      if(!current.dateCreated){
        return previous;
      }
      if(current.shelterStatus == 'yes' && undefined) {
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
      let values2 = months.map((month) => {
          return {x:Number(month), y:yearSnapshot2[month]};
      });
      console.log('values',values2);
      console.log('values',values);
      this._barShelterData = [
        {
          name:'series1',
          values: values
        },
        {
          name: 'series2',
          values: values2
        }
      ];
    }else{
      return null;
    }

    //Aggregate analytics for monthly income
    if (documents.length) {
      let benefitAlias = {
        benefitEbt: 'EBT',
        benefitSsi: '(SSI)',
        benefitTanf: '(TANF)',
        benefitUnemployment: 'Unemployment',
        benefitVeteran: 'Veteran',
        benefitWelfare: 'Welfare'
      };
      let benefitTracker = {
        benefitEbt: 0,
        benefitSsi: 0,
        benefitTanf: 0,
        benefitUnemployment: 0,
        benefitVeteran: 0,
        benefitWelfare: 0
      };

      documents.forEach((doc) =>{
        (doc.benefitEbt == 'yes') ? benefitTracker.benefitEbt++ : '';
        (doc.benefitSsi == 'yes') ? benefitTracker.benefitSsi++ : '';
        (doc.benefitTanf == 'yes') ? benefitTracker.benefitTanf++ : '';
        (doc.benefitUnemployment == 'yes') ? benefitTracker.benefitUnemployment++ : '';
        (doc.benefitVeteran == 'yes') ? benefitTracker.benefitVeteran++ : '';
        (doc.benefitWelfare == 'yes') ? benefitTracker.benefitWelfare++ : '';
      });
      let benefitKeys = Object.keys(benefitTracker);

      let allValueCount = benefitKeys.reduce((previous, current) =>{
         return previous + benefitTracker[current]
      },0);

      this._pieDataBenefits = benefitKeys.map((key) => {
        return {label: benefitAlias[key],  value: (Number(benefitTracker[key] / allValueCount * 100).toFixed(2))}
      });
    }else{
      return null;
    }

    //Aggregate analytics for families
    if (documents.length) {
      let familyAlias = {
        familyMembersAdult: 'Adult',
        familyMembersChildren: 'Children',
      };

      let familyTracker = {
        familyMembersAdult: 0,
        familyMembersChildren: 0,
      };

      documents.forEach((doc) =>{
        if(!doc.familyMembersAdult) return;
        if(!doc.familyMembersChildren) return;
        familyTracker.familyMembersChildren += doc.familyMembersChildren;
        familyTracker.familyMembersAdult += doc.familyMembersAdult
      });

      let familyKeys = Object.keys(familyTracker);

      let allValueCount = familyKeys.reduce((previous, current) =>{
         return previous + familyTracker[current]
      },0);

      this._pieDataFamilies = familyKeys.map((key) => {
        return {label: familyAlias[key],  value: (Number(familyTracker[key] / allValueCount * 100).toFixed(2))}
      });
    }else{
      return null;
    }

    return (
      <div className={styles.chart}>
        <h1>ChartsD3</h1>
        <div className="sidebar">
          <LineChart
            data={this._lineDataPopulation}
            width={300}
            height={300}
            viewBoxObject={this._lineBoxContainer}
            title="Overall Population for 2015"
            yAxisLabel="Total Population"
            xAxisLabel="Months"
            gridHorizontal={true}
          />
          <LineChart
            data={this._lineDataMonthlyIncome}
            width={300}
            height={300}
            viewBoxObject={this._lineBoxContainer}
            title="Average income for 2015"
            yAxisLabel="Average Income"
            xAxisLabel="Months"
            gridHorizontal={true}
          />
          <BarChart
            data={this._barShelterData}
            width={300}
            height={300}
            fill={'#3182bd'}
            title='Shelter vs Non-Shelter 2015'
            yAxisLabel='Label'
            xAxisLabel='Value'
          />
          <PieChart
            data={this._pieDataBenefits}
            width={400}
            height={400}
            radius={150}
            innerRadius={15}
            title="Government Benefits"
          />
          <PieChart
            data={this._pieDataFamilies}
            width={400}
            height={400}
            radius={150}
            innerRadius={15}
            title="Family Homelessness"
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
