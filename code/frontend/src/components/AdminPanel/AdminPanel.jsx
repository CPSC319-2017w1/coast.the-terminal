import React from 'react';
import PropTypes from 'prop-types';
import css from './adminpanel.css';

function AdminPanelComponent({onClick}) {
  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>Admin Panel</h1>
      </div>
      <div className={css.adminpanelbtn}>
        <button className={css.contractorrecords}
          onClick={onClick}>
          Contractor Records
        </button>
        <button className={css.skills}
          onClick={onClick}>
          Skills
        </button>
        <button className={css.fxtable}
          onClick={onClick}>
          FX table
        </button>
        <button className={css.hrtables}
          onClick={onClick}>
          HR tables
        </button>
        <button className={css.hrmanagers}
          onClick={onClick}>
          Hiring Managers
        </button>
        <button className={css.userpermissions}
          onClick={onClick}>
          User Permissions
        </button>
      </div>
    </div>
  );
}

AdminPanelComponent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AdminPanelComponent;