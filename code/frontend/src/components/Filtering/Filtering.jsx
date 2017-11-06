import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';

function renderTable(table) {
  return table;
}


function FilteringComponent({table, handleFilter}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Data Filtering System</h1>
        <p>Use the Filter Table button to extract relevant to you from the contractor database.</p>
        <button className={css.filterbutton}
          onClick={handleFilter}>
          Filter Table
        </button>
      </div>
      <div className={css.filtertable}>
        {renderTable(table)}
      </div>
    </div>
  );
}

FilteringComponent.propTypes = {
  table: PropTypes.object.isRequired,
  handleFilter: PropTypes.func.isRequired
};

export default FilteringComponent;