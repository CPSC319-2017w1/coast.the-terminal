import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';

const filters = [
  {
    'key': 1,
    'name': 'Contractor Name',
    'count': 'Count of Contractor Name'
  },
  {
    'key': 2,
    'name': 'Company',
    'count': 'Count of Company'
  },
  {
    'key': 3,
    'name': 'Reporting Manager',
    'count': 'Count of Reporting Manage'
  },
  {
    'key': 4,
    'name': 'Cost Centre',
    'count': 'Sum of Cost Centre'
  },
  {
    'key': 5,
    'name': 'PO Reference',
    'count': 'Count of PO Reference'
  },
  {
    'key': 6,
    'name': 'Estimate/Committed',
    'count': 'Count of Estimate/Committed'
  },
  {
    'key': 7,
    'name': 'Details',
    'count': 'Count of Details'
  },
  {
    'key': 8,
    'name': 'Est Hourly Rate (CDN)',
    'count': 'Sum of Est Hourly Rate (CDN)'
  },
  {
    'key': 9,
    'name': 'Monthly Cost (incl GST)',
    'count': 'Sum of Monthly Cost (incl GST)'
  },
  {
    'key': 10,
    'name': 'Monthly Expenses (incl Tax)',
    'count': 'Sum of Monthly Expenses (incl Tax)'
  },
  {
    'key': 11,
    'name': 'Total Monthly Cost',
    'count': 'Sum of Total Monthly Cost'
  },
  {
    'key': 12,
    'name': 'Start Date',
    'count': 'Count of Start Date'
  },
  {
    'key': 13,
    'name': 'End Date',
    'count': 'Count of End Date'
  },
  {
    'key': 14,
    'name': 'Working Month',
    'count': 'Count of Working Month'
  },
  {
    'key': 15,
    'name': 'Billing Month',
    'count': 'Count of Billing Month'
  },
  {
    'key': 16,
    'name': 'OPEX/CAPEX',
    'count': 'Count of OPEX/CAPEX'
  },
  {
    'key': 17,
    'name': 'Project#',
    'count': 'Count of Project#'
  },
  {
    'key': 18,
    'name': 'GL',
    'count': 'SUM of GL'
  },
  {
    'key': 19,
    'name': 'Department',
    'count': 'Count of Department'
  },
  {
    'key': 20,
    'name': 'Role',
    'count': 'Count of Role'
  },
  {
    'key': 21,
    'name': 'Additional Notes',
    'count': 'Count of Additional Notes'
  },
  {
    'key': 22,
    'name': 'Years',
    'count': 'Count of Years'
  }
];

function getMainFields(fields) {
  return fields.map((field) =>
    <p key={field.key}>
      <input type="checkbox" name={field.name} value={field.name}/>
      {field.name}
    </p>

  );
}

function FilterPanel({applyFilter}) {
  return <div className={css.filterPanel}>
    <form>
      <p>
      Fields
      </p>
      <div className={css.fieldsForm}>
        {getMainFields(filters)}
      </div>
    </form>
    <form>
      <p>
        Filter
      </p>
      <div className={css.filterForm}>
        Options for filter to be added
      </div>
      <p>
        Values
      </p>
      <div className={css.valuesForm}>
        Options for Values to be added
      </div>
      <p>
        Row
      </p>
      <div className={css.rowForm}>
        Options for Row to be added
      </div>
      <p>
        Column
      </p>
      <div className={css.columnForm}>
        Options for Column to be added
      </div>
      <input className={css.filterbutton} type="submit" onClick={applyFilter} value="Apply Filter" />
    </form>
  </div>;
}

FilterPanel.propTypes ={
  applyFilter: PropTypes.func.isRequired
};

export default FilterPanel;