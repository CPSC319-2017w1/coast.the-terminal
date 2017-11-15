import React from 'react';
import PropTypes from 'prop-types';
import PanelWrapper from './PanelWrapper.js';
import * as TYPES from '../../../constants/input-types.js';

function HRRoles({ onReturn }) {
  const initialState = {
    inputs: {
      roleName: {
        title: 'Role Name',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      description: {
        title: 'Description',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      }
    }
  };
  return <PanelWrapper initialState={initialState} header={'HR Roles'} submitButtonText={'Add New HR Role'} tableName={'hrRoles'} onReturn={onReturn} />;
}

HRRoles.propTypes = {
  onReturn: PropTypes.func.isRequired
};

export default HRRoles;
