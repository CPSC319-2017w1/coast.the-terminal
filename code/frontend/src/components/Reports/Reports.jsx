import React from 'react';
import PropTypes from 'prop-types';
import C3Chart from 'react-c3js';
import css from './reports.css';

function ReportsComponent({username}) {
  return (
    <div className={css.wrapper}>
      Welcome to Reports, <strong>{username}</strong>
    </div>
  );
}

ReportsComponent.propTypes = {
  username: PropTypes.string.isRequired
};

export default ReportsComponent;