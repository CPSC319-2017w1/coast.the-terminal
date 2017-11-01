import React from 'react';
import PropTypes from 'prop-types';
import css from './navbar.css';
import * as TABS from '../../constants/tabs.js';

function NavbarComponent({username, isAdmin, tab, onClick}) {
  return (
    <div className={css.wrapper}>
      <div className={css.usertype}>
        Logged in as <strong>{username}</strong>
      </div>
      <div>
        <ul>
          <li className={getClassName(tab, TABS.DASHBOARD)}
            name={TABS.DASHBOARD}
            onClick={onClick}>
            Dashboard
          </li>
          <li className={getClassName(tab, TABS.FILTERING)}
            name={TABS.FILTERING}
            onClick={onClick}>
            Data Filtering System
          </li>
          <li className={getClassName(tab, TABS.CONTRACTOR_INFO)}
            name={TABS.CONTRACTOR_INFO}
            onClick={onClick}>
            Contractor Information
          </li>
          <li className={getClassName(tab, TABS.REPORTS)}
            name={TABS.REPORTS}
            onClick={onClick}>
            Reports
          </li>
          {
            isAdmin
              ? <li className={getClassName(tab, TABS.ADMIN_PANEL)}
                name={TABS.ADMIN_PANEL}
                onClick={onClick}>
                Admin Panel
              </li>
              : null
          }
          <li className={getClassName(tab, TABS.SETTINGS)}
            name={TABS.SETTINGS}
            onClick={onClick}>
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
}

function getClassName(selectedTab, currentTab) {
  return selectedTab === currentTab ? css.selected : css.option;
}

NavbarComponent.propTypes = {
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavbarComponent;