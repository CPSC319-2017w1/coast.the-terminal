import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';

function Table({tabledata, handleEditContractor}) {
  return <table className={css.filtertable}>
    <thead className={css.tableheader}>
      {/*Main header, will dynamically change based on filter*/}
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Company</th>
        <th>Reporting Manager</th>
        <th>PO Reference</th>
      </tr>
    </thead>
    <tbody className={css.tablebody}>
      {getRows(tabledata, handleEditContractor)}
    </tbody>
  </table>;
}

function getRows(data, func) {
  return data.map((i) =>
    <tr key={i.id} className={css.tablerow}>
      <td key={i.id}>
        <p>{i.id}</p>
        <button className={css.editbtn} onClick={func}>EDIT</button>
      </td>
      {/*This also will dynamically change based on filter*/}
      <td key={i.fname}>{i.fname}</td>
      <td key={i.lname}>{i.lname}</td>
      <td key={i.company}>{i.company}</td>
      <td key={i.reporting_manager}>{i.reporting_manager}</td>
      <td key={i.po_ref}>{i.po_ref}</td>
    </tr>
  );
}

Table.propTypes = {
  tabledata: PropTypes.array.isRequired,
  handleEditContractor: PropTypes.func.isRequired
};

export default Table;