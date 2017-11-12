import React from 'react';
import PropTypes from 'prop-types';
import css from './addcontractor.css';
import Contractor from './Contractor.jsx';
import Projects from './Projects.jsx';

function AddContractorComponent({contractor, projects, handleTextInput, handleStatusInput, handleDropdownInput,
  handleDateInput, handleCurrencyInput, handleAdd, handleSubmit, message}) {
  return (
    <div className={css.wrapper}>
      { message === '' ? null : <p>{message}</p> }
      <h1>Contractor Information</h1>
      <p> Use the form below to add contractor information into the system.</p>
      <Contractor contractor={contractor} handleTextInput={handleTextInput} handleStatusInput={handleStatusInput} />
      <Projects projects={projects} handleTextInput={handleTextInput} handleDropdownInput={handleDropdownInput}
        handleDateInput={handleDateInput} handleCurrencyInput={handleCurrencyInput} />
      <input className={css.btnstyle} type="submit" onClick={handleAdd} value="Add Additional Contract" />
      <input className={css.btnstyle} type="submit" onClick={handleSubmit} value="Add Contract" />
    </div>

  );
}

AddContractorComponent.propTypes = {
  contractor: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  handleTextInput: PropTypes.func.isRequired,
  handleStatusInput: PropTypes.func.isRequired,
  handleDropdownInput: PropTypes.func.isRequired,
  handleDateInput: PropTypes.func.isRequired,
  handleCurrencyInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default AddContractorComponent;
