import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
    class UnAuthentication extends Component {
        static contextTypes = {
			router: React.PropTypes.object
		}

        componentWillMount() {
			if(this.props.IS_AUTHORIZED) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if(nextProps.IS_AUTHORIZED) {
				this.context.router.push('/');
			}
		}

        render() {
			return <ComposedComponent {...this.props} />
		}
    }

	function mapStateToProps(state) {
		return {
			IS_AUTHORIZED : state.user.isUserAuthenticated
		};
	}

	return connect(mapStateToProps)(UnAuthentication);
}