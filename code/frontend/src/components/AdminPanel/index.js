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

const mapStateToProps = state => {
  return {
    user: state.user,
    fxrates: state.tables.fxrates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(viewTableRows('users'));
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

  componentDidMount() {
    this.props.getUsers();
  }

  render(){
    switch (this.state.tab) {
      case TABS.FX_TABLE:
        return <FXTable table={this.props.fxrates} onReturn={this.onReturn} />;
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
  fxrates: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const AdminPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanelContainer);

export default AdminPanel;
