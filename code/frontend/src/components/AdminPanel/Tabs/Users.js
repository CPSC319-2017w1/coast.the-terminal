import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';

const tableName = 'users';

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, 'user', data));
    }
  };
};

function getInitialState() {
  return {
    inputs: {
      username: {
        title: 'Username',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      password: {
        title: 'Password',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      permissions: {
        title: 'Permissions',
        type: TYPES.DROPDOWN,
        selected: '',
        value: [
          {
            title: 'Read',
            value: 'read',
            selected: false
          },
          {
            title: 'Write',
            value: 'write',
            selected: false
          },
          {
            title: 'Admin',
            value: 'admin',
            selected: false
          }
        ]
      }
    }
  };
}

function UsersContainer({ onReturn, handleAddNew }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'Users'}
    submitButtonText={'Add New User'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew} />;
}

UsersContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired
};

const Users = connect(
  null,
  mapDispatchToProps
)(UsersContainer);

export default Users;
