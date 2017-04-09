import React, { Component } from 'react';

import Iphone from './iphone';

export default class MyBooks extends Component {
    render() {
        return (
            <div className="outer-container">
                <Iphone />
            </div>
        )
    }
}