import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { editRow } from '../../../actions/edit-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';

const tableName = TABLE_NAMES.HR_ROLES;

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
      roleName: {
        title: DISPLAY_NAME.roleName,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      description: {
        title: DISPLAY_NAME.description,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      }
    }
  };
}

function HRRolesContainer({ onReturn, handleAddNew, handleEditRow }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'HR Roles'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew}
    handleEditRow={handleEditRow} />;
}

HRRolesContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired
};

const HRRoles = connect(
  null,
  mapDispatchToProps
)(HRRolesContainer);

export default HRRoles;
