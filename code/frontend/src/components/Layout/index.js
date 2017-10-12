import React from 'react';
import { connect } from 'react-redux';
import Home from '../Home';
import Menu from '../Menu';
import css from './layout.css';

const mapStateToProps = (state) => {
  return {
    tab: state.main.tab
  }
};

function LayoutContainer({tab}) {
  let child = null;
  switch (tab) {
    case 'home':
      child = <Home />;
      break;
    default:
      child = null;
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

const Layout = connect(
  mapStateToProps,
  null
)(LayoutContainer);

export default Layout;
