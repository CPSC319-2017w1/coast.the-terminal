import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { logout } from '../../actions/main-actions.js';
import UserComponent from './User.jsx';

const mapStateToProps = state => {
  return {
    username: state.user.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
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
    this.props.cookies.remove('username');
    this.props.cookies.remove('token');
    this.props.logout();
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
