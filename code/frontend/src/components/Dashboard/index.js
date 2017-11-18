import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';

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

const data = [ ['attribute', 'attribute2'], ['value1', 'value2'] ];

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return <PivotTableUI
      data={data} onChange={s => this.setState(s)}
      renderers={Object.assign({}, TableRenderers)}
    />;
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
