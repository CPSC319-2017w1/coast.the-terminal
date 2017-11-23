import React from 'react';
import css from './reports.css';
import PropTypes from 'prop-types';
import ReportBuilder from './ReportBuilder.js';
import Tutorial from './Tutorial.jsx';

function ReportsComponent({showTutorial, handleTutorial, closeTutorial}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Trending Reports</h1>
        <p>Use the Reports generator to view trending reports</p>
        <button onClick={handleTutorial}>How to use the graph</button>
      </div>
      {showTutorial
        ? <Tutorial closeTutorial={closeTutorial}/>
        : null}
      <div className={css.reportholder}>
        <ReportBuilder/>
      </div>
    </div>
  );
}

ReportsComponent.propTypes = {
  showTutorial: PropTypes.bool.isRequired,
  handleTutorial: PropTypes.func.isRequired,
  closeTutorial: PropTypes.func.isRequired
};

export default ReportsComponent;