import React from 'react';
import PropTypes from 'prop-types';
import css from './contractorinfo.css';
import Table from './Table.jsx';

function ContractorInfoComponent({tabledata, searchvalue, handleSearch, handleEditContractor}) {
  return (
    <div className={css.wrapper}>
    <h1>Contractor Information</h1>
    <br/>
    <input className={css.searchbar} name="searchBar" type="text" value={searchvalue} onChange={handleSearch} placeholder="Search by Contractor Name..."/>
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