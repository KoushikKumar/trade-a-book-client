import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setSinglePageFooterPageNumber } from '../actions';
import { NEXT, PREVIOUS } from '../constants/content-constants';

class SinglePageFooter extends Component {

    renderPreviousButton() {
        if(this.props.myBooksPageNumber > 1) {
            return (
                <div onClick={()=>this.setPageNumbers(PREVIOUS)} className="previous-page">
                    { PREVIOUS }
                </div>
            );
        }
    }

    renderPageNumber() {
        const updatePageNumberStyle = {
            display: "flex",
            justifyContent: "center",
            flexGrow: 1
        }
        return(
            <div className="page-number" style={updatePageNumberStyle}>
                {this.props.myBooksPageNumber}
            </div>
        ); 
    }

    renderNextButton() {
        const { myBooksPageNumber, myBookDetails } = this.props;
        if(myBookDetails.length > 9 * myBooksPageNumber) {
            return (
                <div onClick={()=>this.setPageNumbers(NEXT)} className="next-page">
                    { NEXT }
                </div>
            );
        }
    }

    setPageNumbers(type) {
        const { myBooksPageNumber } = this.props;
        if(type === "Previous") {
            this.props.setSinglePageFooterPageNumber(myBooksPageNumber - 1);
        }
        if(type === "Next") {
            this.props.setSinglePageFooterPageNumber(myBooksPageNumber + 1);
        }
    }

    render() {
        return (
            <div className="page-footer">
                <div className="previous-page-container">
                    {this.renderPreviousButton()}
                </div>
                <div className="page-number-container-left">
                    {this.renderPageNumber()}
                </div>
                <div className="next-page-container">
                    {this.renderNextButton()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { myBooksPageNumber } = state.page;
    const { myBookDetails } = state.book;
    return {
        myBooksPageNumber,
        myBookDetails
    }
}

export default connect(mapStateToProps, { setSinglePageFooterPageNumber })(SinglePageFooter)