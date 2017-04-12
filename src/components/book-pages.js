import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllBooks } from '../actions';
import LeftPage from './left-page'; 
import RightPage from './right-page';
import LeftFooter from './left-footer';
import RightFooter from './right-footer';

class BookPages extends Component {
    componentWillMount() {
        this.props.fetchAllBooks();
    }

    render() {
        return (
            <div className="pages">
                <div className="page page-left page1">
                </div>
                <div className="page page-left page2">
                </div>
                <div className="page page-left page3">
                    <LeftPage />
                    <LeftFooter />
                </div>
                <div className="page page-right page4">
                </div>
                <div className="page page-right page5">
                </div>
                <div className="page page-right page6">
                    <RightPage />
                    <RightFooter />
                </div>
            </div>
        );
    }
}

export default connect(null, { fetchAllBooks })(BookPages);