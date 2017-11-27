import React from 'react';
import PropTypes from 'prop-types';
import css from './reports.css';

function Tutorial({closeTutorial}) {
  return (
    <div className={css.tutorialholder}>
      <p><b>Choose your parameters for the x-axis</b>
        <br/>
        Drag and drop a field that you would like to have on the x-axis of your report to your <i>column area.</i></p>
      <p>Once you drag this down, you can see a graph has been generated without any filter.</p>
      <br/>
      <p><b>Choose your filter</b>
        <br/>
        You can choose to refine the graph by clicking the arrow beside each field and selecting the filters in the <i>filter area.</i></p>
      <p>If you want the filter to show visually in the graph, drag the desired field to the <i>row area</i>.</p>
      <p>Fields that have not been dragged down will remain as options in the filter area. If you have also not refined your graph using the drop-down arrow, they will not affect the graph.</p>
      <br/>
      <p><b>Choose count values</b>
        <br/>
        The <i>count drop-down menu</i> determines what kind of values you have in your y-axis.</p>
      <br/>
      <p><i>For example:<br/>
        - To view the number of contractors per month, choose "Count Unique Values" in the Count drop-down menu and then select "Contractor Name"<br/>
        - To view the cost of contractors per month, choose "Sum" in the Count drop-down and then select "Contractor Cost"</i></p>
      <br/>
      <p><b>Choose the view</b>
        <br/>
        There are many options that you can choose for viewing the charts. You can also choose to view in table form if you like.<br/>
      To zoom in to a specific range, click the magnifying glass on the top right corner of the chart, and select the data range.</p>
      <button className={css.closebtn} onClick={closeTutorial}>Close</button>
    </div>
  );
}

Tutorial.propTypes = {
  closeTutorial: PropTypes.func.isRequired
};


export default Tutorial;