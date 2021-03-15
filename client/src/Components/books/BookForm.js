import React, { useState, useContext, useEffect } from 'react';
import BookContext from '../../context/contact/bookContext';


const BookForm = () => {

    const bookContext = useContext(BookContext);
    const { addBook, current, clearCurrent, updateBook } = bookContext

    useEffect(() => {
        if (current !== null) {
            setBook(current)
        } else {
            setBook({
                title: '',
                author: '',
                isbn: '',
                type: 'not yet'
            })
        }
    }, [bookContext, current])

    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        type: 'not yet'
    });

    const { title, author, isbn, type } = book;

    const onChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }


    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addBook(book);
        } else {
            updateBook(book)
        }
        clearAll()

    }

    const clearAll = () => {
        clearCurrent()
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Book' : 'Add Book'}</h2>
            <input type='text' placeholder='title' name='title' value={title} onChange={onChange} />
            <input type='text' placeholder='author' name='author' value={author} onChange={onChange} />
            <input type='text' placeholder='isbn' name='isbn' value={isbn} onChange={onChange} />
            <h5>Finish ?</h5>
            <input type='radio'
                name='type'
                value='not yet'
                checked={type === 'not yet'}
                onChange={onChange}
            />{' '}
          Not yet {' '}
            <input type='radio'
                name='type'
                value='finish'
                checked={type === 'finish'}
                onChange={onChange}
            />{' '}
          Finish
            <div>
                <input type='submit' value={current ? 'Update Book' : 'Add Book'} className='btn btn-primary btn-block' />
            </div>
            {current && <div>
                <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default BookForm;
