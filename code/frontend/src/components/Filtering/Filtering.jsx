import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';
import PivotTable from './PivotTable.js';
import Tutorial from './Tutorial.jsx';

/**
 * Creates html component for Filtering
 * @param showTutorial - boolean that returns true when tutorial is shown
 * @param handleTutorial - function that handles visibility of tutorial
 * @param closeTutorial - function that closes the tutorial
 * @return React component for Filtering
 */
function FilteringComponent({showTutorial, handleTutorial, closeTutorial}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Data Filtering System</h1>
        <p>Use the Pivot Table to extract relevant to you from the contractor database.</p>
        <button className={css.handletutorial} onClick={handleTutorial}>Show/hide tutorial for the pivot table</button>
      </div>
      {showTutorial
        ? <Tutorial closeTutorial={closeTutorial}/>
        : null}
      <div className={css.tableholder}>
        <PivotTable/>
      </div>
    </div>
  );
}

FilteringComponent.propTypes = {
  showTutorial: PropTypes.bool.isRequired,
  handleTutorial: PropTypes.func.isRequired,
  closeTutorial: PropTypes.func.isRequired
};


export default FilteringComponent;