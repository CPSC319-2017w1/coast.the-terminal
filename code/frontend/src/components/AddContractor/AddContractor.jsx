import React from 'react';
import PropTypes from 'prop-types';
import css from './addcontractor.css';
import Contractor from './Contractor.jsx';
import Projects from './Projects.jsx';

/**
 * Creates the html component for Add Contractor
 * @param contractor - object that holds information of the contractor
 * @param projects - array that holds the engagement contracts of the contractor
 * @param handleTextInput -  function that handles the input in the text fields
 * @param handleDropdownInput - function that handles the input in the dropdown fields
 * @param handleDateInput - function that handles the input in the date field
 * @param handleRadioInput - function that handles the input for radio button
 * @param handleAdd - adds another project component
 * @param handleRemove - remove last project component
 * @param handleSubmit - saves the contractor to the database
 * @param handleCancel - clear all the fields
 * @param message - error message
 * @param tables - data for dropdowns
 * @returns React component for AddContractor
 */
function AddContractorComponent({contractor, projects, handleTextInput, handleDropdownInput,
  handleDateInput, handleRadioInput, handleAdd, handleRemove, handleSubmit, handleCancel, message, tables}) {
  return (
    <div data-qa="add-wrapper" className={css.wrapper}>
      { message === '' ? null : <p>{message}</p> }
      <h1 data-qa="add-header">Add Contractor</h1>
      <p> Use the form below to add contractor information into the system.</p>
      <Contractor contractor={contractor} handleTextInput={handleTextInput} handleRadioInput={handleRadioInput}/>
      <Projects projects={projects} handleTextInput={handleTextInput} handleDropdownInput={handleDropdownInput}
        handleDateInput={handleDateInput} handleRadioInput={handleRadioInput} tables={tables} />
      <input className={css.btnstyle} type="submit" onClick={handleAdd} value="Add Additional Contract" />
      <input className={css.btnstyle} type="submit" onClick={handleRemove} value="Remove Additional Contract" />
      <input data-qa="addcontractor" className={css.btnstyle} type="submit" onClick={handleSubmit} value="Add Contract" />
      <button className={css.btnstyle} onClick={handleCancel}>Clear Fields</button>
    </div>
  );
}

AddContractorComponent.propTypes = {
  contractor: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  handleTextInput: PropTypes.func.isRequired,
  handleDropdownInput: PropTypes.func.isRequired,
  handleDateInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRadioInput: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  tables: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default AddContractorComponent;
