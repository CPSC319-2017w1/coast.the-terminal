import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddContractorComponent from './AddContractor.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};



class AddContractorContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Contractor:{
        firstname: '',
        lastname: '',
        company: ''
      },
      Projects: [
        {
          projectname: '',
          reportingmanagers: ['harry potter', 'luna luvgood'],
          hrpositions: ['professor', 'dark arts teacher'],
          ratetype: '',
          hourlyrate: '',
          paygrade: '',
          refno: ''
        }
      ]

    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDropdownInput = this.handleDropdownInput.bind(this);
    this.handleStatusInput = this.handleStatusInput.bind(this);
    this.handleCurrencyInput = this.handleCurrencyInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextInput(){

  }

  handleDropdownInput(){

  }

  handleStatusInput(){

  }

  handleCurrencyInput(){

  }

  handleAdd(){

  }

  handleSubmit(){

  }

  render() {
    return <AddContractorComponent
      Contractor={this.state.Contractor}
      Projects={this.state.Projects}
      handleTextInput={this.handleTextInput}
      handleStatusInput={this.handleStatusInput}
      handleDropdownInput={this.handleDropdownInput}
      handleCurrencyInput={this.handleCurrencyInput}
      handleAdd={this.handleAdd}
      handleSubmit={this.handleSubmit}
    />;
  }
}

const AddContractor = connect(
  mapStateToProps,
  null
)(AddContractorContainer);

export default AddContractor;
