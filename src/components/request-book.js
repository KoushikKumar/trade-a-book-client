import React, { Component } from 'react';

import { REQUEST } from '../constants/content-constants';

export default class RequestButton extends Component {
    render() {
        return (
            <div className="request-button-container-info">
                <button type="button" className="request-button-info">{REQUEST}</button>
            </div>
        );
    }
} 