import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { editRow } from '../../../actions/edit-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';
import css from './table.css';

const tableName = TABLE_NAMES.HIRING_MANAGERS;

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
      firstName: {
        title: DISPLAY_NAME.firstName,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      lastName: {
        title: DISPLAY_NAME.lastName,
        type: TYPES.TEXT,
        selected: '',
        value: ''
      }
    }
  };
}

function HiringManagersContainer({ onReturn, handleAddNew, handleEditRow }) {
  return <PanelWrapper className={css.panelwrapper}
    getInitialState={getInitialState}
    header={'Hiring Managers'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew}
    handleEditRow={handleEditRow} />;
}

HiringManagersContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired
};

const HiringManagers = connect(
  null,
  mapDispatchToProps
)(HiringManagersContainer);

export default HiringManagers;
