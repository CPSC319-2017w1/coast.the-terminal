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
  }

  render(){
    const {props} = this;
    return <AdminPanelComponent
      username={props.user.username}
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
