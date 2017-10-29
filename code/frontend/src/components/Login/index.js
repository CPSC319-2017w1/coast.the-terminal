import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, loginFailed, loginSuccessful } from '../../actions';
import LoginComponent from './Login.jsx';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password) => {
      dispatch(loginUser(username, password));
    },
    // temporary workaround until cross origin issues are resolved
/*    onLoginFail: () => {
      dispatch(loginFailed('Incorrect username or password'));
    },
    onLoginSuccess: (username, isAdmin) => {
      dispatch(loginSuccessful(username, isAdmin));
    }*/
  };
};

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameInput(event) {
    event.preventDefault();
    const {password} = this.state;
    this.setState({
      username: event.target.value,
      password
    });
  }

  handlePasswordInput(event) {
    event.preventDefault();
    const {username} = this.state;
    this.setState({
      username,
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {username, password} = this.state;
    this.props.onSubmit(this.state.username, this.state.password);
    // TODO: REMOVE
    // TEMP WORKAROUND UNTIL CROSS ORIGIN ISSUES ARE RESOLVED
/*    if (username === 'user' && password === 'user') {
      debugger;
      this.props.onLoginSuccess(username, false);
    } else if (username === 'admin' && password === 'admin') {
      debugger;
      this.props.onLoginSuccess(username, true);
    } else {
      debugger;
      this.props.onLoginFail();
    }*/
  }

  render() {
    const {state} = this;
    return (
      <LoginComponent
        username={state.username}
        password={state.password}
        error={this.props.user.error}
        handleUsernameInput={this.handleUsernameInput}
        handlePasswordInput={this.handlePasswordInput}
        handleSubmit={this.handleSubmit} />
    );
  }
}

LoginContainer.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired, //TODO: REMOVE
  onLoginFail: PropTypes.func.isRequired //TODO: REMOVE
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export default Login;