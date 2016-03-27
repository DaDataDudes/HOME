import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { firebase } from 'actions/firebase';
import base from 'rebase';
import { getChartData, updateChartData, getChoroInfo, updateChoroInfo, getHawaiiTopojson } from 'actions/charts';
import { BarChart, LineChart, PieChart } from 'react-d3';
import Map from 'components/charts/Map';


class ChartsD3 extends Component {
  constructor(props) {
    super(props);
    this._updateData = this._updateData.bind(this);
    this._updateInfo = this._updateInfo.bind(this);

    this._lineBoxContainer = {
      x: 0,
      y: 0,
      width: 500,
      height: 400,
    };
    this.state = {
      hawaii: null,
    };
  }

  componentWillMount() {
    this.ref = base.listenTo(`documents`, {
      context: this,
      state: 'documents',
      asArray: true,
      then(data) {
        this.props.dispatch(firebase.syncData(data));
      },
    });
  }

  componentDidMount() {
    getHawaiiTopojson().then(hawaii => {
      this.setState(hawaii);
    });
    this.props.dispatch(getChartData());
    this.props.dispatch(getChoroInfo());
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  _updateData() {
    this.props.dispatch(updateChartData());
  }

  _updateInfo(e) {
    const county = e.target.getAttribute('name');
    this.props.dispatch(updateChoroInfo(county));
  }

  render() {
    const { documents, info, totals } = this.props;
    const { hawaii } = this.state;
    // const pieData = [
    //   { label: 'Margarita', value: 20.0 },
    //   { label: 'John', value: 55.0 },
    //   { label: 'Tim', value: 25.0 },
    // ];

    if (documents.length) {
      const yearSnapshot = documents.reduce((previous, current) => {
        if (!current.dateCreated) {
          return previous;
        }
        const _prev = { ...previous };
        if (_prev[current.dateCreated.month]) {
          _prev[current.dateCreated.month]++;
        } else {
          _prev[current.dateCreated.month] = 1;
        }
        return _prev;
      }, {});
      const months = Object.keys(yearSnapshot);
      const values = months.map(month => ({ x: Number(month), y: yearSnapshot[month] }));
      this._lineDataPopulation = [{ name: 'series1', values }];
    } else {
      return null;
    }

    function getCurrentMonthDocs(monthIndex) {
      return documents.filter(item => {
        const created = item.dateCreated;
        return created ? (created.month === monthIndex) && (item.employmentStatus === 'yes') : false;
      });
    }

    // gather monthly average income
    if (documents.length) {
      const monthlyAverageIncome = {};

      for (var monthIndex = 1; monthIndex < 12; monthIndex++) {
        const currentMonthDocs = getCurrentMonthDocs(monthIndex);

        monthlyAverageIncome[monthIndex] = currentMonthDocs.reduce((prev, curr) => prev + curr.employmentCurPay, 0) / 2;
      }
      const months = Object.keys(monthlyAverageIncome);
      const values = months.map(month => ({ x: Number(month), y: monthlyAverageIncome[month] }));
      const averageIncome = [{ name: 'Average Income', values }];
      this._lineDataMonthlyIncome = averageIncome;
    } else {
      return null;
    }

    // gather 2 deep bar graph for non-shelter vs shelter homeless
    if (documents.length) {
      const yearSnapshot = documents.reduce((previous, current) => {
        if (!current.dateCreated) {
          return previous;
        }
        if (current.shelterStatus === 'no' && undefined) {
          return previous;
        }
        const _prev = { ...previous };
        if (_prev[current.dateCreated.month]) {
          _prev[current.dateCreated.month]++;
        } else {
          _prev[current.dateCreated.month] = 1;
        }
        return _prev;
      }, {});

      const yearSnapshot2 = documents.reduce((previous, current) => {
        if (!current.dateCreated) {
          return previous;
        }
        if (current.shelterStatus === 'yes' && undefined) {
          return previous;
        }
        const _prev = { ...previous };
        if (_prev[current.dateCreated.month]) {
          _prev[current.dateCreated.month]++;
        } else {
          _prev[current.dateCreated.month] = 1;
        }
        return _prev;
      }, {});
      const months = Object.keys(yearSnapshot);
      const values = months.map(month => ({ x: Number(month), y: yearSnapshot[month] }));
      const values2 = months.map(month => ({ x: Number(month), y: yearSnapshot2[month] }));
      this._barShelterData = [
        {
          name: 'series1',
          values,
        },
        {
          name: 'series2',
          values: values2,
        },
      ];
    } else {
      return null;
    }

    // Aggregate analytics for monthly income
    if (documents.length) {
      const benefitAlias = {
        benefitEbt: 'EBT',
        benefitSsi: '(SSI)',
        benefitTanf: '(TANF)',
        benefitUnemployment: 'Unemployment',
        benefitVeteran: 'Veteran',
        benefitWelfare: 'Welfare',
      };
      const benefitTracker = {
        benefitEbt: 0,
        benefitSsi: 0,
        benefitTanf: 0,
        benefitUnemployment: 0,
        benefitVeteran: 0,
        benefitWelfare: 0,
      };

      documents.forEach(doc => {
        if (doc.benefitEbt === 'yes') { benefitTracker.benefitEbt++; }
        if (doc.benefitSsi === 'yes') { benefitTracker.benefitSsi++; }
        if (doc.benefitTanf === 'yes') { benefitTracker.benefitTanf++; }
        if (doc.benefitUnemployment === 'yes') { benefitTracker.benefitUnemployment++; }
        if (doc.benefitVeteran === 'yes') { benefitTracker.benefitVeteran++; }
        if (doc.benefitWelfare === 'yes') { benefitTracker.benefitWelfare++; }
      });
      const benefitKeys = Object.keys(benefitTracker);

      const allValueCount = benefitKeys.reduce((previous, current) => previous + benefitTracker[current], 0);

      this._pieDataBenefits = benefitKeys.map(key => ({
        label: benefitAlias[key],
        value: (Number(benefitTracker[key] / allValueCount * 100).toFixed(2)),
      }));
    } else {
      return null;
    }

    // Aggregate analytics for families
    if (documents.length) {
      const familyAlias = {
        familyMembersAdult: 'Adult',
        familyMembersChildren: 'Children',
      };

      const familyTracker = {
        familyMembersAdult: 0,
        familyMembersChildren: 0,
      };

      documents.forEach(doc => {
        if (!doc.familyMembersAdult) return;
        if (!doc.familyMembersChildren) return;
        familyTracker.familyMembersChildren += doc.familyMembersChildren;
        familyTracker.familyMembersAdult += doc.familyMembersAdult;
      });

      const familyKeys = Object.keys(familyTracker);

      const allValueCount = familyKeys.reduce((previous, current) => previous + familyTracker[current], 0);

      this._pieDataFamilies = familyKeys.map(key => ({
        label: familyAlias[key],
        value: (Number(familyTracker[key] / allValueCount * 100).toFixed(2)),
      }));
    } else {
      return null;
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col xsOffset={2}>
              {hawaii &&
                <Map
                  hawaii={hawaii}
                  info={info}
                  totals={totals}
                  updateInfo={this._updateInfo}
                  {...this.props}
                />
              }
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={6}>
              <LineChart
                data={this._lineDataPopulation}
                width={450}
                height={400}
                viewBoxObject={this._lineBoxContainer}
                title="Overall Population for 2015"
                yAxisLabel="Total Population"
                xAxisLabel="Months"
                gridHorizontal
              />
            </Col>
            <Col xs={6}>
              <LineChart
                data={this._lineDataMonthlyIncome}
                width={450}
                height={400}
                viewBoxObject={this._lineBoxContainer}
                title="Average income for 2015"
                yAxisLabel="Average Income"
                xAxisLabel="Months"
                gridHorizontal
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <BarChart
                data={this._barShelterData}
                width={450}
                height={400}
                fill={'#3182bd'}
                title="Shelter vs Non-Shelter 2015"
                yAxisLabel="Label"
                xAxisLabel="Value"
              />
            </Col>
            <Col xs={6}>
              <PieChart
                data={this._pieDataBenefits}
                width={400}
                height={400}
                radius={150}
                innerRadius={15}
                title="Government Benefits"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    documents: state.documents.list,
    info: state.chartData.info,
    totals: state.chartData.choroInfo,
  };
}

export default connect(mapStateToProps)(ChartsD3);
