import React from 'react';
import PropTypes from 'prop-types';
import * as TYPES from '../../../constants/input-types.js';

// todo: input validations

function Form({inputs, onChange, onSubmit, submitText}) {
  let children = [];
  for (let key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      const item = inputs[key];
      switch (item.type) {
        case TYPES.TEXT:
        case TYPES.NUMBER:
          children.push(getTextOrNumberField(item, key, onChange));
          break;
        case TYPES.DROPDOWN:
          children.push(getDropdownField(item, key, onChange));
          break;
        default:
          break;
      }
    }
  }
  return <div>
    {children}
    <button type="submit" onClick={onSubmit}>{submitText}</button>
  </div>;
}

function getTextOrNumberField(item, key, onChange) {
  return <div key={key}>
    <span>{item.title}</span>
    <input name={key} onChange={onChange} value={item.value} type={item.type} />
  </div>;
}

function getDropdownField(items, key, onChange) {
  return <div key={key}>
    <span>{items.title}</span>
    <select onChange={onChange} type={items.type} value={items.selected} name={key}>
      {items.value.map(item => <option key={`${key}_${item.value}`} value={item.value}>{item.title}</option>)}
    </select>
  </div>;
}

Form.propTypes = {
  inputs: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
