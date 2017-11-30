import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { loginUser, validateSession } from '../../actions/login-actions.js';
import LoginComponent from './Login.jsx';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password, cookies) => {
      dispatch(loginUser(username, password, cookies));
    },
    validateSession: (username, token, cookies) => {
      dispatch(validateSession(username, token, cookies));
    }
  };
};

/**
 * Class that represents the Login container
 */
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.cookies.get('username') || '',
      password: '',
      token: props.cookies.get('token') || ''
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * sets the username to the value entered in the text box
   * @param event
   */
  handleUsernameInput(event) {
    event.preventDefault();
    const {password} = this.state;
    this.setState({
      username: event.target.value,
      password
    });
  }

  /**
   * sets the password to the value entered in the text box
   * @param event
   */
  handlePasswordInput(event) {
    event.preventDefault();
    const {username} = this.state;
    this.setState({
      username,
      password: event.target.value
    });
  }

  /**
   * submits the state's username and password to the system
   * @param event
   */
  handleSubmit(event) {
    event.preventDefault();
    const {username, password} = this.state;
    this.props.onSubmit(username, password, this.props.cookies);
  }

  componentDidMount() {
    const { username, token } = this.state;
    if (username !== '' && token !== '') {
      this.props.validateSession(username, token, this.props.cookies);
      this.setState({ username: '', token: '' });
    }
  }

  /**
   * renders the login component to the screen
   * @return {*}
   */
  render() {
    const { state } = this;
    if (state.username !== '' && state.token !== '') {
      return null;
    } else {
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
}

LoginContainer.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  validateSession: PropTypes.func.isRequired
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export default withCookies(Login);