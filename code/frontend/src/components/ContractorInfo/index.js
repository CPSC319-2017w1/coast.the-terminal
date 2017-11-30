/**
 * Created by shrey on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContractorInfoComponent from './ContractorInfo.jsx';
import EditContractor from './EditContractor.js';
import { isLoading, hasStoppedLoading } from '../../actions/main-actions';
import { viewAllContractorDataKeepOriginal } from '../../actions/contractor-info-actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab,
    contractors: state.contractors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: (token) => {
      dispatch(isLoading());
      dispatch(viewAllContractorDataKeepOriginal(token));
    },
    stopLoading: () => {
      dispatch(hasStoppedLoading());
    }
  };
};

class ContractorInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContractorId: null,
      searchvalue: ''
    };
    this.handleEditContractor = this.handleEditContractor.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contractors.data && nextProps.contractors.data.humanReadableData.length > 0) {
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getData(this.props.user.token);
  }

  /**
   * Handle search value to search a contractor in the table
   * @param event
   */
  handleSearch(event){
    event.preventDefault();
    this.setState({
      searchvalue: event.target.value
    });
  }

  /**
   * Set the selected contractor id to the contractor selected for editing
   * @param event
   */
  handleEditContractor(event) {
    event.preventDefault();
    let id = event.target.getAttribute('name');
    this.setState({
      selectedContractorId: id
    });
  }

  /**
   * set the selected Contractor id to null to render back to contractor info page
   * @param event
   */
  handleBack(event){
    event.preventDefault();
    this.setState({
      selectedContractorId: null
    });
  }

  /**
   * Render is based on two factors.
   * If selected contractor id is null, then contractor info page is rendered. Otherwise, edit contractor is loaded with the selected contractor id.
   * If search value is empty then the entire table is loaded otherwise only data that contain the search value are rendered.
   * @return React component to be rendered
   */
  render() {
    const {props, state} = this;
    let contractorData;
    if (props.contractors && props.contractors.data) {
      contractorData = props.contractors.data.humanReadableData;
    }
    if (typeof contractorData === typeof undefined) {
      contractorData = [];
    }
    let data = [];
    if(state.searchvalue == ''){
      data = contractorData;
    } else {
      data = contractorData.filter(contractor => (
        (contractor['First Name'].toLowerCase().includes(state.searchvalue.toLowerCase())) ||
        (contractor['Last Name'].toLowerCase().includes(state.searchvalue.toLowerCase()))));
    }


    if (state.selectedContractorId == null) {
      return <ContractorInfoComponent
        tabledata={data}
        searchvalue={state.searchvalue}
        handleSearch={this.handleSearch}
        handleEditContractor={this.handleEditContractor}/>;
    } else {
      let selectedContractor = {};
      for (let contractor of props.contractors.data.originalData) {
        if (contractor['id'] === state.selectedContractorId) {
          selectedContractor = contractor;
        }
      }
      return <EditContractor contractor={selectedContractor} projects={selectedContractor.contracts} returnBack={this.handleBack}/>;
    }
  }
}

const ContractorInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorInfoContainer);

export default ContractorInfo;