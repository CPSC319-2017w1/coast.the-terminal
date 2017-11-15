import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';

const tableName = 'hrroles';

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, 'hrRole', data));
    }
  };
};

function getInitialState() {
  return {
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
}

function HRRolesContainer({ onReturn, handleAddNew }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'HR Roles'}
    submitButtonText={'Add New HR Role'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew} />;
}

HRRolesContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired
};

const HRRoles = connect(
  null,
  mapDispatchToProps
)(HRRolesContainer);

export default HRRoles;
