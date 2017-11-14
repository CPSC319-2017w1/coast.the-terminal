import React from 'react';
import Proptypes from 'prop-types';
import css from './addcontractor.css';
import 'date-input-polyfill';

function Projects({projects, handleTextInput, handleDropdownInput, handleDateInput, handleCurrencyInput, handleChargeTypeInput}) {
  return <div className={css.projectInfo}>
    {
      projects.map((project, index) =>
        <div key={index} className={css.projectInfo}>
          <p className={css.projname}>
            Project Name
            <input className={css.txtfield}
              name="projectname"
              type="text"
              value={project.projectname}
              onChange={handleTextInput}/>
          </p>
          <p className={css.rm}>
            Reporting Manager
            <select className={css.txtfield}
              name="reportingmanagers"
              type="text"
              onChange={handleDropdownInput}>
              {getOptions(project.reportingmanagers)}
            </select>
          </p>
          <p className={css.costcen}>
            Cost Centre
            <input className={css.txtfield}
              name="costcentre"
              type="text"
              value={project.costcentre}
              onChange={handleTextInput}/>
          </p>
          <p className={css.start}>
            Start Date
            <br/>
            <input type="date" date-format="mm/dd/yyyy" onChange={handleDateInput}/>
          </p>
          <p className={css.end}>
            End Date
            <br/>
            <input type="date" date-format="mm/dd/yyyy" onChange={handleDateInput}/>
          </p>
          <p className={css.hrpos}>
            HR Position
            <select className={css.txtfield}
              name="hrpositions"
              type="text"
              onChange={handleDropdownInput}>
              {getOptions(project.hrpositions)}
            </select>
          </p>
          <p>
            Cost Center
            <select className={css.txtField}
              name="costCenter"
              type="text"
              onChange={handleDropdownInput}>
            {getOptions(project.costCenters)}
            </select>
          </p>
          <p className={css.rate}>
            Rate Type
            <select className={css.txtfield}
              name="ratetypes"
              type="text"
              onChange={handleDropdownInput}>
              {getOptions(project.ratetypes)}
            </select>
          </p>
          <p className={css.hourrate}>
            Est. Hourly Rate
            <input className={css.txtfield}
              name="hourlyrate"
              type="text"
              value={project.hourlyrate}
              onChange={handleTextInput}/>
          </p>
          <p className={css.hrpay}>
            HR Pay Grade
            <br/>
            <select className={css.txtfield}
              name="paygrades"
              type="text"
              onChange={handleDropdownInput}>
              {getOptions(project.paygrades)}
            </select>
          </p>
          <p className={css.poref}>
            P.O. Reference #
            <select className={css.txtfield}
              name="refnos"
              type="text"
              onChange={handleDropdownInput}>
              {getOptions(project.refnos)}
            </select>
          </p>
          <p className={css.currency}>
            Currency
            <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/>
            USD
            <input className={css.radiobutton} type="radio" onChange={handleCurrencyInput}/>
            CAD
          </p>
          <p className={css.timeMaterial}>
            Time and Material Terms ($)
            <input className={css.txtField}
              name="timeAndMaterialTerms"
              type="number"
              onChange={handleTextInput}/>
          </p>
          <p className={css.allowanceExpense}>
            Allowance expense daily per deem
            <input className={css.txtField}
                   name="allowanceExpense"
                   type="number"
                   onChange={handleTextInput}/>
          </p>
          <p className={css.chargeType}>
            Charge Type
            <input className={css.radiobutton} type="radio" onChange={handleChargeTypeInput}/>
            Capital - Depreciated
            <input className={css.radiobutton} type="radio" onChange={handleChargeTypeInput}/>
            Operating Costs
          </p>
          <p>
            Main Skill for Engagement
            <select className={css.txtField}
              name="mainSkills"
              type="text"
              onChange={handleDropdownInput}>
                {getOptions(project.mainSkills)}
            </select>
          </p>
          <p>
            Original Documentation
            <input
              className={css.txtField}
              type="text"
              name="originalDoc"/>
          </p>
          <p>
            Notification for contract termination
            <input
              className={css.txtField}
              type="number"
              name="notifcationTermination"/>
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
