import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminPanelComponent from './AdminPanel.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};

class AdminPanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){

  }

  render(){
    return <AdminPanelComponent
      onClick={this.onClick}
    />;
  }
}

AdminPanelContainer.propTypes= {
  user: PropTypes.object.isRequired
};

const AdminPanel = connect(
  mapStateToProps,
  null
)(AdminPanelContainer);

export default AdminPanel;
