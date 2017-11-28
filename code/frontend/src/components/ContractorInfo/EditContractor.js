import React from 'react';
import { connect } from 'react-redux';
import EditContractorComponent from './EditPage.jsx';


const mapStateToProps = state => {
  return {
    error: state.contractors.error,
    isLoading: state.main.isLoading,
    tables: state.tables
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class EditContractorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      tables: {}
    };
    this.state.contractor = props.contractor;
    this.state.projects = props.projects;
    for(let project of this.state.projects) {
      project.rateType = project.rateType.charAt(0).toUpperCase() + project.rateType.slice(1);
      project['ratetypes'] = this.getRateTypeOptions();
      project['mainSkillId'] = project.mainSkill.id;
      project['hrPayGradeId'] = project.hrPayGrade.id;
      project['costCenterId'] = project.costCenter.id;
      project['hrPositionId'] = project.hrPositionRole.id;

    }
    this.state.contractor = props.contractor;
    this.state.projects = props.projects;
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
    this.setState({projects: projectState});
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
      terminationNum: ''
    };
  }

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
        message: 'Contractor saved successfully.'
      });
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