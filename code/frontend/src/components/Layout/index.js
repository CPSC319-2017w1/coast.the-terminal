import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import cx from 'classnames';
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

const mapStateToProps = (state, ownProps) => {
  return {
    tab: ownProps.cookies.get('tab') ? ownProps.cookies.get('tab') : state.main.tab,
    isLoading: state.main.isLoading,
    isLoggedIn: state.user.isLoggedIn
  };
};

/**
 * Defines the layout of the page
 * @param tab - current tab
 * @param isLoggedIn - boolean that return true if user is logged in
 * @param isLoading - boolean that returns true if page is loading
 * @return {XML} for the entire page
 */
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
      <div className={cx(css.content, isChrome() ? css.relative : css.absolute)}>
        {child}
      </div>
    </div>
  );
}

/**
 *
 * @return {boolean|string}
 */
function isChrome() {
  return typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.indexOf('Chrome') > -1;
}

LayoutContainer.propTypes = {
  tab: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

const Layout = connect(
  mapStateToProps,
  null
)(LayoutContainer);

export default withCookies(Layout);
