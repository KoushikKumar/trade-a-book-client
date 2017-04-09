import React , { Component } from 'react';

import IphoneScreenContent from './iphone-screen-content';
import IphoneAuthenticationButtons from './iphone-authentication-buttons';

export default class Iphone extends Component {
    render() {
        return (
            <div className="iphone-container">
                <div className="iphone-mike">
                </div>
                <div className="iphone-sensor">
                </div>
                <div className="iphone-screen">
                    <IphoneScreenContent />
                    <IphoneAuthenticationButtons />
                </div>
                <div className="iphone-unlock">
                </div>
            </div>
        );
    }
}