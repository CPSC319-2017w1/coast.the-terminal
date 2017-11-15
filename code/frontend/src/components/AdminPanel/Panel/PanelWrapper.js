import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../Form/Form.jsx';
import * as TYPES from '../../../constants/input-types.js';

const mapStateToProps = (state, ownProps) => {
  return {
    table: state.tables[ownProps.tableName]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitForm: () => {
      dispatch();
    }
  };
};

class PanelWrapperContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState;
    // this.state = {
    //   inputs: {
    //     username: {
    //       title: 'Username',
    //       type: TYPES.TEXT,
    //       value: '',
    //       selected: ''
    //     },
    //     password: {
    //       title: 'Password',
    //       type: TYPES.TEXT,
    //       value: '',
    //       selected: ''
    //     },
    //     permissions: {
    //       title: 'Permissions',
    //       type: TYPES.DROPDOWN,
    //       selected: '',
    //       value: [
    //         {
    //           title: 'Read',
    //           value: 'read',
    //           selected: false
    //         },
    //         {
    //           title: 'Write',
    //           value: 'write',
    //           selected: false
    //         },
    //         {
    //           title: 'Admin',
    //           value: 'admin',
    //           selected: false
    //         }
    //       ]
    //     }
    //   }
    // };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    // dispatch action to add item
    console.log(this.state.inputs);
  }

  render() {
    const { props, state } = this;
    return <div>
      <button onClick={props.onReturn}>Return to main admin panel page</button>
      <p>{props.header}</p>
      {props.table.error ? <div>{props.table.error}</div>
        : <Form inputs={state.inputs} onChange={this.handleInputChange} onSubmit={this.handleSubmit} submitText={props.submitButtonText} />}
    </div>;
  }
}

PanelWrapperContainer.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired
};


const PanelWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelWrapperContainer);

export default PanelWrapper;
