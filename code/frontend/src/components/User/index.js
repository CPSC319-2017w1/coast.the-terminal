import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { logout } from '../../actions/login-actions.js';
import UserComponent from './User.jsx';

const mapStateToProps = state => {
  return {
    username: state.user.username,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: (username, token) => {
      dispatch(logout(username, token));
    }
  };
};

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { props } = this;
    props.cookies.remove('username');
    props.cookies.remove('token');
    props.cookies.remove('tab');
    props.logout(props.username, props.token);
  }

  render() {
    return <UserComponent username={this.props.username} handleClick={this.handleClick} />;
  }
}

UserContainer.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

const User = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);

export default withCookies(User);
