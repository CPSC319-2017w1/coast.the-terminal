import React from 'react';
import PropTypes from 'prop-types';
import css from './user.css';

/**
 * creates html component for username and logout button
 * @param username - username of the user logged in
 * @param handleClick - function for the logout button
 * @return React component for User
 */
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
