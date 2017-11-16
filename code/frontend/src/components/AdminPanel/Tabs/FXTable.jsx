import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Panel/Table.jsx';

function FXTable({table, onReturn}) {
  return <div>
    <button onClick={onReturn}>Return to main admin panel page</button>
    <p>FX Table</p>
    {table.error ? <div>table.error</div> : null}
    <Table table={table.data} />
  </div>;
}

FXTable.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default FXTable;
