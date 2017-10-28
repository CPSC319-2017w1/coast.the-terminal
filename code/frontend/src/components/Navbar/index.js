import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarComponent from './Navbar.jsx';

const mapStateToProps = state => {
    return {
        user: state.user,
        tab: state.main.tab
    };
};

class NavbarContainer extends React.Component{
    render() {
        const {props} = this;
        return <NavbarComponent
            username={props.user.username}
            isAdmin={props.user.isAdmin}
            tab={props.tab}/>;
    }
}

NavbarComponent.propTypes = {
    user: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired
};

const Navbar = connect(
    mapStateToProps,
    null
)(NavbarContainer);

export default Navbar;
