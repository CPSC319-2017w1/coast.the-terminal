import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';

const tableName = TABLE_NAMES.SKILLS;

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, data));
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

function SkillsContainer({ onReturn, handleAddNew }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'Skills'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew} />;
}

SkillsContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired
};

const Skills = connect(
  null,
  mapDispatchToProps
)(SkillsContainer);

export default Skills;
