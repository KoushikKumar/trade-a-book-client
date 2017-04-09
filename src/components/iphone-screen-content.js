import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { SIGNUP, LOGIN, UPDATE_PROFILE } from '../constants/routes-constants';
import SignupForm from './signup-form';
import LoginForm from './login-form'; 
import Profile from './profile-update'
import { BRAND_NAME } from '../constants/content-constants';
import Navbar from './navbar';

class IphoneScreenContent extends Component {
    
    static contextTypes = {
		router: React.PropTypes.object
	}

    renderNavBar() {
        const { router } = this.context;
        if(this.props.isUserAuthenticated && !router.isActive(UPDATE_PROFILE)) {
            return <Navbar />
        }
    }

    renderBrandName() {
        const { router } = this.context;
        const changeMargin = {};
        if(!(router.isActive(SIGNUP) || router.isActive(LOGIN))) {
            changeMargin.marginTop = "5vh";
        }
        if(this.props.isUserAuthenticated) {
            changeMargin.marginTop = "-15vh";
        }
        if(router.isActive(UPDATE_PROFILE)) {
            changeMargin.marginTop = "0vh";
        }
        return (
            <Link to="/" className="logo" style= { changeMargin }>
                {BRAND_NAME}
            </Link>
        );
    }

    renderContent() {
        const { router } = this.context;
        if(router.isActive(SIGNUP)) {
            return (
                <SignupForm />
            );
        }  
        if(router.isActive(LOGIN)) {
            return (
                <LoginForm />
            );
        }
        if(router.isActive(UPDATE_PROFILE)) {
            return (
                <Profile />
            );
        } 
    }

    render() {
        return (
            <div className="iphone-screen-content">
                { this.renderNavBar() }
                { this.renderBrandName() }
                { this.renderContent() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isUserAuthenticated: state.user.isUserAuthenticated
    };
}

export default connect(mapStateToProps)(IphoneScreenContent);