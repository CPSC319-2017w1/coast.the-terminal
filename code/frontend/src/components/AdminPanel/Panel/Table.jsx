import React from 'react';
import PropTypes from 'prop-types';
import { DISPLAY_NAME } from '../../../constants/admin-tables.js';
import css from '../../../components/AdminPanel/Tabs/table.css';

/**
 * Renders a table view
 * @param {array} table - An array of objects to be rendered into a table
 * @param {function} addNew - Click handler for adding a new row
 * @param {function} edit - Click handler for editing an existing row
 * @param {string} editingRow - ID of the row currently being edited
 * @param {boolean} isAddingNew - Is the add new form open
 * @param {function} deleteRow - Click handler for deleting a row
 * @param {string} activeUser - Username of the user currently logged in
 * */
function Table({ table, addNew, edit, editingRow, isAddingNew, deleteRow, activeUser }) {
  const keys = Object.keys(table[0]);
  return <div>
    {addNew === null ? null : <button className={css.addnewrow} onClick={addNew}>{isAddingNew ? 'Cancel' : 'Add New Row'}</button>}
    <table className={css.table}>
      <thead className={css.tableheader}>
        <tr className={css.tablerow}>
          {edit === null ? null : <th>Edit</th>}
          {deleteRow === null ? null : <th>Delete</th>}
          {keys.map((key, index) => key === 'id' ? null : <th key={index} style={key === 'password' ? {display: 'none'} : null}>{DISPLAY_NAME[key]}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => {
          let editButton = null;
          let deleteButton = null;
          if (editingRow !== '') {
            editButton = editingRow === row.id || editingRow === row.username ? <button className={css.editbtn} onClick={edit}>Cancel</button> : <span></span>;
          } else if (edit !== null) {
            editButton = <button className={css.editbtn} onClick={edit} name="edit">Edit</button>;
          }
          if (deleteRow !== null && editingRow === '' && row.username !== activeUser) {
            deleteButton = <button className={css.deletebtn} onClick={deleteRow} name="delete">Delete</button>;
          }
          return <tr key={rowIndex} name={row.username ? row.username : row.id}>
            {edit === null ? null : <td name="edit">{editButton}</td>}
            {deleteRow === null ? null : <td name="delete">{deleteButton}</td>}
            {keys.map((column, columnIndex) => column === 'id' ? null
              : <td className={css.tablerowcontent}
                key={`${rowIndex}_${columnIndex}`}
                name={column}
                style={column === 'password' ? {display: 'none'} : null}>
                {row[column]}
              </td>)}
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
  editingRow: '',
  deleteRow: null,
  activeUser: ''
};

Table.propTypes = {
  table: PropTypes.array.isRequired,
  addNew: PropTypes.func,
  edit: PropTypes.func,
  editingRow: PropTypes.string,
  isAddingNew: PropTypes.bool,
  deleteRow: PropTypes.func,
  activeUser: PropTypes.string
};

export default Table;
