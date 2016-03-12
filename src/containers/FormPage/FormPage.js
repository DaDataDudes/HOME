import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './FormPage.css';
import Input from 'components/Input';
import List from 'components/List';

class FormPage extends Component {
  constructor() {
    super();
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputEnter = this._onInputEnter.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.state = {
      name : '',
      age : null,
      social : '',
      ethnicity : '',
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
      benefitUnemployement : false,
      benefitTanf : false,
      benefitSsi : false,
      veteran : false,
      govBenefits : {
      },
      educationLevel: '',
      geoLocation : '',
      count : null,
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
    this.setState({
      name: event.target.name.value,
      age: event.target.age.value,
      social: event.target.social.value,
      ethnicity: event.target.ethnicity.value,
      shelterStatus: event.target.shelterStatus.value,
      shelterName:event.target.sshelterName.value,
      familyMembersTotal: event.target.familyMembersTotal.value
      familyMembersAdult: event.target.familyMembersAdult.value
      familyMembersChildren: event.target.familyMembersChildren.value
      homelessDate: event.target.homelessDate.value
      employmentStatus: event.target.employmentStatus.value
      employmentCurPay: event.target.employmentCurPay.value
      employmentLastEmployed: event.target.employmentLastEmployed.value
      benefitVeteran: event.target.benefitVeteran.value
      benefitWelfare: event.target.benefitWelfare.value
      benefitEbt: event.target.benefitEbt.value
      benefitUnemployement: event.target.benefitUnemployement.value
      benefitTanf: event.target.benefitTanf.value
      benefitSsi: event.target.benefitSsi.value
      educationLevel: event.target.educationLevel.value
    })
  }

  render() {
    // const { todo: { items } } = this.props;

    return (
      <form className='homeless-form' onSubmit={this._onSubmit}>
        <div className={styles.base}>
          <Input
            className={styles.input}
            placeholder="Name"
            onChange={this._onInputChange}
            value={this.state.name}
            name="name"
          />
          <Input
            className={styles.input}
            placeholder="Age"
            onChange={this._onInputChange}
            value={this.state.age}
            name="age"
          />
          <Input
            className={styles.input}
            placeholder="Ethnicity"
            onChange={this._onInputChange}
            value={this.state.ethnicity}
            name="ethnicity"
          />
          <Input
            className={styles.input}
            placeholder="Social Security Number"
            onChange={this._onInputChange}
            value={this.state.social}
            name="social"
          />
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
          <Input
            className={styles.input}
            placeholder="Total Family Members"
            onChange={this._onInputChange}
            value={this.state.familyMembersTotal}
            name="familyMembersTotal"
          />
          <Input
            className={styles.input}
            placeholder="Adult Family Members"
            onChange={this._onInputChange}
            value={this.state.familyMembersAdult}
            name="familyMembersAdult"
          />
          <Input
            className={styles.input}
            placeholder="Children Family Members"
            onChange={this._onInputChange}
            value={this.state.familyMembersChildren}
            name="familyMembersChildren"
          />
          <Input
            className={styles.input}
            placeholder="Date of Homelessness"
            onChange={this._onInputChange}
            value={this.state.homelessDate}
            name="homelessDate"
          />
          <Input
            className={styles.input}
            placeholder="Employement Status"
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
          <Input
            className={styles.input}
            placeholder="Employement Last Employed"
            onChange={this._onInputChange}
            value={this.state.employmentLastEmployed}
            name="employmentLastEmployed"
          />
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
          <Input
            className={styles.input}
            placeholder="EBT"
            onChange={this._onInputChange}
            value={this.state.benefitEbt}
            name="benefitEbt"
          />
          <Input
            className={styles.input}
            placeholder="Unemployement"
            onChange={this._onInputChange}
            value={this.state.benefitUnemployement}
            name="benefitUnemployement"
          />
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
          <Input
            className={styles.input}
            placeholder="Education Level"
            onChange={this._onInputChange}
            value={this.state.educationLevel}
            name="educationLevel"
          />
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
