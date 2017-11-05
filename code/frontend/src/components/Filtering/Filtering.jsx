import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';

function FilteringComponent({username}) {
  return (
    <div className={css.wrapper}>
      Welcome to Filtering, <strong>{username}</strong>
    </div>
  );
}

FilteringComponent.propTypes = {
  username: PropTypes.string.isRequired
};

export default FilteringComponent;