

import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

export default function Welcome(props) {
    return (
        <div>
            <h1>Welcome {props.username} !!!</h1>
            <Link to='/user'>User</Link>
            <Link to='/admin'>Admin</Link>
            <Logout></Logout>
        </div>
    )
}
