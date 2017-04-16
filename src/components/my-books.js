import React, { Component } from 'react';
import { connect } from 'react-redux';

import Iphone from './iphone';
import Book from './book';
import { fetchMyBookDetails } from '../actions';

class MyBooks extends Component {

    componentWillMount() {
        this.props.fetchMyBookDetails();
    }

    render() {
        return (
            <div className="outer-container">
                <Book />
                <Iphone />
            </div>
        )
    }
}

export default connect(null, { fetchMyBookDetails })(MyBooks)