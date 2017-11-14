import React from 'react';
import PropTypes from 'prop-types';

function PayGrades({table, onReturn}) {
  return <div>
    <button onClick={onReturn}>Return to main admin panel page</button>
    <p>Pay Grades</p>
    <div>{table.error ? table.error : JSON.stringify(table.data)}</div>
  </div>;
}

PayGrades.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default PayGrades;
