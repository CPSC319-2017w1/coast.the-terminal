import React from 'react';
import PropTypes from 'prop-types';
import css from './dashboard.css';

function DashboardComponent({onClick, tables}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Dashboard</h1>
      </div>
      {getPlaceholderTableList(tables)}
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

function getPlaceholderTableList(tables) {
  return <div>
    <hr/>
    {tables.skills.error ? <p>skills table error: {tables.skills.error}</p>
      : <div><p>Fetching skills table successful</p>{tables.skills.data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}</div>}
    <hr/>
    {tables.paygrades.error ? <p>paygrades table error: {tables.paygrades.error}</p>
      : <div><p>Fetching paygrades table successful</p>{tables.paygrades.data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}</div>}
    <hr/>
    {tables.hrRoles.error ? <p>hrRoles table error: {tables.hrRoles.error}</p>
      : <div><p>Fetching hrRoles table successful</p>{tables.hrRoles.data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}</div>}
    <hr/>
    {tables.hiringManagers.error ? <p>hiringManagers table error: {tables.hiringManagers.error}</p>
      : <div><p>Fetching hiringManagers table successful</p>{tables.hiringManagers.data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}</div>}
    <hr/>
    {tables.fxrates.error ? <p>fxrates table error: {tables.fxrates.error}</p>
      : <div><p>Fetching fxrates table successful</p>{tables.fxrates.data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}</div>}
    <hr/>
  </div>;
}

DashboardComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired
};

export default DashboardComponent;