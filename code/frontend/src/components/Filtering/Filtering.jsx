import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';
import Table from './Table.jsx';
import FilterPanel from './FilterPanel.jsx';


function FilteringComponent({filters, filterStatus, tabledata, handleFilter, handleEditContractor, applyFilter}) {
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
      {filterStatus
        ? <FilterPanel filters={filters} applyFilter={applyFilter}/>
        : null}
      <div className={css.tableholder}>
        <Table tabledata={tabledata} handleEditContractor={handleEditContractor}/>
      </div>
    </div>
  );
}



FilteringComponent.propTypes = {
  filters: PropTypes.array.isRequired,
  filterStatus: PropTypes.bool.isRequired,
  tabledata: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleEditContractor: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired
};

export default FilteringComponent;