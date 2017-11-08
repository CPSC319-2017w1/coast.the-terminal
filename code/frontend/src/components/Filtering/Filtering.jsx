import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';
import Table from './Table.jsx';


function FilteringComponent({tabledata, handleFilter, handleEditContractor}) {
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
        <Table tabledata={tabledata} handleEditContractor={handleEditContractor}/>
      </div>
    </div>
  );
}



FilteringComponent.propTypes = {
  tabledata: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleEditContractor: PropTypes.func.isRequired
};

export default FilteringComponent;