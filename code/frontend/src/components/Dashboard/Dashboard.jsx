import React from 'react';
import PropTypes from 'prop-types';
import css from './dashboard.css';

function DashboardComponent({onClick}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Dashboard</h1>
      </div>
      <div className={css.dashboardbtn}>
        <button className={css.datafiltering}
          onClick={onClick}>
          Data Filtering System
        </button>
        <button className={css.contractorinfo}
          onClick={onClick}>
          Contractor Information
        </button>
        <button className={css.reports}
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