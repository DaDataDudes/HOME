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
      currentLiving : '',
      currentLivingStatus:'',
      currentLivingShelterName:'',
      familyMembers : null,
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
      education : {
        school : '',
        training : '',
      },
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
          placeholder=""
          onChange={this._onInputChange}
          value={this.state.social}
          name="social"
        />
        <Input
          className={styles.input}
          placeholder="Current Living"
          onChange={this._onInputChange}
          value={this.state.currentLiving}
          name="currentLiving"
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
