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
      data: items, //sample data to test rendering needs to be changed to data received from back-end
      showFilter: false //boolean created for pop-up
    };
    this.handleFilter = this.handleFilter.bind(this); //this deals with the popup
    this.handleEditContractor = this.handleEditContractor.bind(this);
    this.applyFilter = this.applyFilter.bind(this); //this deals with the actual filter
  }

  handleFilter(){
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  handleEditContractor(){

  }

  applyFilter(){

  }

  render(){
    const {state} = this;
    return <FilteringComponent
      filters={null}
      filterStatus={this.state.showFilter}
      tabledata={state.data} //note to backend: needs to be an array of objects
      handleFilter={this.handleFilter}
      handleEditContractor={this.handleEditContractor}
      applyFilter={this.applyFilter}
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