import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/contact/bookContext';

const BookItem = ({ book }) => {

    const bookContext = useContext(BookContext);
    const { deleteBook, setCurrent, clearCurrent } = bookContext;
    const { _id, title, author, isbn, type } = book;

    const onDelete = () => {
        deleteBook(_id);
        clearCurrent()
    }
    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left">
                {title}{' '}
                <span
                    style={{ float: 'right' }}
                    className={'badge ' +
                        (type === 'finish' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {author && (<li>
                    <i className="fas fa-user"></i>{" "}{author}
                </li>)}

                {isbn && (<li>
                    ISBN:{" "}{isbn}
                </li>)}
            </ul>
            <p className="button btn btn-dark btn-sm" onClick={() => setCurrent(book)}>Edit</p>
            <p className="button btn btn-danger btn-sm" onClick={onDelete}>Delete</p>
        </div>
    )
}
BookItem.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookItem;
