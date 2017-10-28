import React from 'react';
import PropTypes from 'prop-types';
import css from './navbar.css';
import * as TABS from '../../constants';

function NavbarComponent({username, isAdmin, tab}) {
    return (
        <div className={css.wrapper}>
            <div>
                {username}
            </div>
            <div>
                <ul>
                    <li className={tab === TABS.DASHBOARD ? css.selected : css.option}>Dashboard</li>
                    <li className={tab === TABS.FILTERING ? css.selected : css.option}>Data Filtering System</li>
                    <li className={tab === TABS.CONTRACTOR_INFO ? css.selected : css.option}>Contractor Information</li>
                    <li className={tab === TABS.REPORTS ? css.selected : css.option}>Reports</li>
                    {isAdmin ? <li className={tab === TABS.ADMIN_PANEL ? css.selected : css.option}>Admin Panel</li> : null}
                    <li className={tab === TABS.SETTINGS ? css.selected : css.option}>Settings</li>
                </ul>
            </div>
        </div>
    );
}

NavbarComponent.propTypes = {
    username: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    tab: PropTypes.string.isRequired
};

export default NavbarComponent;