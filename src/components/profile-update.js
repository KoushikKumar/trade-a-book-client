import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USERNAME, ADDRESS } from '../constants/placeholder-constants';
import { READ_ONLY } from '../constants/content-constants';
import { fetchUserData, updateProfileClicked, updateProfile } from '../actions';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "userName":"",
            "address":"",
            "errorMessage":"",
            isDataValid:false 
        }
    }

    componentWillMount() {
        this.props.fetchUserData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isUpdateProfileButtonClicked) {
            this.validateData();
            return;
        }
        if(!this.state.userName){
            const { userName, address } = nextProps.userData;
            this.setState({userName, address});
        }
    }

    componentDidUpdate() {
        if(this.props.isUpdateProfileButtonClicked) {
            this.props.updateProfileClicked(false);
        }
        if(this.state.isDataValid) {
            this.setState({isDataValid:false});
        }
    }

    setInputState(e, key) {
        if(this.state.errorMessage) {
            this.setState({errorMessage:""});
        }
        let updatedField = {};
        updatedField[key] = e.target.value;
        this.setState(updatedField);
    }

    renderErrorMessage() {
        const errorMessage = this.state.errorMessage;
        if(errorMessage) {
            return (
                <div className="profile-update-form-error-message">
                    {errorMessage}
                </div>
            )    
        }
    }

    validateData() {
        const { address } = this.state;
        if(!address) {
            this.setState({errorMessage:"Address can not be empty"})
            return;
        }
        this.setState({isDataValid:true});
    }

    updateData() {
        if(this.state.isDataValid) {
            const { userName, address } = this.state;
            this.props.updateProfile(userName, address, this.props.previousLocationPath)
        }
    }

    render() {
        const opts = {};
        opts[READ_ONLY] = READ_ONLY;
        return (
            <div className = "profile-form-update-container">
                <div className="input-group form-input profile-update-input">
                    <input value={this.state.userName} type="text" className="form-control" placeholder= { USERNAME } {...opts}/>
                </div>
                <div className="form-group form-input input-text-area profile-update-input">
                    <textarea onChange = {(e) => {this.setInputState(e, "address")}} 
                              value={this.state.address} 
                              className="form-control" 
                              rows="2" 
                              placeholder= { ADDRESS } >
                    </textarea>
                </div>
                {this.renderErrorMessage()}
                {this.updateData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user.userData,
        isUpdateProfileButtonClicked: state.buttonsClick.isUpdateProfileButtonClicked,
        previousLocationPath: state.routeLocation.previousLocationPath
    }
}

export default connect(mapStateToProps, { fetchUserData, updateProfileClicked, updateProfile })(Profile)