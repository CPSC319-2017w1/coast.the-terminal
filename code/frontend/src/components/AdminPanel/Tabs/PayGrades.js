import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';

const tableName = 'paygrades';

const mapDispatchToProps = dispatch => {
  return {
    handleAddNew: (data) => {
      dispatch(addNewRow(tableName, 'payGrade', data));
    }
  };
};

function getInitialState() {
  return {
    inputs: {
      startAmt: {
        title: 'Start Amount',
        type: TYPES.NUMBER,
        value: 0,
        selected: 0
      },
      endAmt: {
        title: 'End Amount',
        type: TYPES.NUMBER,
        value: 0,
        selected: 0
      }
    }
  };
}

function PayGradesContainer({ onReturn, handleAddNew }) {
  return <PanelWrapper
    getInitialState={getInitialState}
    header={'Pay Grades'}
    submitButtonText={'Add New Pay Grade'}
    tableName={tableName}
    onReturn={onReturn}
    handleAddNew={handleAddNew} />;
}

PayGradesContainer.propTypes = {
  onReturn: PropTypes.func.isRequired,
  handleAddNew: PropTypes.func.isRequired
};

const PayGrades = connect(
  null,
  mapDispatchToProps
)(PayGradesContainer);

export default PayGrades;
