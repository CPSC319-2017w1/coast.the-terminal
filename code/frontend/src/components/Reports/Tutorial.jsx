import React from 'react';
import PropTypes from 'prop-types';
import css from './reports.css';

function Tutorial({closeTutorial}) {
  return (
    <div className={css.tutorialholder}>
      <p><b>Choose your main value:</b> Drag one of the fields that you want in your x-axis in your report to your <i>column area.</i></p>
      <p>Once you drag this down, you can see a graph has been generated without any filter.</p>
      <p><b>Choose a filtering parameter:</b> You can choose to filter the graph by selecting the filters in the <i>filter area.</i><br/>
      To do so just click the arrow beside each field and choose your filters.</p>
      <p>If you want the filter to show in the graph drag the desired field to the <i>row area</i></p>
      <p>Fields that have not been dragged down will remain in the filter area. If you dont do anything(choosing filters) to these fields, they will not affect the graph.</p>
      <p><b>Choosing count values:</b> The <i>count dropdown</i> determines what kind of values you have in your y-axis.</p>
      <p>For example,<br/>
      - To view number of contractors per month, choose Count unique values in the count dropdown and then select Contractor Name <br/>
      - To view cost of contractors per month, choose Sum in the count dropdown and then select Contractor Cost</p>
      <p><b>Choosing the view:</b> There are many options that you can choose for viewing the charts. <br/>
      You can also choose to view in table form if you like.<br/>
      To zoom in to a specific range, click the magnifying glass on the top right corner of the chart, and select the data range</p>
      <button className={css.closebtn} onClick={closeTutorial}>Close</button>
    </div>
  );
}

Tutorial.propTypes = {
  closeTutorial: PropTypes.func.isRequired
};


export default Tutorial;