import React from 'react';
import css from './reports.css';
import PropTypes from 'prop-types';
import ReportBuilder from './ReportBuilder.js';
import TableBuilder from './TableBuilder.js';
import Tutorial from './Tutorial.jsx';

/**
 * Creates html component for Filtering
 * @param showTutorial - boolean that returns true when tutorial is shown
 * @param showTable - boolean that returns true when info is shown
 * @param handleTable - function that handles visibility of list view of trending report
 * @param handleReport - function that handles visibility of graph view view of trending report
 * @param handleTutorial - function that handles visibility of tutorial
 * @param closeTutorial - function that closes the tutorial
 * @return React component for Reports
 */
function ReportsComponent({showTutorial, showTable, handleTable, handleReport, handleTutorial, closeTutorial}) {
  return (
    <div data-qa="reports-wrapper" className={css.wrapper}>
      <div className={css.heading}>
        <h1 data-qa="reports-header">Trending Reports</h1>
        <p>Use the Reports generator to view trending reports</p>
        <button className={css.handletutorial} onClick={handleTutorial}>Show/hide tutorial for the graph</button>
      </div>
      {showTutorial
        ? <Tutorial closeTutorial={closeTutorial}/>
        : null}
      <button className={css.tab} onClick={handleTable}>List Items</button>
      <button className={css.tab} onClick={handleReport}>Charts</button>
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