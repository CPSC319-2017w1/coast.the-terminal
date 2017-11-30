import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { editRow } from '../../../actions/edit-tables-actions.js';
import { deleteRow } from '../../../actions/delete-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';
import css from './table.css';

const tableName = TABLE_NAMES.USERS;

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Add a new row to the table
     * @param {object} data - Data to be sent to the backend
     * @param {function} callback - Callback function in case of success
     * */
    handleAddNew: (data, callback) => {
      dispatch(addNewRow(tableName, data, callback));
    },
    /**
     * Edit a row in the table
     * @param {object} data - Data to be sent to the backend
     * @param {function} callback - Callback function in case of success
     * */
    handleEditRow: (data, callback) => {
      dispatch(editRow(tableName, data, callback));
    },
    /**
     * Delete a row from the table
     * @param {object} data - Data to be sent to the backend
     * @param {function} callback - Callback function in case of success
     * */
    handleDeleteRow: (data, callback) => {
      dispatch(deleteRow(tableName, data, callback));
    }
  };
};

/**
 * Retrieve a brand new state of the component
 * */
function getInitialState() {
  return {
    inputs: {
      username: {
        title: DISPLAY_NAME.username,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      password: {
        title: DISPLAY_NAME.password,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      permissions: {
        title: DISPLAY_NAME.permissions,
        type: TYPES.DROPDOWN,
        selected: 'write',
        value: [
          {
            title: 'Normal User',
            value: 'write',
            selected: true
          },
          {
            title: 'Administrator',
            value: 'admin',
            selected: false
          }
        ]
      }
    }
  };
}

/**
 * Render Users table view
 * @param {function} onReturn - Click handler for return button
 * @param {function} handleAddNew - Click handler for adding a new row
 * @param {function} handleEditRow - Click handler for editing an existing row
 * @param {function} handleDeleteRow - Click handler for deleting an existing row
 * */
function UsersContainer({ onReturn, handleAddNew, handleEditRow, handleDeleteRow }) {
  return <PanelWrapper className={css.panelwrapper}
    getInitialState={getInitialState}
    header={'Users'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew}
    handleEditRow={handleEditRow}
    handleDeleteRow={handleDeleteRow}/>;
}

UsersContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired
};

const Users = connect(
  null,
  mapDispatchToProps
)(UsersContainer);

export default Users;
