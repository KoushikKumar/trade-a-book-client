import React, { Component } from 'react';

import { VIEW_ALL } from '../constants/routes-constants';

export default class Home extends Component {

    static contextTypes = {
			router: React.PropTypes.object
	}

    componentWillMount() {
        this.context.router.push(`/${VIEW_ALL}`);
    }

    render() {
        return false;
    }
}