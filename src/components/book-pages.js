import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllBooks } from '../actions';
import LeftPage from './left-page'; 
import RightPage from './right-page';
import LeftFooter from './left-footer';
import RightFooter from './right-footer';
import { BOOK } from '../constants/routes-constants';

class BookPages extends Component {
    static contextTypes = {
			router: React.PropTypes.object
	}

    componentWillMount() {
        const {router} = this.context;
        if(!router.isActive(`/${BOOK}/${this.props.bookDetails}`)) {
            this.props.fetchAllBooks();   
        }
    }

    renderLeftFooter() {
        const {router} = this.context;
        if(!router.isActive(`/${BOOK}/${this.props.bookDetails}`)) {
           return <LeftFooter />  
        }
    }

    renderRightFooter() {
        const {router} = this.context;
        if(!router.isActive(`/${BOOK}/${this.props.bookDetails}`)) {
           return <RightFooter />  
        }
    }

    render() {
        return (
            <div className="pages">
                <div className="page page-left page1">
                </div>
                <div className="page page-left page2">
                </div>
                <div className="page page-left page3">
                    <LeftPage {...this.props}/>
                    {this.renderLeftFooter()}
                </div>
                <div className="page page-right page4">
                </div>
                <div className="page page-right page5">
                </div>
                <div className="page page-right page6">
                    <RightPage {...this.props}/>
                    {this.renderRightFooter()}
                </div>
            </div>
        );
    }
}

export default connect(null, { fetchAllBooks })(BookPages);