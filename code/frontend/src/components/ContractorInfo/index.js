/**
 * Created by shrey on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContractorInfoComponent from './ContractorInfo.jsx';
import EditContractor from './EditContractor.js';
import items from '../Filtering/Data.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class ContractorInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: items,
      selectedContractorId: null
    };
    this.handleEditContractor = this.handleEditContractor.bind(this);
  }

  handleEditContractor(event) {
    event.preventDefault();
    let id = event.target.getAttribute('name');
    this.setState({
      selectedContractorId: id
    });
  }

  render() {
    if(this.state.selectedContractorId == null){
      return <ContractorInfoComponent
        tabledata={this.state.data}
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