import React from 'react';
import PropTypes from 'prop-types';
import css from './contractorinfo.css';

function Table({tabledata, handleEditContractor}) {
  return <table className={css.filtertable}>
    <thead className={css.tableheader}>
      {/*Main header, will dynamically change based on filter*/}
      <tr>
        {getHeaders(tabledata)}
      </tr>
    </thead>
    <tbody className={css.tablebody}>
    {getRows(tabledata, handleEditContractor)}
    </tbody>
  </table>;
}

function getHeaders(data) {
  var headers = [];
  headers.push(<th></th>);
  if(data.length > 0) {
    let firstRow = data[0];
    for(let fieldName in firstRow) {
      if(firstRow.hasOwnProperty(fieldName)) {
        headers.push((
          <th>{fieldName}</th>
        ));
      }
    }
  }
  return headers;
}

function getRows(data, func) {
  return data.map((contractor) =>
      <tr key={contractor.id} className={css.tablerow}>
        <td key={contractor.id}>
          <button name={contractor.id} className={css.editbtn} onClick={func}>EDIT</button>
        </td>
        {getColumns(contractor)}
      </tr>
  );
}

function getColumns(contractorData) {
  let cols = [];
  for(let contractorField in contractorData) {
    if(contractorData.hasOwnProperty(contractorField)) {
      cols.push((
        <td key={contractorField}>{contractorData[contractorField]}</td>
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