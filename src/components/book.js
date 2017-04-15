import React, { Component } from 'react';

import BookPages from './book-pages';

export default class Book extends Component {
    render() {
        return(
            <div className="book-cover">
                <BookPages {...this.props} />   
            </div>
        );
    }
}