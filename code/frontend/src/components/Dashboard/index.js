import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isAdmin: state.user.isAdmin
  };
};

function DashboardContainer({ isAdmin }) {
  return <div>Logged in as a user <strong>{isAdmin ? 'with' : 'without'}</strong> admin privileges.</div>;
}

DashboardContainer.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

const Dashboard = connect(
  mapStateToProps,
  null
)(DashboardContainer);

export default Dashboard;
