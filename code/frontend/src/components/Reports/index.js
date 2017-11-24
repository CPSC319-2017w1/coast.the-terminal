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
    this.state = {
      showTutorial: false,
      showTable: true
    };
    this.handleTutorial = this.handleTutorial.bind(this);
    this.handleTable = this.handleTable.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.closeTutorial = this.closeTutorial.bind(this);
  }

  handleTutorial(event) {
    event.preventDefault();
    this.setState({
      showTutorial: !this.state.showTutorial
    });
  }

  handleTable(event){
    event.preventDefault();
    this.setState({
      showTable: true
    });
  }

  handleReport(event){
    event.preventDefault();
    this.setState({
      showTable: false
    });
  }

  closeTutorial(event){
    event.preventDefault();
    this.setState({
      showTutorial: false
    });
  }

  render(){
    return <ReportsComponent
      showTutorial={this.state.showTutorial}
      showTable={this.state.showTable}
      handleTable={this.handleTable}
      handleReport={this.handleReport}
      handleTutorial={this.handleTutorial}
      closeTutorial={this.closeTutorial}/>;
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
