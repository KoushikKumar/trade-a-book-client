import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BOOK_TITLE, 
         AUTHOR, 
         IMAGE_URL,
         NO_OF_PAGES,
         PRICE,
         PUBLICATION_YEAR,
         DESCRIPTION } from '../constants/placeholder-constants';
import { ADD } from '../constants/content-constants';
import { addBook } from '../actions';

class AddBookPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "bookTitle":"",
            "author":"",
            "imageUrl":"",
            "noOfPages":"",
            "price":"",
            "year":"",
            "description":"",
            "errorMessage":""
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

    submitData() {
        const { bookTitle, author, imageUrl, noOfPages, price, year, description } = this.state;
        if(!(bookTitle && author && imageUrl && Number(noOfPages) && Number(price) && Number(year) && description)) {
            this.setState({errorMessage:"None of the field should be empty/zero"})
            return;
        }
        const book = {};
        book.image = imageUrl;
        book.title = bookTitle;
        book.author = author;
        book.pages = Number(noOfPages);
        book.price = Number(price);
        book.year = Number(year);
        book.description = description;
        book.sellerInfo = {};
        book.buyersInfo = {};
        this.props.addBook(book);
    }

    renderAddBookForm() {
        return (
            <div className="add-book-input-form-container">
                <div className="input-group add-book-input-form">
                    <input value={this.state.bookTitle} 
                           type="text" 
                           className="form-control" 
                           placeholder={BOOK_TITLE} 
                           onChange = {(e) => {this.setInputState(e, "bookTitle")}}/>
                </div>
                <div className="input-group add-book-input-form">
                    <input type="text" 
                           className="form-control" 
                           placeholder= {IMAGE_URL} 
                           value={this.state.imageUrl} 
                           onChange = {(e) => {this.setInputState(e, "imageUrl")}}/>
                </div>
                <div className="input-group add-book-input-form">
                    <input type="text" 
                           className="form-control" 
                           placeholder= {AUTHOR}
                           value={this.state.author} 
                           onChange = {(e) => {this.setInputState(e, "author")}}/>
                </div>
                <div className="input-group add-book-input-form">
                    <input type="number" 
                           className="form-control" 
                           placeholder= {NO_OF_PAGES} 
                           value={this.state.noOfPages} 
                           onChange = {(e) => {this.setInputState(e, "noOfPages")}}/>
                </div>
                <div className="input-group add-book-input-form">
                    <input type="number" 
                           className="form-control" 
                           placeholder= {PRICE} 
                           value={this.state.price} 
                           onChange = {(e) => {this.setInputState(e, "price")}}/>
                </div>
                <div className="input-group add-book-input-form">
                    <input type="number" 
                           className="form-control" 
                           placeholder= {PUBLICATION_YEAR} 
                           value={this.state.year} 
                           onChange = {(e) => {this.setInputState(e, "year")}}/>
                </div>
                <div className="input-group add-book-input-form">
                    <textarea className="form-control" 
                              rows="5" 
                              placeholder= {DESCRIPTION}
                              value={this.state.description} 
                              onChange = {(e) => {this.setInputState(e, "description")}}>
                    </textarea>
                </div>
            </div>
        );
    }

    renderBookTitle() {
        return (
            <div className="book-title" style={{"marginTop": "2vh"}}>
                { this.state.bookTitle }
            </div>
        );
    }

    renderBookImageDetails() {
        return (
            <div className="book-image-details-container" style={{"marginTop":"-4vh"}}>
                <div className="book-image-details-inner-container">
                    {this.renderImage()}
                    <div  className="book-details-container-info">
                        {this.renderAuthor()}
                        {this.renderNoOfPages()}
                        {this.renderPrice()}
                        {this.renderYear()}
                    </div>
                </div>
            </div>
        );
    }

    renderImage() {
        if(this.state.imageUrl) {
            return <img className="book-image-container-info" src={this.state.imageUrl}/>
        }
    }

    renderAuthor() {
        if(this.state.author) {
            return (
                <div className="book-detail-info book-author-info">
                    {this.state.author}
                </div>
            );
        }
    }

    renderNoOfPages() {
        if(this.state.noOfPages && Number(this.state.noOfPages)) {
            return (
                <div className="book-detail-info book-pages-info">
                    {this.state.noOfPages}
                </div>
            );
        }
    }

    renderPrice() {
        if(this.state.price && Number(this.state.price)) {
            return (
                <div className="book-detail-info book-price-info">
                    {this.state.price}
                </div>
            );
        }
    }

    renderYear() {
        if(this.state.year && Number(this.state.year)) {
            return (
                <div className="book-detail-info book-year-info">
                    {this.state.year}
                </div>
            );
        }
    }

    renderDescription() {
        return (
            <div className="book-description-container-info">
                <div className="book-description-inner-container-info">
                    {this.state.description}
                </div>
            </div>
        );
    }

    renderErrorMessage() {
        const errorMessage = this.state.errorMessage;
        if(errorMessage) {
            return (
                <div className="add-book-form-error-message">
                    {errorMessage}
                </div>
            )    
        }
    }

    renderAddButton() {
       return (
            <div className="add-book-input-form-submit-container">
                <button onClick={() => this.submitData()} className="add-book-input-form-submit" type="button">
                    { ADD }
                </button>
            </div>
       )
    }

    render() {
        return (
            <div className="book-cover">
                <div className="pages">
                    <div className="page page-left page1">
                    </div>
                    <div className="page page-left page2">
                    </div>
                    <div className="page page-left page3">
                        {this.renderAddBookForm()}
                        {this.renderErrorMessage()}
                    </div>
                    <div className="page page-right page4">
                    </div>
                    <div className="page page-right page5">
                    </div>
                    <div className="page page-right page6">
                        <div className="book-details-right-page-container">
                            {this.renderBookTitle()}
                            {this.renderBookImageDetails()}
                            {this.renderDescription()}
                            {this.renderAddButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {addBook})(AddBookPages)