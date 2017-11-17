import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from './Form.jsx';
import Table from './Table.jsx';
import * as TYPES from '../../../constants/input-types.js';
import {DISPLAY_NAME} from '../../../constants/admin-tables';

const mapStateToProps = (state, ownProps) => {
  return {
    table: state.tables[ownProps.tableName]
  };
};

class PanelWrapperContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      toggleAdd: false,
      toggleEdit: false,
      inputValidationMessage: '',
      itemId: '',
    }, props.getInitialState());
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getContent = this.getContent.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  toggleAdd(event) {
    event.preventDefault();
    const toggleAdd = !this.state.toggleAdd;
    this.setState({ toggleAdd, toggleEdit: false, itemId: '' });
  }

  toggleEdit(event) {
    event.preventDefault();
    let inputs = Object.assign({}, this.state.inputs);
    const toggleEdit = !this.state.toggleEdit;
    let itemId = '';
    if (toggleEdit) {
      const parent = event.target.parentNode.parentNode;
      const children = parent.childNodes;
      for(let i = 1; i < children.length; i++) { //starting from 1 because 0 is the edit button
        const name = children[i].getAttribute('name');
        const value = children[i].innerText;
        inputs[name].selected = value;
        if (Array.isArray(inputs[name].value)) {
          inputs[name].value.forEach(element => element.selected = element.value === value);
        } else {
          inputs[name].value = value;
        }
      }
      itemId = parent.getAttribute('name');
    } else {
      inputs = this.props.getInitialState().inputs;
    }
    this.setState({ toggleEdit, toggleAdd: false, inputs, itemId });
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

  handleAdd(event) {
    event.preventDefault();
    const { inputs } = this.state;
    let data = {};
    for(let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        data[key] = inputs[key].selected;
      }
    }
    const inputValidation = this.areInputsValid(data);
    if (inputValidation.isValid) {
      this.setState({ inputValidationMessage: '' });
      this.props.handleAddNew(data);
      this.toggleAdd(event);
    } else {
      this.setState({ inputValidationMessage: inputValidation.message });
    }
  }

  handleEdit(event) {
    event.preventDefault();
    const { inputs } = this.state;
    let data = {};
    for(let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        data[key] = inputs[key].selected;
      }
    }
    if (Object.keys(data).indexOf('username') === -1) { // this means the table is users and uses usernames as ids
      data.id = event.target.parentNode.getAttribute('name');
    }
    const inputValidation = this.areInputsValid(data);
    if (inputValidation.isValid) {
      this.setState({ inputValidationMessage: '' });
      this.props.handleEditRow(data);
      this.toggleEdit(event);
    } else {
      this.setState({ inputValidationMessage: inputValidation.message });
    }
  }

  clearAll(event) {
    event.preventDefault();
    this.setState(Object.assign({ inputValidationMessage: '' }, this.props.getInitialState()));
  }

  getContent() {
    const { props, state } = this;
    return (
      <div>
        {
          state.toggleAdd || state.toggleEdit
            ? <Form inputs={state.inputs}
              onChange={this.handleInputChange}
              onSubmit={state.toggleAdd ? this.handleAdd : this.handleEdit}
              clearAll={this.clearAll}
              itemId={state.itemId} />
            : null
        }
        <Table table={props.table.data}
          addNew={this.toggleAdd}
          edit={this.toggleEdit}
          editingRow={state.itemId}
          isAddingNew={state.toggleAdd} />
      </div>
    );
  }

  areInputsValid(inputs) {
    const response = {
      isValid: true,
      message: ''
    };
    const keys = Object.keys(inputs);
    keys.forEach(key => {
      if (typeof inputs[key] === 'undefined' || inputs[key] === '') {
        response.isValid = false;
        response.message = 'Please make sure all fields have been filled in.';
        return response;
      } else if (key.indexOf('start') > -1) {
        const end = keys.find(item => item.indexOf('end') > -1);
        if (end && (inputs[key] < 0 || inputs[end] < 0)) {
          response.isValid = false;
          response.message = 'Values cannot be negative.';
          return response;
        } else if (end && inputs[key] >= inputs[end]) {
          response.isValid = false;
          response.message = 'End value cannot be smaller than or equal to start value.';
          return response;
        }
      }
    });
    return response;
  }

  render() {
    const { props, state } = this;
    return <div>
      <button onClick={props.onReturn}>Return to main admin panel page</button>
      <p>{props.header}</p>
      {state.inputValidationMessage === '' ? null : <div>{state.inputValidationMessage}</div>}
      {props.table.error ? <div>{props.table.error}</div> : null}
      {this.getContent()}
    </div>;
  }
}

PanelWrapperContainer.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired,
  getInitialState: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired
};


const PanelWrapper = connect(
  mapStateToProps,
  null
)(PanelWrapperContainer);

export default PanelWrapper;
