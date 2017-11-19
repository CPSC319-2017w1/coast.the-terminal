import React from 'react';
import css from './reports.css';
import ReportBuilder from './ReportBuilder.js';

function ReportsComponent() {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Trending Reports</h1>
        <p>Use the Reports generator to view trending reports</p>
      </div>
      <div className={css.reportholder}>
        <ReportBuilder/>
      </div>
    </div>
  );
}

export default ReportsComponent;