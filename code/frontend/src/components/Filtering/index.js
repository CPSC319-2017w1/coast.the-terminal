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
    this.state = {
      table: null
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(){

  }

  render(){
    const {state} = this;
    return <FilteringComponent
      table={state.table}
      handleFilter={this.handleFilter}
    />;
  }
}

FilteringContainer.propTypes = {
  user: PropTypes.object.isRequired
};

const Filtering = connect(
  mapStateToProps,
  null
)(FilteringContainer);

export default Filtering;