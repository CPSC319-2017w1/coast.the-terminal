import React from 'react';
import PropTypes from 'prop-types';
import css from './dashboard.css';

function DashboardComponent({isAdmin}) {
  return (
    <div className={css.wrapper}>
      Logged in as a user <strong>{isAdmin ? 'with' : 'without'}</strong> admin privileges.
    </div>
  );
}

DashboardComponent.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default DashboardComponent;