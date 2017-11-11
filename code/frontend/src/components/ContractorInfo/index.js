import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddContractorComponent from './AddContractor.jsx';
import { addContractor } from '../../actions/contractor-info-actions.js';

const mapStateToProps = state => {
  return {
    error: state.contractors.error,
    isLoading: state.main.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (data, callback) => {
      dispatch(addContractor(data, callback));
    }
  };
};

class AddContractorContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      contractor: {
        firstName: '',
        surname: '',
        agencySource: ''
      },
      projects: [
        {
          projectname: '',
          reportingmanagers: ['harry potter', 'luna luvgood'],
          costcentre: '',
          hrpositions: ['professor', 'dark arts teacher'],
          ratetypes: ['Type A', 'Type B'],
          hourlyrate: '',
          paygrades: ['A', 'B'],
          refnos: ['1', '2', '3']
        }
      ],
      message: ''
    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDropdownInput = this.handleDropdownInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleStatusInput = this.handleStatusInput.bind(this);
    this.handleCurrencyInput = this.handleCurrencyInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleTextInput(event) {
    event.preventDefault();
    const { state } = this;
    const { contractor } = state;
    contractor[event.target.getAttribute('name')] = event.target.value;
    this.setState(Object.assign(state, { contractor }));
  }

  handleDropdownInput(event) {
    event.preventDefault();
  }

  handleDateInput(event) {
    event.preventDefault();
  }

  handleStatusInput(event) {
    event.preventDefault();
  }

  handleCurrencyInput(event) {
    event.preventDefault();
  }

  handleAdd(event) {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { contractor } = this.state;
    this.props.onSubmit(contractor, this.resetState);
  }

  resetState() {
    const { props } = this;
    if (props.error) {
      this.setState({ message: props.error });
    } else {
      this.setState({
        contractor: {
          firstName: '',
          surname: '',
          agencySource: ''
        },
        projects: [
          {
            projectname: '',
            reportingmanagers: ['harry potter', 'luna luvgood'],
            hrpositions: ['professor', 'dark arts teacher'],
            ratetypes: ['Type A', 'Type B'],
            hourlyrate: '',
            paygrades: ['A', 'B'],
            refnos: ['1', '2', '3']
          }
        ],
        message: 'Contractor added successfully.'
      });
    }
  }

  render() {
    return <AddContractorComponent
      contractor={this.state.contractor}
      projects={this.state.projects}
      handleTextInput={this.handleTextInput}
      handleStatusInput={this.handleStatusInput}
      handleDropdownInput={this.handleDropdownInput}
      handleDateInput={this.handleDateInput}
      handleCurrencyInput={this.handleCurrencyInput}
      handleAdd={this.handleAdd}
      handleSubmit={this.handleSubmit}
      message={this.state.message}
    />;
  }
}

const AddContractor = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContractorContainer);

export default AddContractor;
