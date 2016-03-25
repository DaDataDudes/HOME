import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import styles from './HumanList.css';
import { firebase } from 'actions/firebase';

class HumanList extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.documents.length !== this.props.documents.length;
  }

  componentWillMount() {
    this.props.dispatch(firebase.registerListeners());
  }

  render() {
    const { documents } = this.props;
    return (
      <div className={styles.griddle}>
        <Griddle results={documents} tableClassName="table" showFilter={true} showSettings={true}
                 resultsPerPage={20} enableInfiniteScroll={true} bodyHeight={550} useFixedHeader={true}
                 columns={["age", "ethnicity", "employmentCurPay", "veteran","educationLevel"]}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    documents: state.documents.list,
  };
}

export default connect(mapStateToProps)(HumanList);
