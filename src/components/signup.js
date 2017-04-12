import React, { Component } from 'react';

import Iphone from './iphone';
import Book from './book';

export default class SignUp extends Component {
    render() {
        return (
            <div className="outer-container">
                <Book />
                <Iphone />
            </div>
        )
    }
}