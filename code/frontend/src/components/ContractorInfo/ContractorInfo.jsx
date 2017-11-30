import React from 'react';
import PropTypes from 'prop-types';
import css from './contractorinfo.css';
import Table from './Table.jsx';

/**
 * Creates the contractor info component
 * @param tabledata - contractor info to be rendered
 * @param searchvalue - value in the search text box
 * @param handleSearch - function that handles the search for contractors
 * @param handleEditContractor - function that redirects to edit page
 * @return Html component for contractor info component
 */
function ContractorInfoComponent({tabledata, searchvalue, handleSearch, handleEditContractor}) {
  return (
    <div className={css.wrapper}>
      <h1>Contractor Information</h1>
      <br/>
      <input className={css.searchbar} name="searchBar" type="text" value={searchvalue} onChange={handleSearch} placeholder="Search by Contractor Name"/>
      <br/>
      <Table tabledata={tabledata} handleEditContractor={handleEditContractor}/>
    </div>);
}

ContractorInfoComponent.PropTypes = {
  tabledata: PropTypes.array.isRequired,
  searchvalue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleEditContractor: PropTypes.func.isRequired
};

export default ContractorInfoComponent;