import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './addcontractor.css';
import Contractor from './Contractor.jsx';
import Projects from './Projects.jsx';

function AddContractorComponent({contractor, projects, handleTextInput, handleDropdownInput,
  handleDateInput, handleRadioInput, handleAdd, handleSubmit, handleCancel, message, tables}) {
  return (
    <div className={css.wrapper}>
      { message === '' ? null : <p>{message}</p> }
      <h1>Add Contractor</h1>
      <p> Use the form below to add contractor information into the system.</p>
      <Contractor contractor={contractor} handleTextInput={handleTextInput} handleRadioInput={handleRadioInput}/>
      <Projects projects={projects} handleTextInput={handleTextInput} handleDropdownInput={handleDropdownInput}
        handleDateInput={handleDateInput} handleRadioInput={handleRadioInput} tables={tables} />
      <input className={css.btnstyle} type="submit" onClick={handleAdd} value="Add Additional Contract" />
      <input className={css.btnstyle} type="submit" onClick={handleSubmit} value="Add Contract" />
      <button className={css.btnstyle} onClick={handleCancel}>Cancel</button>
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
  handleCancel: PropTypes.func.isRequired
};

export default AddContractorComponent;
