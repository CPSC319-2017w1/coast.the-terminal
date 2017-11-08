import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';

function Table({tabledata, handleEditContractor}) {
  return <table>
    {getRows(tabledata, handleEditContractor)}
  </table>;
}

function getRows(data, func) {
  return data.map((i) =>
    <tr key={i.name} className={css.tablerow}>
      <td key={i.name}><button className={css.editbtn} onClick={func}>EDIT</button></td>
      <td key={i.name}>{i.name}</td>
      <td key={i.id}>{i.id}</td>
      <td key={i.price}>{i.price}</td>
    </tr>
  );
}

Table.propTypes = {
  tabledata: PropTypes.array.isRequired,
  handleEditContractor: PropTypes.func.isRequired
};

export default Table;