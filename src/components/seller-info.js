import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELLER_INFO } from '../constants/content-constants';

class SellerInfo extends Component {
    render() {
        if(this.props.bookdetailsById.sellerInfo) {
            return (
                <div className="seller-information-container-info">
                    <div className="seller-information-info seller-information-title-info">
                        {SELLER_INFO}
                    </div>
                    <div className="seller-information-info seller-information-name-info">
                        {this.props.bookdetailsById.sellerInfo.name}
                    </div>
                    <div className="seller-information-info seller-information-address-info">
                        {this.props.bookdetailsById.sellerInfo.address}
                    </div>
                </div>
            );
        } else {
            return false;
        }
    }
}

function mapStateToProps(state) {
    return {
        bookdetailsById: state.book.bookdetailsById
    }
}

export default connect(mapStateToProps)(SellerInfo)