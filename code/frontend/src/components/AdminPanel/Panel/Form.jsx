import React from 'react';
import PropTypes from 'prop-types';
import * as TYPES from '../../../constants/input-types.js';

// todo: input validations

function Form({inputs, onChange, onSubmit, clearAll, itemId, isEdit}) {
  let children = [];
  for (let key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      const item = inputs[key];
      switch (item.type) {
        case TYPES.TEXT:
          children.push(getTextField(item, key, onChange, isEdit));
          break;
        case TYPES.NUMBER:
          children.push(getNumberField(item, key, onChange));
          break;
        case TYPES.DROPDOWN:
          children.push(getDropdownField(item, key, onChange));
          break;
        default:
          break;
      }
    }
  }
  return <div name={itemId}>
    {children}
    <button type="submit" onClick={onSubmit}>Submit</button>
    <button onClick={clearAll}>Clear Fields</button>
  </div>;
}

function getNumberField(item, key, onChange) {
  return <div key={key}>
    <span>{item.title}</span>
    <input name={key} onChange={onChange} value={item.value} type={item.type} min={0} />
  </div>;
}

function getTextField(item, key, onChange, isEdit) {
  return <div key={key}>
    <span>{item.title}</span>
    <input name={key} onChange={onChange} disabled={isEdit && item.title === 'Username'} value={item.value} type={item.type} />
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
  onSubmit: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired
};

export default Form;
