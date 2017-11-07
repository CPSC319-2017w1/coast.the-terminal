import React from 'react';
import Proptypes from 'prop-types';
import css from './addcontractor.css';

function Projects({projects, handleTextInput, handleDropdownInput, handleDateInput, handleCurrencyInput}) {
  return <div className={css.projectInfo}>
    {
      projects.map((project, index) =>
        <div key={index} className={css.projectInfo}>
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
        </div>
      )
    }
  </div>;
}

function getOptions(items) {
  return items.map((item, index) =>
    <option key={index}
      value={item.text}>
      {item}
    </option>
  );
}

export default Projects;
