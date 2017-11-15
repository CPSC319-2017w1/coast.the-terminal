import React from 'react';
import PropTypes from 'prop-types';

function FXTable({table, onReturn}) {
  return <div>
    <button onClick={onReturn}>Return to main admin panel page</button>
    <p>FX Table</p>
    <div>{table.error ? table.error : JSON.stringify(table.data)}</div>
  </div>;
}

FXTable.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default FXTable;
