import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';


function FilterPanel({filters, applyFilter}) {
  return <div className={css.filterpanel}>
    <p>Please select your filters</p>
    <form>
      {/*TODO: add checkboxes and figure out a function to dynamically change options in the four filters as the selected options change.*/}
      <input className={css.filterbutton} type="submit" onClick={applyFilter} value="Apply Filter" />
    </form>
  </div>;
}

FilterPanel.propTypes ={
  filters: PropTypes.array.isRequired,
  applyFilter: PropTypes.func.isRequired
};

export default FilterPanel;