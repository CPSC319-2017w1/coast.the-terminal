import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelWrapper from '../Panel';
import * as TYPES from '../../../constants/input-types.js';
import { addNewRow } from '../../../actions/add-tables-actions.js';
import { DISPLAY_NAME, TABLE_NAMES } from '../../../constants/admin-tables.js';

const tableName = TABLE_NAMES.PAY_GRADES;

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
      startAmount: {
        title: DISPLAY_NAME.startAmount,
        type: TYPES.NUMBER,
        value: 0,
        selected: 0
      },
      endAmount: {
        title: DISPLAY_NAME.endAmount,
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
