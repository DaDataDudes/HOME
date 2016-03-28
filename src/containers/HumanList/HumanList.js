import React, { Component } from 'react';
import base from 'rebase';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import styles from './HumanList.css';
import { firebase } from 'actions/firebase';
import { formattedColumns } from './formattedColumnList';


class HumanList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.ref = base.listenTo(`documents`, {
      context: this,
      state: 'documents',
      asArray: true,
      then(data){
        this.props.dispatch(firebase.syncData(data));
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    const { documents } = this.props;
    return (
      <div className={styles.griddle}>
        <Griddle results={documents} tableClassName="table" showFilter={true} showSettings={true}
                 resultsPerPage={20} enableInfiniteScroll={true} bodyHeight={550} useFixedHeader={true}
                 columns={["age", "ethnicity", "employmentCurPay", "veteran","educationLevel"]}
                 columnMetadata={formattedColumns}/>
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
