import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPageNumbers } from '../actions';
import { NEXT } from '../constants/content-constants';

class RightFooter extends Component {

    setPageNumbers() {
        const { rightPageNumber } = this.props;
        this.props.setPageNumbers(rightPageNumber+1, rightPageNumber+2);
    }

    renderNextButton() {
        const { rightPageNumber, bookData } = this.props;
        if(bookData.length > 9 * rightPageNumber) {
            return (
                <div onClick={()=>this.setPageNumbers()} className="next-page">
                    { NEXT }
                </div>
            );
        }
    }

    render() {
        return (
            <div className="page-footer">
                <div className="page-number-container-right">
                    <div className="page-number">
                        { this.props.rightPageNumber }
                    </div>
                </div>
                <div className="next-page-container">
                    {this.renderNextButton()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rightPageNumber } = state.page;
    return {
        rightPageNumber,
        bookData: state.book.bookData
    }
}

export default connect(mapStateToProps, { setPageNumbers })(RightFooter)