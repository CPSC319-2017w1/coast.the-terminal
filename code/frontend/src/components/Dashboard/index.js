import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import DashboardComponent from './Dashboard.jsx';
import { switchView } from '../../actions/main-actions.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchTab: tab => {
      dispatch(switchView(tab));
    }
  };
};

/**
 * Class that represents Dashboard Container
 */
class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Redirects to the page based on the button clicked
   * @param event
   */
  onClick(event) {
    event.preventDefault();
    const tab = event.target.getAttribute('name');
    this.props.cookies.set('tab', tab);
    this.props.switchTab(tab);
  }

  /**
   * renders the react component to the screen
   * @return {XML}
   */
  render() {
    return <DashboardComponent onClick={this.onClick} />;
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

export default withCookies(Dashboard);

