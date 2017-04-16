import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookImageDetails extends Component {
    
    renderBookImageDetails() {
        if(this.props.bookdetailsById && this.props.bookdetailsById.image) {
            return this.renderDetails(this.props.bookdetailsById)
        }
        if(this.props.activeMyBookDetails && this.props.activeMyBookDetails.image) {
            return this.renderDetails(this.props.activeMyBookDetails)
        }
    }

    renderDetails(bookDetails) {
        return (
            <div className="book-image-details-inner-container">
                <img className="book-image-container-info" src={bookDetails.image}/>
                <div  className="book-details-container-info">
                    <div className="book-detail-info book-author-info">
                        {bookDetails.author}
                    </div>
                    <div className="book-detail-info book-pages-info">
                        {bookDetails.pages}
                    </div>
                    <div className="book-detail-info book-price-info">
                        {bookDetails.price}
                    </div>
                    <div className="book-detail-info book-year-info">
                        {bookDetails.year}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return(
            <div className="book-image-details-container">
                {this.renderBookImageDetails()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookdetailsById: state.book.bookdetailsById,
        activeMyBookDetails: state.book.activeMyBookDetails
    }
}

export default connect(mapStateToProps)(BookImageDetails)