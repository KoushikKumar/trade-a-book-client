import React, { Component } from 'react';
import { connect } from 'react-redux';

import Iphone from './iphone';
import Book from './book';
import { fetchBookDetails } from '../actions';

class BookDetails extends Component {

    componentWillMount() {
        const { bookId } = this.props.params;
        this.props.fetchBookDetails(bookId);
    }

    render() {
        return (
            <div className="outer-container">
                <Book bookDetails={this.props.params.bookId}/>
                <Iphone />
            </div>
        );
    }
}

export default connect(null, { fetchBookDetails })(BookDetails);