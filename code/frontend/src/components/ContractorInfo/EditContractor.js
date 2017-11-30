import React from 'react';
import { connect } from 'react-redux';
import EditContractorComponent from './EditPage.jsx';
import { editContractor } from '../../actions/contractor-info-actions.js';
import { viewTableRows } from '../../actions/view-tables-actions.js';
import { switchView } from '../../actions/main-actions.js';
import { CONTRACTOR_INFO } from '../../constants/tabs';


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
    onSubmit: (contractorData, projectData, tableData, numNewContracts, callback, token) => {
      dispatch(editContractor(contractorData, projectData, tableData, numNewContracts, callback, token));
    },
    viewTables: (token) => {
      dispatch(viewTableRows('skills', token));
      dispatch(viewTableRows('fxrates', token));
      dispatch(viewTableRows('paygrades', token));
      dispatch(viewTableRows('hrroles', token));
      dispatch(viewTableRows('hiringmanagers', token));
      dispatch(viewTableRows('costcenters', token));
    },
    switchBack: () => {
      dispatch(switchView(CONTRACTOR_INFO));
    }};

};

class EditContractorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      tables: {},
      numNewContracts: 0
    };
    this.state.contractor = props.contractor;
    this.state.contractor['surname'] = this.state.contractor.lastName;
    this.state.projects = props.projects;

    for (let project of this.state.projects) {
      project.rateType = project.rateType.charAt(0).toUpperCase() + project.rateType.slice(1);
      project['ratetypes'] = this.getRateTypeOptions();
      project['mainSkillId'] = project.mainSkill.id;
      project['hrPayGradeId'] = project.hrPayGrade.id;
      project['costCenterId'] = project.costCenter.id;
      project['hrPositionId'] = project.hrPositionRole.id;
      project['hourlyrate'] = project.dollarRate;
      project['reportingManagerId'] = project.hiringManager.id;
      project['poNum'] = project.poRefNum;
    }

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDropdownInput = this.handleDropdownInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);

  }

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
    this.state.numNewContracts++;
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
    const { numNewContracts } = this.state;
    let confirmation = confirm('Are you sure you want to add changes to this contractor?');

    if(confirmation){
      this.props.onSubmit(contractor, projects, this.props.tables, numNewContracts, this.resetState, this.props.token);
    } else {
      alert('Contractor changes not saved');
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
      hourlyrate: '',
      paygrades: this.getPayGradeOptions(),
      refnos: this.getRefNosOptions(),
      mainSkills: this.getMainSkillsOptions(),
      costCenters: this.getCostCenterOptions(),
      originalDocumentation: '',
      terminationNum: ''
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

  getReportingManagersOptions() {
    //to be replaced with calls from the database
    return ['harry potter', 'luna luvgood'];
  }

  getHrPositionOptions() {
    //to be replaced with calls from the database
    return ['professor', 'dark arts teacher'];
  }

  getRateTypeOptions() {
    //to be replaced with calls from the database
    return ['Monthly', 'Hourly', 'Daily'];
  }

  getPayGradeOptions() {
    //to be replaced with calls from the database
    return ['A', 'B'];
  }

  getRefNosOptions() {
    //to be replaced with calls from the database
    return ['1', '2', '3'];
  }

  getMainSkillsOptions() {
    //to be replaced with calls from the database
    return ['Databases', 'Languages'];
  }

  getCostCenterOptions() {
    //to be replaced with calls from the database
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
      alert('Contractor Edited Successfully');
    }
  }

  render() {
    return <EditContractorComponent
      contractor={this.state.contractor}
      projects={this.state.projects}
      handleTextInput={this.handleTextInput}
      handleDropdownInput={this.handleDropdownInput}
      handleDateInput={this.handleDateInput}
      handleRadioInput={this.handleRadioInput}
      handleAdd={this.handleAdd}
      handleSubmit={this.handleSubmit}
      handleBack={this.props.returnBack}
      message={this.state.message}
      tables={this.props.tables}
    />;
  }
}

const EditContractor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContractorContainer);

export default EditContractor;