import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USERNAME, PASSWORD } from '../constants/placeholder-constants';
import { logInClicked, submitLoginData, setLoginErrorMessage } from '../actions';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "userName" : "",
            "password" : "",
            "errorMessage":"",
            "isDataValid":false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoginButtonClicked) {
            this.validateData();
        }
    }

    componentDidUpdate() {
        if(this.props.isLoginButtonClicked) {
            this.props.logInClicked(false);
        }
        if(this.state.isDataValid) {
            this.setState({isDataValid:false});
        }
    }

    setInputState(e, key) {
        if(this.state.errorMessage) {
            this.setState({errorMessage:""});
        }
        if(this.props.loginErrorMessage) {
            this.props.setLoginErrorMessage("");
        }
        let updatedField = {};
        updatedField[key] = e.target.value;
        this.setState(updatedField);
    }

    validateData() {
        const { userName, password } = this.state;
        if(!(userName && password)) {
            this.setState({errorMessage:"None of the field should be empty"})
            return;
        }
        this.setState({isDataValid:true});
    }

    renderErrorMessage() {
        const errorMessage = this.state.errorMessage || this.props.loginErrorMessage;
        if(errorMessage) {
            return (
                <div className="login-form-error-message">
                    {errorMessage}
                </div>
            )    
        }
    }

    submitData() {
        if(this.state.isDataValid) {
            const { userName, password } = this.state;
            this.props.submitLoginData(userName, password, this.props.previousLocationPath);
        }
    }

    render() {
        return (
            <div className="login-form-container">
                <div className="login-form">
                    <div className="input-group form-input">
                        <input onChange = {(e) => {this.setInputState(e, "userName")}} 
                               value={this.state.userName} 
                               type="text" 
                               className="form-control" 
                               placeholder= { USERNAME } />
                    </div>
                    <div className="input-group form-input input-password">
                        <input onChange = {(e) => {this.setInputState(e, "password")}} 
                               value={this.state.password} 
                               type="password" 
                               className="form-control" 
                               placeholder= { PASSWORD } />
                    </div>
                    {this.renderErrorMessage()}
                    {this.submitData()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoginButtonClicked: state.buttonsClick.isLoginButtonClicked,
        loginErrorMessage: state.user.loginErrorMessage,
        previousLocationPath: state.routeLocation.previousLocationPath
    }
}

export default connect(mapStateToProps, { logInClicked, submitLoginData, setLoginErrorMessage })(LoginForm)