import React from 'react';
import PropTypes from 'prop-types';
import css from './user.css';

export default function UserComponent({ username, handleClick }) {
  return <div className={css.wrapper}>
    <span className={css.username}>Welcome, {username}!</span>
    <a className={css.link} onClick={handleClick}>Logout</a>
  </div>;
}

UserComponent.propTypes = {
  username: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
