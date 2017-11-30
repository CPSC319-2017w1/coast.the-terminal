import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { editRow } from '../../../actions/edit-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';
import css from './table.css';

const tableName = TABLE_NAMES.SKILLS;

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
      name: {
        title: DISPLAY_NAME.name,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      description: {
        title: DISPLAY_NAME.description,
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      type: {
        title: DISPLAY_NAME.type,
        type: TYPES.TEXT,
        selected: '',
        value: ''
      }
    }
  };
}

/**
 * Render Skills table view
 * @param {function} onReturn - Click handler for return button
 * @param {function} handleAddNew - Click handler for adding a new row
 * @param {function} handleEditRow - Click handler for editing an existing row
 * */
function SkillsContainer({ onReturn, handleAddNew, handleEditRow }) {
  return <PanelWrapper className={css.panelwrapper}
    getInitialState={getInitialState}
    header={'Skills'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew}
    handleEditRow={handleEditRow} />;
}

SkillsContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired
};

const Skills = connect(
  null,
  mapDispatchToProps
)(SkillsContainer);

export default Skills;
