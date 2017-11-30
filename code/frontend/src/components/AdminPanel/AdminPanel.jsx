import React from 'react';
import PropTypes from 'prop-types';
import css from './adminpanel.css';
import * as TABS from '../../constants/admin-tabs.js';

/**
 * Renders the main admin view with links to all tables
 * @param {function} onClick - Click handler for tab buttons
 * */
function AdminPanelComponent({onClick}) {
  return (
    <div data-qa="admin-wrapper" className={css.wrapper}>
      <div  className={css.heading}>
        <h1 data-qa="admin-header">Admin Panel</h1>
      </div>
      <div className={css.adminpanelbtn}>
        <button data-qa="hrroles" className={css.hrRoles}
          name={TABS.HR_ROLES}
          onClick={onClick}>
          HR Roles
        </button>
        <button className={css.skills}
          name={TABS.SKILLS}
          onClick={onClick}>
          Skills
        </button>
        <button className={css.fxtable}
          name={TABS.FX_TABLE}
          onClick={onClick}>
          FX table
        </button>
        <button className={css.paygrades}
          name={TABS.PAY_GRADES}
          onClick={onClick}>
          Pay Grades
        </button>
        <button className={css.hrmanagers}
          name={TABS.HIRING_MANAGERS}
          onClick={onClick}>
          Hiring Managers
        </button>
        <button className={css.users}
          name={TABS.USERS}
          onClick={onClick}>
          Users
        </button>
      </div>
    </div>
  );
}

AdminPanelComponent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AdminPanelComponent;