import React from 'react';
import PropTypes from 'prop-types';
import PanelWrapper from './PanelWrapper.js';
import * as TYPES from '../../../constants/input-types.js';

function Users({ onReturn }) {
  const initialState = {
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
  return <PanelWrapper initialState={initialState} header={'Users'} submitButtonText={'Add New User'} tableName={'users'} onReturn={onReturn} />;
}

Users.propTypes = {
  onReturn: PropTypes.func.isRequired
};

export default Users;
