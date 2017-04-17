import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDescription extends Component {

    renderBookDescription() {
        if(this.props.bookdetailsById && this.props.bookdetailsById.description) {
            return (
                <div className="book-description-inner-container-info">
                    {this.props.bookdetailsById.description}
                </div>
            )
        }

        if(this.props.activeMyBookDetails && this.props.activeMyBookDetails.description) {
            return (
                <div className="book-description-inner-container-info">
                    {this.props.activeMyBookDetails.description}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="book-description-container-info">
                {this.renderBookDescription()}
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

export default connect(mapStateToProps)(BookDescription)