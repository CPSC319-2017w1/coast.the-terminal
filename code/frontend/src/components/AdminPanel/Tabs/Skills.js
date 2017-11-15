import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';

const tableName = 'skills';

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, 'skill', data));
    }
  };
};

function getInitialState() {
  return {
    inputs: {
      name: {
        title: 'Name',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      description: {
        title: 'Description',
        type: TYPES.TEXT,
        value: '',
        selected: ''
      },
      type: {
        title: 'Type',
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
    submitButtonText={'Add New Skill'}
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
