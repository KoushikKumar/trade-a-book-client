import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookImageDetails extends Component {
    render() {
        return(
            <div className="book-image-details-container">
                <img className="book-image-container-info" src={this.props.bookdetailsById.image}/>
                <div  className="book-details-container-info">
                    <div className="book-detail-info book-author-info">
                        {this.props.bookdetailsById.author}
                    </div>
                    <div className="book-detail-info book-pages-info">
                        {this.props.bookdetailsById.pages}
                    </div>
                    <div className="book-detail-info book-price-info">
                        {this.props.bookdetailsById.price}
                    </div>
                    <div className="book-detail-info book-year-info">
                        {this.props.bookdetailsById.year}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps)(BookImageDetails)