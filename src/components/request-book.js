import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REQUEST } from '../constants/content-constants';
import { REQUEST_BOOK_ERROR_MESSAGE, STATUS, REQUEST_PENDING, REQUEST_ACCEPTED, REQUEST_REJECTED } from '../constants/content-constants';
import { fetchUserData, requestBook } from '../actions';

class RequestButton extends Component {

    constructor(props) {
        super(props);
        this.state = {errorMessage:""}
    }

    componentWillMount() {
        if (this.props.isUserAuthenticated) {
            this.props.fetchUserData();
        } 
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isUserAuthenticated !== nextProps.isUserAuthenticated && nextProps.isUserAuthenticated) {
            this.props.fetchUserData();
        }
    }

    renderErrorMessage() {
        if(this.state.errorMessage) {
            return (
                <div className="request-book-error-message">
                    {this.state.errorMessage}
                </div>
            )
        }
    }

    requestBook() {
        if (this.props.isUserAuthenticated) {
            const { userName, address } = this.props.userData;
            const bookId = this.props.bookdetailsById._id;
            this.props.requestBook(userName, address, bookId);
        } else {
            this.setState({errorMessage:REQUEST_BOOK_ERROR_MESSAGE})
        }
    }

    renderStatusButton() {
        const { bookdetailsById } = this.props;
        const { userName } = this.props.userData;
        if((!this.props.isUserAuthenticated) || !bookdetailsById.buyersInfo || !bookdetailsById.buyersInfo[userName]) {
            return (
                <button onClick = {() => this.requestBook()} type="button" className="request-button-info">{REQUEST}</button>
            );
        } else {
            const status = bookdetailsById.buyersInfo[userName][STATUS];
            const updateBackgroundColor = {};
            if(status === REQUEST_PENDING) {
                updateBackgroundColor["backgroundColor"] = "#DD7B2A";
                updateBackgroundColor["border"] = "1px solid #DD7B2A";
            }
            if(status === REQUEST_ACCEPTED) {
                updateBackgroundColor["backgroundColor"] = "#6EBE4D";
                updateBackgroundColor["border"] = "1px solid #6EBE4D";
            }
            if(status === REQUEST_REJECTED) {
                updateBackgroundColor["backgroundColor"] = "#A21D21";
                updateBackgroundColor["border"] = "1px solid #A21D21";
            }

            return (
                <button type="button" className="request-status-button-info" style={updateBackgroundColor}>{status}</button>
            );
        }
    }

    render() {
        return (
            <div className="request-button-container-info">
                {this.renderStatusButton()}
                {this.renderErrorMessage()}
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {
        isUserAuthenticated: state.user.isUserAuthenticated,
        userData: state.user.userData,
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps, { fetchUserData, requestBook })(RequestButton)