import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BOOK } from '../constants/routes-constants';
import BookImageDetails from './book-image-details';
import BookDescription from './book-description';
import RequestButton from './request-book';
import SellerInfo from './seller-info';

class RightPage extends Component {

    static contextTypes = {
		router: React.PropTypes.object
	}

    renderRightPageContent() {

        if(this.props.bookdetailsById && this.props.bookdetailsById.title) {
            return(
                <div className="book-details-right-page-container">
                    <BookImageDetails />
                    <BookDescription />
                    <RequestButton />
                    <hr className="horizontal-line-info"/>
                    <SellerInfo />
                </div>
            );
        }

        if(this.props.bookData) {
            return (
                <div className="book-outer-container">
                    {this.renderImages()}
                </div>
            );
        }
    }

    renderImages() {
        const { rightPageNumber } = this.props;
        let bookData  = this.props.bookData.slice();
        if(bookData.length) {
            const skip = ((rightPageNumber-1) * 9);
            const limit = 9;
            const imagesToRender = bookData.splice(skip, limit);
            return imagesToRender.map((book, counter) => {
                return (
                    <div className="book-container" key={counter}>
                        <img onClick={() => {this.viewBookDetailsPage(book)}} className="book-image" src={book.image}/>
                    </div>
                );
            });
        }
    }

    viewBookDetailsPage(book) {
        const { router } = this.context;
        const bookId = book._id;
        router.push(`/${BOOK}/${bookId}`)
    }

    render() {
        return (
            <div className="page-outer-container">
                {this.renderRightPageContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookData: state.book.bookData,
        rightPageNumber: state.page.rightPageNumber,
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps)(RightPage)