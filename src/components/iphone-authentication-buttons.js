import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { SIGNUP, LOGIN, UPDATE_PROFILE } from '../constants/routes-constants';
import { ALREADY_A_MEMBER, 
         NOT_A_MEMBER_YET, 
         LOG_IN, SIGN_UP,
         PROFILE, 
         LOG_OUT,
         UPDATE,
         CANCEL } from '../constants/content-constants';
import { signUpClicked, logInClicked, logout, updateProfileClicked } from '../actions';

class IphoneAuthenticationButtons extends Component {

    static contextTypes = {
		router: React.PropTypes.object
	}

    renderAuthenticationButtons() {
        const { router } = this.context;
        if(router.isActive(SIGNUP)) {
            return (
                <div className= "iphone-screen-buttons-inner-container">
                    <Link className="is-already-a-member" to = { `/${LOGIN}` }> { ALREADY_A_MEMBER } </Link>
                    <div className = "iphone-screen-buttons">
                        <div onClick={() => {this.signUpClicked()}} className = "right-button brand-buttons" >
                            { SIGN_UP }
                        </div> 
                    </div>
                </div>
            );
        }

        if(router.isActive(LOGIN)) {
            return (
                <div className= "iphone-screen-buttons-inner-container">
                    <Link className="is-already-a-member" to = { `/${SIGNUP}` }> { NOT_A_MEMBER_YET } </Link>
                    <div className = "iphone-screen-buttons">
                        <div onClick={() => {this.logInClicked()}} className = "left-button brand-buttons" >
                            { LOG_IN }
                        </div>
                    </div>
                </div>
            );
        }

        if(router.isActive(UPDATE_PROFILE)) {
            return (
                <div className = "iphone-screen-buttons">
                    <div onClick={()=>{this.updateProfileClicked()}} className = "left-button brand-buttons" >
                        { UPDATE }
                    </div>
                    <Link className = "right-button brand-buttons" to = {this.props.previousLocationPath} >
                        { CANCEL }
                    </Link> 
                </div>
            );
        }

        if(this.props.isUserAuthenticated) {
            return (
                <div className = "iphone-screen-buttons">
                    <Link className = "left-button brand-buttons" to = { `/${UPDATE_PROFILE}` } >
                        { PROFILE }
                    </Link>
                    <div onClick={()=>{this.logout()}} className = "right-button brand-buttons" >
                        { LOG_OUT }
                    </div> 
                </div>
            );
        }

        return (
            <div className = "iphone-screen-buttons">
                <Link className = "left-button brand-buttons" to = { `/${LOGIN}` } >
                    { LOG_IN }
                </Link>
                <Link className = "right-button brand-buttons" to = { `/${SIGNUP}` } >
                    { SIGN_UP }
                </Link> 
            </div>
        );
    }

    signUpClicked() {
        this.props.signUpClicked(true);
    }

    logInClicked() {
        this.props.logInClicked(true);
    }

    logout() {
        this.props.logout();
    }

    updateProfileClicked() {
        this.props.updateProfileClicked(true);
    }

    render() {
        return (
            <div className = "iphone-screen-buttons-container">
                { this.renderAuthenticationButtons() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isUserAuthenticated: state.user.isUserAuthenticated,
        previousLocationPath: state.routeLocation.previousLocationPath
    };
}

export default connect(mapStateToProps, { signUpClicked, 
                                          logInClicked, 
                                          logout, 
                                          updateProfileClicked })(IphoneAuthenticationButtons);