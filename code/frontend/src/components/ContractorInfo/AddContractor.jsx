import React from 'react';
import Dropdown from 'react-dropdown';
import PropTypes from 'prop-types';
import css from './addcontractor.css';

const contractorfields = [
  {
    text: 'First Name',
    key: 'firstname'
  },
  {
    text: 'Last Name',
    key: 'lastname'
  },
  {
    text: 'Company',
    key: 'company'
  }
];

const projectTextFields = [
  {
    text: 'Project Name',
    key: 'projectname'
  },
  {
    text: 'Est. Hourly Rate',
    key: 'hourlyrate'
  }
];

function getField(data, object, type, func) {
  return <p>
    {data.text}
    <input className={css.txtfield}
      name={data.key}
      type={type}
      value={object[data.key]}
      onChange={func}/>
  </p>;
}

function AddContractorComponent({Contractor, Projects, handleTextInput, handleStatusInput,
  handleDropdownInput, handleCurrencyInput,
  handleAdd, handleSubmit}) {
  return (
    <div className={css.wrapper}>
      <h1>Contractor Information</h1>
      <p>Use the form below to add contractor information into the system.</p>
      <div className={css.contractorInfo}>
        <form>
          {
            contractorfields.map((field) => { return getField(field, Contractor, 'text', handleTextInput); })
          }
          {/*<p>*/}
                    {/*First Name*/}
            {/*<input className={css.txtfield}*/}
              {/*name=""*/}
              {/*type="text"*/}
              {/*value={Contractor.firstname}*/}
              {/*onChange={handleTextInput}/>*/}
          {/*</p>*/}
          {/*<p>*/}
                    {/*Last Name*/}
            {/*<input className={css.txtfield}*/}
              {/*type="text" value={Contractor.lastname}*/}
              {/*onChange={handleTextInput}/>*/}
          {/*</p>*/}
          {/*<p>*/}
                    {/*Company*/}
            {/*<input className={css.txtfield}*/}
              {/*type="text"*/}
              {/*value={Contractor.company}*/}
              {/*onChange={handleTextInput}/>*/}
          {/*</p>*/}
          <p>
                    Status
            <input className={css.radiobutton}
              type="radio"
              onChange={handleStatusInput('active')}/>
                    Active
            <input className={css.radiobutton}
              type="radio"
              onChange={handleStatusInput('inactive')}/>
                    Inactive
          </p>
        </form>
      </div>
      <div className={css.projectInfo}>
        <form>
          {
            getField(projectTextFields[0], Projects)
          }
                    Project Name <input className={css.txtfield} type="text" value={Projects[0].projectname} onChange={handleTextInput}/>
                    Reporting Manager <Dropdown className={css.txtfield} list = {Projects[0].reportingmanagers} onChange={handleDropdownInput}/>
                    Start Date
                    End Date
          {/*Use react JS datepicker or google other alternatives*/}
                    HR Position <Dropdown className={css.txtfield} list = {Projects[0].hrpositions} onChange={handleDropdownInput}/>
                    Rate Type <Dropdown className={css.txtfield} list = {Projects[0].ratetype}  onChange={handleDropdownInput}/>
                    Est. Hourly Rate <input className={css.txtfield} type="text" value={Projects[0].hourlyrate} onChange={handleTextInput}/>
                    HR Pay Grade <Dropdown className={css.txtfield} list = {Projects[0].paygrade}  onChange={handleDropdownInput}/>
                    PO Reference Number <Dropdown className={css.txtfield} list={Projects[0].refno} onChange={handleDropdownInput}/>
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


};

export default AddContractorComponent;