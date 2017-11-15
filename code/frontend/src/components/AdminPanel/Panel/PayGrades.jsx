import React from 'react';
import PropTypes from 'prop-types';
import PanelWrapper from './PanelWrapper.js';
import * as TYPES from '../../../constants/input-types.js';

function PayGrades({ onReturn }) {
  const initialState = {
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
  return <PanelWrapper initialState={initialState} header={'Pay Grades'} submitButtonText={'Add New Pay Grade'} tableName={'paygrades'} onReturn={onReturn} />;
}

PayGrades.propTypes = {
  onReturn: PropTypes.func.isRequired
};

export default PayGrades;
