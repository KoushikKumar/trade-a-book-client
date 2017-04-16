import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USERNAME, PASSWORD, RE_ENTER_PASSWORD, ADDRESS } from '../constants/placeholder-constants';
import { signUpClicked, submitSignupData, setSignupErrorMessage } from '../actions';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password1: "",
            password2: "",
            address: "",
            errorMessage: "",
            isDataValid:false   
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isSignUpButtonClicked) {
            this.validateData();
        }
    }

    componentDidUpdate() {
        if(this.props.isSignUpButtonClicked) {
            this.props.signUpClicked(false);
        }
        if(this.state.isDataValid) {
            this.setState({isDataValid:false});
        }
    }

    setInputState(e, key) {
        if(this.state.errorMessage) {
            this.setState({errorMessage:""});
        }
        if(this.props.signupErrorMessage) {
            this.props.setSignupErrorMessage("");
        }
        let updatedField = {};
        updatedField[key] = e.target.value;
        this.setState(updatedField);
    }

    renderErrorMessage() {
        const errorMessage = this.state.errorMessage || this.props.signupErrorMessage;
        if(errorMessage) {
            return (
                <div className="signup-form-error-message">
                    {errorMessage}
                </div>
            )    
        }
    }

    validateData() {
        const { userName, password1, password2, address } = this.state;
        if(!(userName && password1 && password2 && address)) {
            this.setState({errorMessage:"None of the field should be empty"})
            return;
        }
        if(password1 !== password2) {
            this.setState({errorMessage:"Password fields should match"})
            return;
        }
        this.setState({isDataValid:true});
    }

    submitData() {
        if(this.state.isDataValid) {
            const { userName, password1, address } = this.state;
            this.props.submitSignupData(userName, password1, address, this.props.previousLocationPath);
        }
    }

    render() {
        return (
            <div className="signup-form-container">
                <div className="input-group form-input">
                    <input onChange = {(e) => {this.setInputState(e, "userName")}} value={this.state.userName} type="text" className="form-control" placeholder= { USERNAME } />
                </div>
                <div className="input-group form-input input-password">
                    <input onChange = {(e) => {this.setInputState(e, "password1")}} value={this.state.password1} type="password" className="form-control" placeholder= { PASSWORD } />
                </div>
                <div className="input-group form-input input-password">
                    <input onChange = {(e) => {this.setInputState(e, "password2")}} value={this.state.password2} type="password" className="form-control" placeholder= { RE_ENTER_PASSWORD } />
                </div>
                <div className="form-group form-input input-text-area">
                    <textarea onChange = {(e) => {this.setInputState(e, "address")}} value={this.state.address} className="form-control" rows="2" placeholder= { ADDRESS } ></textarea>
                </div>
                {this.renderErrorMessage()}
                {this.submitData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isSignUpButtonClicked: state.buttonsClick.isSignUpButtonClicked,
        signupErrorMessage: state.user.signupErrorMessage,
        previousLocationPath: state.routeLocation.previousLocationPath
    }
}

export default connect(mapStateToProps, { signUpClicked, submitSignupData, setSignupErrorMessage })(Signup);