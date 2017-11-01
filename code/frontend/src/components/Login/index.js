import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/login-actions.js';
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
    }
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
    this.props.onSubmit(username, password);
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
  onSubmit: PropTypes.func.isRequired
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export default Login;