import React from 'react';
import css from './reports.css';
import PropTypes from 'prop-types';
import ReportBuilder from './ReportBuilder.js';
import TableBuilder from './TableBuilder.js';
import Tutorial from './Tutorial.jsx';

function ReportsComponent({showTutorial, showTable, handleTable, handleReport, handleTutorial, closeTutorial}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Trending Reports</h1>
        <p>Use the Reports generator to view trending reports</p>
        <button className={css.handletutorial} onClick={handleTutorial}>Show/hide tutorial for the graph</button>
      </div>
      {showTutorial
        ? <Tutorial closeTutorial={closeTutorial}/>
        : null}
      <button className={css.tab} onClick={handleTable}>Contractor Report</button>
      <button className={css.tab} onClick={handleReport}>Trending Report</button>
      <div className={css.reportholder}>
        {showTable
          ?<TableBuilder/>
          :<ReportBuilder/>}
      </div>
    </div>
  );
}

ReportsComponent.propTypes = {
  showTutorial: PropTypes.bool.isRequired,
  showTable: PropTypes.bool.isRequired,
  handleTable: PropTypes.func.isRequired,
  handleReport: PropTypes.func.isRequired,
  handleTutorial: PropTypes.func.isRequired,
  closeTutorial: PropTypes.func.isRequired
};

export default ReportsComponent;