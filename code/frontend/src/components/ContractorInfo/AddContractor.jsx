import React from 'react';
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

function getProjectInfo(Projects, handleTextInput, handleDropdownInput, handleCurrencyInput){
  return Projects.map((project) => {
    return <div className={css.projectInfo}>
      <p>
      Project Name
        <input className={css.txtfield}
          name="projectname"
          type="text"
          value={project.projectname}
          onChange={handleTextInput}/>
      </p>
      <p>
      Reporting Manager
        <select className={css.txtfield}
          name="reportingmanagers"
          type="text"
          onChange={handleDropdownInput}>
        </select>
      </p>
      <p>
      Start Date
        <select className={css.txtfield}
          name="startdates"
          type="text"
          onChange={handleDropdownInput}>
        </select>
      </p>
      <p>
      End Date
        <select className={css.txtfield}
          name="enddates"
          type="text"
          onChange={handleDropdownInput}>
        </select>
      </p>
      <p>
      HR Position
        <select className={css.txtfield}
          name="hrpositions"
          type="text"
          onChange={handleDropdownInput}>
        </select>
      </p>
      <p>
      Rate Type
        <select className={css.txtfield}
          name="ratetypes"
          type="text"
          onChange={handleDropdownInput}>
        </select>
      </p>
      <p>
        Est. Hourly Rate
        <input className={css.txtfield}
          name="hourlyrate"
          type="text"
          value={project.hourlyrate}
          onChange={handleTextInput}/>
      </p>
      <p>
        HR Pay Grade
        <select className={css.txtfield}
          name="paygrades"
          type="text"
          onChange={handleDropdownInput}>
        </select>
      </p>
      PO Reference Number
      <select className={css.txtfield}
        name="refnos"
        type="text"
        onChange={handleDropdownInput}>
      </select>
      <p>
      Currency
        <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/>
        USD
        <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/>
        CAD
      </p>
    </div>;

  });
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
            getProjectInfo(Projects, handleTextInput, handleDropdownInput, handleCurrencyInput)
          }

          {/*Project Name <input className={css.txtfield} type="text" value={Projects[0].projectname} onChange={handleTextInput}/>*/}
          {/*Reporting Manager <Dropdown className={css.txtfield} list = {Projects[0].reportingmanagers} onChange={handleDropdownInput}/>*/}
          {/*Start Date*/}
          {/*End Date*/}
          {/*/!*Use react JS datepicker or google other alternatives*!/*/}
          {/*HR Position <Dropdown className={css.txtfield} list = {Projects[0].hrpositions} onChange={handleDropdownInput}/>*/}
          {/*Rate Type <Dropdown className={css.txtfield} list = {Projects[0].ratetype}  onChange={handleDropdownInput}/>*/}
          {/*Est. Hourly Rate <input className={css.txtfield} type="text" value={Projects[0].hourlyrate} onChange={handleTextInput}/>*/}
          {/*HR Pay Grade <Dropdown className={css.txtfield} list = {Projects[0].paygrade}  onChange={handleDropdownInput}/>*/}
          {/*PO Reference Number <Dropdown className={css.txtfield} list={Projects[0].refno} onChange={handleDropdownInput}/>*/}
          {/*Currency <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/> USD*/}
          {/*<input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/> CAD*/}
        </form>
      </div>
      <input className={css.btnstyle} type="submit" onClick={handleAdd} value="Add Additional Contract" />
      <input className={css.btnstyle} type="submit" onClick={handleSubmit} value="Add Contract" />
    </div>

  );
}

AddContractorComponent.propTypes = {
  Contractor: PropTypes.object.isRequired,
  Projects: PropTypes.array.isRequired,
  handleTextInput: PropTypes.func.isRequired,
  handleStatusInput: PropTypes.func.isRequired,
  handleDropdownInput: PropTypes.func.isRequired,
  handleCurrencyInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AddContractorComponent;