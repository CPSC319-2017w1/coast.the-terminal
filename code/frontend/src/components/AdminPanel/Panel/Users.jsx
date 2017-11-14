import React from 'react';
import PropTypes from 'prop-types';

function Users({table, onReturn}) {
  return <div>
    <button onClick={onReturn}>Return to main admin panel page</button>
    <p>Users</p>
    <div>{table.error ? table.error : JSON.stringify(table.data)}</div>
  </div>;
}

Users.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default Users;
