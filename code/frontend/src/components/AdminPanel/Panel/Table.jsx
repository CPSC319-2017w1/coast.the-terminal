import React from 'react';
import PropTypes from 'prop-types';

function Table({ table, addNew }) {
  return <div>
    <button onClick={addNew}>Add New Row</button>
    {JSON.stringify(table)}
  </div>;
}

Table.propTypes = {
  table: PropTypes.object.isRequired,
  addNew: PropTypes.func.isRequired
};

export default Table;
