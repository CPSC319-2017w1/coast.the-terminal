import React from 'react';
import PropTypes from 'prop-types';
import css from './login.css';

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
