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
          <th>Edit</th>
          {keys.map((key, index) => key === 'id' ? null : <th key={index}>{DISPLAY_NAME[key]}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => {
          let button = <button onClick={edit}>Edit</button>;;
          if (editingRow !== '') {
            button = editingRow === row.id ? <button onClick={edit}>Cancel</button> : <span></span>;
          }
          return <tr key={rowIndex} name={row.id}>
            <td>{button}</td>
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
  edit: null
};

Table.propTypes = {
  table: PropTypes.array.isRequired,
  addNew: PropTypes.func,
  edit: PropTypes.func,
  editingRow: PropTypes.string.isRequired,
  isAddingNew: PropTypes.bool.isRequired
};

export default Table;
