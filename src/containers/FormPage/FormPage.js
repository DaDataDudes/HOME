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

  render() {
    // const { todo: { items } } = this.props;

    return (
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
          placeholder="Total Family Members"
          onChange={this._onInputChange}
          value={this.state.familyMembersAdult}
          name="familyMembersTotal"
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
          placeholder="Number of Adults"
          onChange={this._onInputChange}
          value={this.state.familyMembersTotal}
          name="familyMembersAdult"
        />
        <Input
          className={styles.input}
          placeholder="Number of Children"
          onChange={this._onInputChange}
          value={this.state.familyMembersTotal}
          name="familyMembersChildren"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo
  };
}

export default connect(mapStateToProps)(FormPage);
