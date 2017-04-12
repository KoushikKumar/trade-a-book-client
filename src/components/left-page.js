import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftPage extends Component {

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
                        <img className="book-image" src={book.image}/>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div className="book-outer-container">
                {this.renderImages()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookData: state.book.bookData,
        leftPageNumber: state.page.leftPageNumber
    }
}

export default connect(mapStateToProps)(LeftPage)