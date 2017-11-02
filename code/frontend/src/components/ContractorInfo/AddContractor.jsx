import React from 'react';
import PropTypes from 'prop-types';
import css from './addcontractor.css';

function AddContractorComponent({handleTextInput, firstname, lastname, company, handleStatusInput,
    handleDropdownInput, projectname, reportingmanager, hrposition, ratetype, hourlyrate, paygrade, refno, handleCurrencyInput,
    handleAdd, handleSubmit, onClick}) {
    return (
        <div className={css.wrapper}>
            <h1>Contractor Information</h1>
            <p>Use the form below to add contractor information into the system.</p>
            <div className={css.contractor-info}>
                <form>
                    First Name <input className={css.txtfield} type="text" value={firstname} onChange={handleTextInput}/>
                    Last Name <input className={css.txtfield} type="text" value={lastname} onChange={handleTextInput}/>
                    Company <input className={css.txtfield} type="text" value={company} onChange={handleTextInput}/>
                    Status <input className={css.radiobutton} type="radio" onChange={handleStatusInput("active")}/> Active
                    <input className={css.radiobutton} type="radio" onChange={handleStatusInput("inactive")}/> Inactive
                </form>
            </div>
            <div className={css.project-info}>
                <form>
                    Project Name <input className={css.txtfield} type="text" value={projectname} onChange={handleTextInput}/>
                    Reporting Manager <Dropdown className={css.txtfield} list = {} value={reportingmanager} onChange={handleDropdownInput}/>
                    Start Date
                    End Date
                    {/*Use react JS datepicker or google other alternatives*/}
                    HR Position <Dropdown className={css.txtfield} list = {} value={hrposition} onChange={handleDropdownInput}/>
                    Rate Type <Dropdown className={css.txtfield} list = {} value={ratetype} onChange={handleDropdownInput}/>
                    Est. Hourly Rate <input className={css.txtfield} type="text" value={hourlyrate} onChange={handleTextInput}/>
                    HR Pay Grade <Dropdown className={css.txtfield} list = {} value={paygrade} onChange={handleDropdownInput}/>
                    PO Reference Number <Dropdown className={css.txtfield} list = {} value={refno} onChange={handleDropdownInput}/>
                    Currency <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/> USD
                    <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/> CAD
                </form>
            </div>
            <input className={css.btnstyle} type="submit" onClick={handleAdd} value="Add Additional Contract" />
            <input className={css.btnstyle} type="submit" onClick={handleSubmit} value="Add Contract" />
        </div>

    );
}

AddContractorComponent.propTypes = {
    handleTextInput: PropTypes.func.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    handleStatusInput: PropTypes.func.isRequired,
    handleDropdownInput: PropTypes.func.isRequired,
    projectname: PropTypes.string.isRequired,
    reportingmanager: PropTypes.string.isRequired,
    hrposition: PropTypes.string.isRequired,
    ratetype: PropTypes.string.isRequired,
    hourlyrate: PropTypes.string.isRequired,
    paygrade: PropTypes.string.isRequired,
    refno: PropTypes.string.isRequired,
    handleCurrencyInput: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired

};

export default AddContractorComponent;