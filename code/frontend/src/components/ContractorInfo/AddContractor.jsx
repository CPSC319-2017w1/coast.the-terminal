import React from 'react';
import PropTypes from 'prop-types';
import css from './addcontractor.css';

const contractorfields = [
  {
    text: 'First Name',
    key: 'firstname',
    className: css.firstname
  },
  {
    text: 'Last Name',
    key: 'lastname',
    className: css.lastname
  },
  {
    text: 'Company',
    key: 'company',
    className: css.company
  }
];

function getField(data, object, type, func) {
  return <p key={data.key}
    className={data.className}>
    <p>
      {data.text}
    </p>
    <input className={css.txtfield}
      name={data.key}
      type={type}
      value={object[data.key]}
      onChange={func}/>
  </p>;
}

function getOptions(items) {
  return items.map((item) => {
    return <option key={item.text}
      value={item.text}>
      {item}
    </option>;
  });
}

function getProjectInfo(Projects, handleTextInput, handleDropdownInput, handleDateInput, handleCurrencyInput){
  return Projects.map((project, index) => {
    return <div key={index} className={css.projectInfo}>
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
          {getOptions(project.reportingmanagers)}
        </select>
      </p>
      <p>
        Start Date
        <select className={css.txtfield}
          name="startday"
          type="text"
          onChange={handleDateInput}>
        </select>
        <select className={css.txtfield}
          name="startmonth"
          type="text"
          onChange={handleDateInput}>
        </select>
        <select className={css.txtfield}
          name="startyear"
          type="text"
          onChange={handleDateInput}>
        </select>
      </p>
      <p>
        End Date
        <select className={css.txtfield}
          name="endday"
          type="text"
          onChange={handleDateInput}>
        </select>
        <select className={css.txtfield}
          name="endmonth"
          type="text"
          onChange={handleDateInput}>
        </select>
        <select className={css.txtfield}
          name="endyear"
          type="text"
          onChange={handleDateInput}>
        </select>
      </p>
      <p>
        HR Position
        <select className={css.txtfield}
          name="hrpositions"
          type="text"
          onChange={handleDropdownInput}>
          {getOptions(project.hrpositions)}
        </select>
      </p>
      <p>
        Rate Type
        <select className={css.txtfield}
          name="ratetypes"
          type="text"
          onChange={handleDropdownInput}>
          {getOptions(project.ratetypes)}
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
          {getOptions(project.paygrades)}
        </select>
      </p>
      <p>
        PO Reference Number
        <select className={css.txtfield}
          name="refnos"
          type="text"
          onChange={handleDropdownInput}>
          {getOptions(project.refnos)}
        </select>
      </p>
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
  handleDropdownInput, handleDateInput, handleCurrencyInput,
  handleAdd, handleSubmit}) {
  return (
    <div className={css.wrapper}>
      <h1>Contractor Information</h1>
      <p>Use the form below to add contractor information into the system.</p>
      <div className={css.contractorInfo}>
        <form className={css.contractorform}>
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
        <form className={css.projectform}>
          {
            getProjectInfo(Projects, handleTextInput, handleDropdownInput, handleDateInput, handleCurrencyInput)
          }
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
  handleDateInput: PropTypes.func.isRequired,
  handleCurrencyInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AddContractorComponent;