import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDescription extends Component {
    render() {
        return (
            <div className="book-description-container-info">
                {this.props.bookdetailsById.description}
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps)(BookDescription)