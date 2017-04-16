import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BOOK } from '../constants/routes-constants';

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
        if(this.props.bookData) {
            return (
                <div className="book-outer-container">
                    {this.renderImages()}
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

    renderImages() {
        const { leftPageNumber } = this.props;
        let bookData  = this.props.bookData.slice();
        if(bookData.length) {
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
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps)(LeftPage)