import React from 'react';
import PropTypes from 'prop-types';
import css from '../AddContractor/addcontractor.css';
import Contractor from '../AddContractor/Contractor.jsx';
import Projects from '../AddContractor/Projects.jsx';

/**
 * Creates the html component for Edit Contractor
 * @param contractor - object that holds information of the contractor
 * @param projects - array that holds the engagement contracts of the contractor
 * @param handleTextInput -  function that handles the input in the text fields
 * @param handleDropdownInput - function that handles the input in the dropdown fields
 * @param handleDateInput - function that handles the input in the date field
 * @param handleRadioInput - function that hanldes the input for radio button
 * @param handleAdd - adds another project component
 * @param handleSubmit - saves the contractor to the database
 * @param handleBack - returns to contractor info page
 * @param message - error message
 * @param tables - data for dropdowns
 * @returns React component for EditContractor
 */
function EditContractorComponent({contractor, projects, handleTextInput, handleDropdownInput,
  handleDateInput, handleRadioInput, handleAdd, handleSubmit, handleBack, message, tables}) {
  return (
    <div className={css.wrapper}>
      { message === '' ? null : <p>{message}</p> }
      <h1 data-qa="editpage" >Edit Contractor</h1>
      <p> Use the form below to edit contractor information stored in the system.</p>
      <button className={css.backbtnstyle} onClick={handleBack}> Back to Contractor Info</button>
      <Contractor contractor={contractor} handleTextInput={handleTextInput} handleRadioInput={handleRadioInput}/>
      <Projects projects={projects} handleTextInput={handleTextInput} handleDropdownInput={handleDropdownInput}
        handleDateInput={handleDateInput} handleRadioInput={handleRadioInput} tables={tables} />
      <input className={css.btnstyle} type="submit" onClick={handleAdd} value="Add Additional Contract" />
      <input className={css.btnstyle} type="submit" onClick={handleSubmit} value="Save Contractor" />
    </div>
  );
}

EditContractorComponent.propTypes = {
  contractor: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  handleTextInput: PropTypes.func.isRequired,
  handleDropdownInput: PropTypes.func.isRequired,
  handleDateInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleRadioInput: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  tables: PropTypes.object.isRequired
};

export default EditContractorComponent;