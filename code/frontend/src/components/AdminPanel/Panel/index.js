import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from './Form.jsx';
import Table from './Table.jsx';
import * as TYPES from '../../../constants/input-types.js';

const mapStateToProps = (state, ownProps) => {
  return {
    table: state.tables[ownProps.tableName]
  };
};

class PanelWrapperContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ toggleAdd: false }, props.getInitialState());
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getContent = this.getContent.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  toggleAddNew(event) {
    event.preventDefault();
    const toggleAdd = !this.state.toggleAdd;
    this.setState({ toggleAdd });
  }

  handleInputChange(event) {
    event.preventDefault();
    const state = Object.assign({}, this.state);
    const { target } = event;
    const name = target.getAttribute('name');
    const value = target.value;
    state.inputs[name].selected = target.value;
    switch (target.getAttribute('type')) {
      case TYPES.TEXT:
        state.inputs[name].value = target.value;
        break;
      case TYPES.NUMBER:
        state.inputs[name].value = parseFloat(target.value);
        break;
      case TYPES.DROPDOWN:
        state.inputs[name].value.forEach(element => element.selected = element.value === value);
        break;
      default:
        break;
    }
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputs } = this.state;
    let data = {};
    for(let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        data[key] = inputs[key].selected;
      }
    }
    this.props.handleAddNew(data);
    this.toggleAddNew(event);
  }

  clearAll(event) {
    event.preventDefault();
    this.setState(this.props.getInitialState());
  }

  getContent() {
    const { props, state } = this;
    if (state.toggleAdd) {
      return <Form inputs={state.inputs} onChange={this.handleInputChange} onSubmit={this.handleSubmit} submitText={props.submitButtonText} clearAll={this.clearAll} />;
    } else {
      return <Table table={props.table.data} addNew={this.toggleAddNew} />;
    }
  }

  render() {
    const { props, state } = this;
    return <div>
      <button onClick={props.onReturn}>Return to main admin panel page</button>
      <p>{props.header}</p>
      {props.table.error ? <div>{props.table.error}</div> : null}
      {this.getContent(state.inputs, props.submitButtonText)}
    </div>;
  }
}

PanelWrapperContainer.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired,
  getInitialState: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  handleAddNew: PropTypes.func.isRequired
};


const PanelWrapper = connect(
  mapStateToProps,
  null
)(PanelWrapperContainer);

export default PanelWrapper;
