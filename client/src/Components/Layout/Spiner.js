
import React, { Fragment } from 'react';
import spinner from './Spinner.gif';

const spiner = () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
);

export default spiner