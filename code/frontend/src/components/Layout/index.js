import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../Home';
import Menu from '../Menu';
import Login from '../Login';
import css from './layout.css';

const mapStateToProps = (state) => {
  return {
    tab: state.main.tab,
    isLoggedIn: state.user.isLoggedIn
  };
};

function LayoutContainer({tab, isLoggedIn}) {
  if (!isLoggedIn) {
    return (
      <div className={css.wrapper}>
        <Login />
      </div>
    );
  }
  let child = null;
  switch (tab) {
    case 'home':
      child = <Home />;
      break;
    default:
      child = null; // TODO: replace with error page
      break;
  }
  return (
    <div className={css.wrapper}>
      <Menu />
      <div className={css.content}>
        {child}
      </div>
    </div>);
}

LayoutContainer.propTypes = {
  tab: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const Layout = connect(
  mapStateToProps,
  null
)(LayoutContainer);

export default Layout;
