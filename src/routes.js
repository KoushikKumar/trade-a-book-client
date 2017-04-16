import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import ViewAll from './components/view-all'
import SignUp from './components/signup';
import Login from './components/login';
import MyBooks from './components/my-books';
import AddBook from './components/add-book';
import Profile from './components/profile';
import BookDetails from './components/book-details';
import { SIGNUP, LOGIN, MY_BOOKS, ADD_BOOK, UPDATE_PROFILE, BOOK_DETAILS, VIEW_ALL } from './constants/routes-constants';
import requireUnAuth from './components/hoc/require-unauthentication';
import requireAuth from './components/hoc/require-authentication';

export default (
    <Route path ="/" component = {App} >
        <IndexRoute component = {Home} />
        <Route path = { VIEW_ALL } component = {ViewAll} />
        <Route path = { SIGNUP } component = {requireUnAuth(SignUp)} />
        <Route path = { LOGIN } component = {requireUnAuth(Login)} />
        <Route path = { UPDATE_PROFILE } component = { requireAuth(Profile) } />
        <Route path = { MY_BOOKS }  component = {requireAuth(MyBooks)} />
        <Route path = { ADD_BOOK } component = {requireAuth(AddBook)} />
        <Route path = { BOOK_DETAILS } component = {BookDetails} />
    </Route>
);
