import React, { Component } from 'react';

import Iphone from './iphone';
import AddBookPages from './add-book-pages';

export default class AddBook extends Component {
    render() {
        return (
            <div className="outer-container">
                <AddBookPages />
                <Iphone />
            </div>
        )
    }
}