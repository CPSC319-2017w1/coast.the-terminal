import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';

const tableName = 'hiringmanagers';

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, 'hiringManagers', data));
    }
  };
};

function getInitialState() {
  return {
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
}

function HiringManagersContainer({ onReturn, handleAddNew }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'Hiring Managers'}
    submitButtonText={'Add New Hiring Manager'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew} />;
}

HiringManagersContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired
};

const HiringManagers = connect(
  null,
  mapDispatchToProps
)(HiringManagersContainer);

export default HiringManagers;
