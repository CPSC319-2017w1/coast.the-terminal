import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TABS from '../../constants/admin-tabs.js';
import AdminPanelComponent from './AdminPanel.jsx';
import FXTable from './Tabs/FXTable.jsx';
import HiringManagers from './Tabs/HiringManagers.js';
import PayGrades from './Tabs/PayGrades.js';
import Skills from './Tabs/Skills.js';
import Users from './Tabs/Users.js';
import HRRoles from './Tabs/HRRoles.js';
import { viewTableRows } from '../../actions/view-tables-actions.js';
import { isLoading, hasStoppedLoading } from '../../actions/main-actions';
import { TABLE_NAMES } from '../../constants/admin-tables.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTables: () => {
      dispatch(isLoading());
      dispatch(viewTableRows(TABLE_NAMES.USERS));
      dispatch(viewTableRows(TABLE_NAMES.FX_RATES));
      dispatch(viewTableRows(TABLE_NAMES.HIRING_MANAGERS));
      dispatch(viewTableRows(TABLE_NAMES.HR_ROLES));
      dispatch(viewTableRows(TABLE_NAMES.PAY_GRADES));
      dispatch(viewTableRows(TABLE_NAMES.SKILLS));
    },
    stopLoading: () => {
      dispatch(hasStoppedLoading());
    }
  };
};

class AdminPanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: TABS.MAIN
    };
    this.onClick = this.onClick.bind(this);
    this.onReturn = this.onReturn.bind(this);
  }

  onClick(event){
    event.preventDefault();
    this.setState({ tab: event.target.getAttribute('name') });
  }

  onReturn(event){
    event.preventDefault();
    this.setState({ tab: TABS.MAIN });
  }

  componentWillReceiveProps(nextProps) {
    const {tables} = nextProps;
    let tablesCalled = 0;
    for (const tableName in tables) {
      if (tables.hasOwnProperty(tableName)) {
        const table = tables[tableName];
        if (table.data.length > 0 || table.error) {
          tablesCalled++;
        }
      }
    }
    if (tablesCalled === 6) {
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getTables();
  }

  render(){
    switch (this.state.tab) {
      case TABS.FX_TABLE:
        return <FXTable table={this.props.tables.fxrates} onReturn={this.onReturn} />;
      case TABS.HIRING_MANAGERS:
        return <HiringManagers onReturn={this.onReturn} />;
      case TABS.PAY_GRADES:
        return <PayGrades onReturn={this.onReturn} />;
      case TABS.SKILLS:
        return <Skills onReturn={this.onReturn} />;
      case TABS.USERS:
        return <Users onReturn={this.onReturn} />;
      case TABS.HR_ROLES:
        return <HRRoles onReturn={this.onReturn} />;
      case TABS.MAIN:
      default:
        return <AdminPanelComponent onClick={this.onClick} />;
    }
  }
}

AdminPanelContainer.propTypes= {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  getTables: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired
};

const AdminPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanelContainer);

export default AdminPanel;
