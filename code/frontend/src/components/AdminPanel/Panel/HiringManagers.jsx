import React from 'react';
import PropTypes from 'prop-types';

function HiringManagers({table, onReturn}) {
  return <div>
    <button onClick={onReturn}>Return to main admin panel page</button>
    <p>Hiring Managers</p>
    <div>{table.error ? table.error : JSON.stringify(table.data)}</div>
  </div>;
}

HiringManagers.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default HiringManagers;
