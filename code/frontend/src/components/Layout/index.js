import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TABS from '../../constants/tabs.js';
import Login from '../Login';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import AdminPanel from '../AdminPanel';
import AddContractor from '../AddContractor';
import ContractorInfo from '../ContractorInfo';
import Filtering from '../Filtering';
import Reports from '../Reports';
import User from '../User';
import css from './layout.css';

const mapStateToProps = (state) => {
  return {
    tab: state.main.tab,
    isLoading: state.main.isLoading,
    isLoggedIn: state.user.isLoggedIn
  };
};

function LayoutContainer({tab, isLoggedIn, isLoading}) {
  if (!isLoggedIn) {
    return <div>
      {isLoading ? <div className={css.spinner}></div> : null}
      <Login />
    </div>;
  }
  let child = null;
  switch (tab) {
    case TABS.ADMIN_PANEL:
      child = <AdminPanel />;
      break;
    case TABS.ADD_CONTRACTOR:
      child = <AddContractor />;
      break;
    case TABS.CONTRACTOR_INFO:
      child = <ContractorInfo />;
      break;
    case TABS.FILTERING:
      child = <Filtering />;
      break;
    case TABS.REPORTS:
      child = <Reports />;
      break;
    case TABS.DASHBOARD:
    default: // TODO: error page for default
      child = <Dashboard />;
      break;
  }
  return (
    <div className={css.wrapper}>
      {isLoading ? <div className={css.spinner}></div> : null}
      <User />
      <Navbar />
      <div className={css.content}>
        {child}
      </div>
    </div>
  );
}

LayoutContainer.propTypes = {
  tab: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const Layout = connect(
  mapStateToProps,
  null
)(LayoutContainer);

export default Layout;
