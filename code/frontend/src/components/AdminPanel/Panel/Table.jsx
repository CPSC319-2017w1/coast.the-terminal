import React from 'react';
import PropTypes from 'prop-types';
import { DISPLAY_NAME } from '../../../constants/admin-tables.js';

function Table({ table, addNew, edit, editingRow, isAddingNew }) {
  const keys = Object.keys(table[0]);
  return <div>
    {addNew === null ? null : <button onClick={addNew}>{isAddingNew ? 'Cancel' : 'Add New Row'}</button>}
    <table>
      <thead>
        <tr>
          {edit === null ? null : <th>Edit</th>}
          {keys.map((key, index) => key === 'id' ? null : <th key={index}>{DISPLAY_NAME[key]}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => {
          let button = null;
          if (editingRow !== '') {
            button = editingRow === row.id || editingRow === row.username ? <button onClick={edit}>Cancel</button> : <span></span>;
          } else if (edit !== null) {
            button = <button onClick={edit}>Edit</button>;
          }
          return <tr key={rowIndex} name={row.username ? row.username : row.id}>
            {edit === null ? null : <td>{button}</td>}
            {keys.map((column, columnIndex) => column === 'id' ? null
              : <td key={`${rowIndex}_${columnIndex}`} name={column}>{row[column]}</td>)}
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
}

Table.defaultProps = {
  addNew: null,
  edit: null,
  isAddingNew: false,
  editingRow: ''
};

Table.propTypes = {
  table: PropTypes.array.isRequired,
  addNew: PropTypes.func,
  edit: PropTypes.func,
  editingRow: PropTypes.string,
  isAddingNew: PropTypes.bool
};

export default Table;
