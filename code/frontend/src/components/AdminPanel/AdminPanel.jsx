import React from 'react';
import PropTypes from 'prop-types';
import css from './adminpanel.css';

function AdminPanelComponent({username}) {
  return (
    <div className={css.wrapper}>
      Welcome to the Admin Panel, <strong>{username}</strong>
    </div>
  );
}

AdminPanelComponent.propTypes = {
  username: PropTypes.string.isRequired
};

export default AdminPanelComponent;