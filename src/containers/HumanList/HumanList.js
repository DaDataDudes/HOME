import React, { Component } from 'react';
import Rebase from 're-base';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import styles from './HumanList.css';
import { firebase } from 'actions/firebase';
import { FIREBASE_URL } from 'config';
const base = Rebase.createClass(FIREBASE_URL);

class HumanList extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.documents.length !== this.props.documents.length;
  }

  componentWillMount() {
    base.listenTo(`documents`, {
      context: this,
      state: 'documents',
      asArray: true,
      then(data){
        this.props.dispatch(firebase.syncData(data));
      }
    });
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
