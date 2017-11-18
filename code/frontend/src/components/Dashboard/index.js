import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardComponent from './Dashboard.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

  render() {
    return <DashboardComponent onClick={this.onClick} />;
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

export default Dashboard;

