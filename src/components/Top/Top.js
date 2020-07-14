import React from 'react'
import { Link } from 'react-router-dom';

import classes from './Top.module.css'

const top = (props) => {
    return (
        <div className={classes.Top}>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default top;