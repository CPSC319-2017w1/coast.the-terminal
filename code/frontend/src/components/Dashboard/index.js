import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardComponent from './Dashboard.jsx';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(){

  }

  render(){
    return <DashboardComponent
      onClick={this.onClick}
    />;
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired
};

const Dashboard = connect(
  mapStateToProps,
  null
)(DashboardContainer);

export default Dashboard;
