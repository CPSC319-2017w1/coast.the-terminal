import React from 'react';
import PropTypes from 'prop-types';
import PanelWrapper from './PanelWrapper.js';
import * as TYPES from '../../../constants/input-types.js';

function Skills({ onReturn }) {
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
  return <PanelWrapper initialState={initialState} header={'Skills'} submitButtonText={'Add New Skill'} tableName={'skills'} onReturn={onReturn} />;
}

Skills.propTypes = {
  onReturn: PropTypes.func.isRequired
};

export default Skills;
