import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './FormPage.css';
import { firebase } from 'actions/firebase';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import Checkbox from 'components/Checkbox';
import { Grid, Row, Col } from 'react-flexbox-grid';

class FormPage extends Component {
  constructor() {
    super();
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputEnter = this._onInputEnter.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._formState = {
      firstName : '',
      lastName : '',
      age : null,
      gender : '',
      ethnicity : '',
      social : '',
      shelterStatus : '',
      shelterName:'',
      familyMembersTotal : null,
      familyMembersAdult : [],
      familyMembersChildren : [],
      homelessDate : '',
      employmentStatus : false,
      employmentCurPay : null,
      employmentLastEmployed : '',
      benefitVeteran : false,
      benefitWelfare : false,
      benefitEbt : false,
      benefitUnemployment : false,
      benefitTanf : false,
      benefitSsi : false,
      veteran : '',
      educationLevel: '',
      homelessCount: '',
      onTheStreets: '',
      mentalHealthDisability: '',
      alcoholDrugProblem: '',
      otherDisability: '',
      checkInRecord: [],
      geoLocation : '',
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
        governmentBenefits: 'Select all Benefits that you are currently receiving:',
        otherDisability: 'Do you have a physical, developmental, or other disability that limits your ability to work or perform activities of daily living?'
      },
      genderOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value: 'male',
          text:'Male'
        },
        {
          value: 'female',
          text:'Female'
        },
        {
          value: 'transgenderMaleToFemale',
          text:'Transgender: Male to Female'
        },
        {
          value: 'transgenderFemaleToMale',
          text:'Transgender: Female to Male'
        },
        {
          value: 'unknown',
          text:'Unknown'
        },
        {
          value: 'refused',
          text:'Refused'
        }
      ],
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
          value: 'americanIndian',
          text: 'American Indian/Alaska Native'
        },
        {
          value: 'nativeHawaiian',
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
      ],
      yesNoOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value:'yes',
          text: 'Yes'
        },
        {
          value:'no',
          text: 'No'
          }
      ],
      numberOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value:'oneToTwo',
          text: '1 - 2'
        },
        {
          value:'threeToFour',
          text: '3 - 4'
        },
        {
          value:'fiveToSix',
          text: '5 - 6'
        },
        {
          value:'max',
          text: '7+'
        }
      ],
      generalOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value:'yes',
          text: 'Yes'
        },
        {
          value:'no',
          text: 'No'
        },
        {
          value:'unknown',
          text: 'Unknown'
        },
        {
          value:'refused',
          text: 'Refused'
        }
      ],
      educationOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value:'ged',
          text: 'GED'
        },
        {
          value:'highSchool',
          text: 'High School'
        },
        {
          value:'someCollege',
          text: 'Some College'
        },
        {
          value:'associate',
          text: 'Associate'
        },
        {
          value:'bachelors',
          text: 'Bachelors'
        },
        {
          value:'masters',
          text: 'Masters'
        }
      ],
      homelessDateOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value:'lessThanYear',
          text: 'Less than 1 year'
        },
        {
          value:'oneYearOrLonger',
          text: '1 year or longer'
        },
        {
          value:'unknown',
          text: 'Unknown'
        },
        {
          value:'refused',
          text: 'Refused'
        }
      ],
      homelessCountOptions: [
        {
          value: '',
          text: '--'
        },
        {
          value:'oneToThreeTimes',
          text: '1-3 times'
        },
        {
          value:'fourOrMoreTimes',
          text: '4 or more times'
        },
        {
          value:'unknown',
          text: 'Unknown'
        },
        {
          value:'refused',
          text: 'Refused'
        }
      ]
    };
    this.state = this._formState;
  }

  componentWillMount() {
    this.props.dispatch(firebase.registerListeners());
  }

  _onInputChange(event) {
    var nameAttr = event.target.getAttribute('name');
    this.setState({ [nameAttr]: event.target.value });
  }

  _onCheckboxChange(event) {
    var nameAttr = event.target.getAttribute('name');
    console.log('event.target.value',event.target.value);
    this.setState({ [nameAttr]: (event.target.value === 'false')});
  }

  _onBlur(event) {
    var oldState = this.props.documents.find(current => current.social == this.state.social);

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const firstRecord = {
      month,
      year,
      checkInCount: 1
    };

    let checkInRecord;

    if (oldState) {
      let existingRecord = oldState.checkInRecord ?
        oldState.checkInRecord.slice() :
        [];

      const dateFoundIndex = existingRecord.findIndex(r =>
        r.month === month && r.year === year);

      if (dateFoundIndex > -1) {
        existingRecord[dateFoundIndex].checkInCount += 1;
        checkInRecord = existingRecord;
      } else {
        checkInRecord = [
          ...existingRecord,
          firstRecord
        ];
      }

      this.setState({
        ...oldState,
        checkInRecord
      });

    } else {
      this.setState({
        ...this.state,
        checkInRecord: [
          firstRecord
        ]
      });
    }
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
    });

    this.props.dispatch(firebase.createDocument(this.state));
    this.setState(this._formState);
  }

  render() {
    const {
      questions
    } = this.state;

    return (
      <form className='homeless-form' ref='homelessForm' onSubmit={this._onSubmit}>
        <Grid className={styles.base}>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                text="Social Security Number"
                name="social"
                onChange={this._onInputChange}
                value={this.state.social}
                placeholder="SSN"
                onBlur={this._onBlur}
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
             <Input
                className={styles.input}
                text="First Name"
                name="firstName"
                onChange={this._onInputChange}
                value={this.state.firstName}
                placeholder="first"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                text="Last Name"
                name="lastName"
                onChange={this._onInputChange}
                value={this.state.lastName}
                placeholder="last"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                text="Age"
                name="age"
                onChange={this._onInputChange}
                value={this.state.age}
                placeholder="age"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.genderOptions}
                value={this.state.gender}
                name="gender"
                text="Gender"
                className={styles.dropDown}
                />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                className={styles.dropDown}
                text="Ethnicity"
                name="ethnicity"
                items={this.state.ethnicities}
                value={this.state.ethnicity}
                onChange={this._onInputChange} />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.yesNoOptions}
                value={this.state.shelterStatus}
                name="shelterStatus"
                text="Are you currently in a shelter?"
                className={styles.dropDown}
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                text="Name of current shelter"
                name="shelterName"
                onChange={this._onInputChange}
                value={this.state.shelterName}
                placeholder="shelter name"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.yesNoOptions}
                value={this.state.employmentStatus}
                name="employmentStatus"
                text="Are you currently employed?"
                className={styles.dropDown}
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Input
                className={styles.input}
                text="What is your current family income?"
                name="employmentCurPay"
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
                text="When were you last employed?"
                name="employmentLastEmployed"
                onChange={this._onInputChange}
                value={this.state.employmentLastEmployed}
                placeholder="last employement"
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                className={styles.dropDown}
                text="Are you a U.S Military Veteran"
                name="veteran"
                value={this.state.veteran}
                items={this.state.generalOptions}
                onChange={this._onInputChange} />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <Dropdown
                className={styles.dropDown}
                text="What is your highest completed education level?"
                name="educationLevel"
                items={this.state.educationOptions}
                value={this.state.educationLevel}
                onChange={this._onInputChange} />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
            <p>{questions.governmentBenefits}</p>
            <Row>
              <Col xs={6} className={styles.inputSpacing}>
                <Checkbox
                  id="benefitVeteran"
                  text="Veterans"
                  className={styles.input}
                  onChange={this._onCheckboxChange}
                  value={this.state.benefitVeteran}
                  checked={(this.state.benefitVeteran) ? 'checked' : ''}
                  name="benefitVeteran"
                />
              </Col>
              <Col xs={6} className={styles.inputSpacing}>
                 <Checkbox
                  id="benefitUnemployment"
                  text="Unemployement"
                  className={styles.input}
                  onChange={this._onCheckboxChange}
                  value={this.state.benefitUnemployment}
                  checked={(this.state.benefitUnemployment) ? 'checked' : ''}
                  name="benefitUnemployment"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6} className={styles.inputSpacing}>
               <Checkbox
                id="benefitWelfare"
                text="Welfare"
                className={styles.input}
                onChange={this._onCheckboxChange}
                value={this.state.benefitWelfare}
                checked={(this.state.benefitWelfare) ? 'checked' : ''}
                name="benefitWelfare"
              />
              </Col>
              <Col xs={6} className={styles.inputSpacing}>
               <Checkbox
                id="benefitEbt"
                text="EBT"
                className={styles.input}
                onChange={this._onCheckboxChange}
                value={this.state.benefitEbt}
                checked={(this.state.benefitEbt) ? 'checked' : ''}
                name="benefitEbt"
              />
              </Col>
            </Row>
            <Row>
              <Col xs={6} className={styles.inputSpacing}>
               <Checkbox
                id="benefitTanf"
                text="TANF"
                className={styles.input}
                onChange={this._onCheckboxChange}
                value={this.state.benefitTanf}
                checked={(this.state.benefitTanf) ? 'checked' : ''}
                name="benefitTanf"
              />
              </Col>
              <Col xs={6} className={styles.inputSpacing}>
               <Checkbox
                id="benefitSsi"
                text="SSI"
                className={styles.input}
                onChange={this._onCheckboxChange}
                value={this.state.benefitSsi}
                checked={(this.state.benefitSsi) ? 'checked' : ''}
                name="benefitSsi"
              />
              </Col>
            </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.familyMembersAdult}</p>
              <Dropdown
                className={styles.dropDown}
                name="familyMembersAdult"
                items={this.state.numberOptions}
                value={this.state.familyMembersAdult}
                onChange={this._onInputChange} />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.familyMembersChildren}</p>
              <Dropdown
                className={styles.dropDown}
                name="familyMembersChildren"
                items={this.state.numberOptions}
                value={this.state.familyMembersChildren}
                onChange={this._onInputChange} />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.homelessDate}</p>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.homelessDateOptions}
                name="homelessDate"
                value={this.state.homelessDate}
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.homelessCount}</p>
              <Dropdown
              onChange={this._onInputChange}
              items={this.state.homelessCountOptions}
              name="homelessCount"
              value={this.state.homelessCount}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.onTheStreets}</p>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.generalOptions}
                name="onTheStreets"
                value={this.state.onTheStreets}
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.mentalHealthDisability}</p>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.generalOptions}
                name="mentalHealthDisability"
                value={this.state.mentalHealthDisability}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.alcoholDrugProblem}</p>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.generalOptions}
                name="alcoholDrugProblem"
                value={this.state.alcoholDrugProblem}
              />
            </Col>
            <Col xs={6} className={styles.inputSpacing}>
              <p className={styles.input}>{questions.otherDisability}</p>
              <Dropdown
                onChange={this._onInputChange}
                items={this.state.generalOptions}
                name="otherDisability"
                value={this.state.otherDisability}
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
    documents: state.documents.list
  };
}

export default connect(mapStateToProps)(FormPage);
