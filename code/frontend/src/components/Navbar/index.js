import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { switchView } from '../../actions/main-actions.js';
import NavbarComponent from './Navbar.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    isAdmin: state.user.isAdmin,
    tab: ownProps.cookies.get('tab') ? ownProps.cookies.get('tab') : state.main.tab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTabClick: (tab) => {
      dispatch(switchView(tab));
    }
  };
};

/**
 * Class that represents Navbar container
 */
class NavbarContainer extends React.Component{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * function that redirects to selected tab
   * @param event
   */
  onClick(event) {
    event.preventDefault();
    const tab = event.target.getAttribute('name');
    this.props.cookies.set('tab', tab);
    this.props.handleTabClick(tab);
  }

  /**
   * renders the navbar to the screen
   * @return {XML}
   */
  render() {
    const {props} = this;
    return <NavbarComponent
      isAdmin={props.isAdmin}
      tab={props.tab}
      onClick={this.onClick} />;
  }
}

NavbarContainer.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarContainer);

export default withCookies(Navbar);
