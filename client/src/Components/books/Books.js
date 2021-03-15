import React, { Fragment, useContext, useEffect } from 'react';
import BookContext from '../../context/contact/bookContext';
import BookItem from '../books/BookItem';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from '../Layout/Spiner';

const Books = () => {
    const bookContext = useContext(BookContext);
    const { books, filtered, getBook, loading } = bookContext;

    useEffect(() => {
        getBook();
        //eslint-disable-next-line
    }, [])

    if (books !== null && books.length === 0 && !loading) {
        // This ensures that books is always non null

        return <h4>Please add a book</h4>
    }
    return (
        <Fragment>
            {books !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(book => (
                            <CSSTransition
                                key={book._id}
                                timeout={500}
                                classNames='item'
                            >
                                <BookItem contact={book} />
                            </CSSTransition>
                        ))
                        : books.map(book => (
                            <CSSTransition
                                key={book._id}
                                timeout={500}
                                classNames='item'
                            >
                                <BookItem book={book} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </Fragment>
    )
}

export default Books
