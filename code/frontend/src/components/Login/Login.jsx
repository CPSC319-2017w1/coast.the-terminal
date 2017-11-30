import React from 'react';
import PropTypes from 'prop-types';
import css from './login.css';

/**
 * Creates html component for Login
 * @param username - username of the user logging in
 * @param password - password of the user logging in
 * @param error - error message
 * @param handleUsernameInput - function that handles the text value in the username input
 * @param handlePasswordInput - function that handles the text value in the password input
 * @param handleSubmit - function that submits the combination of user and password to the system
 * @return React component for Login
 */
function LoginComponent({username, password, error, handleUsernameInput, handlePasswordInput, handleSubmit}) {
  return (
    <div data-qa="login-wrapper" className={css.wrapper}>
      {error ? <div data-qa="login-error">{error}</div> : null}
      <form>
        <input className={css.username} type="text" value={username} onChange={handleUsernameInput} placeholder="username"/>
        <input className={css.password} type="password" value={password} onChange={handlePasswordInput} placeholder="password" />
        <input data-qa="login-button" className={css.submit} type="submit" onClick={handleSubmit} value="Login" />
      </form>
    </div>
  );
}

LoginComponent.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string]).isRequired,
  handleUsernameInput: PropTypes.func.isRequired,
  handlePasswordInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default LoginComponent;
