import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { editRow } from '../../../actions/edit-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';

const tableName = TABLE_NAMES.USERS;

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, data));
    },
    handleEditRow: (data) => {
      dispatch(editRow(tableName, data));
    }
  };
};

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

function UsersContainer({ onReturn, handleAddNew, handleEditRow }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'Users'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew}
    handleEditRow={handleEditRow} />;
}

UsersContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired
};

const Users = connect(
  null,
  mapDispatchToProps
)(UsersContainer);

export default Users;
