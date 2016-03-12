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
      name :
      age :
      social :
      ethnicity :
      curLive : {
        status :
        shelName :
      }
      familyMembers : {
        total :
        adult : []
        children : []
      }
      homelessDate :
      employementStatus : {
        status :
        curPay :
        lastEmployed :
      }
      veteran :
      govBenefits : {
        //research benefits
      }
      education : {
        school :
        training :
      }
      geoLocation :
      count :
    };
  }

  _onInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  _onInputEnter(event) {
    const item = event.target.value.trim();

    if (event.which === 13 && item) {
      this.props.dispatch(addItem(item));
      this.setState({ inputValue: '' });
    }
  }

  render() {
    const { todo: { items } } = this.props;
    console.log(items);

    return (
      <div className={styles.base}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            placeholder="Enter new item"
            onChange={this._onInputChange}
            onKeyDown={this._onInputEnter}
            value={this.state.inputValue}
          />
        </div>
        <List items={items} />
        <Link to="/counter">Counter</Link>
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
