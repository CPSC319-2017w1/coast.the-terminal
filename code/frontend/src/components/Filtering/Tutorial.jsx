import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';

//
function Tutorial({closeTutorial}) {
  return (
    <div className={css.tutorialholder}>
      <p><b>Choose a row:</b> Drag one of the fields that you want as rows in your pivot table to your <i>row area.</i><br/></p>
      <p><b>Choose a column:</b> Drag one of the fields that you want as columns in your pivot table to your <i>column area.</i></p>
      <p>The order of the fields can also change the way you view the data. For example,</p>
      <p><i>If you arrange Company and Contractor Name as:<br/>
             1) Company<br/>
             2) Contractor Name<br/>
          The contractors will be grouped according to the Company.</i></p>
      <p><b>Choose filters:</b> The rest of the fields will stay in the <i>filter area.</i><br/>
        You may or may not choose to filter your data using these fields or you can choose one of your row or column fields.<br/>
        To filter click the arrow button in each field and select the values you want to filter.
      </p>
      <p><b>Choosing count values:</b> Depending on what option you choose for the <i>count dropdown</i>, you can select different combination of values.<br/>
        For example,<br/>
        - If you select Count Unique Values, you can select any field in the dropdown that appears underneath count.
        - If you select Sum over Sum, you get two dropdowns, and this will divide the sum of field 1 over field 2 and return that as count value
      </p>
      <p><b>EXAMPLE</b><br/>
        To view the monthly costs of each contractor in a certain cost centre:<br/>
        - Move Company field and the Contractor Name field into the row area (in that order).<br/>
        - Move Billing Month into the column area (in that order).<br/>
        - Select Sum from the Count dropdown and select Monthly Cost in the dropdown that appears underneath<br/>
        - Click on the arrow in the Cost Centre field, hover to the desired cost centre in the list and click on <i>'only'</i> beside the name.
      </p>
      <p><b>Choosing the view:</b> The most useful option for this feature is the Table view.<br/>
        There are many options that you can choose for viewing this pivot table, and you can even generate a chart based on the data you have selected for the table. <br/>
      For more info on how to generate and handle charts, please check the tutorial on the REPORTS page.</p>
      <button className={css.closebtn} onClick={closeTutorial}>Close</button>
    </div>
  );
}

Tutorial.propTypes = {
  closeTutorial: PropTypes.func.isRequired
};


export default Tutorial;