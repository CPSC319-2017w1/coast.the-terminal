import React from 'react';
import PropTypes from 'prop-types';
import css from './dashboard.css';
import { FILTERING, CONTRACTOR_INFO , REPORTS, ADD_CONTRACTOR} from '../../constants/tabs.js';

/**
 * Creates html for dashboard component
 * @param onClick - function for buttons of the dashboard
 * @return React component for Dashboard
 */
function DashboardComponent({onClick}) {
  return (
    <div data-qa="dashboard-wrapper" className={css.wrapper}>
      <div className={css.heading}>
        <h1 data-qa="dashboard-header"> Dashboard</h1>
      </div>
      <div className={css.dashboardbtn}>
        <button data-qa="datafilterbtn" className={css.datafiltering}
          name={FILTERING}
          onClick={onClick}>
          Data Filtering System
        </button>
        <button data-qa="addbtn" className={css.addcontractor}
          name={ADD_CONTRACTOR}
          onClick={onClick}>
          Add Contractor
        </button>
        <button data-qa="infobtn" className={css.contractorinfo}
          name={CONTRACTOR_INFO}
          onClick={onClick}>
          Contractor Information
        </button>
        <button data-qa="reportsbtn" className={css.reports}
          name={REPORTS}
          onClick={onClick}>
          Reports
        </button>
      </div>
    </div>
  );
}

DashboardComponent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DashboardComponent;
