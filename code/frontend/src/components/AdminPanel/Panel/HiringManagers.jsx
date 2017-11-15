import React from 'react';
import PropTypes from 'prop-types';
import PanelWrapper from './PanelWrapper.js';
import * as TYPES from '../../../constants/input-types.js';

function HiringManagers({ onReturn }) {
  const initialState = {
    inputs: {
      userID: {
        title: 'User ID',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      firstName: {
        title: 'First Name',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      LastName: {
        title: 'Last Name',
        type: TYPES.TEXT,
        selected: '',
        value: ''
      }
    }
  };
  return <PanelWrapper initialState={initialState} header={'Hiring Managers'} submitButtonText={'Add New Hiring Manager'} tableName={'hiringManagers'} onReturn={onReturn} />;
}

HiringManagers.propTypes = {
  onReturn: PropTypes.func.isRequired
};

export default HiringManagers;
