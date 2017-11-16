import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardComponent from './Dashboard.jsx';
import { viewTableRows } from '../../actions/view-tables-actions.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const mapDispatchToProps = dispatch => {
  return {
    viewTables: () => {
      dispatch(viewTableRows('skills'));
      dispatch(viewTableRows('fxrates'));
      dispatch(viewTableRows('paygrades'));
      dispatch(viewTableRows('hrroles'));
      dispatch(viewTableRows('hiringmanagers'));
    },
    logout: () => {
      // TODO - dispatch action to change isLoggedIn to false in state
      // Ideas: "<Welcome ${username}!> <Logout>"
    }
  };
};

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {

  }

  componentDidMount() {
    this.props.viewTables();
  }

  render() {
    return <DashboardComponent onClick={this.onClick} tables={this.props.tables} />;
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  viewTables: PropTypes.func.isRequired
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

export default Dashboard;
