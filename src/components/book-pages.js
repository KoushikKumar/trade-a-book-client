import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllBooks } from '../actions';
import LeftPage from './left-page'; 
import RightPage from './right-page';
import LeftFooter from './left-footer';
import RightFooter from './right-footer';
import SinglePageFooter from './single-page-footer';
import { BOOK, VIEW_ALL, MY_BOOKS } from '../constants/routes-constants';

class BookPages extends Component {

    static contextTypes = {
		router: React.PropTypes.object
	}

    componentWillMount() {
        const {router} = this.context;
        if(router.isActive(`/${VIEW_ALL}`)) {
            this.props.fetchAllBooks();
        } else if((!(router.isActive(`/${BOOK}/${this.props.bookDetails}`))) && (!(router.isActive(`/${MY_BOOKS}`)))) {
            if(!this.props.bookData.length && !this.props.bookdetailsById.title && !this.props.myBookDetails.length) {
                this.props.fetchAllBooks();
            }
        } 
    }

    renderLeftFooter() {
        const {bookData, myBookDetails} = this.props;
        if(bookData.length ) {
            return <LeftFooter /> 
        }
        if(myBookDetails.length) {
            return <SinglePageFooter /> 
        }
    }

    renderRightFooter() {
        if(this.props.bookData.length) {
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

function mapStateToProps(state) {
    return {
        bookData: state.book.bookData,
        bookdetailsById: state.book.bookdetailsById,
        myBookDetails: state.book.myBookDetails
    }
}

export default connect(mapStateToProps, { fetchAllBooks })(BookPages);