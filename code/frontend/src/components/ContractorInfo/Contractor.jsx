import React from 'react';
import Proptypes from 'prop-types';
import css from './addcontractor.css';

function Contractor({contractor, handleTextInput, handleStatusInput}) {
  return <div className={css.contractorInfo}>
    <div className={css.contractorform}>
      <form className={css.words}>
        <p className={css.firstname}>
          <span>First Name</span>
          <input className={css.txtfield} name="firstName" type="text" value={contractor.firstName} onChange={handleTextInput}/>
        </p>
        <p className={css.surname}>
          <span>Last Name</span>
          <input className={css.txtfield} name="surname" type="text" value={contractor.surname} onChange={handleTextInput}/>
        </p>
        <p className={css.agency}>
          <span>Agency</span>
          <input className={css.txtfield} name="agencySource" type="text" value={contractor.agencySource} onChange={handleTextInput}/>
        </p>
      </form>
      <form onChange={handleStatusInput} className={css.status}>
        <span>Status</span>
        <input className={css.radiobutton} type="radio" name="active" value="active" />
        <span>Active</span>
        <input className={css.radiobutton} type="radio" name="inactive" value="inactive" />
        <span>Inactive</span>
      </form>
    </div>
  </div>;
}

Contractor.propTypes = {
  contractor: Proptypes.object.isRequired,
  handleTextInput: Proptypes.func.isRequired,
  handleStatusInput: Proptypes.func.isRequired
};

export default Contractor;
