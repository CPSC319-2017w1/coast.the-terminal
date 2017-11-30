import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilteringComponent from './Filtering.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
    tab: state.main.tab
  };
};

class FilteringContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTutorial: false
    };
    this.handleTutorial = this.handleTutorial.bind(this);
    this.closeTutorial = this.closeTutorial.bind(this);
  }

  /**
   * toggles the state of visibility of tutorial
   * @param event
   */
  handleTutorial(event) {
    event.preventDefault();
    this.setState({
      showTutorial: !this.state.showTutorial
    });
  }

  /**
   * closes the tutorial
   * @param event
   */
  closeTutorial(event){
    event.preventDefault();
    this.setState({
      showTutorial: false
    });
  }

  /**
   * Renders the Filtering component with the Tutorial and Pivot Table
   * @return {XML}
   */
  render(){
    return <FilteringComponent
      showTutorial={this.state.showTutorial}
      handleTutorial={this.handleTutorial}
      closeTutorial={this.closeTutorial}
    />;
  }
}

FilteringContainer.propTypes = {
  user: PropTypes.object.isRequired
};

const Filtering = connect(
  mapStateToProps,
  null
)(FilteringContainer);

export default Filtering;