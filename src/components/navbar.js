import React, { Component } from 'react';
import { Link } from 'react-router';

import { MY_BOOKS, ADD_BOOK } from '../constants/routes-constants';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar-buttons-container">
                <Link to = { `/${MY_BOOKS}` } className="navbar-buttons my-books-button">My Books</Link>
                <Link to = { `/${ADD_BOOK}` } className="navbar-buttons add-books-button">Add</Link>
            </div>
        );
    }
}