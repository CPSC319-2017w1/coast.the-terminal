import React from 'react';
import Proptypes from 'prop-types';
import css from './addcontractor.css';
import 'date-input-polyfill';

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
              data-index={index}>
              {getDataOptions(tables, 'hiringmanagers')}
            </select>
          </p>
          <p className={css.costcen}>
          Cost Centre
            <select className={css.txtfield}
              name="costCenterId"
              type="text"
              value={project.costcentre}
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
              onChange={handleDropdownInput}>
              {getDataOptions(tables, 'hrroles')}
            </select>
          </p>
          <p className={css.rate}>
            Rate Type
            <select className={css.txtfield}
              name="rateType"
              type="text"
              data-index={index}
              onChange={handleDropdownInput}>
              {getOptions(project.ratetypes)}
            </select>
          </p>
          <p className={css.hourrate}>
            Est. Hourly Rate
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
              onChange={handleDropdownInput}>
              {getDataOptions(tables, 'paygrades')}
            </select>
          </p>
          <p className={css.poref}>
            P.O. Reference #
            <input className={css.txtfield}
              name="poNum"
              type="number"
              data-index={index}
              onChange={handleTextInput}>
            </input>
          </p>
          <p className={css.currency}>
            Currency
            <input name={`currencyCode-${index}`}  value="USD" className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput}/>
            USD
            <input name={`currencyCode-${index}`} value="CAD" className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput}/>
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
            <input name={`chargeType-${index}`} value="capital" className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput}/>
            Capital - Depreciated
            <input name={`chargeType-${index}`} value="opcost" className={css.radiobutton} data-index={index} type="radio" onChange={handleRadioInput}/>
            Operating Costs
          </p>
          <p className={css.mainSkill}>
            Main Skill for Engagement
            <select className={css.txtField}
              name="mainSkillId"
              type="text"
              data-index={index}
              onChange={handleDropdownInput}>
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

function getIdField(tableName) {
  switch(tableName) {
    default:
      return "id";
  }
}

function getDisplayField(tableName) {
  switch(tableName) {
    case "skills":
       return "name";
    case 'paygrades':
      return "name";
    case 'hiringmanagers':
      return "firstName";
    case 'hrroles':
      return "roleName";
    case 'costcenters':
      return 'location';
    default:
      return "id";
  }
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
