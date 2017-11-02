import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddContractorComponent from './AddContractor.jsx';

const mapStateToProps = state => {
    return {
        user: state.user,
        tab: state.main.tab
    };
};

class AddContractorContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            company: '',
            projectname: '',
            reportingmanager: '',
            hrposition: '',
            ratetype: '',
            hourlyrate: '',
            paygrade: '',
            refno: '',
        };
        this.handleTextInput() = this.handleTextInput().bind(this);
        this.handleDropdownInput() = this.handleDropdownInput().bind(this);
        this.handleStatusInput() = this.handleStatusInput().bind(this);
        this.handleCurrencyInput() = this.handleCurrencyInput().bind(this);
        this.handleAdd() = this.handleAdd().bind(this);
        this.handleSubmit() = this.handleSubmit().bind(this);
    }
    handleTextInput(){

    }

    handleDropdownInput(){

    }

    handleStatusInput(){

    }

    handleCurrencyInput(){

    }

    handleAdd(){

    }

    handleSubmit(){

    }

    render() {
        return <AddContractorComponent/>;
    }
}

const AddContractor = connect(
    mapStateToProps,
    null
)(AddContractorContainer);

export default AddContractor;
