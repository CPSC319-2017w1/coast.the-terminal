import React from 'react';
import css from './filtering.css';
import PivotTable from './PivotTable.js';


function FilteringComponent() {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Data Filtering System</h1>
        <p>Use the Pivot Table to extract relevant to you from the contractor database.</p>
      </div>
      <div className={css.tableholder}>
        <PivotTable/>
      </div>
    </div>
  );
}



export default FilteringComponent;