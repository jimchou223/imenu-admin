import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

import classes from './Welcome.module.css'

export default function Welcome(props) {
    return (
        <div className={classes.Welcome}>
            <div className={classes.Header}>
                <h1>Welcome chef !!!</h1>
            </div>

            <div className={classes.Wrapper}>
                <div className={classes.UserButton}>
                    <Link to='/user'>User</Link>
                </div>
                <div className={classes.AdminButton}>
                    <Link to='/admin'>Admin</Link>
                </div>
                <div className={classes.LogoutButton}>
                    <Logout ></Logout>
                </div>

            </div>



        </div>
    )
}
