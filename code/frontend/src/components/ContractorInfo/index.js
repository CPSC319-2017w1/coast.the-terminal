/**
 * Created by shrey on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContractorInfoComponent from './ContractorInfo.jsx';
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
      data: items
    };
    this.handleEditContractor = this.handleEditContractor.bind(this);
  }

  handleEditContractor() {

  }

  render() {
    return <ContractorInfoComponent
      tabledata={this.state.data}
      handleEditContractor={this.handleEditContractor}/>;
  }
}

const ContractorInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorInfoContainer);

export default ContractorInfo;