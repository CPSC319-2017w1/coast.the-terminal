import React from 'react';
import PropTypes from 'prop-types';
import { DISPLAY_NAME } from '../../../constants/admin-tables.js';

function Table({ table, addNew, edit }) {
  const keys = Object.keys(table[0]);
  return <div>
    {addNew === null ? null : <button onClick={addNew}>Add New Row</button>}
    <table>
      <thead>
        <tr>
          <th>Edit</th>
          {keys.map((key, index) => isId(key) ? null : <th key={index}>{DISPLAY_NAME[key]}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => {
          return <tr key={rowIndex}>
            <td><button onClick={edit}>Edit</button></td>
            {keys.map((column, columnIndex) => isId(column) ? null
              : <td key={`${rowIndex}_${columnIndex}`} name={column}>{row[column]}</td>)}
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
}

function isId(key) {
  const lowerKey = key.toLowerCase();
  return lowerKey === 'id' || lowerKey === 'userid';
}

Table.defaultProps = {
  addNew: null,
  edit: null
};

Table.propTypes = {
  table: PropTypes.array.isRequired,
  addNew: PropTypes.func,
  edit: PropTypes.func
};

export default Table;
