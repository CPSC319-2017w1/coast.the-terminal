import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Panel/Table.jsx';
import css from './table.css';

function FXTable({table, onReturn}) {
  return <div>
    <button className={css.returnbtnfxtable} onClick={onReturn}>Return to main admin panel page</button>
    <p className={css.tabletitletxtable}>FX Table</p>
    {table.error ? <div>table.error</div> : null}
    <Table table={table.data} />
  </div>;
}

FXTable.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default FXTable;
