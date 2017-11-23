import React from 'react';
import PropTypes from 'prop-types';
import css from './dashboard.css';
import { FILTERING, CONTRACTOR_INFO , REPORTS} from '../../constants/tabs.js';

function DashboardComponent({onClick}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Dashboard</h1>
      </div>
      <div className={css.dashboardbtn}>
        <button className={css.datafiltering}
          name={FILTERING}
          onClick={onClick}>
          Data Filtering System
        </button>
        <button className={css.addcontractor}
        onClick={onClick}>
          Add Contractor
        </button>
        <button className={css.contractorinfo}
          name={CONTRACTOR_INFO}
          onClick={onClick}>
          Contractor Information
        </button>
        <button className={css.reports}
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