import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddContractorComponent from './AddContractor.jsx';
import { addContractor } from '../../actions/contractor-info-actions.js';
import { viewTableRows } from '../../actions/view-tables-actions.js';

const mapStateToProps = state => {
  return {
    error: state.contractors.error,
    isLoading: state.main.isLoading,
    tables: state.tables,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (contractorData, projectData, tableData, callback, token) => {
      dispatch(addContractor(contractorData, projectData, tableData, callback, token));
    },
    viewTables: (token) => {
      dispatch(viewTableRows('skills', token));
      dispatch(viewTableRows('fxrates', token));
      dispatch(viewTableRows('paygrades', token));
      dispatch(viewTableRows('hrroles', token));
      dispatch(viewTableRows('hiringmanagers', token));
      dispatch(viewTableRows('costcenters', token));
    }
  };
};

/**
 * Class representing add contractor
 */
class AddContractorContainer extends React.Component{
  /**
   * defines the state
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      contractor: {
        firstName: '',
        lastName: '',
        agencySource: '',
        status: 'active'
      },
      projects: [
        this.createDefaultProjectObject()
      ],
      tables: {}
    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDropdownInput = this.handleDropdownInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    this.props.viewTables(this.props.token);
  }

  /**
   * Saves the text input to the designated field in the database
   * @param event - user input
   */
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

  /**
   * Saves the dropdown input to the designated field in the database
   * @param event - user input
   */
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

  /**
   * Saves the date input to the designated field in the database
   * @param event - user input
   */
  handleDateInput(event) {
    event.preventDefault();
    const { state } = this;
    const { projects } = state;
    let dataIndex = parseInt(event.target.getAttribute('data-index'));
    let project = projects[dataIndex];
    project[event.target.getAttribute('name')] = event.target.value;
    this.setState(Object.assign(state, {projects}));
  }

  /**
   * Saves the radio input to the designated field in the database
   * @param event - user input
   */
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
      let nameWithIndex = event.target.getAttribute('name');
      let name = nameWithIndex.split('-')[0];
      project[name] = event.target.value;
      this.setState(Object.assign(state, {projects}));
    }
  }

  /**
   * Adds another project component to the page
   * @param event - user input
   */
  handleAdd(event) {
    event.preventDefault();
    let projectState = this.state.projects;
    projectState.push(this.createDefaultProjectObject());
    this.setState({projects: projectState});
  }

  /**
   * Saves the contractor to the database
   * @param event - user input
   */
  handleSubmit(event) {
    event.preventDefault();
    const { contractor } = this.state;
    const { projects } = this.state;
    let errors = this.handleValidations();

    if(errors.length > 0){
      alert('Please fix the following errors before proceeding' + '\n' + errors);
    } else {
      let confirmation = confirm('Are you sure you want to add this contractor to the system?');
      if(confirmation){
        this.props.onSubmit(contractor, projects, this.props.tables, this.resetState, this.props.token);
      } else {
        alert('Contractor not added');
      }
    }



  }

  handleCancel(){
    event.preventDefault();
    const { props } = this;
    let confirmation = confirm('Are you sure you want to clear fields?');
    if(confirmation){
      if (props.error) {
        alert(props.error);
      } else {
        this.setState({
          contractor: {
            firstName: '',
            surname: '',
            agencySource: '',
            status: 'active'
          },
          projects: [
            this.createDefaultProjectObject()
          ]
        });
      }
    } else {

    }
  }

  /**
   * Creates an empty project object
   */
  createDefaultProjectObject() {
    return {
      projectName: '',
      reportingmanagers: this.getReportingManagersOptions(),
      hrpositions: this.getHrPositionOptions(),
      ratetypes: this.getRateTypeOptions(),
      paygrades: this.getPayGradeOptions(),
      poNum: 0,
      mainSkills: this.getMainSkillsOptions(),
      costCenters: this.getCostCenterOptions(),
      originalDocumentation: '',
      terminationNum: 0,
      startDate: '2017-01-01',
      endDate: '2017-01-02',
      dailyAllowance:0,
      timeMaterialTerms:0,
      hourlyrate:0
    };
  }

  /**
   * gets dropdown options
   * @param optionName - name of dropdown
   * @return {*} - gets options for given dropdowns
   */
  getDropdownOptions (optionName) {
    switch  (optionName) {
      case 'reportingManager':
        return this.getReportingManagersOptions();
      case 'hrPosition':
        return this.getHrPositionOptions();
      case 'rateType':
        return this.getRateTypeOptions();
      case 'payGrade':
        return this.getPayGradeOptions();
      case 'refNos':
        return this.getRefNosOptions();
      case 'mainSkills':
        return this.getMainSkillsOptions();
      case 'costCenters':
        return this.getCostCenterOptions();
      default:
        return [];
    }
  }

  /**
   * checks if the fields are empty
   * @return Array of errors
   */
  handleValidations(){
    let errors = [];
    if(!this.state.contractor.firstName.length){
      errors.push('Missing contractor first name');
    }
    if(!this.state.contractor.lastName.length){
      errors.push('\n' + 'Missing contractor last name');
    }
    if(!this.state.contractor.agencySource.length){
      errors.push('\n' + 'Missing contractor agency source');
    }
    this.state.projects.map((project) =>{
      if(!project.projectName.length){
        errors.push('\n' + 'Missing project name');
      }
      if(!project.originalDocumentation.length){
        errors.push('\n' + 'Missing original documentation');
      }
      if(!project.originalDocumentation.length){
        errors.push('\n' + 'Missing original documentation');
      }
      if(project.dailyAllowance == 0){
        errors.push('\n' + 'Missing daily allowance');
      }
      if(project.timeMaterialTerms == 0){
        errors.push('\n' + 'Missing Time and material items');
      }
      if(project.hourlyrate == 0){
        errors.push('\n' + 'Missing hourly rate');
      }
      if(project.startDate > project.endDate){
        errors.push('\n' + 'Start Date cannot be later than end date');
      }
    });
    return errors;
  }

  getReportingManagersOptions() {
    //fallbacks
    return ['harry potter', 'luna luvgood'];
  }

  getHrPositionOptions() {
    //fallbacks
    return ['professor', 'dark arts teacher'];
  }

  getRateTypeOptions() {
    //fallbacks
    return ['Monthly', 'Hourly', 'Daily'];
  }

  getPayGradeOptions() {
    //fallbacks
    return ['A', 'B'];
  }

  getMainSkillsOptions() {
    //fall backs
    return ['Databases', 'Languages'];
  }

  getCostCenterOptions() {
    //fallbacks
    return ['Vancouver', 'Calgary'];
  }

  /**
   * resets the component to initial state
   */
  resetState() {
    const { props } = this;
    if (props.error) {
      alert(props.error);
    } else {
      this.setState({
        contractor: {
          firstName: '',
          surname: '',
          agencySource: ''
        },
        projects: [
          this.createDefaultProjectObject()
        ]
      });
      alert('Contractor added Successfully');
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
      handleCancel={this.handleCancel}
      message={this.state.message}
      tables={this.props.tables}
    />;
  }
}

const AddContractor = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContractorContainer);

export default AddContractor;
