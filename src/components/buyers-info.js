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
        if(this.props.activeMyBookDetails && this.props.activeMyBookDetails.buyersInfo) {
            return Object.entries(this.props.activeMyBookDetails.buyersInfo).map(([key, value], index) => {
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
                        {this.renderRequestStatus(value.status, key)}
                    </div>
                ); 
            });
        }
    }

    renderRequestStatus(status, buyerName) {
        const updateStyleOfAcceptedButton = {};
        const updateStyleOfRejectedButton = {};
        if(status === REQUEST_ACCEPTED) {
            updateStyleOfAcceptedButton["backgroundColor"] = "green";
        } else if(status === REQUEST_REJECTED) {
            updateStyleOfRejectedButton["backgroundColor"] = "red";
        }
        return (
            <div className="request-status">
                <div onClick={() => this.updateRequestedStatus(status, REQUEST_ACCEPTED, buyerName)} className="request-accept" style={updateStyleOfAcceptedButton}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <div onClick={() => this.updateRequestedStatus(status, REQUEST_REJECTED, buyerName)} className="request-reject" style={updateStyleOfRejectedButton}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>
        )
    }

    updateRequestedStatus(currentStatus, updatedStatus, buyerName) {
        if(currentStatus === updatedStatus) {
            this.props.updateRequestedStatus(REQUEST_PENDING, this.props.activeMyBookDetails._id, buyerName);
        } else {
            this.props.updateRequestedStatus(updatedStatus, this.props.activeMyBookDetails._id, buyerName);
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
        activeMyBookDetails: state.book.activeMyBookDetails
    }
}

export default connect(mapStateToProps, { updateRequestedStatus })(BuyersInfo)