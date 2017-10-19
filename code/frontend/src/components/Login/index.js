import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, switchView } from '../../actions';
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
      dispatch(switchView('home')); //todo: needs to be dynamic
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

  handleSubmit() {
    const {state} = this;
    this.props.onSubmit(state.username, state.password);
  }

  render() {
    const {state} = this;
      return <LoginComponent
          username={state.username}
          password={state.password}
          handleUsernameInput={this.handleUsernameInput}
          handlePasswordInput={this.handlePasswordInput}
          handleSubmit={this.handleSubmit} />;
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