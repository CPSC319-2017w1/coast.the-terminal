import React from 'react';
import PropTypes from 'prop-types';
import css from './login.css';

function LoginComponent({username, password, handleUsernameInput, handlePasswordInput, handleSubmit}) {
  return (
    <div className={css.wrapper}>
      <form>
        <input className={css.username} type="text" value={username} onChange={handleUsernameInput} />
        <input className={css.password} type="password" value={password} onChange={handlePasswordInput} />
        <input className={css.submit} type="submit" onClick={handleSubmit} value="Login" />
      </form>
    </div>
  );
}

LoginComponent.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameInput: PropTypes.func.isRequired,
  handlePasswordInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default LoginComponent;
