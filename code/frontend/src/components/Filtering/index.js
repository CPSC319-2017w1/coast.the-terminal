import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilteringComponent from './Filtering.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};

class FilteringContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {props} = this;
    return <FilteringComponent
      username={props.user.username}
    />;
  }
}

FilteringContainer.propTypes = {
  username: PropTypes.string.isRequired
};

const Filtering = connect(
  mapStateToProps,
  null
)(FilteringContainer);

export default Filtering;