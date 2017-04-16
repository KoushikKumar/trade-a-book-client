import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPreviousLocationPath } from '../actions';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    const nextLocationPath = nextProps.location.pathname;
    const previousLocationPath = this.props.location.pathname;
    if(nextLocationPath !== previousLocationPath) {
      this.props.setPreviousLocationPath(previousLocationPath);
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, { setPreviousLocationPath })(App)
