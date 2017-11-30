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
    }
  };
};

/**
 * Retrieve a brand new state of the component
 * */
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

/**
 * Render Hiring Managers table view
 * @param {function} onReturn - Click handler for return button
 * @param {function} handleAddNew - Click handler for adding a new row
 * @param {function} handleEditRow - Click handler for editing an existing row
 * */
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
