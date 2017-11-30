import React from 'react';
import Proptypes from 'prop-types';
import css from './addcontractor.css';
import 'date-input-polyfill';

/**
 * Creates the html for Project Information
 * @param projects - array that holds the engagement contracts of the contractor
 * @param handleTextInput -  function that handles the input in the text fields
 * @param handleDropdownInput - function that handles the input in the dropdown fields
 * @param handleDateInput - function that handles the input in the date field
 * @param handleRadioInput - function that hanldes the input for radio button
 * @param tables - data for dropdowns
 * @returns React component for Project Information
 */
function Projects({projects, handleTextInput, handleDropdownInput, handleDateInput, handleRadioInput, tables}) {
  return <div>
    {
      projects.map((project, index) =>
        <div key={index} className={css.projectInfo}>
          <p className={css.projname}>
            Project Name
            <input className={css.txtfield}
              name="projectName"
              type="text"
              data-index={index}
              value={project.projectName}
              onChange={handleTextInput}/>
          </p>
          <p className={css.rm}>
            Reporting Manager
            <select className={css.txtfield}
              name="reportingManagerId"
              type="text"
              onChange={handleDropdownInput}
              data-index={index}
              value={project.reportingManagerId}
            >
              {getDataOptions(tables, 'hiringmanagers')}
            </select>
          </p>
          <p className={css.costcen}>
          Cost Centre
            <select className={css.txtfield}
              name="costCenterId"
              type="text"
              value={project.costCenterId}
              onChange={handleDropdownInput}
              data-index={index}>
              {getDataOptions(tables, 'costcenters')}
            </select>
          </p>
          <p className={css.start}>
            Start Date
            <br/>
            <input className={css.startinput}
              data-index={index}
              type="date"
              name="startDate"
              value={project.startDate}
              date-format="mm/dd/yyyy"
              onChange={handleDateInput}/>
          </p>
          <p className={css.end}>
            End Date
            <br/>
            <input className={css.endinput}
              data-index={index}
              type="date"
              name="endDate"
              value={project.endDate}
              date-format="mm/dd/yyyy"
              onChange={handleDateInput}/>
          </p>
          <p className={css.hrpos}>
            HR Position
            <select className={css.txtfield}
              name="hrPositionId"
              type="text"
              data-index={index}
              onChange={handleDropdownInput}
              value={project.hrPositionId}
            >
              {getDataOptions(tables, 'hrroles')}
            </select>
          </p>
          <p className={css.rate}>
            Rate Type
            <select className={css.txtfield}
              name="rateType"
              type="text"
              data-index={index}
              onChange={handleDropdownInput}
              value={project.rateType}
            >
              {getOptions(project.ratetypes)}
            </select>
          </p>
          <p className={css.hourrate}>
            Est. Rate ($)
            <input className={css.txtfield}
              name="hourlyrate"
              type="number"
              data-index={index}
              value={project.hourlyrate}
              onChange={handleTextInput}/>
          </p>
          <p className={css.hrpay}>
            HR Pay Grade
            <br/>
            <select className={css.txtfield}
              name="hrPayGradeId"
              type="text"
              data-index={index}
              onChange={handleDropdownInput}
              value={project.hrPayGradeId}
            >
              {getDataOptions(tables, 'paygrades')}
            </select>
          </p>
          <p className={css.poref}>
            P.O. Reference #
            <input className={css.txtfield}
              name="poNum"
              type="number"
              data-index={index}
              onChange={handleTextInput}
              value={project.poRefNum}
            >
            </input>
          </p>
          <p className={css.currency}>
            Currency
            <input name={`currencyCode-${index}`}  value='USD' className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput} checked={project.currencyCode === 'USD'}/>
            USD
            <input name={`currencyCode-${index}`} value='CAD' className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput} checked={project.currencyCode === 'CAD'}/>
            CAD
          </p>
          <p className={css.timeMaterial}>
            Time and Material Terms ($)
            <input className={css.txtField}
              name="timeMaterialTerms"
              type="number"
              value={project.timeMaterialTerms}
              data-index={index}
              onChange={handleTextInput}/>
          </p>
          <p className={css.allowanceExpense}>
            Allowance expense daily per deem
            <input className={css.txtField}
              name="dailyAllowance"
              type="number"
              value={project.dailyAllowance}
              data-index={index}
              onChange={handleTextInput}/>
          </p>
          <p className={css.chargeType}>
            Charge Type
            <input name={`chargeType-${index}`} value="capital" className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput} checked={project.chargeType === 'capital'}/>
            Capital - Depreciated
            <input name={`chargeType-${index}`} value="opcost" className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput} checked={project.chargeType === 'opcost'}/>
            Operating Costs
          </p>
          <p className={css.mainSkill}>
            Main Skill for Engagement
            <select className={css.txtField}
              name="mainSkillId"
              type="text"
              data-index={index}
              onChange={handleDropdownInput}
              value={project.mainSkillId}
            >
              {getDataOptions(tables, 'skills')}
            </select>
          </p>
          <p className={css.origindoc}>
            Original Documentation
            <input
              className={css.txtField}
              type="text"
              data-index={index}
              value={project.originalDocumentation}
              onChange={handleTextInput}
              name="originalDocumentation"/>
          </p>
          <p className={css.termination}>
            Notification for contract termination
            <input
              className={css.txtField}
              type="number"
              data-index={index}
              value={project.terminationNum}
              onChange={handleTextInput}
              name="terminationNum"/>
          </p>
        </div>
      )
    }
  </div>;
}

/**
 * Populates dropdown with data
 * @param tables - data for dropdowns
 * @param tableName - dropdown name
 * @return options for the dropdown
 */

function getDataOptions(tables, tableName) {
  let desiredTable = tables[tableName];
  if(typeof desiredTable === typeof undefined) {
    return;
  }
  let desiredTableData = desiredTable.data;
  let displayField = getDisplayField(tableName);
  let idField = getIdField(tableName);
  return desiredTableData.map((item, index) =>
    <option key={index}
      value={item[idField]}>
      {item[displayField]}
    </option>
  );
}

/**
 * gets the id of the dropdown
 * @param tableName - name of dropdown
 * @return {string} - id of dropdown
 */
function getIdField(tableName) {
  switch(tableName) {
    default:
      return 'id';
  }
}

/**
 * gets fields based on the name of dropdown
 * @param tableName - name of dropdown
 * @return {*} - fields that are displayed in the dropdown
 */
function getDisplayField(tableName) {
  switch(tableName) {
    case 'skills':
      return 'name';
    case 'paygrades':
      return 'name';
    case 'hiringmanagers':
      return 'firstName';
    case 'hrroles':
      return 'roleName';
    case 'costcenters':
      return 'location';
    default:
      return 'id';
  }
}

/**
 * gets options for dropdown
 * @param items - list of items to be populated in the dropdown
 * @return oprions for dropdown
 */
function getOptions(items) {
  return items.map((item, index) =>
    <option key={index}
      value={item.text}>
      {item}
    </option>
  );
}

export default Projects;
