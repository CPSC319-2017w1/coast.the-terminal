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
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contractors.data.humanReadableData.length > 0) {
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getData(this.props.user.token);
  }

  handleSearch(event){
    event.preventDefault();
    this.setState({
      searchvalue: event.target.value
    });
  }

  handleEditContractor(event) {
    event.preventDefault();
    let id = event.target.getAttribute('name');
    this.setState({
      selectedContractorId: id
    });
  }

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
      contractorData.map(function (contractor) {
        for(let contractorField in contractor) {
          if (contractor.hasOwnProperty(contractorField)) {
            if(contractor[contractorField] == state.searchvalue){
              data.push(contractor);
            }
          }
        }
      });
    }

    if(state.selectedContractorId == null){
      return <ContractorInfoComponent
        tabledata={data}
        searchvalue={state.searchvalue}
        handleSearch={this.handleSearch}
        handleEditContractor={this.handleEditContractor}/>;
    } else {
      return <EditContractor/>;
    }

  }
}

const ContractorInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorInfoContainer);

export default ContractorInfo;