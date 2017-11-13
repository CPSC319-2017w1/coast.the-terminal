import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilteringComponent from './Filtering.jsx';
import items from './Data.js';

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
      data: items,
      showFilter: false
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEditContractor = this.handleEditContractor.bind(this);
  }

  handleFilter(){
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  handleEditContractor(){

  }

  render(){
    const {state} = this;
    return <FilteringComponent
      filterStatus={this.state.showFilter}
      tabledata={state.data}
      handleFilter={this.handleFilter}
      handleEditContractor={this.handleEditContractor}
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