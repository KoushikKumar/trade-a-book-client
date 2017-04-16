import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import routes from './routes';
import axios from 'axios';

import reducers from './reducers';
import { TEST_AUTH_URI } from './actions/uris';
import { TOKEN_KEY, TOKEN, AUTHORIZATION, AUTHORIZED } from './constants/content-constants';
import { IS_USER_AUTHENTICATED, LEFT_AND_RIGHT_PAGE_NUMBER, MY_BOOKS_PAGE_NUMBER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const tokenData = JSON.parse(localStorage.getItem(TOKEN_KEY));

setPageNumbers();
if(tokenData) {
  axios.get(`${TEST_AUTH_URI}?${AUTHORIZATION}=${tokenData[TOKEN]}`)
    .then((response) => {
        if(response.data === AUTHORIZED) {
          store.dispatch({ type:IS_USER_AUTHENTICATED, payload:true });
        }
        renderDOM();
    }).catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        store.dispatch({ type:IS_USER_AUTHENTICATED, payload:false });
        renderDOM();
    })
} else {
  renderDOM();
}

function setPageNumbers() {
  store.dispatch({ type:LEFT_AND_RIGHT_PAGE_NUMBER, payload:{left:1, right:2} });
  store.dispatch({ type:MY_BOOKS_PAGE_NUMBER, payload:1 });
}

function renderDOM() {
  ReactDOM.render(
    <Provider store={ store }>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.querySelector('.outermost-container'));
}

