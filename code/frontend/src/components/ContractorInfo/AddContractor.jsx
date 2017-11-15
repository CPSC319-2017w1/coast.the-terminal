import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './addcontractor.css';
import Contractor from './Contractor.jsx';
import Projects from './Projects.jsx';

function AddContractorComponent({contractor, projects, handleTextInput, handleDropdownInput,
  handleDateInput, handleRadioInput, handleAdd, handleSubmit, message}) {
  return (
    <div className={css.wrapper}>
      { message === '' ? null : <p>{message}</p> }
      <h1>Contractor Information</h1>
      <p> Use the form below to add contractor information into the system.</p>
      <Contractor contractor={contractor} handleTextInput={handleTextInput} handleRadioInput={handleRadioInput}/>
      <Projects projects={projects} handleTextInput={handleTextInput} handleDropdownInput={handleDropdownInput}
        handleDateInput={handleDateInput} handleRadioInput={handleRadioInput} />
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
  message: PropTypes.string.isRequired,
  handleChargeTypeInput: PropTypes.func.isRequired
};

export default AddContractorComponent;
