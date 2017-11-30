import React from 'react';
import PropTypes from 'prop-types';
import css from './contractorinfo.css';

/**
 * Creates html component for Table
 * @param tabledata - array of objects that table is supposed to be populated with
 * @param handleEditContractor - function that takes the id of the contractor and populates edit contractor page
 * @return React component for Table
 */
function Table({tabledata, handleEditContractor}) {
  return <table className={css.filtertable}>
    <thead className={css.tableheader}>
      <tr>
        {getHeaders(tabledata)}
      </tr>
    </thead>
    <tbody className={css.tablebody}>
      {getRows(tabledata, handleEditContractor)}
    </tbody>
  </table>;
}

/**
 * Generates the header for the table
 * @param data
 * @return {Array} - array of header options
 */
function getHeaders(data) {
  var headers = [];
  headers.push(<th></th>);
  if(data.length > 0) {
    let firstRow = data[0];
    for(let fieldName in firstRow) {
      if(firstRow.hasOwnProperty(fieldName) && fieldName !== 'id') {
        headers.push((
          <th>{fieldName}</th>
        ));
      }
    }
  }
  return headers;
}

/**
 * Generates the rows in the table
 * @param data - data to be populated in the rows
 * @param func - function for the edit button
 * @return row for each contractor
 */
function getRows(data, func) {
  return data.map((contractor, index) =>
    <tr key={index} className={css.tablerow}>
      <td>
        <button name={contractor.id} className={css.editbtn} onClick={func}>EDIT</button>
      </td>
      {getColumns(contractor)}
    </tr>
  );
}

/**
 * Generates the columns in the table
 * @param contractorData - data to be populated in the columns
 * @return {Array} - returns columns in each row.
 */
function getColumns(contractorData) {
  let cols = [];
  for(let contractorField in contractorData) {
    if(contractorData.hasOwnProperty(contractorField) && contractorField !== 'id') {
      cols.push((
        <td className={css.columns} key={contractorField}>{contractorData[contractorField]}</td>
      ));
    }
  }
  return cols;
}

Table.propTypes = {
  tabledata: PropTypes.array.isRequired,
  handleEditContractor: PropTypes.func.isRequired
};

export default Table;