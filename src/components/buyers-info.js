import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REQUEST_PENDING, REQUEST_ACCEPTED, REQUEST_REJECTED } from '../constants/content-constants';
import { updateRequestedStatus } from '../actions';

class BuyersInfo extends Component {

    renderBuyerInformationHeader() {
        return (
            <div className="buyer-information-header">
                Buyer Information
            </div>
        );
    }

    renderBuyerDetails() {
        let bookDetails = {};
        const activeMyBookDetails = this.props.activeMyBookDetails;
        const bookdetailsById = this.props.bookdetailsById;
        if(activeMyBookDetails && activeMyBookDetails.buyersInfo) {
            bookDetails = activeMyBookDetails;
        } else if(bookdetailsById && bookdetailsById.buyersInfo) {
            bookDetails = bookdetailsById;
        }

        if(bookDetails && bookDetails.buyersInfo) {
            if(!Object.entries(bookDetails.buyersInfo).length){
                return (
                    <div className="buyer-information-status">
                        No one has requested this book yet
                    </div>
                )
            }

            return Object.entries(bookDetails.buyersInfo).map(([key, value], index) => {
                return(
                    <div className="buyer" key={index}>
                        <div className="buyer-name-and-address">  
                            <div className="buyer-name">
                                {key}
                            </div>
                            <div className="buyer-address">
                                {value.address}
                            </div>
                        </div>
                        {this.renderRequestStatus(value.status, key, bookDetails)}
                    </div>
                ); 
            });
        }
    }

    renderRequestStatus(status, buyerName, bookDetails) {
        const updateStyleOfAcceptedButton = {};
        const updateStyleOfRejectedButton = {};
        if(status === REQUEST_ACCEPTED) {
            updateStyleOfAcceptedButton["backgroundColor"] = "green";
        } else if(status === REQUEST_REJECTED) {
            updateStyleOfRejectedButton["backgroundColor"] = "red";
        }
        return (
            <div className="request-status">
                <div onClick={() => this.updateRequestedStatus(status, REQUEST_ACCEPTED, buyerName, bookDetails)} className="request-accept" style={updateStyleOfAcceptedButton}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <div onClick={() => this.updateRequestedStatus(status, REQUEST_REJECTED, buyerName, bookDetails)} className="request-reject" style={updateStyleOfRejectedButton}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>
        )
    }

    updateRequestedStatus(currentStatus, updatedStatus, buyerName, bookDetails) {
        if(currentStatus === updatedStatus) {
            this.props.updateRequestedStatus(REQUEST_PENDING, bookDetails._id, buyerName);
        } else {
            this.props.updateRequestedStatus(updatedStatus, bookDetails._id, buyerName);
        }
    }

    render() {
        return (
            <div className="buyer-information-container">
                {this.renderBuyerInformationHeader()}
                <div className="buyer-information">
                    {this.renderBuyerDetails()}
                </div>
            </div>
        );  
    }
}

function mapStateToProps(state) {
    return {
        activeMyBookDetails: state.book.activeMyBookDetails,
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps, { updateRequestedStatus })(BuyersInfo)