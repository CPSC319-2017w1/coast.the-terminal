import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TABS from '../../constants/admin-tabs.js';
import AdminPanelComponent from './AdminPanel.jsx';
import FXTable from './Panel/FXTable.jsx';
import HiringManagers from './Panel/HiringManagers.jsx';
import PayGrades from './Panel/PayGrades.jsx';
import Skills from './Panel/Skills.jsx';
import Users from './Panel/Users.jsx';
import HRRoles from './Panel/HRRoles.jsx';
import { viewUsers } from '../../actions/view-tables-actions.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(viewUsers());
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
    const {tables} = this.props;
    switch (this.state.tab) {
      case TABS.FX_TABLE:
        return <FXTable table={tables.fxrates} onReturn={this.onReturn} />;
      case TABS.HIRING_MANAGERS:
        return <HiringManagers table={tables.hiringManagers} onReturn={this.onReturn} />;
      case TABS.PAY_GRADES:
        return <PayGrades table={tables.paygrades} onReturn={this.onReturn} />;
      case TABS.SKILLS:
        return <Skills table={tables.skills} onReturn={this.onReturn} />;
      case TABS.USERS:
        return <Users table={tables.users} onReturn={this.onReturn} />;
      case TABS.HR_ROLES:
        return <HRRoles table={tables.hrRoles} onReturn={this.onReturn} />;
      case TABS.MAIN:
      default:
        return <AdminPanelComponent onClick={this.onClick} />;
    }
  }
}

AdminPanelContainer.propTypes= {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const AdminPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanelContainer);

export default AdminPanel;
