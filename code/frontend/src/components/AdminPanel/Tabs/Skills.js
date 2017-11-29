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
    handleAddNew: (data, callback) => {
      dispatch(addNewRow(tableName, data, callback));
    },
    handleEditRow: (data, callback) => {
      dispatch(editRow(tableName, data, callback));
    }
  };
};

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
