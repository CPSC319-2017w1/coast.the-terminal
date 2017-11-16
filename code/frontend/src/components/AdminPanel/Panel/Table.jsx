import React from 'react';
import PropTypes from 'prop-types';
import { DISPLAY_NAME } from '../../../constants/admin-tables-headers.js';

function Table({ table, addNew }) {
  const keys = Object.keys(table[0]);
  return <div>
    {addNew === null ? null : <button onClick={addNew}>Add New Row</button>}
    <table>
      <thead>
        <tr>
          {keys.map((key, index) => isId(key) ? null : <th key={index}>{DISPLAY_NAME[key]}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => {
          return <tr key={rowIndex}>
            {keys.map((column, columnIndex) => isId(column) ? null : <td key={`${rowIndex}_${columnIndex}`}>{row[column]}</td>)}
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
  addNew: null
};

Table.propTypes = {
  table: PropTypes.array.isRequired,
  addNew: PropTypes.func
};

export default Table;
