import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReportsComponent from './Reports.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};

class ReportsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return <ReportsComponent/>;
  }
}

ReportsContainer.propTypes= {
  user: PropTypes.object.isRequired
};

const Reports = connect(
  mapStateToProps,
  null
)(ReportsContainer);

export default Reports;
