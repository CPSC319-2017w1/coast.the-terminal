import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchView } from '../../actions/index';
import NavbarComponent from './Navbar.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTabClick: (tab) => {
      dispatch(switchView(tab));
    }
  };
};

class NavbarContainer extends React.Component{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.handleTabClick(event.target.getAttribute('name'));
  }

  render() {
    const {props} = this;
    return <NavbarComponent
      username={props.user.username}
      isAdmin={props.user.isAdmin}
      tab={props.tab}
      onClick={this.onClick} />;
  }
}

NavbarContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired
};

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarContainer);

export default Navbar;
