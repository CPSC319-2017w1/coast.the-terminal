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
    onSubmit: (contractorData, projectData, callback) => {
      dispatch(addContractor(contractorData, projectData, callback));
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
        agencySource: '',
        status: 'active'
      },
      projects: [
        this.createDefaultProjectObject()
      ],
      message: ''
    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDropdownInput = this.handleDropdownInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleTextInput(event) {
    event.preventDefault();
    const { state } = this;
    if (!event.target.hasAttribute('data-index')) {
      const {contractor} = state;
      contractor[event.target.getAttribute('name')] = event.target.value;
      this.setState(Object.assign(state, {contractor}));
    } else {
      const { projects } = state;
      let dataIndex = parseInt(event.target.getAttribute('data-index'));
      let project = projects[dataIndex];
      project[event.target.getAttribute('name')] = event.target.value;
      this.setState(Object.assign(state, {projects}));
    }
  }

  handleDropdownInput(event) {
    event.preventDefault();
    const { state } = this;
    if (!event.target.hasAttribute('data-index')) {
      const {contractor} = state;
      contractor[event.target.getAttribute('name')] = event.target.value;
    } else {
      const { projects } = state;
      let dataIndex = parseInt(event.target.getAttribute('data-index'));
      let project = projects[dataIndex];
      project[event.target.getAttribute('name')] = event.target.value;
      this.setState(Object.assign(state, {projects}));
    }
  }

  handleDateInput(event) {
    event.preventDefault();
    const { state } = this;
    const { projects } = state;
    let dataIndex = parseInt(event.target.getAttribute('data-index'));
    let project = projects[dataIndex];
    project[event.target.getAttribute('name')] = event.target.value;
    this.setState(Object.assign(state, {projects}));
  }

  handleRadioInput(event) {
    const { state } = this;
    if (!event.target.hasAttribute('data-index')) {
      const { contractor } = state;
      contractor[event.target.getAttribute('name')] = event.target.value;
      this.setState(Object.assign(state, {contractor}));
    } else {
      const { projects } = state;
      let dataIndex = event.target.getAttribute('data-index');
      let project = projects[dataIndex];
      project[event.target.getAttribute('name')] = event.target.value;
      this.setState(Object.assign(state, {projects}));
    }
  }

  handleAdd(event) {
    event.preventDefault();
    let projectState = this.state.projects;
    projectState.push(this.createDefaultProjectObject());
    this.setState({projects: projectState})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { contractor } = this.state;
    const { projects } = this.state;
    this.props.onSubmit(contractor, projects, this.resetState);
  }

  createDefaultProjectObject() {
    return {
        projectName: '',
        reportingmanagers: this.getReportingManagersOptions(),
        hrpositions: this.getHrPositionOptions(),
        ratetypes: this.getRateTypeOptions(),
        hourlyrate: '',
        paygrades: this.getPayGradeOptions(),
        refnos: this.getRefNosOptions(),
        mainSkills: this.getMainSkillsOptions(),
        costCenters: this.getCostCenterOptions(),
        originalDocumentation: '',
        terminationNum: '',
    };
  }

  getDropdownOptions (optionName) {
    switch  (optionName) {
      case "reportingManager":
        return this.getReportingManagersOptions();
      case "hrPosition":
        return this.getHrPositionOptions();
      case "rateType":
        return this.getRateTypeOptions();
      case "payGrade":
        return this.getPayGradeOptions();
      case "refNos":
        return this.getRefNosOptions();
      case "mainSkills":
        return this.getMainSkillsOptions();
      case "costCenters":
        return this.getCostCenterOptions();
      default:
        return [];
    }
  }

  getReportingManagersOptions() {
    //TODO change to DB call
    return ['harry potter', 'luna luvgood'];
  }

  getHrPositionOptions() {
    //todo db call
    return ['professor', 'dark arts teacher'];
  }

  getRateTypeOptions() {
    //todo db call
    return ['Monthly', 'Hourly', 'Daily'];
  }

  getPayGradeOptions() {
    //todo change to DB call
    return ['A', 'B'];
  }

  getRefNosOptions() {
    //todo db call
    return ['1', '2', '3'];
  }

  getMainSkillsOptions() {
    //todo db call
    return ['Databases', 'Languages'];
  }

  getCostCenterOptions() {
    //todo db call
    return ["Vancouver", "Calgary"];
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
          this.createDefaultProjectObject()
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
      handleDropdownInput={this.handleDropdownInput}
      handleDateInput={this.handleDateInput}
      handleRadioInput={this.handleRadioInput}
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
