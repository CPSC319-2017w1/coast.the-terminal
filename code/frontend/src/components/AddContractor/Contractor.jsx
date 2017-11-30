import React from 'react';
import Proptypes from 'prop-types';
import css from './addcontractor.css';

/**
 * Creates the html for Contractor Information
 * @param contractor - object that holds information of the contractor
 * @param handleTextInput - function that handles the input in the text fields
 * @param handleRadioInput - function that handles the input for radio button
 * @returns React Component for Contractor Information
 */
function Contractor({contractor, handleTextInput, handleRadioInput}) {
  return <div className={css.contractorInfo}>
    <div className={css.contractorform}>
      <form className={css.words}>
        <p className={css.firstname}>
          <span>First Name</span>
          <input data-qa="firstname" className={css.txtfield} name="firstName" type="text" value={contractor.firstName} onChange={handleTextInput}/>
        </p>
        <p className={css.surname}>
          <span>Last Name</span>
          <input data-qa="lastname" className={css.txtfield} name="surname" type="text" value={contractor.surname} onChange={handleTextInput}/>
        </p>
        <p className={css.agency}>
          <span>Agency</span>
          <input data-qa="agency" className={css.txtfield} name="agencySource" type="text" value={contractor.agencySource} onChange={handleTextInput}/>
        </p>
      </form>
      <form className={css.status}>
        <span>Status</span>
        <input data-qa="active" className={css.radiobutton} type="radio" name="status" value="active" onChange={handleRadioInput} checked={contractor.status === 'active'}/>
        <span>Active</span>
        <input data-qa="inactive" className={css.radiobutton} type="radio" name="status" value="inactive" onChange={handleRadioInput} checked={contractor.status === 'inactive'}/>
        <span>Inactive</span>
      </form>
    </div>
  </div>;
}

Contractor.propTypes = {
  contractor: Proptypes.object.isRequired,
  handleTextInput: Proptypes.func.isRequired,
  handleRadioInput: Proptypes.func.isRequired
};

export default Contractor;
