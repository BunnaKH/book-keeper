import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/contact/auth/authContext';
import BookContext from '../../context/contact/bookContext';






const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const bookContext = useContext(BookContext);
    const { clearBooks } = bookContext;

    const { user, isAuthenticated, logout } = authContext;

    const onLogout = () => {
        logout();
        clearBooks()
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.protoTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: "Book Keeper",
    icon: "fas fa-book"
}

export default Navbar
