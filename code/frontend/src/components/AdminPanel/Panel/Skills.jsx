import React from 'react';
import PropTypes from 'prop-types';

function Skills({table, onReturn}) {
  return <div>
    <button onClick={onReturn}>Return to main admin panel page</button>
    <p>Skills</p>
    <div>{table.error ? table.error : JSON.stringify(table.data)}</div>
  </div>;
}

Skills.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default Skills;
