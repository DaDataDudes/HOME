import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import styles from './HumanList.css';
import { firebase } from 'actions/firebase';

class HumanList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(firebase.registerListeners());
  }

  render() {
    const { documents } = this.props;
    return (
      <div className={styles.griddle}>
        <Griddle results={documents} tableClassName="table" showFilter={true} showSettings={true}
                 resultsPerPage={20} enableInfiniteScroll={false} bodyHeight={550} useFixedHeader={true}
                 columns={["age", "shelterStatus", "ethnicity", "veteran","educationLevel"]} />
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
