import React from 'react';
import PropTypes from 'prop-types';
import css from './navbar.css';
import * as TABS from '../../constants/tabs.js';

function NavbarComponent({username, isAdmin, tab, onClick}) {
  return (
    <div className={css.wrapper}>
      <div className={css.usertype}>
        <img className={css.logo} src={require('../../../../../design/Coast.png')} alt="logo"/>
      </div>
      <div>
        <ul>
          <li className={getClassName(tab, TABS.DASHBOARD)}
            name={TABS.DASHBOARD}
            onClick={onClick}>
            <img className={css.dash} src={require('../../../../../design/home.png')} alt="home"/>
            <p> Dashboard
            </p>
          </li>
          <li className={getClassName(tab, TABS.FILTERING)}
            name={TABS.FILTERING}
            onClick={onClick}>
              <img className={css.filter} src={require('../../../../../design/filter.png')} alt="home"/>
            <p>Data Filtering System</p>
          </li>
          <li className={getClassName(tab, TABS.ADD_CONTRACTOR)}
            name={TABS.ADD_CONTRACTOR}
            onClick={onClick}>
              <img className={css.add} src={require('../../../../../design/add.png')} alt="home"/>
            <p>Add Contractor</p>
          </li>
          <li className={getClassName(tab, TABS.CONTRACTOR_INFO)}
            name={TABS.CONTRACTOR_INFO}
            onClick={onClick}>
              <img className={css.info} src={require('../../../../../design/info.png')} alt="home"/>
            <p>Contractor Information</p>
          </li>
          <li className={getClassName(tab, TABS.REPORTS)}
            name={TABS.REPORTS}
            onClick={onClick}>
              <img className={css.rep} src={require('../../../../../design/repoorts.png')} alt="home"/>
            <p>Reports
            </p>
          </li>
          {
            isAdmin
              ? <li className={getClassName(tab, TABS.ADMIN_PANEL)}
                name={TABS.ADMIN_PANEL}
                onClick={onClick}>
                  <img className={css.admin} src={require('../../../../../design/admin.png')} alt="home"/>
                <p>Admin Panel
                </p>
              </li>
              : null
          }
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