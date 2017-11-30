import React from 'react';
import PropTypes from 'prop-types';
import * as TYPES from '../../../constants/input-types.js';
import css from '../../../components/AdminPanel/Tabs/table.css';

/**
 * Renders a form
 * @param {object} inputs - Inputs to appear in the form
 * @param {function} onChange - State change handler for inputs
 * @param {function} onSubmit - Click handler for submit button
 * @param {function} clearAll - Click handler for Clear All button
 * @param {string} itemId - ID of the item that is being edited (only if the form is for edit row, not adding a new row)
 * @param {boolean} isEdit - Whether or not the form is for editing an existing row
 * @param {boolean} isActiveUser - Whether or not the form is displaying information for the currently logged in user
 * */
function Form({inputs, onChange, onSubmit, clearAll, itemId, isEdit, isActiveUser}) {
  let children = [];
  for (let key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      const item = inputs[key];
      switch (item.type) {
        case TYPES.TEXT:
        case TYPES.PASSWORD:
          children.push(getTextField(item, key, onChange, isEdit));
          break;
        case TYPES.NUMBER:
          children.push(getNumberField(item, key, onChange));
          break;
        case TYPES.DROPDOWN:
          children.push(getDropdownField(item, key, onChange, isActiveUser));
          break;
        default:
          break;
      }
    }
  }
  return <div className={css.form} name={itemId}>
    {children}
    <button className={css.cancelbtn} type="submit" onClick={onSubmit}>Submit</button>
    <button className={css.cancelbtn} onClick={clearAll}>Clear Fields</button>
  </div>;
}

/**
 * Render input of type number
 * @param {object} item
 * @param {string} key - A unique ID for the input
 * @param {function} onChange - State change handler for the input
 * */
function getNumberField(item, key, onChange) {
  return <div className={css.formfield} key={key}>
    <span>{item.title}</span>
    <input name={key} onChange={onChange} value={item.value} type={item.type} min={0} />
  </div>;
}

/**
 * Render input of type text
 * @param {object} item
 * @param {string} key - A unique ID for the input
 * @param {function} onChange - State change handler for the input
 * @param {boolean} isEdit - Whether or not the form is for editing an existing row
 * */
function getTextField(item, key, onChange, isEdit) {
  return <div className={css.formfield} key={key}>
    <span>{item.title}</span>
    <input name={key} onChange={onChange} disabled={isEdit && item.title === 'Username'} value={item.value} type={item.type} />
  </div>;
}

/**
 * Render input of type dropdown
 * @param {object} items
 * @param {string} key - A unique ID for the input
 * @param {function} onChange - State change handler for the input
 * @param {boolean} isActiveUser - Whether or not the form is displaying information for the currently logged in user
 * */
function getDropdownField(items, key, onChange, isActiveUser) {
  return <div className={css.formfield} key={key}>
    <span>{items.title}</span>
    <select onChange={onChange} type={items.type} value={items.selected} name={key} disabled={key === 'permissions' && isActiveUser}>
      {items.value.map(item => <option key={`${key}_${item.value}`} value={item.value}>{item.title}</option>)}
    </select>
  </div>;
}

Form.defaultProps = {
  isActiveUser: false
};

Form.propTypes = {
  inputs: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isActiveUser: PropTypes.bool
};

export default Form;
