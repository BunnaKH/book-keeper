import React, { useReducer } from 'react';
import bookContext from './bookContext';
import bookReducer from './bookReducer';
import axios from 'axios';
import {
    ADD_BOOK,
    DELETE_BOOK,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BOOK,
    FILTER_BOOKS,
    CLEAR_FILTER,
    BOOK_ERRORS,
    GET_BOOK,
    CLEAR_BOOKS

} from '../types'

const BookState = props => {

    const initialState = {

        books: null,
        current: null,
        filtered: null,
        error: null

    }

    const [state, dispatch] = useReducer(bookReducer, initialState);


    //GET BOOK
    const getBook = async () => {


        try {
            const res = await axios.get('/api/books');
            dispatch({ type: GET_BOOK, payload: res.data })
        } catch (err) {
            dispatch({ type: BOOK_ERRORS, payload: err.response.msg })
        }

    }

    // Add Book
    const addBook = async book => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/books', book, config);
            dispatch({ type: ADD_BOOK, payload: res.data })
        } catch (err) {
            dispatch({ type: BOOK_ERRORS, payload: err.response.msg })
        }

    }
    // Delete Book

    const deleteBook = async (id) => {


        try {

            await axios.delete(`/api/books/${id}`);

            dispatch({ type: DELETE_BOOK, payload: id })
        } catch (err) {
            dispatch({ type: BOOK_ERRORS, payload: err.response.msg })
        }

    }
    //Set Current Book
    const setCurrent = book => {
        dispatch({ type: SET_CURRENT, payload: book })
    }
    // Clear Current Book
    const clearCurrent = book => {
        dispatch({ type: CLEAR_CURRENT })
    }
    //Update Book
    const updateBook = async book => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/books/${book._id}`, book, config);
            dispatch({ type: UPDATE_BOOK, payload: res.data })
        } catch (err) {
            dispatch({ type: BOOK_ERRORS, payload: err.response.msg })
        }


    }
    //Filter Books
    const filterBooks = text => {
        dispatch({ type: FILTER_BOOKS, payload: text })
    }
    //Clear Filter
    const clearFilter = text => {
        dispatch({ type: CLEAR_FILTER })
    }

    const clearBooks = () => {
        dispatch({ type: CLEAR_BOOKS });
    };

    return (
        <bookContext.Provider
            value={{
                books: state.books,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addBook,
                deleteBook,
                setCurrent,
                clearCurrent,
                updateBook,
                filterBooks,
                clearFilter,
                getBook,
                clearBooks

            }}
        >
            {props.children}
        </bookContext.Provider>
    )
}


export default BookState;