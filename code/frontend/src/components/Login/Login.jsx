import React from 'react';
import PropTypes from 'prop-types';
import css from './login.css';

function LoginComponent({username, password, handleUsernameInput, handlePasswordInput, handleSubmit}) {
  return (
    <div className={css.wrapper}>
      <form>
        <input type="text" value={username} onChange={handleUsernameInput} />
        <input type="text" value={password} onChange={handlePasswordInput} />
        <input type="submit" onClick={handleSubmit} value="Login" />
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
