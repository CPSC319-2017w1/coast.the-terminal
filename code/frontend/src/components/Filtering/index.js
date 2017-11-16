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

const fields = [
  {
    'checked': false,
    'name': 'Contractor Name',
    'count': 'Count of Contractor Name'
  },
  {
    'checked': false,
    'name': 'Company',
    'count': 'Count of Company'
  },
  {
    'checked': false,
    'name': 'Reporting Manager',
    'count': 'Count of Reporting Manage'
  },
  {
    'checked': false,
    'name': 'Cost Centre',
    'count': 'Sum of Cost Centre'
  },
  {
    'checked': false,
    'name': 'PO Reference',
    'count': 'Count of PO Reference'
  },
  {
    'checked': false,
    'name': 'Estimate/Committed',
    'count': 'Count of Estimate/Committed'
  },
  {
    'checked': false,
    'name': 'Details',
    'count': 'Count of Details'
  },
  {
    'checked': false,
    'name': 'Est Hourly Rate (CDN)',
    'count': 'Sum of Est Hourly Rate (CDN)'
  },
  {
    'checked': false,
    'name': 'Monthly Cost (incl GST)',
    'count': 'Sum of Monthly Cost (incl GST)'
  },
  {
    'checked': false,
    'name': 'Monthly Expenses (incl Tax)',
    'count': 'Sum of Monthly Expenses (incl Tax)'
  },
  {
    'checked': false,
    'name': 'Total Monthly Cost',
    'count': 'Sum of Total Monthly Cost'
  },
  {
    'checked': false,
    'name': 'Start Date',
    'count': 'Count of Start Date'
  },
  {
    'checked': false,
    'name': 'End Date',
    'count': 'Count of End Date'
  },
  {
    'checked': false,
    'name': 'Working Month',
    'count': 'Count of Working Month'
  },
  {
    'checked': false,
    'name': 'Billing Month',
    'count': 'Count of Billing Month'
  },
  {
    'checked': false,
    'name': 'OPEX/CAPEX',
    'count': 'Count of OPEX/CAPEX'
  },
  {
    'checked': false,
    'name': 'Project#',
    'count': 'Count of Project#'
  },
  {
    'checked': false,
    'name': 'GL',
    'count': 'SUM of GL'
  },
  {
    'checked': false,
    'name': 'Department',
    'count': 'Count of Department'
  },
  {
    'checked': false,
    'name': 'Role',
    'count': 'Count of Role'
  },
  {
    'checked': false,
    'name': 'Additional Notes',
    'count': 'Count of Additional Notes'
  },
  {
    'checked': false,
    'name': 'Years',
    'count': 'Count of Years'
  }
];

class FilteringContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: items, //sample data to test rendering needs to be changed to data received from back-end
      showFilter: false, //boolean created for pop-up
      fieldsList: fields
    };
    this.handleFilter = this.handleFilter.bind(this); //this deals with the popup
    this.handleEditContractor = this.handleEditContractor.bind(this);
    this.toggleCheckedFields = this.toggleCheckedFields.bind(this); // generates the filter list based on the user's selection
    this.applyFilter = this.applyFilter.bind(this); //this deals with the actual filter
  }

  handleFilter(event){
    event.preventDefault();
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  toggleCheckedFields(event){
    event.preventDefault();
    let list;
    list = fields;
    list.map(function(item){
      if(item.name === event.target.getAttribute('name')){
        item.checked = !item.checked;
      }
    });

    this.setState({
      fieldsList: list
    });
  }

  handleEditContractor(){

  }

  applyFilter(){

  }

  render(){
    const {state} = this;
    return <FilteringComponent
      fields={this.state.fieldsList}
      filterStatus={this.state.showFilter}
      tabledata={state.data} //note to backend: needs to be an array of objects
      handleFilter={this.handleFilter}
      handleEditContractor={this.handleEditContractor}
      applyFilter={this.applyFilter}
      toggleCheckedFields={this.toggleCheckedFields}
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