import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
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
    tables: state.tables,
    isLoading: state.main.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTables: (token) => {
      dispatch(isLoading());
      dispatch(viewTableRows(TABLE_NAMES.USERS, token));
      dispatch(viewTableRows(TABLE_NAMES.FX_RATES, token));
      dispatch(viewTableRows(TABLE_NAMES.HIRING_MANAGERS, token));
      dispatch(viewTableRows(TABLE_NAMES.HR_ROLES, token));
      dispatch(viewTableRows(TABLE_NAMES.PAY_GRADES, token));
      dispatch(viewTableRows(TABLE_NAMES.SKILLS, token));
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
    if (nextProps.isLoading) {
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getTables(this.props.cookies.get('token'));
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
  stopLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

const AdminPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanelContainer);

export default withCookies(AdminPanel);
