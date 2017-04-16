import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BOOK } from '../constants/routes-constants';
import { updateActiveMyBookDetails } from '../actions';

class LeftPage extends Component {

    static contextTypes = {
		router: React.PropTypes.object
	}

    renderLeftPageContent() {
        
        if(this.props.bookdetailsById && this.props.bookdetailsById.title) {
            return (
                <div className="book-title-and-author-container">
                    {this.renderTitle()}
                    {this.renderAuthor()}
                </div>
            );
        }
        
        if(this.props.bookData.length) {
            return (
                <div className="book-outer-container">
                    {this.renderBookData()}
                </div>
            );
        }

        if(this.props.myBookDetails.length) {
            return (
                <div className="book-outer-container">
                    {this.renderMyBooks()}
                </div>
            );  
        }
    }

    renderTitle() {
        if(this.props.bookdetailsById) {
            return (
                <div className="book-title">
                    {this.props.bookdetailsById.title}
                </div>
            )
        }
    }

    renderAuthor() {
        if(this.props.bookdetailsById) {
            return (
                <div className="book-author">
                    {this.props.bookdetailsById.author}
                </div>
            )
        }
    }

    renderBookData() {
        const { leftPageNumber } = this.props;
        let bookData  = this.props.bookData.slice();
        const skip = ((leftPageNumber-1) * 9);
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

    renderMyBooks() {
        const { myBooksPageNumber } = this.props;
        let myBookDetails = this.props.myBookDetails.slice();
        const skip = ((myBooksPageNumber-1) * 9);
        const limit = 9;
        const imagesToRender = myBookDetails.splice(skip, limit);
        return imagesToRender.map((book, counter) => {
            return (
                <div className="book-container" key={counter}>
                    <img onClick={() => this.updateActiveMyBookDetails(book)} className="book-image" src={book.image}/>
                </div>
            );
        });
    }

    updateActiveMyBookDetails(book) {
        this.props.updateActiveMyBookDetails(book);
    }

    viewBookDetailsPage(book) {
        const { router } = this.context;
        const bookId = book._id;
        router.push(`/${BOOK}/${bookId}`)
    }

    render() {
        return (
            <div className="page-outer-container">
                {this.renderLeftPageContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookData: state.book.bookData,
        leftPageNumber: state.page.leftPageNumber,
        bookdetailsById: state.book.bookdetailsById,
        myBookDetails: state.book.myBookDetails,
        myBooksPageNumber: state.page.myBooksPageNumber
    }
}

export default connect(mapStateToProps, { updateActiveMyBookDetails })(LeftPage)