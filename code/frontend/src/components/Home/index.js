import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isAdmin: state.user.isAdmin
  };
};

function HomeContainer({ isAdmin }) {
  return <div>Logged in as a user <strong>{isAdmin ? 'with' : 'without'}</strong> admin privileges.</div>;
}

HomeContainer.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

const Home = connect(
  mapStateToProps,
  null
)(HomeContainer);

export default Home;
