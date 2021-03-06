import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Panel/Table.jsx';
import css from './table.css';

/**
 * Render FX Table view
 * @param {object} table - Data table returned from the backend
 * @param {function} onReturn - Click handler for return button
 * */
function FXTable({table, onReturn}) {
  return <div>
    <h1 className={css.titlename}>FX Table</h1>
    <button className={css.fxreturnbtn} onClick={onReturn}>Return to main admin panel page</button>
    {table.error ? <div>table.error</div> : null}
    <Table table={table.data} />
  </div>;
}

FXTable.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default FXTable;
