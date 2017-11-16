import React from 'react';
import PropTypes from 'prop-types';
import css from './filtering.css';


function getMainFields(fields, toggleCheckedFields) {
  return fields.map((field) =>
    <p key={field.name}>
      <input type="checkbox" name={field.name} value={field.name} onChange={toggleCheckedFields}/>
      {field.name}
    </p>
  );
}

function FilterPanel({fields, applyFilter, toggleCheckedFields}) {
  return <div className={css.filterPanel}>
    <form>
      <p>
      Fields
      </p>
      <div className={css.fieldsForm}>
        {getMainFields(fields, toggleCheckedFields)}
      </div>
    </form>
    <form>
      <p>
        Filter
      </p>
      <div className={css.filterForm}>
        {fields.map(function(field) {
          if(field.checked){
            return <p key={field.name}>
              <input type="checkbox" name={field.name} value={field.name}/>
              {field.name}
            </p>;
          }
        })}
      </div>
      <p>
        Values
      </p>
      <div className={css.valuesForm}>
        {fields.map(function(field) {
          if(field.checked){
            return <p key={field.name}>
              <input type="checkbox" name={field.name} value={field.name}/>
              {field.name}
            </p>;
          }
        })}
      </div>
      <p>
        Row
      </p>
      <div className={css.rowForm}>
        {fields.map(function(field) {
          if(field.checked){
            return <p key={field.name}>
              <input type="checkbox" name={field.name} value={field.name}/>
              {field.name}
            </p>;
          }
        })}
      </div>
      <p>
        Column
      </p>
      <div className={css.columnForm}>
        {fields.map(function(field) {
          if(field.checked){
            return <p key={field.name}>
              <input type="checkbox" name={field.name} value={field.name}/>
              {field.name}
            </p>;
          }
        })}
      </div>
      <input className={css.filterbutton} type="submit" onClick={applyFilter} value="Apply Filter" />
    </form>
  </div>;
}

FilterPanel.propTypes ={
  fields: PropTypes.array.isRequired,
  applyFilter: PropTypes.func.isRequired,
  toggleCheckedFields: PropTypes.func.isRequired
};

export default FilterPanel;