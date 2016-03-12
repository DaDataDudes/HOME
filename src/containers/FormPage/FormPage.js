import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './FormPage.css';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import List from 'components/List';
import { Grid, Row, Col } from 'react-flexbox-grid';

class FormPage extends Component {
  constructor() {
    super();
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputEnter = this._onInputEnter.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.state = {
      firstName : '',
      lastName : '',
      age : null,
      gender : null,
      ethnicity : '',
      social : '',
      shelterStatus : false,
      shelterName:'',
      familyMembersTotal : null,
      familyMembersAdult : [],
      familyMembersChildren : [],
      homelessDate : null,
      employmentStatus : false,
      employmentCurPay : null,
      employmentLastEmployed : '',
      benefitVeteran : false,
      benefitWelfare : false,
      benefitEbt : false,
      benefitUnemployment : false,
      benefitTanf : false,
      benefitSsi : false,
      veteran : false,
      educationLevel: '',
      homelessCount: null,
      onTheStreets: null,
      mentalHealthDisability: null,
      alcoholDrugProblem: null,
      otherDisability: null,
      geoLocation : '',
      count : null,
      questions: {
        familyMembersAdult: 'How many ADULTS are in your household?',
        familyMembersChildren: 'How many CHILDREN UNDER 18?',
        ethnicity: 'What Race do you most identify with? (SELECT ONLY ONE)',
        veteran: 'Have you served in the U.S. Armed Forces?',
        homelessDate: 'How long have you been continuously homeless this time?',
        homelessCount: 'How many times have you been homeless in the past 3 years?',
        onTheStreets: 'Were you on the street, beach, park, or in an emergency shelter each time?',
        mentalHealthDisability: 'Do you have a mental health disability that limits your ability to work or perform activities of daily living?',
        alcoholDrugProblem: 'Do you have an alcohol or drug problem that limits your ability to work or perform activities of daily living?',
        otherDisability: 'Do you have a physical, developmental, or other disability that limits your ability to work or perform activities of daily living?'
      },
      ethnicities: [
        {
          value: '',
          text: '--'
        },
        {
          value: 'hawaiian',
          text: 'Hawaiian'
        },
        {
          value: 'white',
          text: 'White'
        },
        {
          value: 'black',
          text: 'Black/African-American'
        },
        {
          value: 'asian',
          text: 'Asian'
        },
        {
          value: 'american indian',
          text: 'American Indian/Alaska Native'
        },
        {
          value: 'native hawaiian',
          text: 'Native Hawaiian'
        },
        {
          value: 'other',
          text: 'Other Pacific Islander'
        },
        {
          value: 'multiple',
          text: 'Multiple Races'
        },
        {
          value: 'unknown',
          text: 'Unknown'
        }
      ]
    };
  }

  _onInputChange(event) {
    var nameAttr = event.target.getAttribute('name');
    this.setState({ [nameAttr]: event.target.value });
  }

  _onInputEnter(event) {
    const item = event.target.value.trim();

    if (event.which === 13 && item) {
      this.props.dispatch(addItem(item));
      this.setState({ inputValue: '' });
    }
  }

  _onSubmit(event) {
    event.preventDefault();

    const adultCount = event.target.familyMembersAdult.value;
    const childrenCount = event.target.familyMembersChildren.value;

    this.setState({
      ...this.state,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      age: event.target.age.value,
      gender: event.target.gender.value,
      ethnicity: event.target.ethnicity.value,
      social: event.target.social.value,
      shelterStatus: event.target.shelterStatus.value,
      shelterName: event.target.shelterName.value,
      familyMembersTotal: +adultCount + +childrenCount,
      familyMembersAdult: adultCount,
      familyMembersChildren: childrenCount,
      homelessDate: event.target.homelessDate.value,
      employmentStatus: event.target.employmentStatus.value,
      employmentCurPay: event.target.employmentCurPay.value,
      employmentLastEmployed: event.target.employmentLastEmployed.value,
      benefitVeteran: event.target.benefitVeteran.value,
      benefitWelfare: event.target.benefitWelfare.value,
      benefitEbt: event.target.benefitEbt.value,
      benefitUnemployment: event.target.benefitUnemployment.value,
      benefitTanf: event.target.benefitTanf.value,
      benefitSsi: event.target.benefitSsi.value,
      educationLevel: event.target.educationLevel.value,
      homelessCount: event.target.homelessCount.value,
      onTheStreets: event.target.onTheStreets.value,
      mentalHealthDisability: event.target.mentalHealthDisability.value,
      alcoholDrugProblem: event.target.alcoholDrugProblem.value,
      otherDisability: event.target.otherDisability.value
    })

    console.log('this.state', this.state);
  }

  render() {
    const {
      questions
    } = this.state;

    return (
      <form className='homeless-form' onSubmit={this._onSubmit}>
        <Grid className={styles.base}>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="First Name"
                onChange={this._onInputChange}
                value={this.state.firstName}
                placeholder="first"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Last Name"
                onChange={this._onInputChange}
                value={this.state.lastName}
                placeholder="last"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Age"
                onChange={this._onInputChange}
                value={this.state.age}
                placeholder="age"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Gender"
                onChange={this._onInputChange}
                value={this.state.gender}
                placeholder="gender"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                className={styles.dropDown}
                name="Ethnicity"
                placeholder="ethnicity"
                items={this.state.ethnicities}
                onChange={this._onInputChange} />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Social Security Number"
                onChange={this._onInputChange}
                value={this.state.social}
                placeholder="SSN"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Are you currently in a shelter?"
                onChange={this._onInputChange}
                value={this.state.shelterStatus}
                placeholder="shelter"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Name of current shelter"
                onChange={this._onInputChange}
                value={this.state.shelterName}
                placeholder="shelter name"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Are you currently employed?"
                onChange={this._onInputChange}
                value={this.state.employmentStatus}
                placeholder="employment"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="What is your current family income?"
                onChange={this._onInputChange}
                value={this.state.employmentCurPay}
                placeholder="income"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="When were you last employed?"
                onChange={this._onInputChange}
                value={this.state.employmentLastEmployed}
                placeholder="last employement"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Are you a U.S. Military Veteran?"
                onChange={this._onInputChange}
                value={this.state.benefitVeteran}
                placeholder="veteran"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Unemployment"
                onChange={this._onInputChange}
                value={this.state.benefitUnemployment}
                placeholder="unemployment"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="Welfare"
                onChange={this._onInputChange}
                value={this.state.benefitWelfare}
                placeholder="welfare"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="EBT"
                onChange={this._onInputChange}
                value={this.state.benefitEbt}
                placeholder="EBT"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                name="What is your highest completed education level?"
                onChange={this._onInputChange}
                value={this.state.educationLevel}
                placeholder="education"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                placeholder="Temporary assistance for needy families (TANF)"
                onChange={this._onInputChange}
                value={this.state.benefitTanf}
                name="benefitTanf"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                placeholder="SSI"
                onChange={this._onInputChange}
                value={this.state.benefitSsi}
                name="benefitSsi"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.familyMembersAdult}</p>
              <Input
                className={styles.input}
                placeholder="Adult Family Members"
                onChange={this._onInputChange}
                value={this.state.familyMembersAdult}
                name="familyMembersAdult"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.familyMembersChildren}</p>
              <Input
                className={styles.input}
                placeholder="Children Family Members"
                onChange={this._onInputChange}
                value={this.state.familyMembersChildren}
                name="familyMembersChildren"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.homelessDate}</p>
              <Input
                className={styles.input}
                placeholder="Date of Homelessness"
                onChange={this._onInputChange}
                value={this.state.homelessDate}
                name="homelessDate"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.homelessCount}</p>
              <Input
                className={styles.input}
                placeholder="Homeless Count"
                onChange={this._onInputChange}
                value={this.state.homelessCount}
                name="homelessCount"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.onTheStreets}</p>
              <Input
                className={styles.input}
                placeholder="On the Streets"
                onChange={this._onInputChange}
                value={this.state.onTheStreets}
                name="onTheStreets"
              />
              <p className={styles.input}>{questions.mentalHealthDisability}</p>
              <Input
                className={styles.input}
                placeholder="Mental Health Disability"
                onChange={this._onInputChange}
                value={this.state.mentalHealthDisability}
                name="mentalHealthDisability"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.alcoholDrugProblem}</p>
              <Input
                className={styles.input}
                placeholder="Alcohol/Drug Problem"
                onChange={this._onInputChange}
                value={this.state.alcoholDrugProblem}
                name="alcoholDrugProblem"
              />
              <p className={styles.input}>{questions.otherDisability}</p>
              <Input
                className={styles.input}
                placeholder="Other Disability"
                onChange={this._onInputChange}
                value={this.state.otherDisability}
                name="otherDisability"
              />
            </Col>
          </Row>
        </Grid>
        <Row center="xs">
          <Col xs={1}>
            <button type="submit"> Check-In </button>
          </Col>
        </Row>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo
  };
}

export default connect(mapStateToProps)(FormPage);
