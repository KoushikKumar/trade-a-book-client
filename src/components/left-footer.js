import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPageNumbers } from '../actions';
import { PREVIOUS } from '../constants/content-constants';

class LeftFooter extends Component {

    setPageNumbers() {
        const { leftPageNumber } = this.props;
        this.props.setPageNumbers(leftPageNumber-2, leftPageNumber-1);
    }

    renderPreviousButton() {
        if(this.props.leftPageNumber > 1) {
            return (
                <div onClick={()=>this.setPageNumbers()} className="previous-page">
                    { PREVIOUS }
                </div>
            );
        }
    }

    render() {
        return (
            <div className="page-footer">
                <div className="previous-page-container">
                    {this.renderPreviousButton()}
                </div>
                <div className="page-number-container-left">
                    <div className="page-number">
                        {this.props.leftPageNumber}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { leftPageNumber } = state.page;
    return {
        leftPageNumber
    }
}

export default connect(mapStateToProps, { setPageNumbers })(LeftFooter)