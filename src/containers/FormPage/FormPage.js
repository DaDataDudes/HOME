import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './FormPage.css';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import List from 'components/List';

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
        <div className={styles.base}>
          <div>
            <Input
              className={styles.input}
              placeholder="First Name"
              onChange={this._onInputChange}
              value={this.state.firstName}
              name="firstName"
            />

            <Input
              className={styles.input}
              placeholder="Last Name"
              onChange={this._onInputChange}
              value={this.state.lastName}
              name="lastName"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Age"
              onChange={this._onInputChange}
              value={this.state.age}
              name="age"
            />

            <Input
              className={styles.input}
              placeholder="Gender"
              onChange={this._onInputChange}
              value={this.state.gender}
              name="gender"
            />
          </div>

          <div>
            <Dropdown
              name="ethnicity"
              items={this.state.ethnicities}
              onChange={this._onInputChange} />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Social Security Number"
              onChange={this._onInputChange}
              value={this.state.social}
              name="social"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Shelter Status"
              onChange={this._onInputChange}
              value={this.state.shelterStatus}
              name="shelterStatus"
            />
            <Input
              className={styles.input}
              placeholder="Shelter Name"
              onChange={this._onInputChange}
              value={this.state.shelterName}
              name="shelterName"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Employment Status"
              onChange={this._onInputChange}
              value={this.state.employmentStatus}
              name="employmentStatus"
            />
            <Input
              className={styles.input}
              placeholder="Current Pay"
              onChange={this._onInputChange}
              value={this.state.employmentCurPay}
              name="employmentCurPay"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Employment Last Employed"
              onChange={this._onInputChange}
              value={this.state.employmentLastEmployed}
              name="employmentLastEmployed"
            />
            <Input
              className={styles.input}
              placeholder="Unemployment"
              onChange={this._onInputChange}
              value={this.state.benefitUnemployment}
              name="benefitUnemployment"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Veteran Benefits"
              onChange={this._onInputChange}
              value={this.state.benefitVeteran}
              name="benefitVeteran"
            />
            <Input
              className={styles.input}
              placeholder="Welfare"
              onChange={this._onInputChange}
              value={this.state.benefitWelfare}
              name="benefitWelfare"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="EBT"
              onChange={this._onInputChange}
              value={this.state.benefitEbt}
              name="benefitEbt"
            />
            <Input
              className={styles.input}
              placeholder="Education Level"
              onChange={this._onInputChange}
              value={this.state.educationLevel}
              name="educationLevel"
            />
          </div>

          <div>
            <Input
              className={styles.input}
              placeholder="Temporary assistance for needy families (TANF)"
              onChange={this._onInputChange}
              value={this.state.benefitTanf}
              name="benefitTanf"
            />
            <Input
              className={styles.input}
              placeholder="SSI"
              onChange={this._onInputChange}
              value={this.state.benefitSsi}
              name="benefitSsi"
            />
          </div>

          <div>
            <p>{questions.familyMembersAdult}</p>
            <Input
              className={styles.input}
              placeholder="Adult Family Members"
              onChange={this._onInputChange}
              value={this.state.familyMembersAdult}
              name="familyMembersAdult"
            />

            <p>{questions.familyMembersChildren}</p>
            <Input
              className={styles.input}
              placeholder="Children Family Members"
              onChange={this._onInputChange}
              value={this.state.familyMembersChildren}
              name="familyMembersChildren"
            />
          </div>

          <div>
            <p>{questions.homelessDate}</p>
            <Input
              className={styles.input}
              placeholder="Date of Homelessness"
              onChange={this._onInputChange}
              value={this.state.homelessDate}
              name="homelessDate"
            />

            <p>{questions.homelessCount}</p>
            <Input
              className={styles.input}
              placeholder="Homeless Count"
              onChange={this._onInputChange}
              value={this.state.homelessCount}
              name="homelessCount"
            />
          </div>

          <div>
            <p>{questions.onTheStreets}</p>
            <Input
              className={styles.input}
              placeholder="On the Streets"
              onChange={this._onInputChange}
              value={this.state.onTheStreets}
              name="onTheStreets"
            />

            <p>{questions.mentalHealthDisability}</p>
            <Input
              className={styles.input}
              placeholder="Mental Health Disability"
              onChange={this._onInputChange}
              value={this.state.mentalHealthDisability}
              name="mentalHealthDisability"
            />
          </div>

          <div>
            <p>{questions.alcoholDrugProblem}</p>
            <Input
              className={styles.input}
              placeholder="Alcohol/Drug Problem"
              onChange={this._onInputChange}
              value={this.state.alcoholDrugProblem}
              name="alcoholDrugProblem"
            />

            <p>{questions.otherDisability}</p>
            <Input
              className={styles.input}
              placeholder="Other Disability"
              onChange={this._onInputChange}
              value={this.state.otherDisability}
              name="otherDisability"
            />
          </div>
        </div>
        <button type="submit"> Check-In </button>
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
