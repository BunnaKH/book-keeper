import React, { useContext, useEffect } from 'react';
import Books from '../books/Books';
import BookForm from '../books/BookForm'
import FilterBook from '../books/BookFilter';
import AuthContext from '../../context/contact/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])
    return (
        <div className='grid-2'>
            <div>
                <BookForm />
            </div>
            <div>
                <FilterBook />
                <Books />
            </div>
        </div>
    )
}

export default Home
